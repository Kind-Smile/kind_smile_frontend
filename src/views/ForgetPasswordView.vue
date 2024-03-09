<template>
  <div>
    <div v-if="this.$store.state.token != ''">
      <v-img src="@/assets/images/401error.png"></v-img>
    </div>
    <template v-else>
      <AppBar></AppBar>
      <card-with-image>
        <div slot="rightPart">
          <v-toolbar class="elevation-0 mb-3">
            <v-toolbar-title class="mx-auto semi-larg"
              >رمز عبورتان را فراموش کرده اید؟</v-toolbar-title
            >
          </v-toolbar>

          <p>
            <small>
              شماره تماسی که برای ثبت نام استفاده کرده اید را وارد کنید تا کد
              تایید برای شما ارسال شود.
            </small>
          </p>

          <v-form @submit.prevent="onSubmit" class="mt-4 mb-5">
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
              placeholder="تلفن همراه"
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
                v-model.trim="formData.verifyCode"
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
                    :disabled="formData.verifyCode === ''"
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
              v-if="!(isCheckVerifycode || isSendVerifycode)"
              input_value="دریافت کد تایید"
              type="button"
              block
              large
              class="mb-3 mt-10"
              @click="getVerifycode"
              :disabled="formData.phoneNumber === ''"
            >
            </Button>

            <div v-if="isCheckVerifycode">
              <Input
                outlined
                dense
                name="password"
                type="password"
                v-model.trim="formData.password"
                labelTag
                labelText="رمز عبور جدید"
                placeholder="رمز عبور جدید"
                hide_details
                class="mb-3"
              />

              <Input
                outlined
                dense
                name="password"
                type="password"
                v-model.trim="formData.confirmPassword"
                labelTag
                labelText="تکرار رمز عبور جدید"
                placeholder="تکرار رمز عبور جدید"
                hide_details
              />

              <Button
                :disabled="this.formData.phoneNumber === ''"
                input_value="تغییر رمز عبور"
                type="submit"
                block
                large
                class="mb-3 mt-10"
              >
              </Button>
            </div>

          </v-form>

          <v-divider class="mt-1 mb-5"></v-divider>

          <p class="ma-0 text-center text--secondary">
            <small>رمز عبور خود را به خاطر آوردید؟</small>
            <small>
              <router-link
                to="/login"
                :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                title="forgetPassword"
              >
                ورود
              </router-link>
            </small>
          </p>
        </div>
      </card-with-image>
    </template>
  </div>
</template>

<script>
import CardWithImage from "@/components/basics/CardWithImage.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import AppBar from "@/components/basics/AppBar.vue";
import router from "@/router";

export default {
  name: "ForgetPassword",
  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },
  data() {
    return {
      alert: false,
      alertMessage: "",

      isSendVerifycode: false,
      isCheckVerifycode: false,

      formData: {
        phoneNumber: "",
        verifyCode: "",
        password: "",
        confirmPassword: "",
      },

      items: [
        {
          src: require("../assets/images/clothes.png"),
        },
        {
          src: require("../assets/images/food.png"),
        },
        {
          src: require("../assets/images/money.png"),
        },
      ],
    };
  },
  methods: {
    async getVerifycode() {
      const data = this.formData.phoneNumber;

      try {
        await this.$store.dispatch("getVerifycodeForResetPassword", { data });
        this.isSendVerifycode = true;
      } catch (error) {
        console.error("Error during get verify code:", error);
      }
    },

    async checkVerifycode() {
      const data = this.formData;

      try {
        this.alert = false;
        await this.$store.dispatch("checkVerifycodeForResetPassword", { data });
        this.isCheckVerifycode = true;
        this.isSendVerifycode= false
      } catch (error) {
        this.alert = true;
        console.log(this.alert);
        this.alertMessage = error;
        console.error("Error during checkVerifycode:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        this.alert = false;
        await this.$store.dispatch("resetPassword", { data });

        this.$store.commit("setSnackbar", true);
        this.$store.commit("snackbarMessage", `تغییر رمز با موفقیت انجام شد. با رمز جدید وارد شوید.`);
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);

        router.push("/login");
      } catch (error) {
        this.alert = true;
        this.alertMessage = error;
        console.error("Error during resetPassword:", error);
        // Handle error, show error message, etc.
      }
    },
  },
};
</script>
