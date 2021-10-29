<template>
  <div class="modal-card box" style="width: auto">
    <div>
      <ModalTitle title="Opgelet!" />
    </div>
    <hr />
    <p>Je staat op het punt om dit item te verwijderen, ben je zeker dat je wilt doorgaan?</p>
    <br />
    <div class="buttons">
      <button class="button is-success" @click="confirmation">Ja, verwijderen</button>
      <button class="button is-danger" type="button" @click="$parent.close()">
        Nee, annuleren
      </button>
    </div>
  </div>
</template>

<script>
import ModalTitle from "../../components/textfields/ModalTitle";

export default {
  name: "YesOrNoModal",
  components: {
    ModalTitle,
  },
  methods: {
    confirmation() {
      this.$emit("confirmation", true);
      this.$parent.close();
    },
  },
};
</script>
