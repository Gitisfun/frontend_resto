<template>
  <div id="updateproductbox">
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title is-4 has-text-black">Product</h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="authenticator(503)" class="level-item">
            <EditButton text="Bewerken" :isVisible="!editMode" @clicked="toggleMode" />
          </div>
          <div v-if="authenticator(504)" class="level-item">
            <DeleteButton text="Verwijderen" :isVisible="true" @clicked="deleteItem" />
          </div>
        </div>
      </div>
      <hr />
      <div v-show="!editMode">
        <InfoItem title="Naam" :value="product.name" />
        <InfoItem title="Prijs" :value="product.price" />
        <InfoItem title="Btw" :value="product.btw_name" />
        <InfoItem title="Beschrijving" :value="product.description" />
        <InfoItem title="Categorie" :value="categorie" />
      </div>
      <div v-show="editMode">
        <ValidationObserver ref="observer" v-slot="{ passes }">
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
          <ValidatedSelect size="is-small" rules="required" label="Categorie" v-model="product.categorie_id">
            <option v-for="option in categories" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </ValidatedSelect>
          <br />
          <br />
          <Submit @save="passes(save)" @cancel="cancel" />
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedSelect from "../../components/input/ValidatedSelect";
import ValidatedInput from "../../components/input/ValidatedInput";
import { getMultiple, updateWithCallback, deleteById } from "../../api/apiCalls";
import { updateProduct, getProduct, deleteProduct } from "../../api/routes/products";
import { getAllBtw } from "../../api/routes/btw";
import { getAllCategories } from "../../api/routes/categories";
import YesOrNoModal from "../../modals/general/YesOrNoModal";
import { showYesOrNoModal } from "../../logic/modals/modals";
import Submit from "../../components/forms/Submit";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import InfoItem from "../../components/textfields/InfoItem";

export default {
  name: "UpdateProduct",
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
    EditButton,
    DeleteButton,
    InfoItem,
    Submit,
  },
  data() {
    return {
      editMode: false,
      product: {
        btw_id: null,
        categorie_id: null,
      },
      btws: [],
      categories: [],
    };
  },
  computed: {
    categorie() {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.product.categorie_id === this.categories[i].id) {
          return this.categories[i].name;
        }
      }
      return "...";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMultiple(
        [getAllCategories(""), getProduct(this.$route.params.id), getAllBtw()],
        (res) => {
          this.categories = res[0].data;
          this.product = res[1].data[0];
          this.btws = res[2].data;
        },
        this
      );
    },
    toggleMode() {
      this.editMode = true;
    },
    save() {
      this.product.price = parseFloat(this.product.price);
      updateWithCallback(updateProduct, this.product, this, () => this.cancel());
    },
    deleteItem() {
      showYesOrNoModal(this, YesOrNoModal, (value) => {
        if (value) {
          deleteById(deleteProduct, this.product.id, this, true);
        }
      });
    },
    cancel() {
      this.fetchData();
      this.editMode = false;
    },
  },
};
</script>

<style>
#updateproductbox {
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
