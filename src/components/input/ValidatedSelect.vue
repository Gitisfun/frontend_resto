<!-- Dit is niet mijn code: deze component heb ik van de volgende bron gehaald -->
<!-- https://vee-validate.logaretm.com/v3/guide/3rd-party-libraries.html#bootstrapvue -->
<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
  >
    <b-field
      label-position="outside"
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-select :size="size" :placeholder="placeholder" v-model="innerValue" expanded>
        <slot />
      </b-select>
    </b-field>
  </ValidationProvider>
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
      type: String,
    },
    size: {
      type: String,
      default: "default"
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
  }
};
</script>

<style scoped>
.inputfieldbox{
  margin-bottom: 10px;
}
</style>