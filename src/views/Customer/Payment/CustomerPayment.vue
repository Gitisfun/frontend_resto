<template>
  <div>
    <div style="background: black; padding: 15px; font-weight: 700; color: white; text-align: center; font-size: 18px">
      Betalen
    </div>
    <div id="payment-body-box">
      <div v-if="order">
        <CustomerMyOrderItem :order="order" :isReadOnly="true" />
      </div>
      <br />
      <div class="box">
        <p id="customer-payment-title">Betalen</p>
        <p id="customer-payment-text">Kies een betalingsmethode:</p>
        <div style="margin-top: 10px;">
          <b-field>
            <b-radio size="is-small" v-model="paymentType" native-value="cash">
              Cash
            </b-radio>
          </b-field>
          <b-field>
            <b-radio size="is-small" v-model="paymentType" native-value="card">
              Met kaart
            </b-radio>
          </b-field>
          <b-field>
            <b-radio size="is-small" v-model="paymentType" native-value="electronic">
              Elektronisch
            </b-radio>
          </b-field>
        </div>
        <br />
        <b-button :disabled="!paymentType" size="is-small" type="is-primary" expanded @click="pay">Betalen</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { notify } from "../../../logic/sockets/socketManager.js";

import CustomerMyOrderItem from "../../../components/customer/CustomerMyOrderItem";

import { updateWithCallback } from "../../../api/apiCalls";
import { paymentRequest, payment } from "../../../api/routes/orders";

export default {
  name: "CustomerPayment",
  components: {
    CustomerMyOrderItem,
  },
  data() {
    return {
      socket: null,
      order: null,
      paymentType: null,
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");
    this.order = this.$route.params.order;
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    pay() {
      if (this.paymentType == "cash" || this.paymentType == "card") {
        if (this.paymentType == "cash") {
          this.order.cash = 1;
        } else {
          this.order.cash = 2;
        }
        updateWithCallback(paymentRequest, this.order, this, () => {
          this.order.status = 4;
          notify(this.socket, "orders");
          this.$router.go(-1);
        });
      } else {
        this.order.cash = 0;
        updateWithCallback(payment, this.order, this, () => {
          this.order.status = 6;
          notify(this.socket, "orders");
          this.$router.go(-1);
        });
      }
    },
  },
};
</script>

<style scoped>
#payment-body-box {
  min-height: 100vh;
  /* background: #dff9fb; */
  background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%);
  padding: 15px;
  margin: 0px;
}

#customer-payment-title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 5px;
}

#customer-payment-text {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
