<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <h1 class="title is-4 has-text-black">{{title}}</h1>
      </div>
    </div>
    <div class="level-right">
      <div v-if="isVisible" class="level-item">
        <!--
        <b-button type="is-success" @click="navigate">
          {{ btnText }}
        </b-button>
        -->
        <AddButton :text="btnText" @clicked="navigate" />
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from "../buttons/AddButton"

export default {
    name: "TitleFour",
    components: {
      AddButton
    },
    props: {
        title: String,
        btnText: String,
        isVisible: Boolean
    },
    methods: {
        navigate(){
            this.$emit("clicked")
        }
    }
};
</script>

<style></style>
