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

        <router-link to="#" class="ml-3">
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
      </div>

      <div v-else class="pt-3 mr-2 d-flex justify-between">
        <div>
          <router-link class="ml-3" to="/">
            <small>صفحه اصلی</small>
          </router-link>
        </div>

        <div>
          <a class="ml-3" @click="openDialog">
            <small>ثبت‌نام</small>
          </a>
        </div>

        <div>
          <router-link class="ml-3" to="/login">
            <small>ورود</small>
          </router-link>
        </div>

        <!-- <div>
          <router-link to="/register-charity">
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

            <Button
              input_value="تایید"
              type="button"
              block
              large
              class="mb-3 mt-7"
              @click="checkVerifycode"
              :disabled="formData.verifycode === ''"
            >
            </Button>
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
      dialogOpen: false,

      formData: {
        phoneNumber: "",
        verifycode: "",
      },
      isSendVerifycode: false,
    };
  },

  methods: {
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

      this.$store.commit("logout");
    },

    async getVerifycode() {
      const data = this.formData.phoneNumber;
      this.$store.dispatch("getVerifycode", { data });
      this.isSendVerifycode = true;
    },

    async checkVerifycode() {
      console.log(`in appbar formData.phone ${this.formData.phoneNumber}`)
      this.$store.commit(
        "updateVerificatedPhoneNumber",
        this.formData.phoneNumber
      );
      console.log(this.$store.state.verificatedPhoneNumber)
      const data = this.formData;
      this.$store.dispatch("checkVerifycode", { data });
      if (this.$route.path !== "/register-benefactor"){
        router.push("/register-benefactor");
      }else{
        this.closeDialogOpen()
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
};
</script>
