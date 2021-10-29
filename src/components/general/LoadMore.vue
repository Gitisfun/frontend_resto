<template>
  <div @click="clicked" class="box" id="load-more-item-box" onselectstart="return false">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "NoOrdersYet",
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
#load-more-item-box {
  border: 0.5px solid #ffffff;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  color: #34495e;
}
#load-more-item-box:hover {
  border: 0.5px solid #bdc3c7;
  font-weight: 600;
  font-size: 12px;
  background: #bdc3c7;
  cursor: pointer;
  color: white;
}

#load-more-item-box:active {
  border: 0.5px solid #ecf0f1;
  font-weight: 600;
  font-size: 12px;
  background: #ecf0f1;
  cursor: pointer;
  color: white;
}
</style>
