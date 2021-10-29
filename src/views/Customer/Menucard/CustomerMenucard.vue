<template>
  <div id="customer-menucard-box">
    <div style="background-image: linear-gradient(to right, #22a6b3, #2193b0); padding: 15px; font-weight: 700; color: white; text-align: center; font-size: 18px" v-if="horeca != null">
      {{ horeca.name }}
    </div>
    <div id="customer-menucard-body">
      <div class="box">
        <table style="margin-bottom: 25px" width="100%" v-for="submenu in menu.submenus" :key="submenu.id">
          <colgroup>
            <col span="1" style="width: 65%;" />
            <col span="1" style="width: 20%;" />
            <col span="1" style="width: 15%;" />
          </colgroup>
          <thead>
            <tr>
              <th>{{ submenu.name }}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in submenu.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>€ {{ item.price }}</td>
              <td>
                <Icon @clicked="addItem(item)" style="float: right" icon="plus" size="is-small" type="is-success" />
              </td>
              <!--
              <td><b-button @click="addItem(item)" size="is-small">Add</b-button></td>
              -->
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box">
        <table width="100%">
          <colgroup>
            <col span="1" style="width: 55%;" />
            <col span="1" style="width: 15%;" />
            <col span="1" style="width: 20%;" />
            <col span="1" style="width: 10%;" />
          </colgroup>
          <thead>
            <tr>
              <th>Mijn bestelling</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderList" :key="item.id">
              <td>o {{ item.product }}</td>
              <td>x {{ item.quantity }}</td>
              <td>€ {{ calculateSubtotal(item) }}</td>
              <td>
                <Icon @clicked="removeItem(item)" style="float: right" icon="close-thick" size="is-small" type="is-danger" />
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="orderList.length != 0">
          <div style="margin-top: 15px; margin-bottom: 25px">
            <p style="text-align:left;">
              <b>Totaal</b>
              <span style="float:right;"> € {{ calculateTotal() }} </span>
            </p>
          </div>
          <b-button type="is-primary" size="is-small" :disabled="calculateTotal() == 0" expanded @click="confirmOrder">Bevestigen</b-button>
        </div>
        <div v-else>
          <p id="customer-menucard-info">
            Stel je bestelling samen...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMultiple, getById } from "../../../api/apiCalls";
import { getHoreca } from "../../../api/routes/horeca";
import { getCurrentlyActive } from "../../../api/routes/menus";
import { getAllMenuItems } from "../../../api/routes/menuItems";

import logic from "../../../logic/logic.js";
import menu from "../../../logic/menu.js";

import Icon from "../../../components/general/Icon";

export default {
  name: "CustomerMenucard",
  components: {
    Icon,
  },
  data() {
    return {
      horeca: null,
      menu: [],
      orderList: [],
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
    if (JSON.parse(localStorage.getItem("myorder"))) {
      this.orderList = JSON.parse(localStorage.getItem("myorder")).list;
    }
  },
  methods: {
    fetchData(id) {
      getMultiple(
        [getHoreca(id), getCurrentlyActive(id)],
        (res) => {
          this.horeca = res[0].data[0];
          const tempMenu = res[1].data[0];
          getById(
            getAllMenuItems,
            tempMenu.id,
            (resItems) => {
              this.menu = menu.convertToFrontend(tempMenu, resItems.data);
            },
            this
          );
        },
        this
      );
    },
    addItem(item) {
      const index = logic.findIndexById(this.orderList, item.id);
      if (index == -1) {
        this.orderList.push({
          id: item.id,
          product_id: item.product_id,
          product: item.name,
          price: item.price,
          quantity: 1,
        });
      } else {
        this.orderList[index].quantity += 1;
      }
      let temp = this.orderList;
      this.orderList = temp;
    },
    removeItem(item) {
      const index = logic.findIndexById(this.orderList, item.id);
      if (index != -1) {
        if (this.orderList[index].quantity == 1) {
          this.orderList.splice(index, 1);
        } else {
          this.orderList[index].quantity -= 1;
        }
      }
    },
    calculateSubtotal(item) {
      return (item.quantity * item.price).toFixed(2);
    },
    calculateTotal() {
      let sum = 0;
      for (let i = 0; i < this.orderList.length; i++) {
        sum += parseFloat(this.calculateSubtotal(this.orderList[i]));
      }
      return parseFloat(sum).toFixed(2);
    },
    confirmOrder() {
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[i].subtotal = this.calculateSubtotal(this.orderList[i]);
      }

      const order = {
        list: this.orderList,
        total: this.calculateTotal(),
      };

      localStorage.setItem("myorder", JSON.stringify(order));

      this.$router.push({
        name: "CustomerOrder",
        params: { id: this.$route.params.id, order: order },
      });
    },
  },
};
</script>

<style scoped>
th {
  font-weight: 700;
  font-size: 14px;
}
td {
  font-weight: 300;
  font-size: 14px;
}
#customer-menucard-box {
  padding-top: 0px;
  padding-right: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
  margin: 0;
  height: 100vh;
}

#customer-menucard-body {
  padding: 15px;
  min-height: 100%;
  background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%);
}

#customer-menucard-info {
  margin-top: 10px;
  font-size: 14px;
}
</style>
