<template>
  <p :id="btnStyle" @click="clicked" onselectstart="return false">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "OrderDetailButton",
  props: {
    text: String,
    status: Number,
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
  computed: {
    btnStyle() {
      if (this.status == 1 || this.status == 4) {
        return "treat-button";
      } else if (this.status == -1) {
        return "delete-order-button";
      } else if (this.status == 9) {
        return "print-button";
      } else {
        return "complete-button";
      }
    },
  },
};
</script>

<style>
#treat-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #48dbfb;
  font-size: 11px;
  font-weight: 500;
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
#delete-order-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ea2027;
  font-size: 11px;
  font-weight: 500;
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
#print-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #34495e;
  font-size: 11px;
  font-weight: 500;
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

#print-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 11px;
  font-weight: 500;
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
#print-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 11px;
  font-weight: 500;
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

#complete-button {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: green;
  font-size: 11px;
  font-weight: 500;
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
#complete-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 11px;
  font-weight: 500;
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
#complete-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 11px;
  font-weight: 500;
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
#treat-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 11px;
  font-weight: 500;
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
#treat-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 11px;
  font-weight: 500;
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

#delete-order-button:hover {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #75a5b1c2;
  font-size: 11px;
  font-weight: 500;
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
#delete-order-button:active {
  border-radius: 5px 5px 5px 5px;
  color: white;
  background: #ffcccc;
  font-size: 11px;
  font-weight: 500;
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
