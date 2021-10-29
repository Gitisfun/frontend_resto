<template>
  <div id="CreateProductbox">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <div class="box">
        <h1 class="title is-4 has-text-black">Product toevoegen</h1>
        <ValidatedInput size="is-small" rules="required" type="text" label="Naam" v-model="product.name" placeholder="..." />
        <ValidatedInput size="is-small" rules="required|positive" type="text" label="Prijs" v-model="product.price" placeholder="..." />
        <ValidatedSelect size="is-small" rules="required" label="Btw" v-model="product.btw_id" myplaceholder="...">
          <option v-for="option in btws" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </ValidatedSelect>
        <b-field label="Beschrijving">
          <b-input size="is-small" maxlength="255" type="textarea" v-model="product.description" placeholder="..."></b-input>
        </b-field>
        <ValidatedSelect size="is-small" rules="required" label="Categorie" v-model="product.categorie_id" myplaceholder="Geen">
          <option v-for="option in categories" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </ValidatedSelect>
        <br />
        <br />
        <Submit @save="passes(save)" @cancel="cancel" />
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedSelect from "../../components/input/ValidatedSelect";
import ValidatedInput from "../../components/input/ValidatedInput";
import { getMultiple, create } from "../../api/apiCalls";
import { createProduct } from "../../api/routes/products";
import { getAllBtw } from "../../api/routes/btw";
import { getAllCategories } from "../../api/routes/categories";
import Submit from "../../components/forms/Submit";

export default {
  name: "CreateProduct",
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
    Submit,
  },
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        categorie_id: null,
        btw_id: null
      },
      btws: [],
      categories: [],
    };
  },
  created() {
    getMultiple(
      [getAllBtw(), getAllCategories("")],
      (res) => {
        this.btws = res[0].data;
        this.categories = res[1].data;
      },
      this
    );
  },
  methods: {
    save() {
      this.product.price = parseFloat(this.product.price);
      // Parse price naar float
      create(createProduct, this.product, this, true);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
#CreateProductbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}

.formBox {
  border-radius: 5px 5px 5px 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;

  background-color: white;
}
</style>
