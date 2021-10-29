<!-- Dit is niet mijn code: deze component heb ik van de volgende bron gehaald -->
<!-- https://vee-validate.logaretm.com/v3/guide/3rd-party-libraries.html#bootstrapvue -->
<template>
  <div class="inputfieldbox">
    <ValidationProvider
      :vid="vid"
      :name="$attrs.name || $attrs.label"
      :rules="rules"
      v-slot="{ errors, valid }"
    >
      <b-field
        v-bind="$attrs"
        :type="{ 'is-danger': errors[0], 'is-success': valid }"
        :message="errors"
        label-position="outside"
      >
        <b-input :placeholder="placeholder" v-model="innerValue" v-bind="$attrs" expanded></b-input>
      </b-field>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  props: {
    vid: {
      type: String,
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    // must be included in props
    value: {
      type: null,
    },
    placeholder: {
        type: String
    }
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style scoped>
.inputfieldbox {
  margin-bottom: 10px;
}
</style>