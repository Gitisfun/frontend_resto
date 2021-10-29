<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item"></div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <SaveButton text="Opslaan" @clicked="save" />
      </div>
      <div class="level-item">
        <CancelButton text="Annuleren" @clicked="cancel" />
      </div>
    </div>
  </div>
</template>

<script>
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";

export default {
  name: "SubmitBox",
  components: {
    SaveButton,
    CancelButton,
  },
  methods: {
    save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style></style>
