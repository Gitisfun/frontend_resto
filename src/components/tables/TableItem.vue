<template>
  <div id="table-item-box" class="box level">
    <div class="level-left">
      <div class="level-item">
        <p style="font-weight: 700; margin-left: 25px; margin-right: 25px">{{ table.name }}</p>
      </div>
      <div class="level-item">
        <div id="tag-role" class="has-text-bold" style="background:#3c6382">
          Min: {{ table.min }}
        </div>
      </div>
      <div v-if="table.max != null" class="level-item">
        <div id="tag-role" class="has-text-bold" style="background:#1e3799">
          Max: {{ table.max }}
        </div>
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
  name: "TableItem",
  components: {
    InfoButton,
  },
  props: {
    table: Object,
  },
  methods: {
    update() {
      this.$emit("update");
    },
  },
};
</script>

<style>
#table-item-box {
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
