<template>
  <div class="modal-card box" style="width: auto">
    <div>
      <ModalTitle :title="title" />
    </div>
    <hr />
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <ValidatedInput rules="required" type="text" label="Naam" v-model="name" placeholder="..." />
      <br />
      <br />
      <div class="buttons" style="float: right">
        <button class="button is-success" @click="passes(save)">Opslaan</button>
        <button class="button is-dark" type="button" @click="back">
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
  name: "AddSubmenuModal",
  components: {
    ModalTitle,
    ValidationObserver,
    ValidatedInput,
  },
  data() {
    return {
      name: "",
      title: "",
      type: 1
    };
  },
  created() {
    this.title = this.$attrs.title;
    this.type = this.$attrs.type;
  },
  methods: {
    save() {
      this.$emit("addMenuTitle", this.name);
      this.$parent.close();
    },
    back() {
      this.$parent.close();
      if (this.type == 1) {
        this.$emit("back");
      }
    },
  },
};
</script>
