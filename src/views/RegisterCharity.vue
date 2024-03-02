<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3" :image="false">
      <div slot="rightPart">
        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg"
            >ثبت‌نام خیریه</v-toolbar-title
          >
        </v-toolbar>

        <v-form @submit.prevent="onSubmit" ref="charityForm">
          <v-row class="mb-2 mt-4 justify-start">
            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="name"
                type="text"
                v-model.trim="formData.name"
                labelTag
                labelText="نام خیریه"
                placeholder="نام خیریه"
                prefix=" خیریه"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="boss"
                type="text"
                v-model.trim="formData.boss"
                labelTag
                labelText="نام مدیر"
                placeholder="نام مدیر"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <div class="custom-input-suffix">
                <Input
                  outlined
                  dense
                  name="phoneNumber"
                  type="number"
                  v-model.trim="formData.phoneNumber"
                  labelTag
                  labelText="شماره تلفن"
                  placeholder="شماره تلفن"
                  hide_details
                  class="mb-2 mx-2"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="correlation"
                type="text"
                v-model.trim="formData.correlation"
                labelTag
                labelText="وابسته به"
                placeholder="وابسته به"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
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

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="address"
                type="text"
                v-model.trim="formData.other"
                labelTag
                labelText="آدرس"
                placeholder="آدرس خود را وارد نمایید"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="officer"
                type="text"
                v-model.trim="formData.officer"
                labelTag
                labelText="نام مسئول ارتباط مردمی"
                placeholder="نام مسئول ارتباط مردمی"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="officerPhone"
                type="number"
                v-model.trim="formData.officerPhone"
                labelTag
                labelText="شماره ارتباط مردمی"
                placeholder="شماره ارتباط مردمی"
                hide_details
                append-icon="''"
                class="mb-2 mx-2 custom-input"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="cardNumber"
                type="number"
                v-model.trim="formData.cardNumber"
                labelTag
                labelText="شماره کارت خیریه"
                placeholder="شماره کارت خیریه"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="code"
                type="number"
                v-model.trim="formData.code"
                labelTag
                labelText="شماره ثبت"
                placeholder="شماره ثبت"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <label class="mr-3"> لوگوی خیریه </label>
              <v-file-input
                v-model="formData.logo"
                :rules="rules.fileInput"
                outlined
                color="#ffcc66"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="لوگوی خود را بارگذاری کنید"
                prepend-icon="mdi-camera"
                @change="handleLogoChange"
                class="my-2"
              ></v-file-input
            ></v-col>

            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="4">
                  <label> هیئت امنا </label>
                  <v-textarea
                    outlined
                    clearable
                    hide-details
                    clear-icon="mdi-close"
                    v-model="formData.institute"
                    class="my-2"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="12" md="12" lg="4">
                  <label> توضیحات </label>
                  <v-textarea
                    outlined
                    clearable
                    hide-details
                    clear-icon="mdi-close"
                    v-model="formData.description"
                    class="my-2"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
              v-if="!this.$store.state.charity.isSetAddress"
              class="ma-2 mr-0"
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
                  انتخاب آدرس خیریه از روی نقشه
                </div>
              </router-link>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" v-else class="pa-0">
              <v-col cols="12" sm="12" md="12" lg="12">
                <Input
                  outlined
                  dense
                  name="address"
                  type="text"
                  v-model="formData.address"
                  :value="this.$store.state.charity.address"
                  labelTag
                  labelText="آدرس"
                  placeholder="آدرس"
                  hide_details
                  disabled
                />
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" class="pt-0">
                <router-link
                  :to="{
                    path: '/map',
                    query: { coordinates: this.coordinates },
                  }"
                  style="font-size: 0.8rem"
                  class="mb-2"
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
                block
                large
                class="my-2"
                :disabled="
                  this.formData.name === '' ||
                  this.formData.boss === '' ||
                  this.formData.phoneNumber === '' ||
                  this.formData.selectedState === '' ||
                  this.formData.other === '' ||
                  this.formData.cardNumber === '' ||
                  this.formData.code === '' ||
                  this.formData.logo === '' ||
                  this.formData.address === '' ||
                  this.formData.password === ''
                "
              >
                  <!-- this.formData.officer === '' ||
                  this.formData.officerPhone === '' ||
                  this.formData.institute === '' || -->
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
  name: "RegisterCharity",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },

  data() {
    return {
      prevRoute: null,

      formData: {
        name: "",
        boss: "",
        phoneNumber: "",
        correlation: "",
        selectedState: "",
        other: "",
        officer: "",
        officerPhone: "",
        cardNumber: "",
        code: "",
        logo: null,
        institute: "",
        description: "",
        address: this.$store.state.charity.address,
        latitude: this.$store.state.charity.latitude,
        longitude: this.$store.state.charity.longitude,
        password: "",
      },

      selectedState: "",

      coordinates: [51.420296, 35.732379],

      rules: {
        required: [
          (value) => {
            return !!value || "Required.";
          },
        ],
        email: [
          (value) => {
            const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
        ],
        password: [
          (value) => {
            return value.length >= 8;
          },
        ],
        fileInput: [
          (value) => {
            return (
              !value ||
              value.size < 5000000 ||
              "حجم فایل لوگوی شما باید کمتر از ۵ مگابایت باشد."
            );
          },
        ],
      },
    };
  },

  methods: {
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

    clickAddress() {
      this.$updateCharityProperty("isClickAddress", true);
    },

    handleLogoChange(event) {
      const file = event;
      if (file) {
        this.formData.logo = file;
      }
    },

    async onSubmit() {
      this.formData.selectedState = this.selectedState;
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("registerCharity", { data });

        localStorage.removeItem("charityFormData");
        this.$updateCharityProperty("isSetAddress", false);
        this.$updateCharityProperty("address", "");
        this.$updateCharityProperty("latitude", 0.0);
        this.$updateCharityProperty("longitude", 0.0);

        router.push("/login");
      } catch (error) {
        console.error("Error during charity register:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  mounted() {
    const path = this.prevRoute.path;
    if (path.includes("map")) {
      const formData = JSON.parse(localStorage.getItem("charityFormData"));
      console.log(`----------------------- ${JSON.stringify(formData)}`);
      if (formData) {
        this.formData = formData;
        this.formData.address = this.$store.state.charity.address;
        this.formData.latitude = this.$store.state.charity.latitude;
        this.formData.longitude = this.$store.state.charity.longitude;
        if (this.formData.address == "") {
          this.formData.selectedState = "";
        }
        this.stateSelectedName();
      }

      if (this.$store.state.charity.isSetAddress) {
        this.coordinates[0] = this.$store.state.charity.longitude;
        this.coordinates[1] = this.$store.state.charity.latitude;
      }
    }
  },

  watch: {
    formData: {
      handler() {
        localStorage.setItem("charityFormData", JSON.stringify(this.formData));
      },
      deep: true,
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
};
</script>

<style>
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  min-height: 40px;
}

.autocomplete input[type="text"] {
  caret-color: #ffcc66;
}

.v-text-field__suffix {
  color: #312e2e;
}

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
