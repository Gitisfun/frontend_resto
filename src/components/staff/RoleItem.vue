<template>
  <div id="role-item-box" class="box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 style="font-weight: 600">{{ name }}</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <InfoButton text="Details" @clicked="update" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoButton from "../buttons/InfoButton";

export default {
  name: "RoleItem",
  components: {
    InfoButton,
  },
  props: {
    name: String,
  },
  methods: {
    update() {
      this.$emit("update");
    },
  },
};
</script>

<style>
#role-item-box {
  border: 0.1px solid #f5f6fa;
}
</style>
