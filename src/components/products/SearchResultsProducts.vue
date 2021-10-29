<template>
  <div id="SearchResultsProductsBox">
    <SmallBoxTitle title="Productenlijst" style="margin-bottom: 15px" />
    <div v-for="product in getProducts.results" :key="product.id">
      <Product :product="product" />
    </div>
    <div v-show="getProducts.results.length == 0">
      <p style="margin-top: 15px">Geen zoekresultaten gevonden...</p>
    </div>
    <br />
    <Pagination v-show="getProducts.total > getProducts.limit"/>
  </div>
</template>

<script>
import SmallBoxTitle from "../textfields/SmallBoxTitle";
import Product from "./Product";
import { getAll } from "../../api/apiCalls";
import { getAllProducts } from "../../api/routes/products";

import Pagination from "../general/Pagination";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchResultsProducts",
  components: {
    SmallBoxTitle,
    Product,
    Pagination,
  },
  computed: mapGetters(["getProducts", "getCategories"]),
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(["changeProducts"]),
    fetchProducts() {
      getAll(getAllProducts, { categories: undefined, search: "" }, (res) => { this.changeProducts(res.data); }, this); },
  },
};
</script>

<style scoped>
#SearchResultsProductsBox {
  border-radius: 5px 5px 5px 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  background: #c7ecee;
  /* background-color: #f7f1e3; */

}
</style>
