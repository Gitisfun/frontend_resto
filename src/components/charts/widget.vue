<template>
  <div class="box" :style="`background-image: linear-gradient(${colorOne}, ${colorTwo})`">
    <p id="widget-title">{{ title }}</p>
    <p id="widget-text">€ {{ getTotal }}</p>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    title: String,
    total: String,
    colorOne: String,
    colorTwo: String,
  },
  computed: {
    getTotal() {
      if (this.total) {
        return this.total;
      }
      return "0.00";
    },
  },
};
</script>

<style>
#widget-title {
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  color: white;
}
#widget-text {
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  color: white;
}
</style>
