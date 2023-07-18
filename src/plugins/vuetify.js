import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import fa from "vuetify/es5/locale/fa";

import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,

  lang: {
    current: "fa",
    locales: { fa },
  },

  icons: {
    iconfont: "mdi",
  },

  theme: {
    themes: {
      light: {
        primary: '#EC6262', // red
        secondary: '#FFCC66', // yellow
        thirdColor: '#66CC99', // green
        textColor: '#312E2E' //dark gray
      },
    },
  },
});
