<template>
  <!--
  <div id="staff-item-box" class="columns is-vcentered">
    <div class="column is-2">
      <div id="tag-role" class="has-text-bold" :style="`background:${color};`">
        {{ role }}
      </div>
    </div>
    <div class="column is-9">
      <p>{{ name }}</p>
    </div>
    <div class="column">
      <InfoButton text="Details" @clicked="update" />
    </div>
  </div>
  -->
  <div id="staff-item-box" class="box level">
    <div class="level-left">
      <div class="level-item">
        <div id="tag-role" class="has-text-bold" :style="`background:${color};`">
          {{ role }}
        </div>
      </div>
      <div class="level-item">
        <p style="font-weight: 600; margin-left: 25px">{{ name }}</p>
      </div>
    </div>
    <div class="level-right">
      <InfoButton text="Details" @clicked="update" />
    </div>
  </div>
</template>

<script>
import InfoButton from "../buttons/InfoButton";

export default {
  name: "StaffItem",
  components: {
    InfoButton,
  },
  props: {
    name: String,
    role: String,
    color: String,
  },
  methods: {
    update() {
      this.$emit("update");
    },
  },
};
</script>

<style>
#staff-item-box {
  border: 0.1px solid #f5f6fa;
}
#tag-role {
  border-radius: 5px 5px 5px 5px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  width: 120px;
  text-align: center;
  padding: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
