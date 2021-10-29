<template>
  <div id="order-history-box">
    <div v-show="!tableIsVisible">
      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    </div>
    <div>
      <b-field>
        <b-input size="is-small" @input.native="searchOrders" placeholder="Zoek een bestelling..." v-model="search" expanded></b-input>
        <p class="control">
          <b-select @input="refreshList" size="is-small" v-model="status" placeholder="Alle bestellingen">
            <option :value="null">Alle bestellingen</option>
            <option :value="1">Nieuwe</option>
            <option :value="2">In behandeling</option>
            <option :value="3">Nog niet betaald</option>
            <option :value="4">Klant wenst te betalen</option>
            <option :value="5">Betaling wordt verwerkt</option>
            <option :value="6">Betaald</option>
            <option :value="7">Verwijderde bestellingen</option>
          </b-select>
        </p>
        <!-- <p class="control">
          <b-button @click="changeStatus" size="is-small" type="is-info">Zoeken</b-button>
        </p> -->
        <p class="control">
          <b-button @click="toggleVisibilty" size="is-small" type="is-primary is-light">Verander layout </b-button>
        </p>
      </b-field>
    </div>
    <br />
    <div v-if="orders.length != 0">
      <!-- Table -->
      <div v-show="tableIsVisible" class="box">
        <b-table
          :data="tableData"
          :loading="isLoading"
          hoverable
          narrowed
          striped
          paginated
          backend-pagination
          pagination-size="is-small"
          :total="total"
          :per-page="perPage"
          @page-change="onPageChange"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          :opened-detailed="defaultOpenedDetails"
          @details-open="openDetails"
          detailed
          detail-key="id"
          detail-transition="fade"
          :show-detail-icon="showDetailIcon"
        >
          <b-table-column field="order_nr" width="150" label="Bestelling" v-slot="props">
            <span style="font-weight: 500; font-size: 14px; color: #34495e">{{ props.row.order_nr }}</span>
          </b-table-column>
          <b-table-column field="ordered_time" width="125" centered label="Tijdstip" v-slot="props">
            <span style="font-weight: 500; color: #3498db" class="order-table-row-style"> {{ props.row.ordered_time | timeFormatter }}</span>
          </b-table-column>
          <b-table-column field="ordered_time" width="125" centered label="Datum" v-slot="props">
            <span style="font-weight: 500; color: #9b59b6" class="order-table-row-style"> {{ props.row.ordered_time | dateFormatter }}</span>
          </b-table-column>
          <b-table-column field="status" centered label="Status" v-slot="props">
            <span class="tag" :class="type(props.row.status)">
              {{ statusText(props.row.status) }}
            </span>
          </b-table-column>
          <!-- <b-table-column field="client" label="Klant" v-slot="props">
          <span style="font-weight: 500; color: #34495e" class="order-table-row-style"> {{ props.row.client }} </span>
        </b-table-column> -->
          <b-table-column field="table_name" label="Tafel" v-slot="props">
            <span class="order-table-row-style">{{ props.row.table_name }}</span>
          </b-table-column>
          <b-table-column field="firstname" label="Personeelslid" v-slot="props">
            <span class="order-table-row-style"> {{ props.row.firstname }} {{ props.row.lastname }}</span>
          </b-table-column>
          <b-table-column field="total" numeric label="Totaal" v-slot="props">
            <span style="color: #2ecc71; font-weight: 600; font-size: 14px"> € {{ props.row.total }} </span>
          </b-table-column>
          <template #detail="props">
            <div style="background: white; padding: 25px; border-radius: 5px; border: 2.5px solid black" v-if="props.row.products">
              <div class="columns">
                <div class="column">
                  <p class="modal-order-item-text-title">Bestelling: {{ props.row.order_nr }}</p>
                  <p class="modal-order-item-text-info">{{ props.row.client }}</p>
                  <p style="margin-bottom: 10px; color: orange" v-if="props.row.status == 2">In behandeling sinds {{ props.row.treatment_time | timeFormatter }} door {{ props.row.firstname }} {{ props.row.lastname }}</p>
                  <p style="margin-bottom: 10px; color: green" v-if="props.row.status == 3">Afgehandeld om {{ props.row.completed_time | timeFormatter }} door {{ props.row.firstname }} {{ props.row.lastname }}</p>
                  <p v-if="props.row.description" class="modal-order-item-text-info"><i>Mededeling: </i>{{ props.row.description }}</p>
                  <p v-else class="modal-order-item-text-info"><i>Mededeling: </i>Geen</p>
                </div>
                <div class="column">
                  <p class="modal-order-item-text-title" style="text-align: right">{{ props.row.table_name }}</p>
                  <p class="modal-order-item-text-info" style="text-align: right">Geplaatst om {{ props.row.ordered_time | timeFormatter }}</p>
                  <p class="modal-order-item-text-info" style="text-align: right">{{ props.row.ordered_time | dateFormatter }}</p>
                </div>
              </div>
              <hr style="margin-top: 0px" />
              <div v-for="item in props.row.products" :key="item.id" style="margin-bottom: 2px">
                <OrderProductItem :orderLine="item" />
              </div>
              <div v-if="props.row.products.length == 0">Geen producten</div>
              <p style="text-align: right; margin-top: 20px;">
                <b style="margin-right: 25px">Totaal: </b><span style="font-weight: 500; color: green">€ {{ props.row.total }}</span>
              </p>
              <br />
            </div>
          </template>
        </b-table>
      </div>
      <!-- Columns -->
      <div v-show="!tableIsVisible">
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="item in orders" :key="item.id">
            <OrderItem style="height: 100%" :isInfo="true" :order="item" />
          </div>
        </div>
        <LoadMore v-if="isLoadMoreVisible" @clicked="loadMoreOrders" text="Laad meer bestellingen..." />
      </div>
    </div>
    <NoOrdersYet v-if="orders.length == 0" text="Nog geen bestellingen ontvangen..." />
  </div>
