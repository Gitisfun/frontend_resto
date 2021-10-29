<template>
  <div id="opening-hour-header-box">
    <div class="columns">
      <div class="column">
        <p class="openinghours-headers">Dagen</p>
      </div>
      <div class="column">
        <p class="openinghours-headers">Openingsuur</p>
      </div>
      <div class="column">
        <p class="openinghours-headers">Sluitingsuur</p>
      </div>
      <div class="column">
        <p class="openinghours-headers">Start middagpauze</p>
      </div>
      <div class="column">
        <p class="openinghours-headers">Einde middagpauze</p>
      </div>
      <div class="column">
        <p class="openinghours-headers">Open/Gesloten</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpeninghourHeader",
};
</script>

<style>
.openinghours-headers {
  font-size: 16px;
  text-align: center;
  padding: 10px;
  font-weight: 700;
}

.openinghours-days {
  font-size: 16px;
  font-weight: 300;
}

#opening-hour-header-box {
  margin: 0px;
}
</style>
