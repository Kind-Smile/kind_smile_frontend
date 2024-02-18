<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3">
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
                v-model="formData.phoneNumber"
                labelTag
                labelText="شماره تماس"
                placeholder="شماره تماس"
                hide_details
                disabled
                class="mb-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12">
              <label> معرفی شده توسط </label>
              <v-autocomplete
                outlined
                v-model="formData.selectedRocommender"
                :items="this.charityList"
                hide-details
                placeholder="معرف خود را انتخاب کنید"
                class="ma-2"
              >
                <!-- item-text="name"
                item-value="id"
                @change="rocommenderSelectedName" -->
              </v-autocomplete>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12">
              <label> استان </label>
              <v-autocomplete
                outlined
                v-model="formData.selectedState"
                :items="this.$store.state.states"
                item-text="name"
                item-value="id"
                hide-details
                placeholder="استان خود را انتخاب کنید"
                @change="stateSelectedName"
                class="ma-2"
              >
              </v-autocomplete>
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
                hint="حداقل 8 کاراکتر و دارای حداقل یک حرف"
                class="mb-n2"
              />
              <!-- :rules="[rules.password]" -->
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12">
              <Input
                outlined
                dense
                name="confirmPassword"
                type="password"
                v-model.trim="formData.confirmPassword"
                labelTag
                labelText="تکرار رمز عبور"
                placeholder="تکرار رمز عبور"
                hint="رمز عبور را تکرار کنید"
                class="mb-n2"
              />
              <!-- :rules="[rules.password]" -->
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <Button
                input_value="ثبت نام"
                type="submit"
                block
                large
                class="my-2"
                :disabled="
                  this.formData.name === '' ||
                  this.formData.phoneNumber === '' ||
                  this.formData.address === '' ||
                  this.formData.password === '' ||
                  this.formData.confirmPassword === ''
                "
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
        phoneNumber: JSON.parse(localStorage.getItem("benefactorFormData")),
        selectedState: "",
        address: this.$store.state.benefactor.address,
        latitude: this.$store.state.benefactor.latitude,
        longitude: this.$store.state.benefactor.longitude,
        selectedRocommender: "",
        password: "",
        confirmPassword: "",
      },

      charityList: [],
      selectedRocommender: "",
      rocommender: "",

      coordinates: [51.420296, 35.732379],

      alert: false,
      alertMessage: "",

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
    async getCharityList() {
      try {
        await this.$store.dispatch("getCharityList");
        this.charityList = this.$store.state.responseData;
        console.log(this.$store.state.responseData);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getCharityList in component:", error);
      }
    },

    stateSelectedName() {
      const selectedStateObject = this.$store.state.states.find(
        (state) => state.id == this.formData.selectedState
      );

      if (selectedStateObject) {
        this.selectedState = selectedStateObject.name;
        if (!this.$store.state.charity.isSetAddress) {
          this.coordinates[1] = selectedStateObject.latitude;
          this.coordinates[0] = selectedStateObject.longitude;
        }
      }
    },

    // rocommenderSelectedName() {
    //   const selectedRocommenderObject = this.charityList.find(
    //     (state) => state.id == this.formData.selectedRocommender
    //   );

    //   if (selectedRocommenderObject) {
    //     this.selectedRocommender = selectedRocommenderObject.name;
    //   }
    // },

    clickAddress() {
      localStorage.setItem("benefactorFormData", JSON.stringify(this.formData));
      this.$updateBenefactorProperty("isClickAddress", true);
    },

    async onSubmit() {
      this.formData.selectedState = this.selectedState;
      // this.formData.selectedRocommender = this.selectedRocommender;
      console.log(this.formData);
      const data = this.formData;

      try {
        this.alert = false;
        await this.$store.dispatch("registerBenefactor", { data });

        localStorage.removeItem("benefactorFormData");
        this.$refs.benefactorForm.reset();
        this.formData.selectedState = "";
        this.formData.selectedRocommender = "";
        this.$updateBenefactorProperty("isSetAddress", false);
        this.$updateBenefactorProperty("address", "");
        this.$updateBenefactorProperty("latitude", 0.0);
        this.$updateBenefactorProperty("longitude", 0.0);
        // this.$store.commit("updateVerificatedPhoneNumber", "");
        localStorage.removeItem("verificatedPhoneNumber");

        this.$store.commit("setSnackbar", true);
        this.$store.commit(
          "snackbarMessage",
          `ثبت نام و ورود شما با موفقیت انجام شد.`
        );
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);

        router.push("/");
      } catch (error) {
        this.alert = true;
        this.alertMessage = error
        console.error("Error during benefactor register:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  created() {
    this.getCharityList();
    const formData = JSON.parse(localStorage.getItem("benefactorFormData"));
    const phone = JSON.parse(localStorage.getItem("verificatedPhoneNumber"));
    this.formData.phoneNumber = phone;
    // console.log(this.$store.state.verificatedPhoneNumber);
    if (formData) {
      this.formData = formData;
      this.formData.address = this.$store.state.benefactor.address;
      this.formData.latitude = this.$store.state.benefactor.latitude;
      this.formData.longitude = this.$store.state.benefactor.longitude;
      // this.formData.phoneNumber = this.$store.state.verificatedPhoneNumber;
      if (this.formData.address == "") {
        this.formData.selectedState = "";
      }
      this.stateSelectedName();
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
