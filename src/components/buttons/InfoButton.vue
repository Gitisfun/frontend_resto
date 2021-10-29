<template>
  <p id="info-button" @click="clicked" onselectstart="return false">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "InfoButton",
  props: {
    text: String,
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style>
#info-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #48dbfb;
  font-size: 10px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-right: 15px;
  padding-left: 15px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
/*
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;*/
  cursor: pointer;
}
#info-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 10px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-right: 15px;
  padding-left: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
#info-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 10px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-right: 15px;
  padding-left: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
</style>
