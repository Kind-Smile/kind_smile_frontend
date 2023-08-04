<template>
  <div>
    <AppBar></AppBar>
    <card-with-image>
      <div slot="rightPart">
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
            suffix="| 98+"
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

          <v-row class="ma-1">
            <v-col cols="12" sm="12" md="12" lg="6">
              <v-checkbox
                v-model.trim="formData.rememberMe"
                label="مرا به خاطر بسپار"
                color="info"
                hide-details
              ></v-checkbox>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="6" class="mt-5 mb-0">
              <p class="text-lg-left">
                <small>
                  <a
                    href="/forget-password"
                    :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                    title="Forget Password"
                  >
                    رمز عبورتان را فراموش کرده اید؟
                  </a>
                </small>
              </p>
            </v-col>
          </v-row>

          <Button
            input_value="ورود"
            type="submit"
            dark
            block
            large
            class="mb-3"
          >
          </Button>
        </v-form>
        <v-divider class="mt-1 mb-5"></v-divider>

        <p class="ma-0 text-center text--secondary">
          <small>حسابی ندارید؟</small>
          <small>
            <a
              href="/register"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
              title="Register"
            >
              ثبت نام
            </a>
          </small>
        </p>
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
        rememberMe: false,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
      const data = this.formData;
      // this.$store.dispatch('login', {data})
      // this.$store.commit("login", "absdf");
      // router.push("/");
    },
    logout() {
      this.$store.commit("logout");
      router.push("/");
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
