import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Mapir from "mapir-vue";

import { hexToRgba } from "./globalFunctions.js";
import { updateBenefactorProperty } from "./globalFunctions.js";
import { updateCharityProperty } from "./globalFunctions.js";
import { updateAgentProperty } from "./globalFunctions.js";

Vue.prototype.$hexToRgba = hexToRgba;
Vue.prototype.$updateBenefactorProperty = updateBenefactorProperty;
Vue.prototype.$updateCharityProperty = updateCharityProperty;
Vue.prototype.$updateAgentProperty = updateAgentProperty;

Vue.config.productionTip = false;

Vue.use(Mapir, {
  key: process.env.VUE_APP_MAPIR_API_KEY,
});

import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    // format: 'YYYY-MM-DD',
    // displayFormat: 'jYYYY-jMM-jDD',
    // altFormat: 'YYYY-MM-DD',
    editable: false,
    inputClass: 'form-control my-custom-class-name',
    color: '#66CC99',
    autoSubmit: false,
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
