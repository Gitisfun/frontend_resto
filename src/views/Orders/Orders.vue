<template>
  <div>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <div v-if="isModern == 0">
      <div class="ordersbox">
        <div class="columns is-multiline">
          <div v-for="item in ordersCompletedList" :key="item.id" class="column is-4">
            <OrderItem :isInfo="false" @notifyChange="notify" :order="item" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isModern == 1">
      <div class="ordersbox">
        <div class="columns">
          <div class="column is-6">
            <b>
              Nieuwe bestellingen
            </b>
            <p style="margin-bottom: 15px"></p>
            <div class="columns is-multiline">
              <div v-for="item in ordersNewList" :key="item.id" class="column is-6">
                <OrderItem :isInfo="false" @notifyChange="notify" :order="item" />
              </div>
            </div>
            <NoOrdersYet v-if="ordersNewList.length == 0" text="Wachten op nieuwe bestellingen..." />
            <LoadMore v-if="isLoadMoreVisible(newOrders)" @clicked="loadMoreNewOrders(newOrders)" text="Laad meer bestellingen..." />
          </div>
          <div class="column is-3">
            <b>
              In behandeling
            </b>
            <p style="margin-bottom: 15px"></p>
            <OrderItem :isInfo="false" @notifyChange="notify" v-for="item in ordersInTreatmentList" :key="item.id" :order="item" />
            <NoOrdersYet v-if="ordersInTreatmentList.length == 0" text="Geen bestellingen in behandeling..." />
            <LoadMore v-if="isLoadMoreVisible(treatmentOrders)" @clicked="loadMoreNewOrders(treatmentOrders)" text="Laad meer bestellingen..." />
          </div>
          <div class="column is-3">
            <b>
              Afgehandeld
            </b>
            <p style="margin-bottom: 15px"></p>
            <OrderItem :isInfo="false" @notifyChange="notify" v-for="item in ordersCompletedList" :key="item.id" :order="item" />
            <NoOrdersYet v-if="ordersCompletedList.length == 0" text="Wachten op nieuwe bestellingen..." />
            <LoadMore v-if="isLoadMoreVisible(completedOrders)" @clicked="loadMoreNewOrders(completedOrders)" text="Laad meer bestellingen..." />
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="printOrder">
      <PrintOrder :order.sync="currentOrder" />
    </div> -->
  </div>
</template>

<script>
import io from "socket.io-client";
import { listenForNotifications, listenForNotificationsWithData } from "../../logic/sockets/socketManager.js";
import store from "../../store";

import { getMultipleWithLoading } from "../../api/apiCalls";
import { getAllOrders } from "../../api/routes/orders";
import { getSetting } from "../../api/routes/settings";

import OrderItem from "../../components/orders/OrderItem";
import NoOrdersYet from "../../components/orders/NoOrdersYet";
import LoadMore from "../../components/general/LoadMore";
import printJS from "print-js";
// import PrintOrder from "../../components/orders/PrintOrder"

export default {
  name: "Orders",
  components: {
    OrderItem,
    NoOrdersYet,
    LoadMore,
    // PrintOrder
  },
  data() {
    return {
      currentOrder: {
        order_nr: "",
        list: [],
      },
      isModern: null,
      isLoading: true,
      socket: null,
      search: "",
      page: 1,
      limit: 10,
      newOrders: {
        page: 1,
        status: 1,
        limit: 6,
        total: 0,
      },
      treatmentOrders: {
        page: 1,
        status: 2,
        limit: 3,
        total: 0,
      },
      completedOrders: {
        page: 1,
        status: 3,
        limit: 3,
        total: 0,
      },
      ordersNewList: [],
      ordersInTreatmentList: [],
      ordersCompletedList: [],
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");
  },
  mounted() {
    listenForNotifications(this.socket, "orders", this.fetchData);
    listenForNotificationsWithData(this.socket, "print", (data) => {
      this.currentOrder = data

      setTimeout(function() {
        printJS({printable: data.list, properties: ['product', 'quantity'],header: `<h3>Bestelling ${data.order_nr} voor ${data.table_name} op ${data.dateOfPlacement}</h3>`, type: 'json'})
      }, 2000);
    });
    this.fetchData();
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      getMultipleWithLoading(
        [
          getAllOrders({ status: this.newOrders.status, search: this.search, page: this.newOrders.page, limit: this.newOrders.limit }),
          getAllOrders({ status: this.treatmentOrders.status, search: this.search, page: this.treatmentOrders.page, limit: this.treatmentOrders.limit }),
          getAllOrders({ status: this.completedOrders.status, search: this.search, page: this.completedOrders.page, limit: this.completedOrders.limit }),
          getSetting(store.getters.getUser.horeca_id),
        ],
        (res) => {
          this.ordersNewList = res[0].data.results;
          this.ordersInTreatmentList = res[1].data.results;
          this.ordersCompletedList = res[2].data.results;
          this.newOrders.total = res[0].data.total;
          this.treatmentOrders.total = res[1].data.total;
          this.completedOrders.total = res[2].data.total;
          this.isModern = res[3].data[0].isModern;
          this.isLoading = false;
        },
        this,
        this.isLoading
      );
    },
    loadMoreNewOrders(orderCategory) {
      if (orderCategory.limit < orderCategory.total) {
        orderCategory.limit += 4;
        this.fetchData();
      }
    },
    isLoadMoreVisible(orderCategory) {
      if (orderCategory.limit < orderCategory.total) {
        return true;
      }
      return false;
    },
    notify() {
      this.socket = io("http://localhost:5000/");
      listenForNotifications(this.socket, "orders", this.fetchData);
      this.socket.emit("orders");
    },
  },
};
</script>

<style>
.ordersbox {
  padding-top: 20px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 100%;
  border-radius: 5px 0px 0px 0px;
  /* background-image: linear-gradient(to bottom, #ecf0f1 0%, #ecf0f1 100%); */
  background: #c7ecee;

  /* background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%); */
}
</style>
