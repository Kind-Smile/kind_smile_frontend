<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3">
      <div slot="rightPart">
        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg"
            >ثبت‌نام فرد نیکوکار</v-toolbar-title
          >
        </v-toolbar>

        <v-form @submit.prevent="onSubmit">
          <v-row class="mb-2 mt-4 justify-space-between">
            <v-col cols="12" sm="12" md="12" lg="6">
              <Input
                outlined
                dense
                name="name"
                type="text"
                v-model.trim="formData.name"
                labelTag
                labelText="نام و نام خانوادگی"
                placeholder="نام و نام خانوادگی"
                hide_details
                class="mb-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="6">
              <Input
                outlined
                dense
                name="phoneNumber"
                type="number"
                v-model.trim="formData.phoneNumber"
                labelTag
                labelText="شماره تماس"
                placeholder="شماره تماس"
                suffix="| 98+"
                hide_details
                class="mb-2"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="6"
              v-if="!this.$store.state.benefactor.isSetAddress"
              class="my-3"
            >
              <a
                href="/map"
                :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                @click="this.$store.state.benefactor.isClick=true"
                >انتخاب آدرس از روی نقشه</a
              >
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" v-else>
              <v-col cols="12" sm="12" md="12" lg="12">
                <Input
                  outlined
                  dense
                  name="address"
                  type="text"
                  v-model="formData.address"
                  :value="this.$store.state.benefactor.address"
                  labelTag
                  labelText="آدرس"
                  placeholder="آدرس"
                  hide_details
                  disabled
                />
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12">
                <a
                  href="/map"
                  :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                  style="font-size: 0.8rem"
                  class="mb-2"
                  @click="this.$store.state.benefactor.isClick=true"
                  >برای تغییر آدرس اینجا کلیک کنید.</a
                >
              </v-col>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12">
              <Input
                outlined
                dense
                name="password"
                type="password"
                v-model.trim="formData.password"
                labelTag
                labelText="رمز عبور"
                placeholder="رمز عبور"
                hint="حداقل 8 کاراکتر"
                :rules="[rules.password]"
                class="mb-n2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <Button
                input_value="ثبت نام"
                type="submit"
                :color="$vuetify.theme.currentTheme.thirdColor"
                dark
                block
                large
                class="my-2"
              >
              </Button>
            </v-col>
          </v-row>
        </v-form>
        <v-divider class="mt-1 mb-5"></v-divider>

        <p class="ma-0 text-center text--secondary">
          <small>حسابی ندارید؟</small>
          <small>
            <a
              href="/register"
              title="Register"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
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
  name: "RegisterBenefactor",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },

  data() {
    return {
      formData: {
        name: "",
        phoneNumber: "",
        address: this.$store.state.benefactor.address,
        password: "",
      },
      rules: {
        required: (value) => {
          return !!value || "Required.";
        },
        email: (value) => {
          const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          return value.length >= 8;
        },
      },
    };
  },

  methods: {
    onSubmit() {
      console.log(this.formData);
      const data = this.formData;
      // this.$store.dispatch('login', {data})
      this.$store.commit("login", "absdf");
      router.push("/");
    },
    logout() {
      this.$store.commit("logout");
      router.push("/");
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
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
