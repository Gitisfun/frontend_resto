<template>
  <div>
    <div v-if="$isMobile()">
      <div>Mobile</div>
    </div>
    <div class="paymentsbox">
      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
      <div class="columns">
        <div class="column is-6">
          <b>
            Nog niet betaald
          </b>
          <p style="margin-bottom: 15px"></p>
          <div class="columns is-multiline">
            <div v-for="item in ordersCompletedList" :key="item.id" class="column is-6">
              <OrderItem :isInfo="false" @notifyChange="notify" :order="item" />
            </div>
          </div>
          <NoOrdersYet v-if="ordersCompletedList.length == 0" text="Wachten op nieuwe bestellingen..." />
          <LoadMore v-if="isLoadMoreVisible(completedOrders)" @clicked="loadMoreNewOrders(completedOrders)" text="Laad meer bestellingen..." />
        </div>
        <div class="column is-3">
          <b>Klant wenst te betalen</b>
          <p style="margin-bottom: 15px"></p>
          <OrderItem :isInfo="false" @notifyChange="notify" v-for="item in ordersRequestList" :key="item.id" :order="item" />
          <NoOrdersYet v-if="ordersRequestList.length == 0" text="Wachten op aanvraag van klanten..." />
          <LoadMore v-if="isLoadMoreVisible(requestOrders)" @clicked="loadMoreNewOrders(requestOrders)" text="Laad meer bestellingen..." />
        </div>
        <div class="column is-3">
          <b>Betaald</b>
          <p style="margin-bottom: 15px"></p>
          <OrderItem :isInfo="false" @notifyChange="notify" v-for="item in ordersPaymentList" :key="item.id" :order="item" />
          <NoOrdersYet v-if="ordersPaymentList.length == 0" text="Nog geen betalingen voltooid..." />
          <LoadMore v-if="isLoadMoreVisible(paymentOrders)" @clicked="loadMoreNewOrders(paymentOrders)" text="Laad meer bestellingen..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { listenForNotifications } from "../../logic/sockets/socketManager.js";

import { getMultipleWithLoading } from "../../api/apiCalls";
import { getAllOrders } from "../../api/routes/orders";

import OrderItem from "../../components/orders/OrderItem";
import NoOrdersYet from "../../components/orders/NoOrdersYet";
import LoadMore from "../../components/general/LoadMore";

export default {
  name: "Payments",
  components: {
    OrderItem,
    NoOrdersYet,
    LoadMore,
  },
  data() {
    return {
      isLoading: true,
      socket: null,
      search: "",
      page: 1,
      limit: 10,
      completedOrders: {
        page: 1,
        status: 3,
        limit: 6,
        total: 0,
      },
      requestOrders: {
        page: 1,
        status: 4,
        limit: 6,
        total: 0,
      },
      treatmentOrders: {
        page: 1,
        status: 5,
        limit: 6,
        total: 0,
      },
      paymentOrders: {
        page: 1,
        status: 6,
        limit: 6,
        total: 0,
      },
      ordersCompletedList: [],
      ordersRequestList: [],
      ordersPaymentList: [],
      ordersTreatmentList: [],
    };
  },
  created() {
    this.socket = io("http://localhost:5000/");
  },
  mounted() {
    listenForNotifications(this.socket, "orders", this.fetchData);
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
          getAllOrders({ status: this.completedOrders.status, search: this.search, page: this.completedOrders.page, limit: this.completedOrders.limit }),
          getAllOrders({ status: this.requestOrders.status, search: this.search, page: this.requestOrders.page, limit: this.requestOrders.limit }),
          getAllOrders({ status: this.treatmentOrders.status, search: this.search, page: this.treatmentOrders.page, limit: this.treatmentOrders.limit }),
          getAllOrders({ status: this.paymentOrders.status, search: this.search, page: this.paymentOrders.page, limit: this.paymentOrders.limit }),
        ],
        (res) => {
          this.ordersCompletedList = res[0].data.results;
          this.completedOrders.total = res[0].data.total;
          this.ordersRequestList = res[1].data.results;
          this.requestOrders.total = res[1].data.total;
          this.ordersTreatmentList = res[2].data.results;
          this.treatmentOrders.total = res[2].data.total;
          this.ordersPaymentList = res[3].data.results;
          this.paymentOrders.total = res[3].data.total;
          this.ordersRequestList = this.ordersRequestList.concat(this.ordersTreatmentList);
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
.paymentsbox {
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
