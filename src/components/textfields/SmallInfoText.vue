<template>
  <p class="is-size-7">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "SmallInfoText",
  props: {
    text: String,
  },
};
</script>