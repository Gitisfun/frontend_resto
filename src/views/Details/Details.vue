<template>
  <div id="detailsbox">
    <div class="box">
      <b-tabs>
        <b-tab-item label="Algemeen" icon="google-photos">
          <HorecaTab />
        </b-tab-item>
        <b-tab-item label="Contactgegevens" icon="card-account-phone">
          <ContactTab />
        </b-tab-item>
        <b-tab-item label="Adres" icon="home-edit">
          <AddressTab />
        </b-tab-item>
        <b-tab-item v-if="authenticator(103)" label="Openingsuren" icon="calendar-clock">
          <OpeninghoursTab />
        </b-tab-item>
        <b-tab-item v-if="enabled" label="Sluitingsdagen" icon="calendar-remove">
          <ClosingdaysTab />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import HorecaTab from "../../components/details/HorecaTab";
import ContactTab from "../../components/details/ContactTab";
import AddressTab from "../../components/details/AddressTab";
import OpeninghoursTab from "../../components/details/OpeninghoursTab";
import ClosingdaysTab from "../../components/details/ClosingdaysTab";

export default {
  name: "Details",
  components: {
    HorecaTab,
    ContactTab,
    AddressTab,
    OpeninghoursTab,
    ClosingdaysTab,
  },
  data(){
    return {
      enabled: false
    }
  },
};
</script>

<style>
#detailsbox {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
}

.tab-context-box {
  margin-top: 15px;
}
</style>