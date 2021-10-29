<template>
  <div id="menucardbox">
    <div class="box">
      <b-tabs>
        <b-tab-item icon="card-text" label="Menukaarten">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(402)" title="Menukaarten" btnText="Nieuwe menukaart" @clicked="navigate" />
            <hr />
            <MenuInfo :isTimeSlot="false" v-for="item in menus" :key="item.id" :menu="item" />
          </div>
        </b-tab-item>
        <b-tab-item icon="clock" label="Tijdslots">
          <div class="tab-context-box">
            <TitleFour :isVisible="authenticator(402)" title="Tijdslots" btnText="Tijdslot toevoegen" @clicked="timeslot" />
            <hr />
            <MenuInfo @showTimeslot="timeslot" :isTimeSlot="true" v-for="item in menus" :key="item.id" :menu="item" />
          </div>
        </b-tab-item>
      </b-tabs>
      <!-- In reusable component stoppen -->
      <!-- Default message toevoegen als er nog geen menus zijn toegevoegd -->
    </div>
  </div>
</template>

<script>
import MenuInfo from "../../components/menu/MenuInfo";
import { getAll } from "../../api/apiCalls";
import { getAllMenus } from "../../api/routes/menus";
import TitleFour from "../../components/titles/TitleFour";

import TimeslotModal from "../../modals/menu/timeslots/Timeslot";
import { showTimeslotModal } from "../../logic/modals/modals";

export default {
  name: "Menucard",
  components: {
    MenuInfo,
    TitleFour,
  },
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.fetchMenus();
  },
  methods: {
    navigate() {
      this.$router.push({
        name: "CreateMenuCard",
      });
    },
    timeslot(){
      showTimeslotModal(this, TimeslotModal, () => { this.fetchMenus() })
    },
    fetchMenus() {
      getAll(
        getAllMenus,
        "",
        (res) => {
          this.menus = res.data;
        },
        this
      );
    },
  },
};
</script>

<style>
#menucardbox {
  min-height: 100%;
  /* background-image: linear-gradient(to bottom, #81ecec 0%, #81ecec 100%); */
     /* background-image: linear-gradient(to bottom, #ecf0f1 0%, #ecf0f1 100%);  */
    /* background: #dff9fb; */
  border-radius: 5px 0px 0px 0px;
    background: #c7ecee;

  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
