<template>
  <div class="tab-context-box">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title is-4 has-text-black">Sluitingsdagen</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <EditButton text="Bewerken" />
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import EditButton from "../buttons/EditButton"

export default {
  name: "ClosingdaysTab",
  components: {
    EditButton
  },
  data(){
    return {
      
    }
  }
};
</script>

<style></style>
