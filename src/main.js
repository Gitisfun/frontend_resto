import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
//import 'buefy/dist/buefy.css'
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";
import "../veee-validate.js";
import VueMobileDetection from "vue-mobile-detection";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(VueMobileDetection);
Vue.use(Buefy);

Vue.mixin({
  methods: {
    authenticator(code) {
      if (store.getters.getPermissions != null) {
        for (let i = 0; i < store.getters.getPermissions.length; i++) {
          for (let j = 0; j < store.getters.getPermissions[i].items.length; j++) {
            const element = store.getters.getPermissions[i].items[j];
            if (element.id == code && element.value) {
              return true;
            }
          }
        }
      }
      return false;
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
