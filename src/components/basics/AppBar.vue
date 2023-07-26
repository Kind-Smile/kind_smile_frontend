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
        <a href="/">
          <v-icon size="22" :color="$vuetify.theme.currentTheme.textColor"
            >mdi-home-outline</v-icon
          >
        </a>
      </div>

      <div v-if="isAuthenticate" class="pt-3 mr-2">
        <a>
          <v-icon size="22" :color="$vuetify.theme.currentTheme.textColor"
            >mdi-account-outline</v-icon
          >
        </a>
      </div>

      <div v-else class="pt-3 mr-2">
        <a
          :style="{ color: $vuetify.theme.currentTheme.textColor }"
          class="ml-3"
          @click="openDialog"
        >
          <small>ثبت‌نام</small>
        </a>

        <a
          :style="{ color: $vuetify.theme.currentTheme.textColor }"
          href="/login"
        >
          <small>ورود</small>
        </a>
      </div>

      <Dialog
        :dialogOpen="dialogOpen"
        @update:dialogOpen="updateDialogOpen"
        title="به عنوان یک نوع از کاربرهای زیر می‌توانید ثبت‌نام کنید:"
      >
        <div slot="dialogText" class="ma-n4">
          <v-list>
            <v-list-item class="py-1" link to="#">
              <v-list-item-avatar size="37">
                <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <h6>نیکوکار</h6>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="py-1" link to="/login">
              <v-list-item-avatar size="37">
                <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <h6>خیریه</h6>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="py-1" link to="/register">
              <v-list-item-avatar size="37">
                <v-img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <h6>نماینده خیریه</h6>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </Dialog>

      <!-- <v-row no-gutters class="fill-height justify-end my-auto mx-5">
        <v-col cols="auto">
          <v-img
            src="@/assets/images/logo_kind_smile.png"
            :style="`height: ${height} ; width: ${width} ;`"
          ></v-img>
        </v-col>
      </v-row> -->
    </v-app-bar>
  </v-card>
</template>

<script>
import Dialog from "@/components/basics/Dialog.vue";
import Card from "@/components/basics/Card.vue";

export default {
  name: "AppBAr",

  components: {
    Dialog,
    Card,
  },

  data() {
    return {
      dialogOpen: false,
    };
  },

  props: {
    isAuthenticate: Boolean,
  },

  methods: {
    openDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    updateDialogOpen(newVal) {
      this.dialogOpen = newVal;
    },
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
