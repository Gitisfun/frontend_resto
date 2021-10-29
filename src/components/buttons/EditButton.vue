<template>
  <p v-if="authenticator(102)" v-show="isVisible" id="edit-button" @click="clicked" onselectstart="return false">
    {{ text }}
  </p>
</template>

<script>
import store from "../../store"

export default {
  name: "EditButton",
  props: {
    text: String,
    isVisible: Boolean
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
    authenticator(code) {
      if (store.getters.getPermissions != null) {
        for (let i = 0; i < store.getters.getPermissions.length; i++) {
          for (let j = 0; j < store.getters.getPermissions[i].items.length; j++) {
            const element = store.getters.getPermissions[i].items[j];
            if(element.id == code && element.value){
              return true
            }
              return true;
          }
        }
      }
      return false;
    },
  },
};
</script>

<style>
#edit-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #FFC312;
  font-size: 12px;
  height: 100%;
  width: auto;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
/*
box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;*/
  cursor: pointer;
}
#edit-button:hover {
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
#edit-button:active {
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
