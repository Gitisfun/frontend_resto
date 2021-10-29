<template>
  <div style="color: #c7ecee">
    <div style="border-style-bottom: dashed" class="columns">
      <div class="column">
        <p class="modal-order-item-text-title">Bestelling: {{ order.order_nr }}</p>
        <!-- <p class="modal-order-item-text-info" style="font-weight: 800">{{ order.order_nr }}</p> -->
        <p v-if="order.description" class="modal-order-item-text-info"><i>Mededeling: </i>{{ order.description }}</p>
        <p v-else class="modal-order-item-text-info"><i>Mededeling: </i>Geen</p>
      </div>
      <div class="column">
        <p class="modal-order-item-text-title" style="text-align: right">{{ order.table_name }}</p>
        <p class="modal-order-item-text-info" style="text-align: right">Geplaatst om {{ order.ordered_time | timeFormatter }}</p>
        <p class="modal-order-item-text-info" style="text-align: right">{{ order.ordered_time | dateFormatter }}</p>
      </div>
    </div>
    <div v-for="item in order.list" :key="item.id" style="margin-bottom: 2px">
      <PrintOrderProductItem :orderLine="item" />
    </div>
    <p style="text-align: right; margin-top: 20px;">
      <b style="margin-right: 25px">Totaal: </b><span style="font-weight: 500; color: #c7ecee">€ {{ order.total }}</span>
    </p>
  </div>
</template>

<script>
import PrintOrderProductItem from "../../components/orders/PrintOrderProductItem";
import moment from "moment";

export default {
  name: "PrintOrder",
  components: {
      PrintOrderProductItem
  },
  props: {
    order: Object,
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
  },
};
</script>

<style>
.modal-order-item-text-title {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 15px;
}

.modal-order-item-text-info {
  font-size: 16px;
  margin-bottom: 5px;
}

.left {
  margin-right: auto;

  padding: 1em;
  background-color: #c7ecee;
}

.right {
  padding: 1em;
  background-color: #c7ecee;
}

.parent {
  display: flex;
  overflow: hidden;
  margin: 1em 0;
  color: #fff;
  border: 1px solid #c7ecee;
  align-items: center;
}
</style>