<template>
  <v-app class="app" app>
    <router-view er-view class="app" />
  </v-app>
</template>

<script>
import jalaliMoment from 'jalali-moment';

export default {
  name: "App",

  methods:{
    getJalaliToday() {
      const gregorianToday = new Date();
      const jalaliToday = jalaliMoment(gregorianToday).format('jYYYY/jM/jD');
      localStorage.setItem("todayDate", jalaliToday);
    },
  },

  created() {
    this.$store.commit("checkAuthState");

    this.getJalaliToday()
  },
};
</script>

<style>
@import "./font.css";
.app {
  font-family: "IranSanse" !important;
  height: 100%;
}

.textColor,
label,
h1,
h2,
h3,
h4,
h5,
h6,
small,
b,
strong,
div,
a,
.v-toolbar-title {
  color: #312e2e;
}

.h2,
h2 {
  font-size: 2.13rem;
}

.h3,
h3 {
  font-size: 1.73rem;
}

.h4,
h4 {
  font-size: 1.2rem;
}

.h5,
h5 {
  font-size: 1.3rem;
}

.h6,
h6 {
  font-size: 1rem;
}

.semiSmall {
  font-size: 0.9rem;
}

.small,
small {
  font-size: 0.8rem;
}

.a,
a {
  text-decoration: none;
}

.bold {
  font-weight: bold;
}

.semi-larg {
  font-size: 1.47rem !important;
}
</style>
