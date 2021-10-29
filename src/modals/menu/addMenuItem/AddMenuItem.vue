<template>
  <div id="productBox2" class="level">
    <div class="level-left">
      <div class="level-item">
        <b-tooltip :label="product.description" type="is-info" position="is-right">
          <p>{{ product.name }}</p>
        </b-tooltip>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <p>€ {{ product.price }}</p>
      </div>
      <div class="level-item">
        <Icon @clicked="add" style="margin-left: 0px;" icon="plus" size="is-small" type="is-success" />
        <!--
        <b-button @click="add" type="is-success" size="is-small">Toevoegen</b-button>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../../components/general/Icon";

export default {
  name: "Product",
  props: {
    product: Object,
  },
  components: {
    Icon,
  },
  data() {
    return {
      color: "is-info",
    };
  },
  methods: {
    add() {
      this.$emit("add", this.product);
    },
  },
};
</script>

<style>
#productBox2 {
  margin-bottom: -7px;
}
</style>
