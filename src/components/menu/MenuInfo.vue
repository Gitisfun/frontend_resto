<template>
  <div id="menu-info-box" class="box level">
    <div class="level-left">
      <div class="level-item" style="width: 200px">
        <p style="margin-left: 5px; width: 100%; text-align: left" class="has-text-weight-semibold	">
          {{ menu.name }}
        </p>
      </div>
      <div class="level-item" style="width: 50px; margin-right: 100px;">
        <p v-if="menu.currentlyActive == 1">
          <b-tag style="width:100px;" type="is-success">Actief</b-tag>
        </p>
        <p v-else>
          <b-tag style="width:100px;" type="is-danger">Niet actief</b-tag>
        </p>
      </div>
      <div class="level-item">
        <p style="font-weight: 300" v-if="menu.start_time && menu.end_time">Van {{ menu.start_time | convertTime }} tot {{ menu.end_time | convertTime }}</p>
        <p style="font-weight: 300" v-else-if="menu.currentlyActive == 1">
          Actief wanneer andere menukaarten niet actief zijn
        </p>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <InfoButton :text="btnText" @clicked="navigate" />
      </div>
    </div>
  </div>
</template>

<script>
import InfoButton from "../../components/buttons/InfoButton";

export default {
  name: "MenuInfo",
  props: {
    menu: Object,
    isTimeSlot: Boolean,
  },
  components: {
    InfoButton,
  },
  computed: {
    btnText() {
      if (this.isTimeSlot) {
        return "Tijdslot aanpassen";
      }
      return "Details";
    },
  },
  methods: {
    navigate() {
      if (this.isTimeSlot) {
        this.$emit("showTimeslot")
      } else {
        this.$router.push({
          name: "UpdateMenuCard",
          params: { id: this.menu.id },
        });
      }
    },
  },
  filters: {
    convertTime(time) {
      if (time) {
        return time.substring(0, 5);
      }
      return "";
    },
  },
};
</script>

<style>
#menu-info-box {
  border: 0.1px solid #f1f2f6;
}
</style>
