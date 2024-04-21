<template>
  <v-card>
    <v-snackbar
      v-model="this.$store.state.snackbar"
      :timeout="3000"
      text
      top
      color="success"
    >
      {{ this.$store.state.snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="closeSnackbar">
          <v-icon size="22">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

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

      <!-- <div class="pt-3 mr-2 ml-3">
        <router-link to="/">
          <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
            >mdi-home-outline</v-icon
          >
        </router-link>
      </div> -->

      <div v-if="this.$store.state.isAuthenticated" class="pt-3">
        <router-link to="/" class="ml-3">
          <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
            >mdi-home-outline</v-icon
          >
        </router-link>

        <!-- <router-link to="/profile" class="ml-3">
          <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
            >mdi-account-outline</v-icon
          >
        </router-link> -->

        <a>
          <div style="display: inline" @click="profileHandler" class="ml-3">
            <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
              >mdi-account-outline</v-icon
            >
          </div>
        </a>

        <div style="display: inline">
          <router-link class="ml-3" to="/guide">
            <small>راهنمای کار با سامانه</small>
          </router-link>
        </div>

        <div style="display: inline">
          <router-link class="ml-3" to="/contact-us">
            <small>ارتباط با ما</small>
          </router-link>
        </div>

        <a>
          <div style="display: inline" @click="logoutHandler">
            <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
              >mdi-logout-variant</v-icon
            >
          </div>
        </a>

        <v-snackbar bottom right :value="updateExists" :timeout="3000" color="primary">
          نسخه جدید در دسترس است
          <v-btn text @click="refreshApp" small>
            به‌روزرسانی
          </v-btn>
        </v-snackbar>
      </div>

      <div v-else class="pt-3 mr-2 d-flex justify-between">
        <div>
          <router-link class="ml-3" to="/">
            <small>صفحه اصلی</small>
          </router-link>
        </div>

        <div>
          <router-link class="ml-3" to="/login">
            <small>ورود</small>
          </router-link>
        </div>

        <div>
          <a class="ml-3" @click="openDialog">
            <small>ثبت‌نام</small>
          </a>
        </div>

        <div>
          <router-link class="ml-3" to="/guide">
            <small>راهنمای کار با سامانه</small>
          </router-link>
        </div>

        <div style="display: inline">
          <router-link class="ml-3" to="/contact-us">
            <small>ارتباط با ما</small>
          </router-link>
        </div>

        <v-snackbar
          bottom
          right
          :value="updateExists"
          :timeout="3000"
          color="primary"
        >
          نسخه جدید در دسترس است
          <v-btn text @click="refreshApp" small> به‌روزرسانی </v-btn>
        </v-snackbar>

        <!-- <div>
          <router-link class="ml-3" to="/register-charity">
            <small>ثبت‌نام خیریه</small>
          </router-link>
        </div> -->
      </div>

      <Dialog
        :dialogOpen="dialogOpen"
        @update:dialogOpen="updateDialogOpen"
        title="برای دریافت کد  تایید، شماره تلفن همراه خود را وارد نمایید."
      >
        <div slot="dialogText" class="mb-n4">
          <v-alert
            v-if="alert"
            dense
            :color="
              this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)
            "
            type="error"
            icon="mdi-alert-circle-outline"
            border="left"
            class="mb-1"
          >
            {{ alertMessage }}
          </v-alert>
          <Input
            outlined
            dense
            name="phoneNumber"
            type="number"
            v-model.trim="formData.phoneNumber"
            labelTag
            labelText="تلفن همراه"
            placeholder="شماره تلفن همراه خود را وارد نمایید"
            hide_details
            :disabled="isSendVerifycode"
            class="mb-3"
          />

          <div v-if="isSendVerifycode">
            <Input
              outlined
              dense
              name="verifycode"
              type="number"
              v-model.trim="formData.verifycode"
              labelTag
              labelText="کد تایید"
              placeholder="کد تایید ارسال شده را وارد نمایید"
              hide_details
              class="mb-3"
            />

            <v-row no-gutters class="justify-space-between mb-3 mt-7">
              <v-col lg="5" md="12" sm="12" cols="12">
                <Button
                  block
                  small
                  input_value="تایید"
                  @click="checkVerifycode"
                  :disabled="formData.verifycode === ''"
                ></Button>
              </v-col>

              <v-col lg="5" md="12" sm="12" cols="12">
                <Button
                  block
                  small
                  :color="$vuetify.theme.currentTheme.primary"
                  input_value="ویرایش"
                  :class="{ 'mt-3': !$vuetify.breakpoint.mdAndUp }"
                  @click="isSendVerifycode = false"
                ></Button>
              </v-col>
            </v-row>
          </div>

          <Button
            v-else
            input_value="دریافت کد تایید"
            type="button"
            block
            large
            class="mb-3 mt-7"
            @click="getVerifycode"
            :disabled="formData.phoneNumber === ''"
          >
          </Button>
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
import update from "../../mixins/update";

import Dialog from "@/components/basics/Dialog.vue";
import Card from "@/components/basics/Card.vue";
import Input from "@/components/basics/Input.vue";
import Button from "@/components/basics/Button.vue";
import router from "@/router";

export default {
  name: "AppBAr",

  components: {
    Dialog,
    Card,
    Input,
    Button,
  },

  data() {
    return {
      message: `hello1`,
      dialogOpen: false,

      formData: {
        phoneNumber: "",
        verifycode: "",
      },
      isSendVerifycode: false,
      alert: false,
      alertMessage: "",
    };
  },

  mixins: [update],

  methods: {
    closeSnackbar() {
      this.$store.commit("setSnackbar", false);
    },

    openDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    updateDialogOpen(newVal) {
      this.dialogOpen = newVal;
    },
    closeDialogOpen() {
      this.dialogOpen = false;
    },

    profileHandler() {
      if (this.$store.state.role == "User") {
        router.push("/user-profile");
      } else if (this.$store.state.role == "Charity") {
        router.push("/charity-profile");
      } else {
        router.push("/agent-profile");
      }
    },

    logoutHandler() {
      if (this.$route.path !== "/") {
        router.push("/");
      }

      this.$store.commit("setSnackbar", true);
      this.$store.commit(
        "snackbarMessage",
        `شما از حساب کاربری خود با موفقیت خارج شدید.`
      );
      setTimeout(() => {
        this.$store.commit("setSnackbar", false);
      }, 3000);

      this.$store.commit("logout");
    },

    async getVerifycode() {
      const data = this.formData.phoneNumber;

      try {
        this.alert = false;
        await this.$store.dispatch("getVerifycode", { data });
        this.isSendVerifycode = true;
      } catch (error) {
        console.error("Error during get verify code:", error);
        this.alert = true;
        console.log(this.alert);
        this.alertMessage = error;
      }
    },

    async checkVerifycode() {
      console.log(`in appbar formData.phone ${this.formData.phoneNumber}`);
      localStorage.setItem(
        "verificatedPhoneNumber",
        JSON.stringify(this.formData.phoneNumber)
      );
      console.log(
        `appbarrrrr ${JSON.parse(
          localStorage.getItem("verificatedPhoneNumber")
        )}`
      );
      const data = this.formData;
      this.$store.dispatch("checkVerifycode", { data });
      if (this.$route.path !== "/register-benefactor") {
        router.push("/register-benefactor");
      } else if (this.$route.path === "/register-benefactor") {
        router.go();
      } else {
        this.closeDialogOpen();
      }
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

  created() {
    if (this.$store.state.agent.isClickPolygon) {
      this.registerAgentDialog = true;
      const formData = JSON.parse(localStorage.getItem("agentFormData"));
      if (formData) {
        this.formData = formData;
        this.formData.polygon = this.$store.state.agent.polygonPoints;
      }
    }
  },
};
</script>
