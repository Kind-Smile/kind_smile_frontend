<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3">
      <div slot="rightPart">
        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg"
            >ثبت‌نام نیکوکار مهربان</v-toolbar-title
          >
        </v-toolbar>

        <v-form @submit.prevent="onSubmit" ref="benefactorForm">
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
                disabled
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
              <router-link
                :to="{
                  path: '/map',
                  query: { coordinates: this.coordinates },
                }"
              >
                <div
                  @click="clickAddress"
                  :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                >
                  انتخاب آدرس از روی نقشه
                </div>
              </router-link>
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
                <router-link
                  :to="{
                    path: '/map',
                    query: { coordinates: this.coordinates },
                  }"
                  style="font-size: 0.8rem"
                  class="mb-2"
                  @click="clickAddress"
                >
                  <div
                    @click="clickAddress"
                    :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                  >
                    برای تغییر آدرس اینجا کلیک کنید.
                  </div>
                </router-link>
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
                class="mb-n2"
              />
              <!-- :rules="[rules.password]" -->
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <Button
                input_value="ثبت نام"
                type="submit"
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
          <small>حساب کاربری دارید؟</small>
          <small>
            <router-link
              to="/login"
              title="login"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
            >
              ورود
            </router-link>
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
        latitude: this.$store.state.benefactor.latitude,
        longitude: this.$store.state.benefactor.longitude,
        password: "",
      },

      coordinates: [51.420296, 35.732379],

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
    clickAddress() {
      localStorage.setItem("benefactorFormData", JSON.stringify(this.formData));
      this.$updateBenefactorProperty("isClickAddress", true);
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("registerBenefactor", { data });

        localStorage.removeItem("benefactorFormData");
        this.$refs.benefactorForm.reset();
        this.$updateBenefactorProperty("isSetAddress", false);
        this.$updateBenefactorProperty("address", "");
        this.$updateBenefactorProperty("latitude", 0.0);
        this.$updateBenefactorProperty("longitude", 0.0);
        this.$store.commit("updateVerificatedPhoneNumber", "");

        router.push("/");
      } catch (error) {
        console.error("Error during benefactor register:", error);
        // Handle error, show error message, etc.
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  mounted() {
    this.formData.phoneNumber = this.$store.state.verificatedPhoneNumber;

    const formData = JSON.parse(localStorage.getItem("benefactorFormData"));
    if (formData) {
      this.formData = formData;
      this.formData.address = this.$store.state.benefactor.address;
      this.formData.latitude = this.$store.state.benefactor.latitude;
      this.formData.longitude = this.$store.state.benefactor.longitude;
    }

    if (this.$store.state.benefactor.isSetAddress) {
      this.coordinates[0] = this.$store.state.benefactor.longitude;
      this.coordinates[1] = this.$store.state.benefactor.latitude;
    }
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
