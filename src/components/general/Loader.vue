<template>
  <b-loading
    :is-full-page="true"
    v-model="isLoading"
    :can-cancel="false"
  ></b-loading>
</template>

<script>
export default {
    name: "Loader",
    data(){
        return{
            isLoading: false
        }
    }
};
</script>