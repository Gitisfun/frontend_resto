<template>
  <span style="cursor: pointer; " @mouseenter="entered" @mouseleave="left" @click="clicked">
    <b-icon :icon="icon" :size="size" :type="tempType"> </b-icon>
  </span>
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: String,
    size: String,
    type: String,
  },
  data() {
    return {
      tempType: "",
      backupType: "",
    };
  },
  created() {
    this.tempType = this.type;
  },
  methods: {
    entered() {
      this.backupType = this.tempType;
      this.tempType = "is-dark";
    },
    left() {
      this.tempType = this.backupType;
    },
    clicked() {
      this.tempType = "is-grey"
      this.$emit("clicked")
    },
  },
};
</script>

<style></style>
