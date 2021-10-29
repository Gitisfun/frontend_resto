<template>
  <b-pagination
    @change="pageChanged"
    :total="total"
    v-model="currentPage"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :order="order"
    :size="size"
    :simple="isSimple"
    :rounded="isRounded"
    :per-page="limit"
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
export default {
  name: "Pagination",
  props: {
      total: Number,
      limit: Number
  },
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
    pageChanged(page) {
      this.$emit("paginate", page);
    },
  },
};
</script>
