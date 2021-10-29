<template>
  <div class="modal-card box" style="width: auto">
    <div>
      <ModalTitle :title="title" />
    </div>
    <hr />
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <ValidatedSelect vid="category" :rules="`${name == '' ? 'required' : ''}`" label="Kies submenu uit bestaande categorieën" v-model="categorie_name" myplaceholder="Kies een categorie...">
         <option v-for="option in categories" :value="option.name" :key="option.id">
            {{ option.name }}
          </option>
      </ValidatedSelect>
      <br />
      <ValidatedInput vid="submenu" :rules="`${categorie_name == '' ? 'required' : ''}`" type="text" label="Of maak een nieuw submenu aan" v-model="name" placeholder="..." />
      <br />
      <br />
      <div class="buttons" style="float: right">
        <button class="button is-success" @click="passes(save)">Opslaan</button>
        <button class="button is-dark" type="button" @click="$parent.close()">
          Annuleren
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import ModalTitle from "../../../components/textfields/ModalTitle";
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../../components/input/ValidatedInput";
import ValidatedSelect from "../../../components/input/ValidatedSelect";
import { getAll } from "../../../api/apiCalls";
import { getAllCategories } from "../../../api/routes/categories";

export default {
  name: "AddSubmenuModal",
  components: {
    ModalTitle,
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
  },
  data() {
    return {
      name: "",
      title: "",
      categories: [],
      categorie_name: ""
    };
  },
  created() {
    this.title = this.$attrs.title
    getAll(getAllCategories,"", (res) => { this.categories = res.data; }, this);
  },
  methods: {
    save() {
      if(this.name == ''){
        this.$emit("addSubmenu", this.categorie_name)
      }
      else{
        this.$emit("addSubmenu", this.name);
      }
      this.$parent.close();
    },
  },
};
</script>
