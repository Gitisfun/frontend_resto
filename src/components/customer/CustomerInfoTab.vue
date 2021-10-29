<template>
  <div v-if="info.horeca && info.address && info.contactinfo && info.timetable" id="customer-info-tab-box">
    <div class="box info-box">
      <p class="customer-tab-info-title">{{ info.horeca.type }}</p>
      <p class="customer-tab-info-text">{{ info.horeca.description }}</p>
    </div>
    <div class="box info-box">
      <p class="customer-tab-info-title">Openingsuren</p>
      <div v-for="item in info.timetable" :key="item.id">
        <p class="customer-tab-info-text" v-if="item.isOpen && item.start_break">{{ item.day }}: <span style="color: #2ecc71">{{ item.open_at | timeFormatter }} - {{ item.start_break | timeFormatter }}</span> en <span style="color: #2ecc71">{{ item.end_break | timeFormatter }} - {{ item.closed_at | timeFormatter }} </span></p>
        <p class="customer-tab-info-text" v-else-if="item.isOpen">{{ item.day }}: <span style="color: #2ecc71">{{ item.open_at | timeFormatter }} - {{ item.closed_at | timeFormatter }}</span></p>
        <p class="customer-tab-info-text" v-else>{{ item.day }}: <span style="color: #e84118">Gesloten</span></p>
      </div>
    </div>
    <div class="box info-box">
      <p class="customer-tab-info-title">Adres</p>
      <p class="customer-tab-info-text">{{ info.address.street }} {{ info.address.number }}</p>
      <p class="customer-tab-info-text">{{ info.address.postal_code }} {{ info.address.county }}</p>
      <p class="customer-tab-info-text">{{ info.address.province }}, {{ info.address.country }}</p>
    </div>
    <div class="box info-box">
      <p class="customer-tab-info-title">Contactgegevens</p>
      <p class="customer-tab-info-text" v-if="info.contactinfo.website">Website: {{ info.contactinfo.website }}</p>
      <p class="customer-tab-info-text" v-if="info.contactinfo.phonenumber">Telefoon: {{ info.contactinfo.phonenumber }}</p>
      <p class="customer-tab-info-text" v-if="info.contactinfo.email">E-mail: {{ info.contactinfo.email }}</p>
      <p class="customer-tab-info-text" v-if="info.contactinfo.gsm">GSM: {{ info.contactinfo.gsm }}</p>
      <p class="customer-tab-info-text" v-if="info.contactinfo.fax">Fax: {{ info.contactinfo.fax }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CustomerInfoTab",
  props: {
    id: String,
    info: Object,
  },
  filters: {
    timeFormatter(time) {
      if (time == null) {
        return "...";
      }
      return moment(time).format("HH:mm");
    },
  },
};
</script>

<style>
#customer-info-tab-box {
  margin: 0;
  padding: 0;
}

.info-box {
  border: 0.1px solid #f5f6fa;
  margin-bottom: 15px;
}

.customer-tab-info-title{
  font-weight: 700;
  font-size: 16px;
}

.customer-tab-info-text{
  font-weight: 300;
  font-size: 14px;
}
</style>