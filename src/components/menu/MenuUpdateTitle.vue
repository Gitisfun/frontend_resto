<template>
  <div class="columns">
    <div class="column">
      <!--
      <h1 class="title is-2 has-text-weight-bold has-text-black">{{ title }}</h1>
      -->
      <p id="menu-update-box-title">{{ title }}</p>
    </div>
    <div class="column">
      <div class="center">
        <Icon @clicked="add" style="margin-left: 0px;" icon="plus" size="is-normal" type="is-success" />
        <Icon @clicked="edit" style="margin-left: 15px;" icon="lead-pencil" size="is-normal" type="is-warning" />
        <Icon @clicked="save" style="margin-left: 75px;" icon="content-save" size="is-normal" type="is-link" />
        <Icon v-if="authenticator(404)" @clicked="deleteMenu" style="margin-left: 15px;" icon="delete" size="is-normal" type="is-danger" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../components/general/Icon";

export default {
  name: "MenuUpdateTitle",
  props: {
    title: String,
  },
  components: {
    Icon,
  },
  methods: {
    add() {
      this.$emit("addSubmenu");
    },
    edit() {
      this.$emit("editMenuTitle");
    },
    save() {
      this.$emit("saveMenu");
    },
    deleteMenu() {
      this.$emit("deleteMenu");
    },
  },
};
</script>

<style>
.center {
  margin: auto;
  padding: 10px;
  float: right;
}
#menu-update-box-title {
  font-size: 23px;
  color: black;
  font-weight: 700;
}
</style>
