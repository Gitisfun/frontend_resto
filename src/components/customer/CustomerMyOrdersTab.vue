<template>
  <div :style="heightResponsive">
    <b-select @input="changeStatus" expanded size="is-small" v-model="orderOptions" placeholder="Al mijn bestellingen">
      <option :value="0">Al mijn bestellingen</option>
      <option :value="1">Betaald</option>
      <option :value="2">Nog niet betaald</option>
      <option :value="3">Betaling in behandeling</option>
    </b-select>
    <br />
    <div v-if="getMyOrders.length != 0">
      <CustomerMyOrderItem v-for="item in getMyOrders" :key="item.id" :order="item" :isReadOnly="false" />
    </div>
    <div class="box" v-else>Geen bestellingen...</div>
    <br />
    <LoadMore v-show="isLoadMoreVisible" @clicked="loadMoreOrders" text="Laad meer bestellingen..." />
  </div>
</template>

<script>
import io from "socket.io-client";
import { listenForNotifications } from "../../logic/sockets/socketManager.js";

import CustomerMyOrderItem from "./CustomerMyOrderItem";
// import { mapGetters } from "vuex";
import { getAll } from "../../api/apiCalls";
import { getByCustomer } from "../../api/routes/orders";
import store from "../../store";
import LoadMore from "../../components/general/LoadMore";

export default {
  name: "CustomerMyOrdersTab",
  components: {
    CustomerMyOrderItem,
    LoadMore,
  },
  data() {
    return {
      myIDs: [],
      orderOptions: 0,
      limit: 5,
    };
  },
  created() {
    this.myIDs = this.$store.getters.getMyOrderIDs;
    this.socket = io("http://localhost:5000/");
  },
  mounted() {
    listenForNotifications(this.socket, "orders", this.fetchData);
    this.fetchData();
  },
  destroyed() {
    this.socket.close();
  },
  computed: {
    isLoadMoreVisible() {
      if (this.limit < this.getMyOrdersLength) {
        return true;
      }
      return false;
    },
    heightResponsive() {
      if (this.getMyOrders.length < 3) {
        return "height: 100vh";
      }
      return "padding-bottom: 50px";
    },
    // mapGetters(["getMyOrders"])
    getMyOrders() {
      if (this.orderOptions == 3) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.status == 4 || el.status == 5;
        });
        if (this.limit > temp.length) {
          return temp;
        }
        return temp.slice(0, this.limit);
      } else if (this.orderOptions == 2) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.isPaid == 0 && el.status == 3;
        });
        if (this.limit > temp.length) {
          return temp;
        }
        return temp.slice(0, this.limit);
      } else if (this.orderOptions == 1) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.isPaid == 1;
        });
        if (this.limit > temp.length) {
          return temp;
        }
        return temp.slice(0, this.limit);
      } else {
        if (this.limit > store.getters.getMyOrders.length) {
          return store.getters.getMyOrders;
        }
        return store.getters.getMyOrders.slice(0, this.limit);
      }
    },
    // mapGetters(["getMyOrders"])
    getMyOrdersLength() {
      if (this.orderOptions == 3) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.status == 4 || el.status == 5;
        });
        return temp.length;
      } else if (this.orderOptions == 2) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.isPaid == 0 && el.status == 3;
        });
        return temp.length;
      } else if (this.orderOptions == 1) {
        let temp = store.getters.getMyOrders.filter(function(el) {
          return el.isPaid == 1;
        });
        return temp.length;
      } else {
        return store.getters.getMyOrders.length;
      }
    },
  },
  methods: {
    fetchData() {
      if (this.myIDs.length != 0) {
        getAll(
          getByCustomer,
          JSON.stringify(this.myIDs),
          (res) => {
            let temp = this.$store.getters.getMyOrders;
            const refreshList = res.data;
            for (let i = 0; i < temp.length; i++) {
              for (let j = 0; j < refreshList.length; j++) {
                if (refreshList[j].id == temp[i].id) {
                  temp[i].isPaid = refreshList[j].isPaid;
                  temp[i].status = refreshList[j].status;
                }
              }
            }
            this.$store.dispatch("setMyOrders", temp);
          },
          this
        );
      }
    },
    loadMoreOrders() {
      this.limit += 5;
    },
    changeStatus() {
      this.limit = 5;
    },
  },
};
</script>

<style></style>
