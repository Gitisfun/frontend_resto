<template>
  <div id="customer-tables-tab-box">
    <div v-if="tables">
      <div class="box" v-for="item in tables" :key="item.id">
        <div style="clear: both">
          <div class="alignleft">
            <p class="customer-tab-tables-title">{{ item.name }}</p>
            <p class="customer-tab-tables-text" v-if="item.max">Zitplaatsen: min {{ item.min }} - max {{ item.max }}</p>
            <p class="customer-tab-tables-text" v-else>Zitplaatsen: min {{ item.min }}</p>
          </div>
          <p class="alignright customer-tab-tables-status-available" v-if="getOccupyStatus(item.occupy_time) == 1">Vrij</p>
          <p class="alignright customer-tab-tables-status-occupied-very-short" v-if="getOccupyStatus(item.occupy_time) == 4">
            {{ item.occupy_time | occupiedTime }}
          </p>
          <p class="alignright customer-tab-tables-status-occupied-short" v-if="getOccupyStatus(item.occupy_time) == 2">
            {{ item.occupy_time | occupiedTime }}
          </p>
          <p class="alignright customer-tab-tables-status-occupied-long" v-if="getOccupyStatus(item.occupy_time) == 3">
            {{ item.occupy_time | occupiedTime }}
          </p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CustomerTableTab",
  props: {
    tables: Array,
  },
  methods: {
    getOccupyStatus(time) {
      if (time != null) {
        const temp = moment(time);
        let now = moment();

        const difference = now.diff(temp, "minutes");
        let hours = Math.floor(difference / 60);
        if (hours >= 2) {
          return 1;
        }
        if (difference < 20) {
          return 4;
        } else if (difference < 45) {
          return 2;
        } else {
          return 3;
        }
      } else return 1;
    },
  },
  filters: {
    occupiedTime(time) {
      if (time != null) {
        let now = moment();
        let minutes = now.diff(moment(time), "minutes");
        if (minutes < 60) {
          if (minutes === 0) {
            return "1 min";
          }
          return `${minutes} min`;
        }

        let hours = Math.floor(minutes / 60);
        let min = minutes % (hours * 60);
        if (hours >= 2) {
          return "Vrij";
        }
        return `${hours} u ${min} min`;
      }
      return "";
    },
  },
};
</script>

<style scoped>
#customer-tables-tab-box {
  margin-bottom: 500px;
}
.customer-tab-tables-title {
  font-weight: 700;
  font-size: 16px;
}

.customer-tab-tables-text {
  font-weight: 300;
  font-size: 14px;
}

.customer-tab-tables-status-occupied-very-short {
  color: #fed330;
  vertical-align: middle;
  font-weight: 500;
  font-size: 16px;
  line-height: 45px;
}

.customer-tab-tables-status-available {
  color: green;
  vertical-align: middle;
  font-weight: 500;
  font-size: 16px;
  line-height: 45px;
}

.customer-tab-tables-status-occupied-short {
  color: orange;
  vertical-align: middle;
  font-weight: 500;
  font-size: 16px;
  line-height: 45px;
}

.customer-tab-tables-status-occupied-long {
  color: red;
  vertical-align: middle;
  font-weight: 500;
  font-size: 16px;
  line-height: 45px;
}

.alignleft {
  float: left;
}
.alignright {
  float: right;
}
</style>
