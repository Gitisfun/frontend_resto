<template>
  <div  class="box" id="no-orders-item-box">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "NoOrdersYet",
  props: {
    text: String,
  },
};
</script>

<style>
#no-orders-item-box {
  border: 0.5px solid #ffffff;
  font-weight: 300;
}
</style>
