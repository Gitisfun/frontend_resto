<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <!--
        <h1 class="title is-6 has-text-grey">{{ title }}</h1>
        -->
        <p id="menu-item-box-title">{{ title }}</p>
      </div>
      <div class="column is-4" style="  text-align: right;">
        <!--
        <h1 class="title is-6 has-text-grey">€ {{ price }}</h1>
        -->
        <p id="menu-item-box-title">€ {{ price }}</p>
      </div>
      <div class="column is-4">
        <Icon @clicked="edit" style="margin-left: 50px;" icon="lead-pencil" size="is-small" type="is-warning" />
        <Icon @clicked="remove" style="margin-left: 15px;" icon="close-thick" size="is-small" type="is-danger" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../components/general/Icon";

export default {
  name: "MenuItem",
  props: {
    title: String,
    price: String,
  },
  components: {
    Icon,
  },
  methods: {
    edit() {
      this.$emit("editMenuitem");
    },
    remove() {
      this.$emit("removeMenuItem");
    },
  },
};
</script>

<style>
#menu-item-box-title {
  font-size: 15px;
  color: black;
  font-weight: 300;
}
</style>
