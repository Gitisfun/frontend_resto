<template>
  <div id="opening-hour-row-box">
    <div class="columns">
      <div class="column">
        <p>{{ opening_day.day }}</p>
      </div>
      <div class="column">
        <b-clockpicker v-model="opening_day.open_at" :disabled="isClosed" size="is-small" placeholder="..." icon="clock" :hour-format="hourFormat" :locale="locale"> </b-clockpicker>
      </div>
      <div class="column">
        <b-clockpicker v-model="opening_day.closed_at" :disabled="isClosed" size="is-small" placeholder="..." icon="clock" :hour-format="hourFormat" :locale="locale"> </b-clockpicker>
      </div>
      <div class="column">
        <b-clockpicker v-model="opening_day.start_break" :min-time="opening_day.open_at" :max-time="opening_day.closed_at" :disabled="isClosed" size="is-small" placeholder="..." icon="clock" :hour-format="hourFormat" :locale="locale">
        </b-clockpicker>
      </div>
      <div class="column">
        <b-clockpicker v-model="opening_day.end_break" :min-time="opening_day.start_break" :max-time="opening_day.closed_at" :disabled="isClosed" size="is-small" placeholder="..." icon="clock" :hour-format="hourFormat" :locale="locale">
        </b-clockpicker>
      </div>
      <div class="column">
        <p :id="btnStyle" @click="clicked" onselectstart="return false">
          {{ btnText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OpeninghourRow",
  props: {
    opening_day: Object,
  },
  data() {
    return {
      hourFormat: "24", // Browser locale
      locale: undefined, // Browser locale
    };
  },
  computed: {
    isClosed() {
      return !this.opening_day.isOpen;
    },
    btnStyle() {
      if (this.opening_day.isOpen) {
        return "add-button-positive";
      }
      return "add-button-negative";
    },
    btnText() {
      if (this.opening_day.isOpen) {
        return "Open";
      }
      return "Gesloten";
    },
  },
  methods: {
    clicked() {
      this.opening_day.isOpen = !this.opening_day.isOpen;
      if (!this.opening_day.isOpen) {
        this.opening_day.open_at = null;
        this.opening_day.closed_at = null;
        this.opening_day.start_break = null;
        this.opening_day.end_break = null;
      }
    },
  },
};
</script>

<style>
#opening-hour-row-box {
  margin: 0px;
}

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
  cursor: pointer;
}
</style>
