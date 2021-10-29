<template>
  <p id="small-box-title">{{title}}</p>
</template>

<script>
export default {
    name: "SmallBoxTitle",
    props: {
        title: String
    }
}
</script>

<style scoped>
#small-box-title{
  font-size: 18px;
  color: black;
  font-weight: 700;
  margin-bottom: 15px;
}
</style>