<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-9">
      <article class="tile is-child box">
        <div>
          <div class="columns">
            <div class="column is-6">
              <p style="font-weight: 700; font-size: 16px">Omzet voor maand</p>
            </div>
            <div class="column is-2">
              <b-select v-model="currentMonth" expanded size="is-small" placeholder="Kies een maand...">
                <option v-for="option in months" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </b-select>
            </div>
            <div class="column is-2">
              <b-select v-model="currentYear" expanded size="is-small" placeholder="Kies een maand...">
                <option v-for="option in years" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </b-select>
            </div>
            <div class="column is-2">
              <InfoButton text="Herladen" @clicked="reload" />
            </div>
          </div>
          <apexchart ref="linechart" type="area" height="250" :options="options.chartOptions" :series="options.series"></apexchart>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article style="position: relative" class="tile is-child box">
        <b-field>
          <b-select v-model="selectedCategory" expanded size="is-small" placeholder="Kies een categorie...">
            <option v-for="option in categoryOptions" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </b-select>
          <p class="control">
            <b-button size="is-small" class="button is-success" @click="addCategory">Toevoegen</b-button>
          </p>
        </b-field>
        <b-field>
          <b-select v-model="selectedProduct" expanded size="is-small" placeholder="Kies een product...">
            <option v-for="option in productOptions" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </b-select>
          <p class="control">
            <b-button size="is-small" class="button is-dark" @click="addProduct">Toevoegen</b-button>
          </p>
        </b-field>
        <p style="padding-bottom: 5px; padding-top: 7px; border-width: 1px; border-bottom-style: dotted; border-top-style: dotted; font-size: 12px; margin-top: 10px; margin-right: 5px; margin-left: 5px">
          Totaal
          <b-checkbox @input="toggleTotal" style="float:right" size="is-small" v-model="showTotal"></b-checkbox>
        </p>
        <div v-if="requestListLength == 0" style="font-size: 12px; margin-top: 15px; margin-right: 5px; margin-left: 5px">Geen categorieën en/of producten geselecteerd...</div>
        <div>
          <p style="font-size: 12px; margin-top: 10px; margin-right: 5px; margin-left: 5px" v-for="item in categoryRequestList" :key="item.id">
            {{ item.name }} <Icon @clicked="removeCategory(item.id)" style="margin-left: 15px; float: right;" icon="close-thick" size="is-small" type="is-danger" />
          </p>
        </div>
        <div>
          <p style="font-size: 12px; margin-top: 10px; margin-right: 5px; margin-left: 5px" v-for="item in productRequestList" :key="item.id">
            {{ item.name }} <Icon @clicked="removeProduct(item.id)" style="margin-left: 15px; float: right;" icon="close-thick" size="is-small" type="is-danger" />
          </p>
        </div>
        <p v-show="hasExceededMax" style="position: absolute; bottom: 0; margin-bottom: 25px; margin-right: 5px; margin-left: 5px; font-size: 12px; color: red">Kan maximaal 5 producten/categorieën vergelijken!</p>
      </article>
    </div>
  </div>
</template>

<script>
import lines from "../../logic/charts/lines.js";
import InfoButton from "../../components/buttons/InfoButton";
import dateHelper from "../../logic/dateHelper.js";
import logic from "../../logic/logic.js";
import Icon from "../../components/general/Icon";

import { getAll, getByIdWithParams /*getMultiple*/ } from "../../api/apiCalls";
import { getRevenueForWholeMonth, getRevenueProductForWholeMonth, getRevenueCategoryForWholeMonth } from "../../api/routes/statistics";
import { getAllCategories } from "../../api/routes/categories";
import { getSimpleAllProduct } from "../../api/routes/products";

