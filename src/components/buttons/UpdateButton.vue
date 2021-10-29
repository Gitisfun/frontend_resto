<template>
  <p id="update-button" @click="clicked" onselectstart="return false">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "UpdateButton",
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
#update-button {
  border-radius: 5px 5px 5px 5px;
  color: black;
  font-size: 12px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  text-decoration: underline;

  /*
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;*/
  cursor: pointer;
}
#update-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 12px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
#update-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 12px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
</style>
