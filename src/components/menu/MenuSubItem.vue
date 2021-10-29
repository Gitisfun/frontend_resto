<template>
  <div class="columns">
    <div class="column is-4">
      <p id="submenu-box-title">{{ title }}</p>
    </div>
    <div class="column is-4"></div>
    <div class="column is-4">
      <Icon @clicked="add" style="margin-left: 20px;" icon="plus" size="is-small" type="is-success" />
      <Icon @clicked="edit" style="margin-left: 15px;" icon="lead-pencil" size="is-small" type="is-warning" />
      <Icon @clicked="remove" style="margin-left: 15px;" icon="close-thick" size="is-small" type="is-danger" />
    </div>
  </div>
</template>

<script>
import Icon from "../../components/general/Icon";

export default {
  name: "MenuSubItem",
  props: {
    id: Number,
    title: String,
  },
  components: {
    Icon,
  },
  methods: {
    add() {
      this.$emit("addMenuItem", this.id);
    },
    edit() {
      this.$emit("editSubMenuItem", this.id);
    },
    remove() {
      this.$emit("removeSubmenu", this.id);
    },
  },
};
</script>

<style scoped>
#submenu-box-title {
  font-size: 18px;
  color: black;
  font-weight: 700;
}
</style>