export default {
  name: "LineChart",
  components: {
    InfoButton,
    Icon,
  },
  data() {
    return {
      showTotal: true,
      hasExceededMax: false,
      selectedCategory: null,
      selectedProduct: null,
      firstLoad: true,
      options: null,
      currentMonth: null,
      currentYear: null,
      months: [],
      years: [],
      categoryOptions: [],
      categoryRequestList: [],
      productOptions: [],
      productRequestList: [],
    };
  },
  created() {
    this.options = lines;
    this.setDates();
    this.fetchData();
    this.fetchCategoryList();
    this.fetchProductList();
  },
  computed: {
    requestListLength() {
      return this.categoryRequestList.length + this.productRequestList.length;
    },
  },
  methods: {
    fetchData() {
      this.clearGraph();
      if (this.showTotal) {
        this.fetchTotal();
      }
      if (this.categoryRequestList.length != 0) {
        this.fetchAllCategories();
      }
      if (this.productRequestList.length != 0) {
        this.fetchAllProducts();
      }
    },
    fetchCategoryList() {
      getAll(
        getAllCategories,
        "",
        (res) => {
          this.categoryOptions = res.data;
        },
        this
      );
    },
    fetchProductList() {
      getAll(
        getSimpleAllProduct,
        null,
        (res) => {
          this.productOptions = res.data;
        },
        this
      );
    },
    fetchTotal() {
      getAll(
        getRevenueForWholeMonth,
        dateHelper.getAllDaysInMonthWithStartAndEndTime(this.currentMonth - 1, this.currentYear),
        (res) => {
          this.drawLine("Totaal", res.data[0]);
        },
        this
      );
    },
    fetchCategory(id, name) {
      getByIdWithParams(
        getRevenueCategoryForWholeMonth,
        id,
        dateHelper.getAllDaysInMonthWithStartAndEndTime(this.currentMonth - 1, this.currentYear),
        (res) => {
          this.drawLine(name, res.data[0]);
        },
        this
      );
    },
    fetchProduct(id, name) {
      getByIdWithParams(
        getRevenueProductForWholeMonth,
        id,
        dateHelper.getAllDaysInMonthWithStartAndEndTime(this.currentMonth - 1, this.currentYear),
        (res) => {
          this.drawLine(name, res.data[0]);
        },
        this
      );
    },
    drawLine(name, data) {
      const keys = logic.getAllKeys(data);
      const values = Object.values(data).map(logic.replaceNullByZero);
      this.options.chartOptions.xaxis.categories = keys;
      this.options.series.push({
        name: name,
        data: values,
      });
      if (!this.firstLoad) {
        this.$refs.linechart.refresh();
      }
      this.firstLoad = false;
    },
    reload() {
      this.fetchData();
    },
    setDates() {
      this.currentMonth = dateHelper.getCurrentMonth();
      this.currentYear = dateHelper.getCurrentYear();
      this.months = dateHelper.getAllMonths();
      this.years = dateHelper.getYears();
    },
    addCategory() {
      if (this.requestListLength != 5) {
        if (logic.findIndexById(this.categoryRequestList, this.selectedCategory) == -1) {
          for (let i = 0; i < this.categoryOptions.length; i++) {
            if (this.selectedCategory == this.categoryOptions[i].id) {
              this.categoryRequestList.push({ id: this.categoryOptions[i].id, name: this.categoryOptions[i].name });
            }
          }
          this.fetchData();
        }
        this.hasExceededMax = false;
      } else {
        this.hasExceededMax = true;
      }
    },
    addProduct() {
      if (this.requestListLength != 5) {
        if (logic.findIndexById(this.productRequestList, this.selectedProduct) == -1) {
          for (let i = 0; i < this.productOptions.length; i++) {
            if (this.selectedProduct == this.productOptions[i].id) {
              this.productRequestList.push({ id: this.productOptions[i].id, name: this.productOptions[i].name });
            }
          }
          this.fetchData();
        }
        this.hasExceededMax = false;
      } else {
        this.hasExceededMax = true;
      }
    },
    removeCategory(id) {
      logic.removeItemById(this.categoryRequestList, id);
      this.fetchData();
      this.hasExceededMax = false;
    },
    removeProduct(id) {
      logic.removeItemById(this.productRequestList, id);
      this.fetchData();
      this.hasExceededMax = false;
    },
    clearGraph() {
      this.options.series = [];
    },
    fetchAllCategories() {
      for (let i = 0; i < this.categoryRequestList.length; i++) {
        this.fetchCategory(this.categoryRequestList[i].id, this.categoryRequestList[i].name);
      }
    },
    fetchAllProducts() {
      for (let i = 0; i < this.productRequestList.length; i++) {
        this.fetchProduct(this.productRequestList[i].id, this.productRequestList[i].name);
      }
    },
    toggleTotal() {
      this.fetchData();
    },
  },
  beforeDestroy() {
    this.clearGraph();
  },
};
</script>