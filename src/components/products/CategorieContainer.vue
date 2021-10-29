<template>
  <div id="categoryBox">
    <SmallBoxTitle title="Categorieën" />
    <b-field v-for="cat in getCategories" :key="cat.id">
      <b-checkbox style="color:#2c3e50; font-size: 14px; font-weight: 500" size="is-small" @input="updateCategoryList" v-model="cat.value" type="is-primary">{{ cat.name }}</b-checkbox>
    </b-field>
    <SmallInfoText text="Selecteer een categorie om producten te filteren." />
  </div>
</template>

<script>
import SmallBoxTitle from "../textfields/SmallBoxTitle";
import SmallInfoText from "../textfields/SmallInfoText";

import { getAll } from "../../api/apiCalls";
import { getAllCategories } from "../../api/routes/categories";
import { getAllProducts } from "../../api/routes/products";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategorieContainer",
  components: {
    SmallBoxTitle,
    SmallInfoText,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: mapGetters(["getCategories", "getSearchForProducts"]),
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions(["changeCategories", "changeProducts"]),
    navigate() {
      this.$router.push({
        name: "Categories",
      });
    },
    updateCategoryList() {
      this.fetchProducts();
    },
    // Products call
    fetchProducts() {
      if (this.getCategories.length == 0) {
        const emptyList = [];
        this.changeCategories(emptyList);
      } else {
        getAll(
          getAllProducts,
          { search: this.getSearchForProducts, categories: this.getSelectedCategories() },
          (res) => {
            this.changeProducts(res.data);
          },
          this
        );
      }
    },
    // Categories call
    fetchCategories() {
      getAll(
        getAllCategories,
        "",
        (res) => {
          this.createCategoryList(res.data);
        },
        this
      );
    },
    createCategoryList(temp) {
      this.changeCategories(
        temp.map((item) => {
          let tempItem = { id: item.id, name: item.name, value: false };
          return tempItem;
        })
      );
    },
    getSelectedCategories() {
      return this.getCategories
        .filter((item) => {
          return item.value == true;
        })
        .map((item) => {
          return item.id;
        });
    },
  },
};
</script>

<style>
#categoryBox {
  border-radius: 5px 5px 5px 5px;
  padding: 15px;
  /*background-color: #81ecec;*/
  background-color: #f7f1e3
}
</style>
