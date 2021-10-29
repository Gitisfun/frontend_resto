<template>
  <div>
    <div style="background-image: linear-gradient(to right, #22a6b3, #2193b0); padding: 15px; font-weight: 700; color: white; text-align: center; font-size: 18px" v-if="horeca != null">
      {{ horeca.name }}
    </div>
    <div id="customer-order-body">
      <div class="box">
        <p class="customer-order-title">Bestelling: {{ getCurrentTimestamp() }}</p>
        <p class="customer-order-title" style="margin-bottom: 10px" v-if="horeca != null">{{ horeca.type }} {{ horeca.name }}</p>
        <table width="100%">
          <colgroup>
            <col span="1" style="width: 60%;" />
            <col span="1" style="width: 15%;" />
            <col span="1" style="width: 25%;" />
          </colgroup>
          <tbody>
            <tr v-for="item in order.list" :key="item.id">
              <td>{{ item.product }}</td>
              <td>x {{ item.quantity }}</td>
              <td style="text-align: right">€ {{ item.subtotal }}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p class="customer-order-title" style="text-align:left; margin-top: 25px">
            Totaal
            <span style="float:right;"> € {{ order.total }} </span>
          </p>
        </div>
      </div>
      <div class="box">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <p class="customer-order-title" style="margin-bottom: 15px">Vul je gegevens hier in</p>
          <!-- <ValidatedInput custom-class="is-small" size="is-small" rules="required" type="text" label="Naam" v-model="order.client" placeholder="..." /> -->
          <ValidatedSelect custom-class="is-small" size="is-small" rules="required" label="Tafel" v-model="order.table_id" placeholder="Kies een tafel...">
            <option v-for="option in tables" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </ValidatedSelect>
          <b-field label="Opmerking" custom-class="is-small">
            <b-input v-model="order.description" maxlength="200" size="is-small" height="100" type="textarea"></b-input>
          </b-field>
          <!-- <div class="block">
            <b-radio v-model="order.takeaway" size="is-small" native-value="0">
              Ter plaatse eten
            </b-radio>
            <b-radio v-model="order.takeaway" size="is-small" native-value="1">
              Meenemen
            </b-radio>
          </div> -->
          <b-button :disabled="isDisabled" size="is-small" type="is-primary" expanded @click="passes(confirmOrder)">Bestelling plaatsen</b-button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
// import ValidatedInput from "../../../components/input/ValidatedInput";
import ValidatedSelect from "../../../components/input/ValidatedSelect";

import moment from "moment";
import io from "socket.io-client";
import { notify, notifyWithData } from "../../../logic/sockets/socketManager.js";

import { getMultiple, createMultiple, updateWithCallback } from "../../../api/apiCalls";
import { createOrder, createOrderList } from "../../../api/routes/orders";
import { getHoreca } from "../../../api/routes/horeca";
import { getCounter, updateCounter } from "../../../api/routes/counter";
import { getSetting } from "../../../api/routes/settings";

import { getAllTablesByHorecaId, updateStatusTables } from "../../../api/routes/tables";

export default {
  name: "CustomerOrder",
  components: {
    ValidationObserver,
    // ValidatedInput,
    ValidatedSelect,
  },
  data() {
    return {
      socket: null,
      order: {
        order_nr: null,
        client: null,
        total: null,
        description: null,
        takeaway: "0",
        table_id: null,
        list: null,
        horeca_id: null,
      },
      isModern: null,
      isPrinted: null,
      horeca: null,
      tables: [],
      isDisabled: false,
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");
    //this.socket = io("http://192.168.0.231:5000/");
    this.order.horeca_id = parseInt(this.$route.params.id);
    this.fetchData(this.order.horeca_id);
    if (this.$route.params.order != undefined || this.$route.params.order != null) {
      this.order.total = this.$route.params.order.total;
      this.order.list = this.$route.params.order.list;
    } else if (JSON.parse(localStorage.getItem("myorder"))) {
      this.order.list = JSON.parse(localStorage.getItem("myorder")).list;
    } else {
      this.$route.go(-1);
    }
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    fetchData(id) {
      getMultiple(
        [getHoreca(id), getAllTablesByHorecaId(id), getCounter(id), getSetting(id)],
        (res) => {
          this.horeca = res[0].data[0];
          this.tables = res[1].data;
          this.order.order_nr = res[2].data[0].counter;
          this.isModern = res[3].data[0].isModern;
          this.isPrinted = res[3].data[0].isPrinted;
        },
        this
      );
    },
    getCurrentTimestamp() {
      const now = moment();
      return `${now.format("HH:mm")} - ${now.format("DD/MM/YYYY")}`;
    },
    confirmOrder() {
      // this.order.order_nr = `BE${moment().format("YYMMDDHHmmSS")}`;
      const status = { id: this.order.table_id, status: moment().format() };
      this.isDisabled = true;
      this.order.dateOfPlacement = this.getCurrentTimestamp();
      this.order.horeca_name = this.horeca.name;
      this.order.horeca_type = this.horeca.type;
      this.order.table_name = this.getTableName(this.order.table_id)

      if (this.isPrinted == 0) {
        this.order.status = 1;
      } else {
        this.order.status = 3;
      }

      createMultiple(createOrder, this.order, createOrderList, () => {
        notify(this.socket, "orders");
        localStorage.setItem("myorder", null);
        this.addOrderToMyOrders(this.order);
        updateWithCallback(updateStatusTables, status, this, () => {
          const temp = { id: this.$route.params.id };
          updateWithCallback(updateCounter, temp, this, () => {
            notify(this.socket, "tables");
            if (this.isPrinted == 1) {
              notifyWithData(this.socket, "print", this.order);
            }
            this.$router.push({
              name: "CustomerHome",
              params: { id: this.$route.params.id },
            });
          });
        });
      });
    },
    addOrderToMyOrders(order) {
      this.order.id = localStorage.getItem("tempItemId");
      this.order.isPaid = 0;
      let temp = this.$store.getters.getMyOrders;
      let IdList = this.$store.getters.getMyOrderIDs;
      IdList.unshift(order.id);
      temp.unshift(order);
      this.$store.dispatch("setMyOrderIDs", IdList);
      this.$store.dispatch("setMyOrders", temp);
      localStorage.setItem("tempItemId", null);
    },
    getTableName(id) {
      for (let i = 0; i < this.tables.length; i++) {
        if (id == this.tables[i].id) {
          return this.tables[i].name;
        }
      }
    },
  },
};
</script>

<style scoped>
td {
  font-weight: 300;
  font-size: 14px;
}
.customer-order-title {
  font-weight: 700;
  font-size: 14px;
}

#customer-order-box {
  padding: 0px;
  margin: 0;
  height: 100vh;
}

#customer-order-body {
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 75px;
  min-height: 100%;
  background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%);
}

#customer-menucard-info {
  margin-top: 10px;
  font-size: 14px;
}
</style>
