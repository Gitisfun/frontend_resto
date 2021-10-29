<template>
  <div class="modal-card box" style="width: auto">
    <div>
      <ModalTitle title="Categorie wijzigen" />
    </div>
    <hr />
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <ValidatedInput
        rules="required"
        type="text"
        label="Naam"
        v-model="categorie.name"
        placeholder="Naam..."
      />
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
import ModalTitle from "../../components/textfields/ModalTitle";
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "../../components/input/ValidatedInput";

export default {
  name: "UpdateCategoryModal",
  components: {
    ModalTitle,
    ValidationObserver,
    ValidatedInput,
  },
  data() {
    return {
      categorie: {
        naam: "",
      },
    };
  },
  created(){
      this.categorie = this.$attrs.obj
  },
  methods: {
    save() {
      this.$emit("save", this.categorie);
      this.$parent.close();
    },
  },
};
</script>