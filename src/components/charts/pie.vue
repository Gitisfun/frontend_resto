<template>
  <!-- <div class="box"> -->
  <div>
    <div class="columns">
      <div class="column is-3">
        <p style="font-size: 16px; font-weight: 700;">Categorieën</p>
      </div>
      <div class="column is-3">
        <b-datepicker :max-date="getEndDate" size="is-small" v-model="getStartDate" show-week-number :locale="locale" placeholder="Click to select..." icon="calendar-today" trap-focus> </b-datepicker>
      </div>
      <div class="column is-3">
        <b-datepicker :min-date="getStartDate" size="is-small" v-model="getEndDate" show-week-number :locale="locale" placeholder="Click to select..." icon="calendar-today" trap-focus> </b-datepicker>
      </div>
      <div class="column is-3">
        <InfoButton text="Herladen" @clicked="reload" />
      </div>
    </div>
    <apexchart ref="donutchart" type="donut" height="350" :options="options.chartOptions" :series="options.series"></apexchart>
  </div>
</template>

<script>
import { getAll } from "../../api/apiCalls";
import { getCatgoriesAmountForPeriod } from "../../api/routes/statistics";
import pie from "../../logic/charts/pie.js";
import dateHelper from "../../logic/dateHelper.js";
import InfoButton from "../../components/buttons/InfoButton";

export default {
  name: "PieChart",
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
    this.options = pie;

    this.fetchData();
  },
  methods: {
    fetchData() {
      getAll(
        getCatgoriesAmountForPeriod,
        { startDate: dateHelper.formatStartDateToTimestamp(this.getStartDate), endDate: dateHelper.formatEndDateToTimestamp(this.getEndDate) },
        (res) => {
          let tempKeys = [];
          let tempValues = [];
          for (let i = 0; i < res.data.length; i++) {
            tempKeys.push(res.data[i].name);
            tempValues.push(Number.parseInt(res.data[i].total));
          }
          this.options.chartOptions.labels = tempKeys;
          this.options.series = tempValues;
          if (!this.firstLoad) {
            this.$refs.donutchart.refresh();
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