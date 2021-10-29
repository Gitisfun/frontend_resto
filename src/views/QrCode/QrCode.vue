<template>
  <div class="qrcode">
    <div>
      <vue-qrcode :options="{ width: 450 }" :value="getLinkForQR"></vue-qrcode>
    </div>
    <br />
    <div class="columns">
      <div class="column">
        <ExtraInfoButton @clicked="toWebApp" text="Ga naar klanten app" />
      </div>
      <div class="column">
        <ExtraInfoButton @clicked="printQrCode" text="Print QR-code af" />
      </div>
      <div class="column is-8"></div>
    </div>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import store from "../../store";
import ExtraInfoButton from "../../components/buttons/ExtraInfoButton";

export default {
  name: "QrCode",
  components: {
    VueQrcode,
    ExtraInfoButton,
  },
  data() {
    return {
      horeca_id: null,
    };
  },
  created() {
    this.horeca_id = store.getters.getUser.horeca_id;
  },
  computed: {
    getLinkForQR() {
      // TODO: replace link here
      return `http://localhost:8080/horeca/info/${this.horeca_id}`;
    },
  },
  methods: {
    toWebApp() {
      this.$router.push({ name: "CustomerHome", params: { id: "1" } });
    },
    printQrCode() {
      this.$router.push({ name: "PrintQrCode", params: { url: this.getLinkForQR } });
    },
  },
};
</script>

<style scoped>
.qrcode {
  padding: 25px;
  min-height: 100%;
  background: #c7ecee;
  border-radius: 5px 0px 0px 0px;
}
</style>
