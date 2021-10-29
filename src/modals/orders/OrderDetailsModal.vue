<template>
  <div class="modal-card box" style="width: auto">
    <div class="columns">
      <div class="column">
        <p class="modal-order-item-text-title">Bestelling: {{ order.order_nr }}</p>
        <!-- <p class="modal-order-item-text-info" style="font-weight: 800">{{ order.order_nr }}</p> -->
        <p class="modal-order-item-text-info">{{ order.client }}</p>
        <p style="margin-bottom: 10px; color: orange" v-if="order.status == 2">In behandeling sinds {{ order.treatment_time | timeFormatter }} door {{ order.firstname }} {{ order.lastname }}</p>
        <p style="margin-bottom: 10px; color: green" v-if="order.status == 3">Afgehandeld om {{ order.completed_time | timeFormatter }} door {{ order.firstname }} {{ order.lastname }}</p>
        <p v-if="order.description" class="modal-order-item-text-info"><i>Mededeling: </i>{{ order.description }}</p>
        <p v-else class="modal-order-item-text-info"><i>Mededeling: </i>Geen</p>
      </div>
      <div class="column">
        <p class="modal-order-item-text-title" style="text-align: right">{{ order.table_name }}</p>
        <p class="modal-order-item-text-info" style="text-align: right">Geplaatst om {{ order.ordered_time | timeFormatter }}</p>
        <p class="modal-order-item-text-info" style="text-align: right">{{ order.ordered_time | dateFormatter }}</p>
      </div>
    </div>

    <hr style="margin-top: 0px" />
    <div v-for="item in products" :key="item.id" style="margin-bottom: 2px">
      <OrderProductItem :orderLine="item" />
    </div>
    <div v-if="products.length == 0">Geen producten</div>
    <p style="text-align: right; margin-top: 20px;">
      <b style="margin-right: 25px">Totaal: </b><span style="font-weight: 500; color: green">€ {{ calculateTotal }}</span>
    </p>
    <br />
    <!-- <div v-if="isInfo == false">
      <OrderDetailButton v-if="order.status == 1 || order.status == 2" :status="order.status" style="margin-top: 5px; margin-left: auto; margin-right: 0; width: 15%" :text="buttonText" @clicked="treat" />
    </div> -->
    <div class="level">
      <div class="level-left">
        <div class="level-item" v-if="authenticator(603)">
          <OrderDetailButton :status="-1" style="margin-top: 5px; margin-left: auto; margin-right: 0; width:150px" text="Verwijderen" @clicked="deleteOrder" />
        </div>
      </div>
      <div v-if="isInfo == false" class="level-right">
        <div class="level-item">
          <OrderDetailButton v-if="order.status == 1 || order.status == 2" :status="order.status" style="margin-top: 5px; margin-left: auto; margin-right: 0; width:150px" :text="buttonText" @clicked="treat" />
        </div>
      </div>
      <div v-if="authenticator(901) && order.status >= 3" class="level-right">
        <div class="level-item">
          <OrderDetailButton :status="9" style="margin-top: 5px; margin-left: auto; margin-right: 0; width:150px" text="Kasbon printen" @clicked="print" />
        </div>
      </div>
      <div v-if="authenticator(901) && order.status == 4" class="level-right">
        <div class="level-item">
          <OrderDetailButton :status="order.status" style="margin-top: 5px; margin-left: auto; margin-right: 0; width:150px" :text="buttonText" @clicked="payment" />
        </div>
      </div>
      <div v-if="authenticator(901) && order.status == 5" class="level-right">
        <div class="level-item">
          <OrderDetailButton :status="order.status" style="margin-top: 5px; margin-left: auto; margin-right: 0; width:150px" :text="buttonText" @clicked="paymentCompleted" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "../../store";

import { getById, updateWithCallback, deleteWithCallback } from "../../api/apiCalls";
import { getAllProductsForOrder, updateOrder, paymentTreatment, payment, deleteOrder } from "../../api/routes/orders";

import OrderProductItem from "../../components/orders/OrderProductItem";
import OrderDetailButton from "../../components/buttons/OrderDetailButton";

import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";

export default {
  name: "OrderDetailsModal",
  components: {
    OrderProductItem,
    OrderDetailButton,
  },
  data() {
    return {
      order: {},
      products: [],
      isInfo: false,
    };
  },
  created() {
    this.order = this.$attrs.obj;
    this.isInfo = this.$attrs.isInfo;
    this.router = this.$attrs.router;

    this.fetchData();
  },
  computed: {
    calculateTotal() {
      let total = 0;
      if (this.order && this.products.length != 0) {
        for (let i = 0; i < this.products.length; i++) {
          let temp = this.products[i].product_price * this.products[i].quantity;
          total += temp;
        }
      }
      return total.toFixed(2);
    },
    buttonText() {
      if (this.order.status == 1 || this.order.status == 4) {
        return "Behandelen";
      } else if (this.order.status == 2 || this.order.status == 5) {
        return "Voltooien";
      }
      return "";
    },
  },
  methods: {
    fetchData() {
      getById(getAllProductsForOrder, this.$attrs.obj.id, (res) => {
        this.products = res.data;
      });
    },
    treat() {
      if (this.order.status == 1) {
        this.order.treatment_time = moment().format();
        this.order.status = 2;
        this.order.staff_id = store.getters.getUser.id;
      } else if (this.order.status == 2) {
        this.order.treatment_time = moment(this.order.treatment_time).format();
        this.order.completed_time = moment().format();
        this.order.staff_id = store.getters.getUser.id;
        this.order.status = 3;
      }
      updateWithCallback(updateOrder, this.order, this, () => {
        this.$emit("notify");
        this.$parent.close();
      });
    },
    payment() {
      updateWithCallback(paymentTreatment, this.order, this, () => {
        this.$emit("notify");
        this.$parent.close();
      });
    },
    paymentCompleted() {
      updateWithCallback(payment, this.order, this, () => {
        this.$emit("notify");
        this.$parent.close();
      });
    },
    deleteOrder() {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteWithCallback(deleteOrder, this.order.id, this, () => {
            this.$emit("notify");
            this.$parent.close();
          });
        }
      });
    },
    print() {
      this.router.push({
        name: "Ticket",
        params: { id: this.order.id },
      });
      this.$parent.close()
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
  background-color: #337ab7;
}

.right {
  padding: 1em;
  background-color: #5cb85c;
}

.parent {
  display: flex;
  overflow: hidden;
  margin: 1em 0;
  color: #fff;
  border: 1px solid #333;
  align-items: center;
}
</style>
