<template>
  <div class="modal-card box" style="width: auto">
    <div style="margin-bottom: -25px">
      <div class="columns">
        <div class="column is-8">
          <ModalTitle :title="title" />
        </div>
        <div class="column">
          <div class="center">
            <Icon @clicked="close" style="margin-left: 15px;" icon="close-box" size="is-medium" type="is-danger" />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <b-input @input.native="fetchProducts(1)" placeholder="Zoek een product..." v-model="searchProductField"></b-input>
    <div class="addmenuitemmodalbox">
      <div style="margin-bottom: 15px" v-for="item in pagination.results" :key="item.id">
        <AddMenuItem @add="addMenuItem" :product="item" />
      </div>
      <div v-show="pagination.results.length == 0">
        <p style="margin-top: 15px; margin-bottom: 15px">Geen zoekresultaten gevonden...</p>
      </div>
    </div>
    <PaginationGeneric v-show="pagination.results.length != 0" @paginate="paginate" :total="pagination.total" :limit="pagination.limit" />
  </div>
</template>

<script>
import ModalTitle from "../../../components/textfields/ModalTitle";
import AddMenuItem from "./AddMenuItem";
import Icon from "../../../components/general/Icon";
import PaginationGeneric from "../../../components/general/PaginationGeneric";

import { getAll } from "../../../api/apiCalls";
import { getAllProducts } from "../../../api/routes/products";

export default {
  name: "AddMenuItemModal",
  components: {
    ModalTitle,
    AddMenuItem,
    Icon,
    PaginationGeneric,
  },
  data() {
    return {
      searchProductField: "",
      pagination: {
        total: 0,
        limit: 10,
        results: [],
      },
      currentPage: 1,
      title: ""
    };
  },
  created() {
    this.title = this.$attrs.title
    this.fetchProducts(this.currentPage);
  },
  methods: {
    fetchProducts(page) {
      this.currentPage = page;
      getAll(getAllProducts, { search: this.searchProductField, categories: undefined, page: page }, (res) => { this.pagination = res.data; },this);
    },
    addMenuItem(product) {
      this.$emit("addMenuItem", product)
      this.close();
    },
    paginate(page) {
      this.fetchProducts(page);
    },
    close() {
      this.$parent.close();
    },
  },
};
</script>

<style>
.addmenuitemmodalbox {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