</template>

<script>
import { getById, getAll } from "../../api/apiCalls";
import { getAllProductsForOrder } from "../../api/routes/orders";
import { getAllOrders } from "../../api/routes/orders";
import OrderItem from "../../components/orders/OrderItem";
import NoOrdersYet from "../../components/orders/NoOrdersYet";
import moment from "moment";
import OrderProductItem from "../../components/orders/OrderProductItem";
import LoadMore from "../../components/general/LoadMore";

import orderState from "../../logic/constants/orderState.js";

export default {
  name: "OrderHistory",
  components: {
    OrderItem,
    NoOrdersYet,
    OrderProductItem,
    LoadMore,
  },
  data() {
    return {
      tableIsVisible: true,
      defaultOpenedDetails: [],
      showDetailIcon: true,
      useTransition: false,
      isLoading: false,
      isLoadMoreVisible: true,
      search: "",
      status: null,
      selectBoxStatus: null,
      orders: [],
      limit: 10,
      page: 1,
      hasNext: true,
      tableData: [],
      perPage: 10,
      total: 0,
      isActive: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      if (this.status === 7) {
        this.selectBoxStatus = null;
        this.isActive = 0;
      } else {
        this.selectBoxStatus = this.status;
        this.isActive = 1;
      }
      getAll(
        getAllOrders,
        { search: this.search, page: this.page, limit: this.limit, status: this.selectBoxStatus, isActive: this.isActive },
        (res) => {
          this.orders = res.data.results;
          this.tableData = res.data.results;
          this.total = res.data.total;
          if (res.data.total > res.data.limit) {
            this.hasNext = true;
          } else {
            this.hasNext = false;
          }
          if (this.limit < this.total) {
            this.isLoadMoreVisible = true;
          } else {
            this.isLoadMoreVisible = false;
          }
          this.isLoading = false;
        },
        this
      );
    },
    fetchDetailData(order) {
      this.isLoading = true;
      getById(
        getAllProductsForOrder,
        order.id,
        (res) => {
          order.products = res.data;
          this.isLoading = false;
        },
        this
      );
    },
    changeStatus() {
      this.fetchData();
    },
    searchOrders() {
      if (this.tableIsVisible) {
        this.limit = 10;
      } else {
        this.limit = 12;
      }
      this.fetchData();
    },
    onPageChange(page) {
      this.page = page;
      this.fetchData();
    },
    openDetails(order) {
      this.fetchDetailData(order);
    },
    type(value) {
      const status = parseInt(value);
      if (status == orderState.NEW) {
        return "is-info is-light";
      } else if (status == orderState.IN_TREATMENT) {
        return "is-warning is-light";
      } else if (status == orderState.NOT_PAID) {
        return "is-danger is-light";
      } else if (status == orderState.WANTS_TO_PAY) {
        return "is-dark is-light";
      } else if (status == orderState.PAYMENT_TREATMENT) {
        return "is-warning is-light";
      } else if (status == orderState.PAID) {
        return "is-success is-light";
      }
    },
    statusText(value) {
      const status = parseInt(value);
      if (status == orderState.NEW) {
        return "Nieuw";
      } else if (status == orderState.IN_TREATMENT) {
        return "In behandeling";
      } else if (status == orderState.NOT_PAID) {
        return "Nog niet betaald";
      } else if (status == orderState.WANTS_TO_PAY) {
        return "Klant wilt betalen";
      } else if (status == orderState.PAYMENT_TREATMENT) {
        return "Betaling wordt verwerkt";
      } else if (status == orderState.PAID) {
        return "Betaald";
      }
    },
    toggleVisibilty() {
      this.tableIsVisible = !this.tableIsVisible;
      if (this.tableIsVisible) {
        this.limit = 10;
        this.page = this.oldPage;
        this.isLoadMoreVisible = true;
      } else {
        this.limit = 12;
        this.oldPage = this.page;
        this.page = 1;
      }
      this.fetchData();
    },
    loadMoreOrders() {
      if (this.limit < this.total) {
        this.limit += 4;
        this.fetchData();
      }
    },
    refreshList(){
      this.fetchData()
    }
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
#order-history-box {
  padding: 25px;
  min-height: 100%;
  border-radius: 5px 0px 0px 0px;
  background: #c7ecee;

  /* background-image: linear-gradient(to bottom, #ecf0f1 0%, #ecf0f1 100%); */
  /* background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%); */
  margin: 0px;
}
.order-table-row-style {
  font-weight: 600;
  color: #34495e;
  font-size: 14px;
}
</style>
