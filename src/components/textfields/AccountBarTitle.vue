<template>
  <p
    class="has-text-dark has-text-weight-semibold is-capitalized subtitle is-4"
  >
    {{ title }}
  </p>
</template>

<script>
export default {
  name: "AccountBarTitle",
  props: {
    title: String,
  },
};
</script>