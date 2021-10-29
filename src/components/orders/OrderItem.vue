<template>
  <div onselectstart="return false" :id="cssStyle" @click="clicked" class="box">
    <div style="margin-top: 10px">
      <p onselectstart="return false" class="order-item-text-info" style="margin-top: -15px; font-weight: 900">
        <span style="font-size: 12px; font-weight: 800;">
          Bestelling: {{ order.order_nr }}
        </span>
        <span :style="`border: 0.1px solid #1B1464; border-radius: 0px 5px 5px 0px; background: #1B1464 ; padding: 2px 9px 2px 9px; font-weight: 900; color: white; float:right;`"> {{ order.table_name }} </span>
        <span
          :style="`border: 0.1px solid ${occupiedTimeColor(order.ordered_time)}; border-radius: 5px 0px 0px 5px; background: ${occupiedTimeColor(order.ordered_time)}; padding: 2px 5px 2px 9px; font-weight: 900; color: white; float:right;`"
          v-if="order.status == 1"
          >{{ order.ordered_time | occupiedTime }}
        </span>
        <span :style="`border: 0.1px solid #ffffff; border-radius: 5px 0px 0px 5px; background: white; padding: 2px 5px 2px 9px; font-weight: 900; color: ${occupiedTimeColor(order.treatment_time)}; float:right;`" v-if="order.status == 2"
          >{{ order.treatment_time | occupiedTime }}
        </span>
        <span :style="isPaidColor(order.isPaid, order.status)" v-if="order.status == 3">Niet betaald</span>
        <span :style="isPaidColor(order.isPaid, order.status)" v-if="order.status == 4">Wilt betalen</span>
        <span :style="isPaidColor(order.isPaid, order.status)" v-if="order.status == 5">Bezig: {{ order.payment_request_time | occupiedTime }}</span>
        <span :style="isPaidColor(order.isPaid, order.status)" v-if="order.status == 6">Betaald</span>
      </p>
    </div>
    <div>
      <p class="order-item-text-info" style="margin-top: 15px;">
        <!-- <span onselectstart="return false" class="order-item-text-info" style="color: #EA2027" v-if="order.status == 1">Nieuwe bestelling</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #1B1464" v-if="order.status == 2">In behandeling door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 3">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 4">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 6">Wordt afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 5 && order.cash == 1">Betaling behandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 5 && order.cash == 0">Met bankkaart betaald</span> -->
        <span onselectstart="return false" class="order-item-text-info" style="color: grey; font-style: italic;" v-if="order.description">{{ order.description }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: grey; font-style: italic;" v-else>Geen beschrijving</span>
        <span style="float:right;">Geplaatst om {{ order.ordered_time | timeFormatter }}</span>
        <!-- <span v-if="order.status == 2" style="float:right;">In behandeling sinds {{ order.treatment_time | timeFormatter }}</span>
        <span v-if="order.status == 3" style="float:right;">Afgehandeld om {{ order.completed_time | timeFormatter }}</span>
        <span v-if="order.status == 4" style="float:right;">Aangevraagd om {{ order.payment_request_time | timeFormatter }}</span>
        <span v-if="order.status == 5" style="float:right;">Aangevraagd om {{ order.payment_request_time | timeFormatter }}</span>
        <span v-if="order.status == 6" style="float:right;">Afgehandeld om {{ order.payment_time | timeFormatter }}</span> -->
      </p>
    </div>
    <div>
      <p class="order-item-text-info" style="margin-top: 5px;">
        <span onselectstart="return false" class="order-item-text-info" style="color: #EA2027" v-if="order.status == 1">Nieuwe bestelling</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #1B1464" v-if="order.status == 2">In behandeling door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 3 && order.completed_time != null">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 3 && order.completed_time == null">...</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 4">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 5">Wordt afgehandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 6 && order.cash != 0">Betaling behandeld door {{ order.firstname }} {{ order.lastname }}</span>
        <span onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 6 && order.cash == 0">Elektronisch betaald</span>

        <span style="float:right;">{{ order.ordered_time | dateFormatter }}</span>
        <!-- <span v-if="order.status == 2" style="float:right;">{{ order.treatment_time | dateFormatter }}</span>
        <span v-if="order.status == 3" style="float:right;">{{ order.completed_time | dateFormatter }}</span>
        <span v-if="order.status == 4" style="float:right;">{{ order.payment_request_time | dateFormatter }}</span>
        <span v-if="order.status == 5" style="float:right;">{{ order.payment_request_time | dateFormatter }}</span>
        <span v-if="order.status == 6" style="float:right;">{{ order.payment_time | dateFormatter }}</span> -->
      </p>
    </div>
    <!-- <p onselectstart="return false" class="order-item-text-info" style="margin-top: -15px; font-weight: 900">{{ order.table_name }}</p> -->

    <!-- <p onselectstart="return false" class="order-item-text-info" style="color: grey; font-style: italic;" v-if="order.description">{{ order.description }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: grey; font-style: italic;" v-else>Geen beschrijving</p> -->

    <!-- <p onselectstart="return false" class="order-item-text-info" style="color: #EA2027" v-if="order.status == 1">Nieuwe bestelling</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #1B1464" v-if="order.status == 2">In behandeling door {{ order.firstname }} {{ order.lastname }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 3">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 4">Afgehandeld door {{ order.firstname }} {{ order.lastname }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 6">Wordt afgehandeld door {{ order.firstname }} {{ order.lastname }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 5 && order.cash == 1">Betaling behandeld door {{ order.firstname }} {{ order.lastname }}</p>
    <p onselectstart="return false" class="order-item-text-info" style="color: #20bf6b;" v-if="order.status == 5 && order.cash == 0">Met bankkaart betaald</p> -->

    <div>
      <p class="order-item-text-info" style="font-weight: 700; text-align:left; margin-top: 15px">
        Totaal
        <span v-if="order.status == 1" style="border: 0.1px solid #2ecc71; border-radius: 3px; background: #2ecc71; padding: 2px 7px 2px 7px;font-weight: 900; color: white; float:right;"> € {{ order.total }} </span>
        <span v-if="order.status == 2" style="border: 0.1px solid #ffffff; border-radius: 3px; background: white; padding: 2px 7px 2px 7px;font-weight: 900; color: #2ecc71; float:right;"> € {{ order.total }} </span>
        <span v-if="order.status == 3" style="border: 0.1px solid #2ecc71; border-radius: 3px; background: white; padding: 2px 7px 2px 7px;font-weight: 900; color: #2ecc71; float:right;"> € {{ order.total }} </span>
        <span v-if="order.status == 4" style="border: 0.1px solid #2ecc71; border-radius: 3px; background: white; padding: 2px 7px 2px 7px;font-weight: 900; color: #2ecc71; float:right;"> € {{ order.total }} </span>
        <span v-if="order.status == 5" style="border: 0.1px solid #2ecc71; border-radius: 3px; background: white; padding: 2px 7px 2px 7px;font-weight: 900; color: #2ecc71; float:right;"> € {{ order.total }} </span>
        <span v-if="order.status == 6" style="border: 0.1px solid #2ecc71; border-radius: 3px; background: white; padding: 2px 7px 2px 7px;font-weight: 900; color: #2ecc71; float:right;"> € {{ order.total }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import OrderDetailsModal from "../../modals/orders/OrderDetailsModal";
import { showOrderDetailsModal } from "../../logic/modals/modals";

export default {
  name: "OrderItem",
  components: {},
  props: {
    order: Object,
    isInfo: Boolean,
  },
  computed: {
    cssStyle: function() {
      if (this.order.status == 1) {
        return "order-item-box";
      } else if (this.order.status == 2) {
        return "order-item-treatment-box";
      } else {
        return "order-item-completed-box";
      }
    },
  },
  filters: {
    timeFormatter(time) {
      if (time == null) {
        return "...";
      }
      return moment(time).format("HH:mm");
    },
    dateFormatter(date) {
      if (date == null) {
        return "...";
      }
      return moment(date).format("DD/MM/YYYY");
    },
    occupiedTime(time) {
      if (time != null) {
        let now = moment();
        let minutes = now.diff(moment(time), "minutes");
        if (minutes < 0) {
          return "";
        }
        if (minutes < 60) {
          if (minutes === 0) {
            return "1 min";
          }
          return `${minutes} min`;
        }

        let hours = Math.floor(minutes / 60);
        let min = minutes % (hours * 60);
        return `${hours} u ${min} min`;
      }
      return "";
    },
  },
  methods: {
    clicked() {
      showOrderDetailsModal(this, OrderDetailsModal, this.order, this.isInfo, () => {
        this.$emit("notifyChange");
      });
    },
    occupiedTimeColor(time) {
      if (time != null) {
        let now = moment();
        let minutes = now.diff(moment(time), "minutes");
        let hours = Math.floor(minutes / 60);
        if (hours > 0) {
          return "#e84118";
        } else if (minutes <= 5) {
          return "#26de81";
        } else if (5 < minutes && minutes < 10) {
          return "#fed330";
        } else if (10 <= minutes && minutes < 15) {
          return "#fd9644";
        } else if (15 < minutes && minutes <= 30) {
          return "#fa8231";
        } else {
          return "#ff4d4d";
        }
      }
      return "";
    },
    isPaidColor(isPaid, status) {
      if (isPaid == 0 && status == 3) {
        return `border: 0.1px solid #EA2027; border-radius: 5px 0px 0px 5px; background: white; padding: 2px 5px 2px 9px; font-weight: 900; color: #EA2027; float:right;`;
      } else if (isPaid == 0 && status == 4) {
        return `border: 0.1px solid #f0932b; border-radius: 5px 0px 0px 5px; background: white; padding: 2px 5px 2px 9px; font-weight: 900; color: #f0932b; float:right;`;
      } else if (status == 5) {
        return `border: 0.1px solid #4cd137; border-radius: 5px 0px 0px 5px; background: white; padding: 2px 5px 2px 9px; font-weight: 900; color: #4cd137; float:right;`;
      } else {
        return `border: 0.1px solid #4cd137; border-radius: 5px 0px 0px 5px; background: #4cd137; padding: 2px 5px 2px 9px; font-weight: 900; color: white; float:right;`;
      }
    },
  },
};
</script>

<style>
/* General - For all styles*/
#order-item-text-title {
  font-size: 12px;
  font-weight: 800;
  /* color: white; */
}
.order-item-text-info {
  font-size: 10px;
  margin-bottom: 5px;
  font-weight: 600;

  /* color:white; */
  color: #2c3e50;
}

/*
#order-item-text-title {
  font-size: 14px;
  font-weight: 800;
}
.order-item-text-info {
  font-size: 12px;
  margin-bottom: 5px;
  color: #34495e
  color: geen
}
*/

/* New */
#order-item-box {
  border: 0.1px solid #f1f2f6;
  background: white;
}
#order-item-box:active {
  border: 0.1px solid #f1f2f6;
  background: #dff9fb;
}
#order-item-box:hover {
  border: 0.1px solid #f1f2f6;
  cursor: pointer;
}

/* Treatment */
#order-item-treatment-box {
  border: 0.1px solid #ff9f43;
  background: #ff9f43;
  /* 
  130f40
  5f27cd
  40407a
   */
}
#order-item-treatment-box:active {
  border: 0.1px solid #ff9f43;
  background: #dff9fb;
}
#order-item-treatment-box:hover {
  border: 0.1px solid #ff9f43;
  cursor: pointer;
}
.order-item-text-info-light {
  color: white;
}

/* Completed */
#order-item-completed-box {
  border: 0.1px solid white;
  background: white;
}
#order-item-completed-box:active {
  border: 0.1px solid white;
  background: #dff9fb;
}
#order-item-completed-box:hover {
  border: 0.1px solid white;
  cursor: pointer;
  /*20bf6b*/
}
</style>
