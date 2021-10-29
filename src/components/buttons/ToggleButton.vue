<template>
  <p :id="btnStyle" @click="clicked" onselectstart="return false">
    {{ btnText }}
  </p>
</template>

<script>
export default {
  name: "ToggleButton",
  data() {
    return {
      isActive: true,
    };
  },
  computed: {
    btnStyle() {
      if (this.isActive) {
        return "add-button-positive";
      }
      return "add-button-negative";
    },
    btnText() {
      if (this.isActive) {
        return "Open";
      }
      return "Gesloten";
    },
  },
  methods: {
    clicked() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style>
#add-button-positive {
  border-radius: 2px 2px 2px 2px;
  color: white;
  background: #3ae374;
  font-size: 12px;
  width: auto;
  text-align: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  /*
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;*/
  cursor: pointer;
}
#add-button-negative {
  border-radius: 2px 2px 2px 2px;
  color: white;
  background: red;
  font-size: 12px;
  width: auto;
  text-align: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  /*
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;*/
  cursor: pointer;
}
</style>
