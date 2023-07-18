<template>
  <v-card>
    <v-app-bar
      app
      color="#FFCC66"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/images/app_bar.jpg"
      fade-img-on-scroll
      scroll-threshold="500"
      class="rounded-0"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(241, 198, 113, .1), rgba(130, 87, 0, .8)"
        >
        </v-img>
      </template>

      <div class="pt-3 mr-2 ml-3">
        <a>
          <v-icon size="22" :color="$vuetify.theme.currentTheme.textColor">mdi-home-outline</v-icon>
        </a>
      </div>

      <div v-if="isAuthenticate" class="pt-3 mr-2">
        <a>
          <v-icon size="22" :color="$vuetify.theme.currentTheme.textColor">mdi-account-outline</v-icon>
        </a>
      </div>

      <div v-else class="pt-3 mr-2">
        <a :style="{ color: $vuetify.theme.currentTheme.textColor }" class="ml-3">
          <small>ثبت‌نام</small>
        </a>

        <a :style="{ color: $vuetify.theme.currentTheme.textColor }">
          <small>ورود</small>
        </a>
      </div>

      <v-row no-gutters class="fill-height justify-end my-auto mx-5">
        <v-col cols="auto">
          <v-img
            src="@/assets/images/logo_kind_smile.png"
            :style="`height: ${height} ; width: ${width} ;`"
          ></v-img>
        </v-col>
      </v-row>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  name: "AppBAr",

  props: {
    isAuthenticate: Boolean,
  },

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "6vh";
        case "sm":
          return "7vh";
        case "md":
          return "8vh";
        case "lg":
          return "10.6vh";
      }
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "15vw";
        case "sm":
          return "5.7vw";
        case "md":
          return "5vw";
        case "lg":
          return "6vw";
      }
    },
  },
};
</script>
