<template>
  <div>
    <vue-qrcode :options="{ width: 500 }" :value="url"></vue-qrcode>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  name: "PrintQrCode",
  components: {
    VueQrcode,
  },
  data() {
    return {
      url: null,
    };
  },
  created() {
    if (this.$route.params.url) {
      this.url = this.$route.params.url;
      localStorage.setItem("horecaurl", this.url);

    } else if (localStorage.getItem("horecaurl")) {
      this.url = localStorage.getItem("horecaurl");
    } else {
      this.$router.go(-1);
    }
  },
  mounted() {
    window.print();
  },
};
</script>
