<template>
  <div class="columns">
    <div class="column is-6">
      <p class="orderline-text">{{ orderLine.product }}</p>
    </div>
    <div class="column is-2">
      <p class="orderline-text">€ {{ orderLine.price }}</p>
    </div>
    <div class="column is-1">
      <p class="orderline-text">x</p>
    </div>
    <div class="column is-1" style="text-align: right">
      <p class="orderline-text">{{ orderLine.quantity }}</p>
    </div>
    <div class="column is-2" style="text-align: right">
      <p class="orderline-text">€ {{ calculateSubtotal }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "PrintOrderProductItem",
    props: {
        orderLine: Object
    },
    computed: {
        calculateSubtotal(){
            let total = 0
            total = this.orderLine.price * this.orderLine.quantity;
            return total.toFixed(2)
        }
    }
};
</script>

<style>
.orderline-text{
    font-weight: 400;    
}
</style>
