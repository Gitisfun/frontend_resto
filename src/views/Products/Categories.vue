<template>
  <div class="categoriesoverview">
    <Loader ref="loader" />
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-2 has-text-white">Categorieën</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-button type="is-success" @click="createCategory">
            Nieuwe categorie
          </b-button>
        </div>
        <div class="level-item">
          <b-button type="is-dark" @click="back"> Vorige pagina </b-button>
        </div>
      </div>
    </div>
    <b-input
      class="small-margin-gap-of-5"
      placeholder="Zoek een categorie..."
      v-model="search"
      @input.native="searchOnServer"
    ></b-input>
    <div>
      <div v-for="cat in categories" :key="cat.id">
        <Categorie :categorie="cat" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/general/Loader";
import Categorie from "../../components/products/Category";
import CreateCategoryModal from "../../modals/products/CreateCategoryModal.vue";
import {
  getAllCategories,
  createCategories,
} from "../../api/routes/categories";
import { getAll, create } from "../../api/apiCalls";
import { showSaveModal } from "../../logic/modals/modals";

export default {
  name: "Categories",
  components: {
    Categorie,
    Loader,
  },
  data() {
    return {
      categories: [],
      search: "",
    };
  },
  created() {
    this.searchOnServer()
  },
  methods: {
    searchOnServer() {
      getAll(getAllCategories,this.search,(res) => { this.categories = res.data;}, this );
    },
    createCategory() {
      showSaveModal(this, CreateCategoryModal, (value) => { create(createCategories, value, this, false); });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
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