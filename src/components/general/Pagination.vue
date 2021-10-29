<template>
  <b-pagination
    @change="pageChanged"
    :total="getProducts.total"
    v-model="currentPage"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :order="order"
    :size="size"
    :simple="isSimple"
    :rounded="isRounded"
    :per-page="getProducts.limit"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
  </b-pagination>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getAll } from "../../api/apiCalls";
import { getAllProducts } from "../../api/routes/products";

export default {
  name: "Pagination",
  computed: mapGetters(["getProducts", "getSearchForProducts", "getCategories"]),
  data() {
    return {
      rangeBefore: 3,
      rangeAfter: 3,
      currentPage: 1,
      order: "is-centered",
      size: "is-small",
      isSimple: false,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
    };
  },
  methods: {
    ...mapActions(["changeProducts"]),
    pageChanged(page) {
      getAll(getAllProducts,{ search: this.getSearchForProducts, categories: this.getSelectedCategories(), page: page },(res) => { this.changeProducts(res.data); },this);
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
