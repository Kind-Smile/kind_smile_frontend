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

        <router-link to="/profile" class="ml-3">
          <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
            >mdi-account-outline</v-icon
          >
        </router-link>

        <a>
          <div style="display: inline" @click="logoutHandler">
            <v-icon :color="$vuetify.theme.currentTheme.text" size="22"
              >mdi-logout-variant</v-icon
            >
          </div>
        </a>

        <!-- <a
          class="mr-3"
          @click="openRegisterAgentDialog"
          v-if="this.$store.state.role == 'Charity'"
        >
          <small>ثبت‌ نماینده جدید</small>
        </a> -->
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
          <router-link class="ml-3" to="/register-charity">
            <small>ثبت‌نام خیریه</small>
          </router-link>
        </div>
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

            <!-- <Button
              input_value="تایید"
              type="button"
              block
              large
              class="mb-3 mt-7"
              @click="checkVerifycode"
              :disabled="formData.verifycode === ''"
            >
            </Button> -->

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

    <!-- <Dialog
      :dialogOpen="registerAgentDialog"
      @update:dialogOpen="updateRegisterAgentDialog"
      title="برای ثبت نماینده جدید، اطلاعات زیر را تکمیل نمایید:"
    >
      <v-form @submit.prevent="onSubmit" slot="dialogText" class="mb-n4">
        <Input
          outlined
          dense
          name="name"
          type="text"
          v-model.trim="agentFormData.name"
          labelTag
          labelText="نام و نام خانوادگی"
          placeholder="نام و نام خانوادگی"
          hide_details
          class="mb-2"
        />

        <Input
          outlined
          dense
          name="phoneNumber"
          type="number"
          v-model.trim="agentFormData.phoneNumber"
          labelTag
          labelText="تلفن همراه"
          placeholder="تلفن همراه"
          hide_details
          class="mb-3"
        />

        <Input
          outlined
          dense
          name="password"
          type="password"
          v-model.trim="agentFormData.password"
          labelTag
          labelText="رمز عبور"
          placeholder="رمز عبور"
          hide_details
          class="mb-7"
        />

        <router-link
          v-if="!this.$store.state.agent.isSetPolygon"
          to="/polygon"
          :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
          class="ma-2 mr-0"
        >
          <div
            @click="clickPolygon"
            :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
          >
            انتخاب محدوده تحت پوشش سفیر مهربانی از روی نقشه
          </div>
        </router-link>

        <router-link
          v-else
          to="/polygon"
          :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
          style="font-size: 0.8rem"
          class="mb-2"
          ><div
            @click="clickPolygon"
            :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
          >
            برای نمایش یا تغییر محدوده تحت پوشش سفیر مهربانی اینجا کلیک کنید.
          </div>
        </router-link>

        <div class="my-5">
          <small
            :style="{ color: $vuetify.theme.currentTheme.primary }"
            class="bold"
            >توجه داشته باشید بایستی رمز عبور مشخص شده در این قسمت را در اختیار
            سفیر خود با شماره تلفن فوق بگذارید.</small
          >
        </div>

        <Button
          input_value="ثبت‌نام"
          type="submit"
          block
          large
          class="mb-3 mt-5"
          :disabled="
            this.agentFormData.name === '' ||
            this.agentFormData.phoneNumber === '' ||
            this.agentFormData.polygon.length === 0 ||
            this.agentFormData.password === ''
          "
        >
        </Button>
      </v-form>
    </Dialog> -->
  </v-card>
</template>

<script>
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
      // agentFormData: {
      //   name: "",
      //   phoneNumber: "",
      //   polygon: this.$store.state.agent.polygonPoints,
      //   password: "",
      // },
      formData: {
        phoneNumber: "",
        verifycode: "",
      },
      isSendVerifycode: false,
      alert: false,
      alertMessage: "",
      // registerAgentDialog: false,
    };
  },

  methods: {
    closeSnackbar() {
      this.$store.commit("setSnackbar", false);
    },

    // openRegisterAgentDialog() {
    //   this.addAgentDialog = !this.addAgentDialog;
    //   this.registerAgentDialog = !this.registerAgentDialog;
    // },
    // updateRegisterAgentDialog(newVal) {
    //   this.registerAgentDialog = newVal;
    // },
    // closeRegisterAgentDialog() {
    //   this.registerAgentDialog = false;
    // },
    // clickPolygon() {
    //   localStorage.setItem("agentFormData", JSON.stringify(this.formData));
    //   this.$updateAgentProperty("isClickPolygon", true);
    // },
    // async onSubmit() {
    //   console.log(this.formData);
    //   const data = this.formData;

    //   try {
    //     await this.$store.dispatch("registerAgent", { data });

    //     localStorage.removeItem("agentFormData");
    //     this.$updateAgentProperty("isClickPolygon", false);
    //     this.$updateAgentProperty("isSetPolygon", false);
    //     this.$updateAgentProperty("polygonPoints", []);

    //     this.closeRegisterAgentDialog();
    //   } catch (error) {
    //     console.error("Error during benefactor register:", error);
    //     // Handle error, show error message, etc.
    //   }
    // },

    openDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    updateDialogOpen(newVal) {
      this.dialogOpen = newVal;
    },
    closeDialogOpen() {
      this.dialogOpen = false;
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
      const data = this.formData;
      this.$store.dispatch("checkVerifycode", { data });
      if (this.$route.path !== "/register-benefactor") {
        router.push("/register-benefactor");
      }if (this.$route.path === "/register-benefactor") {
        router.go();
      }else {
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
