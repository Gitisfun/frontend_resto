<template>
  <div style="margin-bottom:15px;">
    <p style="margin-bottom:5px;"><b>{{ title }}</b></p>
    <p v-if="value">{{ value }}</p>
    <p v-else>...</p>
  </div>
</template>

<script>
export default {
    name: "InfoItem",
    props: {
        title: String,
        value: String
    }
};
</script>