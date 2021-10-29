<template>
  <div class="box">
    <p class="customer-myorder-title">Bestelling: {{ order.dateOfPlacement }}</p>
    <p class="customer-myorder-title" style="margin-bottom: 10px">{{ order.horeca_type }} {{ order.horeca_name }}</p>
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
      <p class="customer-myorder-title" style="text-align:left; margin-top: 15px">
        Totaal
        <span style="float:right;"> € {{ order.total }} </span>
      </p>
    </div>
    <div v-if="!isReadOnly">
      <p v-if="order.isPaid == 1" :style="`border: 1px solid ${paidColor(order.isPaid)}; background: ${paidColor(order.isPaid)}; border-radius: 5px; padding: 3px; text-align: center; margin-top: 15px; margin-bottom: 0px; font-weight: 600; font-size: 12px; color: white`">Betaald</p>
      <p v-else-if="order.status == 4 || order.status == 5" :style="`border: 1px solid orange; background: orange; border-radius: 5px; padding: 3px; text-align: center; margin-top: 15px; margin-bottom: 0px; font-weight: 600; font-size: 12px; color: white`">In behandeling</p>
      <div v-else>
        <p :style="`border: 1px solid ${paidColor(order.isPaid)}; background: ${paidColor(order.isPaid)}; border-radius: 5px; padding: 3px; text-align: center; margin-top: 10px; margin-bottom: 10px; font-weight: 600; font-size: 12px; color: white`">
          Nog niet betaald
        </p>
        <p @click="pay" id="customer-payment-button">Betalen</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerMyOrderItem",
  props: {
    order: Object,
    isReadOnly: Boolean
  },
  methods: {
    paidColor(isPaid) {
      if (isPaid == 1) {
        return "#4cd137";
      }
      return "#EA2027";
    },
    pay() {
      this.$router.push({
        name: "CustomerPayment",
        params: {
          order: this.order,
        },
      });
    },
  },
};
</script>

<style scoped>
#customer-payment-button {
  width: 100%;
  text-align: center;
  border-radius: 5px;
  padding: 3px;
  /* padding-top: 3px;
  padding-bottom: 3px; */
  font-weight: 600;
  font-size: 12px;
  background: #22a6b3;
  color: white;
  cursor: pointer;
}

#customer-payment-button:active {
  border-radius: 5px;
    padding: 3px;

  /* padding-top: 3px;
  padding-bottom: 3px; */
  color: white;
  background: #ffcccc;
}

td {
  font-weight: 300;
  font-size: 14px;
}
.customer-myorder-title {
  font-weight: 700;
  font-size: 14px;
}
</style>
