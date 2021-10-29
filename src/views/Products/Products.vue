<template>
  <div class="productsoverview">
    <div class="box">
      <Loader ref="loader" />
      <b-tabs>
        <b-tab-item label="Producten" icon="food">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(502)" title="Producten" btnText="Nieuw product" @clicked="navigate" />
          </div>
          <hr />
          <b-input size="is-small" @input.native="searchingForProduct" placeholder="Zoek een product..." v-model="searchProductField"></b-input>
          <br />
          <div class="columns">
            <div class="column">
              <CategorieContainer />
            </div>
            <div class="column is-8">
              <SearchResultsProducts />
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Categorieën" icon="food-variant">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(507)" title="Categorieën" btnText="Nieuwe categorie" @clicked="createCategory" />
          </div>
          <hr />
          <b-input size="is-small" style="margin-bottom: 25px" placeholder="Zoek een categorie..." v-model="search" @input.native="searchOnServer"></b-input>
          <div>
            <div v-for="cat in categories" :key="cat.id">
              <Categorie :categorie="cat" />
            </div>
            <div v-show="categories.length == 0">
              <p style="padding: 20px">Geen zoekresultaten gevonden...</p>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
  <!--
    <div class="productsoverview">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-2 has-text-white">Overzicht</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-button type="is-success" @click="  ">
            Nieuw product
          </b-button>
        </div>
      </div>
    </div>
    <b-input @input.native="searchingForProduct" placeholder="Zoek een product..." v-model="searchProductField"></b-input>
    <br />
    <div class="columns">
      <div class="column">
        <CategorieContainer />
      </div>
      <div class="column is-8">
        <SearchResultsProducts />
      </div>
    </div>
  </div>
  -->
</template>

<script>
import CategorieContainer from "../../components/products/CategorieContainer";
import SearchResultsProducts from "../../components/products/SearchResultsProducts";

import { getAll, create } from "../../api/apiCalls";
import { getAllProducts } from "../../api/routes/products";

import { mapGetters, mapActions } from "vuex";

import Loader from "../../components/general/Loader";
import Categorie from "../../components/products/Category";
import CreateCategoryModal from "../../modals/products/CreateCategoryModal.vue";
import { getAllCategories, createCategories } from "../../api/routes/categories";
import { showSaveModal } from "../../logic/modals/modals";
import TitleFour from "../../components/titles/TitleFour";

export default {
  name: "Products",
  components: {
    TitleFour,
    CategorieContainer,
    SearchResultsProducts,
    Categorie,
    Loader,
  },
  data() {
    return {
      searchProductField: "",
      categories: [],
      search: "",
    };
  },
  computed: mapGetters(["getSearchForProducts", "getCategories"]),
  created() {
    this.searchOnServer();
  },
  methods: {
    ...mapActions(["changeCategories", "changeProducts", "changeSearchForProducts"]),
    navigate() {
      this.$router.push({ name: "CreateProduct" });
    },
    navigateCategorie() {
      this.$router.push({ name: "CreateCategory" });
    },
    searchingForProduct() {
      this.changeSearchForProducts(this.searchProductField);
      this.fetchProducts();
    },
    searchOnServer() {
      getAll(
        getAllCategories,
        this.search,
        (res) => {
          this.categories = res.data;
        },
        this
      );
    },
    createCategory() {
      showSaveModal(this, CreateCategoryModal, (value) => {
        create(createCategories, value, this, false);
      });
    },
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
  destroyed() {
    this.changeCategories(undefined);
    this.changeProducts({ results: [], limit: 10, total: 0 });
    this.changeSearchForProducts("");
  },
};

// import CategorieContainer from "../../components/products/CategorieContainer";
// import SearchResultsProducts from "../../components/products/SearchResultsProducts";

// import { getAll } from "../../api/apiCalls";
// import { getAllProducts } from "../../api/routes/products";

// import { mapGetters, mapActions } from "vuex";

// export default {
//   name: "Products",
//   components: {
//     CategorieContainer,
//     SearchResultsProducts,
//   },
//   data() {
//     return {
//       searchProductField: "",
//     };
//   },
//   computed: mapGetters(["getSearchForProducts", "getCategories"]),

//   methods: {
//     ...mapActions(["changeCategories", "changeProducts", "changeSearchForProducts"]),
//     navigate() {
//       this.$router.push({ name: "CreateProduct" });
//     },
//     searchingForProduct() {
//       this.changeSearchForProducts(this.searchProductField);
//       this.fetchProducts();
//     },
//     fetchProducts() {
//       if (this.getCategories.length == 0) {
//         const emptyList = [];
//         this.changeCategories(emptyList);
//       } else {
//         getAll(
//           getAllProducts,
//           { search: this.getSearchForProducts, categories: this.getSelectedCategories() },
//           (res) => {
//             this.changeProducts(res.data);
//           },
//           this
//         );
//       }
//     },
//     getSelectedCategories() {
//       return this.getCategories
//         .filter((item) => {
//           return item.value == true;
//         })
//         .map((item) => {
//           return item.id;
//         });
//     },
//   },
//   destroyed() {
//     this.changeCategories(undefined);
//     this.changeProducts({ results: [], limit: 10, total: 0 });
//     this.changeSearchForProducts("");
//   },
// };
</script>

<style scoped>
.productsoverview {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
}
.categoriesoverview {
  padding-top: 15px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
.resultatencategoriesbox {
  border-radius: 5px 5px 5px 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: white;
}
</style>
