<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <Widget title="Vandaag" :total="totalOfToday" colorOne="#009432" colorTwo="#10ac84" />
      </div>
      <div class="column">
        <Widget title="Week" :total="totalOfWeek" colorOne="#b71540" colorTwo="#eb2f06" />
      </div>
      <div class="column">
        <Widget title="Maand" :total="totalOfMonth" colorOne="#0c2461" colorTwo="#1e3799" />
      </div>
      <div class="column">
        <Widget title="Jaar" :total="totalOfYear" colorOne="#EE5A24" colorTwo="#F79F1F" />
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <PieChart />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <BarChart />
        </article>
      </div>
    </div>

    <div>
      <LineChart />
    </div>
  </div>
</template>

<script>
import Widget from "../components/charts/widget";
import BarChart from "../components/charts/bar";
import LineChart from "../components/charts/line";
import PieChart from "../components/charts/pie";

import { getMultiple } from "../api/apiCalls";
import { getTotalRevenueForPeriod } from "../api/routes/statistics";

import widgets from "../logic/charts/widgets.js";

export default {
  name: "Home",
  components: {
    Widget,
    BarChart,
    LineChart,
    PieChart,
  },
  data() {
    return {
      totalOfToday: "",
      totalOfWeek: "",
      totalOfMonth: "",
      totalOfYear: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getTotalRevenueForPeriod(widgets.getTotalRevenueForDay()), getTotalRevenueForPeriod(widgets.getTotalRevenueForWeek()), getTotalRevenueForPeriod(widgets.getTotalRevenueForMonth()), getTotalRevenueForPeriod(widgets.getTotalRevenueForYear())],
        (res) => {
          this.totalOfToday = res[0].data[0].total;
          this.totalOfWeek = res[1].data[0].total;
          this.totalOfMonth = res[2].data[0].total;
          this.totalOfYear = res[3].data[0].total;
        },
        this
      );
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100%;
  padding: 25px;
  /* background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%); */
  /* background-image: linear-gradient(to bottom, #ecf0f1 0%, #ecf0f1 100%); */
  /* background: #c7ecee; */
  border-radius: 5px 0px 0px 0px;
  background: #c7ecee;
}
</style>
