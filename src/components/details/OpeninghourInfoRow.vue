<template>
  <div id="opening-hour-row-box">
    <div class="columns">
      <div class="column">
        <p>{{ opening_day.day }}</p>
      </div>
      <div class="column">
        <p class="has-text-centered">{{ opening_day.open_at | dateFormatter }}</p>
      </div>
      <div class="column">
        <p class="has-text-centered">{{ opening_day.closed_at | dateFormatter }}</p>
      </div>
      <div class="column">
        <p class="has-text-centered">{{ opening_day.start_break | dateFormatter }}</p>
      </div>
      <div class="column">
        <p class="has-text-centered">{{ opening_day.end_break | dateFormatter }}</p>
      </div>
      <div class="column">
        <p :id="btnStyle">{{ btnText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "OpeninghourInfoRow",
  props: {
    opening_day: Object,
  },
  computed: {
    btnStyle() {
      if (this.opening_day.isOpen) {
        return "info-button-positive";
      }
      return "info-button-negative";
    },
    btnText() {
      if (this.opening_day.isOpen) {
        return "Open";
      }
      return "Gesloten";
    },
  },
  filters: {
    dateFormatter(date) {
      if (date == null) {
        return "...";
      }
      return moment(date).format("HH:mm");
    },
  },
};
</script>

<style>
#opening-hour-row-box {
  margin: 0px;
}

#info-button-positive {
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
}
#info-button-negative {
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
}
</style>
