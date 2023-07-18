<template>
  <v-app class="app" app>
    <router-view er-view class="app" />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import "./font.css";
.app {
  font-family: "IranSanse";
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

.semiSmall{
  font-size: .9rem;
}

.small,
small {
  font-size: .8rem;
}

.a,
a {
  text-decoration: none;
}

.bold {
  font-weight: bold;
}
</style>
