<template>
  <!-- <div class="box"> -->
  <div>
    <div class="columns">
      <div class="column is-4">
        <p style="font-size: 16px; font-weight: 700;">Producten</p>
      </div>
      <div class="column is-3">
        <b-datepicker :max-date="getEndDate" size="is-small" v-model="getStartDate" show-week-number :locale="locale" placeholder="Click to select..." icon="calendar-today" trap-focus> </b-datepicker>
      </div>
      <div class="column is-3">
        <b-datepicker :min-date="getStartDate" size="is-small" v-model="getEndDate" show-week-number :locale="locale" placeholder="Click to select..." icon="calendar-today" trap-focus> </b-datepicker>
      </div>
      <div class="column is-2">
        <InfoButton text="Herladen" @clicked="reload" />
      </div>
    </div>
    <apexchart ref="barchart" type="bar" height="300" :options="options.chartOptions" :series="options.series"></apexchart>
  </div>
</template>

<script>
import { getAll } from "../../api/apiCalls";
import { getSoldProductsForPeriod } from "../../api/routes/statistics";
import bar from "../../logic/charts/bar";
import InfoButton from "../../components/buttons/InfoButton";
import dateHelper from "../../logic/dateHelper.js";

export default {
  name: "BarChart",
  components: {
    InfoButton,
  },
  data() {
    return {
      firstLoad: true,
      startDate: null,
      endDate: null,
      showWeekNumber: false,
      locale: "en-GB",
      options: {},
    };
  },
  computed: {
    getStartDate: {
      get: function() {
        if (this.startDate == null) {
          return dateHelper.getFirstDayOfCurrentMonth();
        }
        return this.startDate;
      },
      set: function(val) {
        this.startDate = val;
      },
    },
    getEndDate: {
      get: function() {
        if (this.endDate == null) {
          return dateHelper.getLastDayOfCurrentMonth();
        }
        return this.endDate;
      },
      set: function(val) {
        this.endDate = val;
      },
    },
  },
  created() {
    this.options = bar;
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAll(
        getSoldProductsForPeriod,
        { startDate: dateHelper.formatStartDateToTimestamp(this.getStartDate), endDate: dateHelper.formatEndDateToTimestamp(this.getEndDate) },
        (res) => {
          let tempKeys = [];
          let tempValues = [];
          for (let i = 0; i < res.data.length; i++) {
            tempKeys.push(res.data[i].name);
            tempValues.push(res.data[i].total);
          }
          this.options.series[0].data = tempValues;
          this.options.chartOptions.xaxis.categories = tempKeys;
          if (!this.firstLoad) {
            this.$refs.barchart.refresh();
          }
          this.firstLoad = false;
        },
        this
      );
    },
    reload() {
      this.fetchData();
    },
  },
};
</script>
