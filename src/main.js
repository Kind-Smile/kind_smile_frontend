import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Mapir from 'mapir-vue';


import { hexToRgba } from './globalFunctions.js'
import { updateBenefactorProperty } from './globalFunctions.js'
import { updateCharityProperty } from './globalFunctions.js'

Vue.prototype.$hexToRgba = hexToRgba;
Vue.prototype.$updateBenefactorProperty = updateBenefactorProperty;
Vue.prototype.$updateCharityProperty = updateCharityProperty;

Vue.config.productionTip = false

Vue.use(Mapir, {
  key: process.env.VUE_APP_MAPIR_API_KEY,
  // Add any other options or configurations if needed
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
