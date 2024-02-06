<template>
  <div>
    <AppBar></AppBar>
    <card-with-image>
      <div slot="rightPart">
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
          {{ this.alertMessage }}.
        </v-alert>

        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg">خوش آمدید</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent="onSubmit">
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
            class="mb-3"
          />

          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="formData.password"
            labelTag
            labelText="رمز عبور"
            placeholder="رمز عبور"
            hide_details
          />

          <Button
            :disabled="
              this.formData.phoneNumber === '' || this.formData.password === ''
            "
            input_value="ورود"
            block
            large
            @click="onSubmit"
            class="mb-3 mt-10"
          >
          </Button>
        </v-form>
        <!-- <v-divider class="mt-1 mb-5"></v-divider>

        <p class="ma-0 text-center text--secondary">
          <small>حسابی ندارید؟</small>
          <small>
            <router-link
              to="/register-benefactor"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
              title="Register"
            >
              ثبت نام
            </router-link>
          </small>
        </p> -->
      </div>
    </card-with-image>
  </div>
</template>

<script>
import CardWithImage from "@/components/basics/CardWithImage.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import AppBar from "@/components/basics/AppBar.vue";
import router from "@/router";

export default {
  name: "Login",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },

  data() {
    return {
      formData: {
        phoneNumber: "",
        password: "",
      },

      alert: false,
      alertMessage: "",
    };
  },

  methods: {
    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        this.alert = false;
        await this.$store.dispatch("login", { data });
        // alert.success('fsaf')
        this.$store.commit("setSnackbar", true);
        this.$store.commit("snackbarMessage", `ورود شما با موفقیت انجام شد.`);
        setTimeout(() => {
          this.$store.commit('setSnackbar', false);
        }, 2000);
        router.push("/");
      } catch (error) {
        this.alert = true;
        this.alertMessage = error
        console.error("Error during login:", error);
        // Handle error, show error message, etc.
      }
    },
  },
};
</script>

<style scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 0.2rem;
}
</style>
