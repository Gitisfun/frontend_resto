<template>
  <div id="ticket-box" v-if="isLoaded">
    <div class="has-text-centered">
      <p id="ticket-resto-name">{{ horeca.name }}</p>
      <br />
      <p class="ticket-resto-info">{{ addressLine }}</p>
      <p class="ticket-resto-info">{{ contactLine }}</p>
      <p class="ticket-resto-info">{{ contactInfo.website }}</p>
      <br />
      <p id="ticket-rest-subtitle">BTW-KASTICKET</p>
      <br />
    </div>
    <div style="margin-left: 10px; margin-right: 10px">
      <p class="ticket-resto-info">
        Datum: {{ currentTimestamp }}
        <span style="float:right; width: 50%; text-align: left"> {{ order.table_name }} </span>
      </p>
      <p class="ticket-resto-info">
        Ober: {{ order.firstname }} {{ order.lastname }}
        <span style="float:right; width: 50%; text-align: left">Ticket: {{ counter }} </span>
      </p>
      <p class="ticket-resto-info">
        Kas: 1 BRE4846858657
      </p>
      <p class="ticket-resto-info">
        No Sales: {{ counter }}
        <span style="float:right; width: 50%; text-align: left"> RESTIFY v1.0.0 </span>
      </p>
    </div>
    <br />
    <div id="ticket-divider">
      <div id="ticket-table-header">
        <table width="100%">
          <colgroup>
            <col span="1" style="width: 10%;" />
            <col span="1" style="width: 40%;" />
            <col span="1" style="width: 20%;" />
            <col span="1" style="width: 20%;" />
            <col span="1" style="width: 10%;" />
          </colgroup>
          <tbody>
            <tr>
              <td>H.</td>
              <td>Beschrijving</td>
              <td>Prijs</td>
              <td>Totaal</td>
              <td>%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table width="100%">
        <colgroup>
          <col span="1" style="width: 10%;" />
          <col span="1" style="width: 40%;" />
          <col span="1" style="width: 20%;" />
          <col span="1" style="width: 20%;" />
          <col span="1" style="width: 10%;" />
        </colgroup>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.quantity }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_price }}</td>
            <td>{{ calculateSubtotal(item) }}</td>
            <td>{{ item.btw_category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p id="ticket-table-total"><span style="margin-right: 25px;">TOTAAL:</span> {{ order.total }}</p>
    <div>
      <table class="has-text-centered" width="100%">
        <tr>
          <td></td>
          <td class="ticket-resto-info">Tarief</td>
          <td class="ticket-resto-info">Basis</td>
          <td class="ticket-resto-info">BTW</td>
          <td class="ticket-resto-info">Tot</td>
        </tr>
        <tr v-for="item in btwList" :key="item.code">
          <td class="ticket-resto-info">{{ item.code }}</td>
          <td class="ticket-resto-info">{{ item.tarive }}</td>
          <td class="ticket-resto-info">{{ item.baseAmount }}</td>
          <td class="ticket-resto-info">{{ item.btwAmount }}</td>
          <td class="ticket-resto-info">{{ item.amount }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="ticket-resto-info">{{ totalAmountNoBtw }}</td>
          <td class="ticket-resto-info">{{ totalBtw }}</td>
          <td class="ticket-resto-info">{{ order.total }}</td>
        </tr>
      </table>

      <p class="ticket-resto-info" style="text-align: right; margin-right: 40px; margin-top: 25px; margin-bottom: 5px;">
        <span style="margin-right: 50px;">{{ paymentMethod }}</span
        >-{{ order.total }}
      </p>
      <p id="ticket-table-big-total"><span style="margin-right: 50px">TOTAAL</span> {{ order.total }} EUR</p>
    </div>
    <div id="ticket-contact-box">
      <p>Controlegegevens:</p>
      <div style="margin-left: 5px">
        <p class="ticket-resto-info">Timestamp: {{ controleTimestamp }}</p>
        <p class="ticket-resto-info">Ticketteller: NS 3352 / 13199</p>
        <p class="ticket-resto-info">Handtekening: 35498465189ege894594er8g4</p>
        <p class="ticket-resto-info">ID FDM: RET03001354</p>
        <p class="ticket-resto-info">ID VSC; 000000009945-035</p>
        <p class="ticket-resto-info">PLU Hah: fe42e65d</p>
      </div>
    </div>
    <div class="has-text-centered">
      <p>** MERCI - AU PLAISIR DE VOUS REVOIF **</p>
      <p>*** DANK U - HOPELIJK TOT ZIENS ***</p>
      <p>**** THANK YOU - SEE YOU SOON ****</p>
    </div>
  </div>
</template>

<script>
import { getMultiple } from "../../api/apiCalls";
import { getOrder, getAllProductsForOrder } from "../../api/routes/orders";
import { getHoreca } from "../../api/routes/horeca";
import { getContact } from "../../api/routes/contactinfo";
import { getAddress } from "../../api/routes/address";
import { getCounter } from "../../api/routes/counter";

import store from "../../store";
import dateHelper from "../../logic/dateHelper.js";
import btw from "../../logic/btw.js";

export default {
  name: "Ticket",
  data() {
    return {
      isLoaded: false,
      id: null,
      horeca_id: null,
      order: null,
      products: [],
      horeca: null,
      contactInfo: null,
      address: null,
      counter: null,
    };
  },
  computed: {
    addressLine() {
      if (this.address) {
        return `${this.address.street} ${this.address.number} - ${this.address.postal_code} ${this.address.county} (${this.address.province})`;
      }
      return "";
    },
    contactLine() {
      if (this.contactInfo) {
        return `TEL: ${this.contactInfo.phonenumber} - TVA: ${this.contactInfo.gsm}`;
      }
      return "";
    },
    currentTimestamp() {
      return dateHelper.getTodayTimestamp();
    },
    controleTimestamp() {
      return dateHelper.getControleTimestamp();
    },
    btwList() {
      return btw.getAllCodes(this.products);
    },
    paymentMethod() {
      if (this.order.cash == 1) {
        return "Cash";
      }
      return "Bankkaart";
    },
    totalAmountNoBtw() {
      let temp = 0;
      for (let i = 0; i < this.btwList.length; i++) {
        temp += parseFloat(this.btwList[i].baseAmount);
      }
      return temp;
    },
    totalBtw() {
      let temp = 0;
      for (let i = 0; i < this.btwList.length; i++) {
        temp += parseFloat(this.btwList[i].btwAmount);
      }
      return temp;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.horeca_id = store.getters.getUser.horeca_id;
    this.fetchData(this.id);
  },
  methods: {
    fetchData(id) {
      getMultiple(
        [getOrder(id), getAllProductsForOrder(id), getHoreca(this.horeca_id), getContact(this.horeca_id), getAddress(this.horeca_id), getCounter(this.horeca_id)],
        (res) => {
          this.order = res[0].data[0];
          this.products = res[1].data;
          this.horeca = res[2].data[0];
          this.contactInfo = res[3].data[0];
          this.address = res[4].data[0];
          this.counter = res[5].data[0].counter;
          this.isLoaded = true;
          btw.getAllCodes(this.products);
        },
        this
      );
    },
    calculateSubtotal(item) {
      let subTotal = item.product_price * item.quantity;
      return subTotal.toFixed(2);
    },
  },
};
</script>

<style>
#ticket-box {
  padding: 25px;
}

#ticket-resto-name {
  font-size: 20px;
  font-weight: 600;
}

.ticket-resto-info {
  font-size: 12px;
  font-weight: 400;
}

#ticket-rest-subtitle {
  font-size: 22px;
  font-weight: 600;
}

#ticket-table-header {
  padding-top: 5px;
  padding-bottom: 5px;
  border-top-style: dotted;
  border-bottom-style: dotted;
}

#ticket-divider {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom-style: dotted;
}

#ticket-table-total {
  float: right;
  margin-right: 25px;
  margin-bottom: 15px;
}
#ticket-table-big-total {
  text-align: right;
  margin-right: 25px;
  font-size: 20px;
  font-weight: 600;
}

#ticket-contact-box {
  margin-top: 5px;
  margin-bottom: 5px;
  border-top-style: dotted;
  border-bottom-style: dotted;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
