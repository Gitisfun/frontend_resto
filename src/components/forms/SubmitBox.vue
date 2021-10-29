<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item"></div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <b-button type="is-success" @click="save">
          Opslaan
        </b-button>
      </div>
      <div class="level-item">
        <b-button type="is-dark" @click="back">
          Annuleren
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitBox",
  methods: {
    save() {
      this.$emit("save");
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
