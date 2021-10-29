<template>
  <div id="productBox" class="box level">
    <div class="level-left">
      <div class="level-item">
        <b-tooltip size="is-small" type="is-info" v-if="product.description" :label="product.description" position="is-right">
          <p style="font-size: 14px;">{{ product.name }}</p>
        </b-tooltip>
        <p style="font-size: 14px;" v-else>{{ product.name }}</p>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <p style="font-size: 14px;">€ {{ product.price }}</p>
      </div>
      <div class="level-item">
        <b-button style="font-size: 14px;" @click="navigate" type="is-text">Info</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
  data() {
    return {
      color: "is-info",
    };
  },
  methods: {
    navigate() {
      this.$router.push({
        name: "UpdateProduct",
        params: { id: this.product.id },
      });
    },
  },
};
</script>

<style>
#productBox {
  border: 0.1px solid #f1f2f6;
  background: #ffffff;
  margin-bottom: 5px;  
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
