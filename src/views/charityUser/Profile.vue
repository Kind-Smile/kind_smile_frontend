<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3" :image="false">
      <div slot="rightPart">
        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg"
            >اطلاعات حساب کاربری</v-toolbar-title
          >
        </v-toolbar>

        <v-form @submit.prevent="onSubmit" ref="editProfileForm">
          <v-row class="mb-2 mt-4 justify-start">
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-badge
                bottom
                overlap
                class="custom-badge"
                offset-x="25"
                offset-y="20"
              >
                <!-- d-flex justify-center -->
                <v-icon slot="badge" style="z-index: 1" @click="changeLogo">
                  mdi-account-edit
                </v-icon>

                <v-avatar
                  size="80"
                  style="border: 2px solid #312e2e3b"
                  class="pa-12"
                >
                  <img :src="formData.logo" />
                </v-avatar>
              </v-badge>

              <v-file-input
                v-model="formData.newLogo"
                :rules="rules.fileInput"
                outlined
                color="#ffcc66"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="لوگوی خود را بارگذاری کنید"
                prepend-icon=""
                @change="handleLogoChange"
                class="my-2"
                hide-input
                id="fileUpload"
              ></v-file-input>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <a class="ml-3" @click="openAgentListDialog">
                    <small
                      :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                      >مشاهده لیست نماینده‌های خیریه</small
                    >
                  </a>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <a class="ml-3" @click="openAddAgentDialogInProfile">
                    <small
                      :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                      >افزودن نماینده جدید</small
                    >
                  </a>
                </v-col>
              </v-row>
            </v-col>

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
                labelText="نام مدیر عامل"
                placeholder="نام مدیر عامل"
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
                  disabled
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
                disabled
              />
            </v-col>

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

            <!-- <v-col
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
              </v-col> -->

            <!-- v-else -->
            <v-col cols="12" sm="12" md="12" lg="12" class="pa-0">
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

            <!-- <v-col cols="12" sm="12" md="12" lg="12">
              <Input
                outlined
                dense
                name="password"
                type="password"
                v-model.trim="formData.password"
                labelTag
                labelText="رمز عبور"
                placeholder="رمز عبور"
                hint="رمز شما باید شامل ترکیبی از اعداد و حروف با حداقل طول ۸ باشد"
                class="mb-n2"
              />
            </v-col> -->
            <!-- :rules="[rules.password]" -->

            <v-col cols="12" sm="12" md="12">
              <Button
                input_value="ثبت تغییرات"
                type="submit"
                block
                large
                class="my-2"
                :disabled="
                    this.formData.name === '' ||
                    this.formData.boss === '' ||
                    this.formData.phoneNumber === '' ||
                    this.formData.officer === '' ||
                    this.formData.officerPhone === '' ||
                    this.formData.cardNumber === '' ||
                    this.formData.code === '' ||
                    this.formData.logo === null ||
                    this.formData.institute === ''
                  "
              >
              </Button>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </card-with-image>

    <Dialog
      :dialogOpen="addAgentInProfileDialog"
      @update:dialogOpen="updatAddAgentDialogInProfile"
      title="برای ثبت نماینده جدید، اطلاعات زیر را تکمیل نمایید:"
    >
      <div slot="dialogText">
        <v-alert
          v-if="registerAlert"
          dense
          :color="
            this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)
          "
          type="error"
          icon="mdi-alert-circle-outline"
          border="left"
          class="mb-1"
        >
          {{ registerAlertMessage }}
        </v-alert>

        <v-form @submit.prevent="onSubmitAddAgent" class="mb-n4">
          <Input
            outlined
            dense
            name="name"
            type="text"
            v-model.trim="addAgentFormData.name"
            labelTag
            labelText="نام و نام خانوادگی سفیر"
            placeholder="نام و نام خانوادگی سفیر"
            hide_details
            class="mb-2"
          />

          <Input
            outlined
            dense
            name="phoneNumber"
            type="number"
            v-model.trim="addAgentFormData.phoneNumber"
            labelTag
            labelText="تلفن همراه سفیر"
            placeholder="تلفن همراه سفیر"
            hide_details
            class="mb-3"
          />

          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="addAgentFormData.password"
            labelTag
            labelText="رمز عبور"
            placeholder="رمز عبور"
            hide_details
            class="mb-3"
          />

          <Input
            outlined
            dense
            name="confirmPassword"
            type="password"
            v-model.trim="addAgentFormData.confirmPassword"
            labelTag
            labelText="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
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
              محدوده مکانی مورد نظر شما انتخاب شده است. برای نمایش یا تغییر
              محدوده تحت پوشش سفیر مهربانی اینجا کلیک کنید.
            </div>
          </router-link>

          <div class="my-5">
            <small
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
              >توجه داشته باشید بایستی رمز عبور مشخص شده در این قسمت را در
              اختیار سفیر خود با شماره تلفن فوق بگذارید.</small
            >
          </div>

          <Button
            input_value="ثبت‌نام"
            type="submit"
            block
            large
            class="mb-3 mt-5"
            :disabled="
              this.addAgentFormData.name === '' ||
              this.addAgentFormData.phoneNumber === '' ||
              this.addAgentFormData.polygon.length === 0 ||
              this.addAgentFormData.password === '' ||
              this.addAgentFormData.confirmPassword === ''
            "
          >
          </Button>
        </v-form>
      </div>
    </Dialog>

    <Dialog
      :dialogOpen="agentListDialog"
      @update:dialogOpen="updateAgentListDialog"
    >
      <template v-for="agent in agentList" slot="dialogText">
        <v-col lg="12" md="12" sm="12" cols="12" :key="agent.id">
          <Card title text :image="false">
            <div
              slot="cardTitle"
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="semiSmall bold mt-n5"
            >
              {{ agent.name }}
            </div>

            <div slot="cardText">
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <div class="mb-1">
                    <p style="display: inline" class="ml-1">شماره تماس:</p>
                    <p style="display: inline">
                      <b>{{ agent.phoneNumber }}</b>
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <Button
                    input_value="حذف"
                    :color="$vuetify.theme.currentTheme.primary"
                    type="button"
                    small
                    dark
                    :block="!$vuetify.breakpoint.mdAndUp"
                    @click="deleteAgent(agent)"
                  ></Button>
                </v-col>
              </v-row>
            </div>
          </Card>
        </v-col>
      </template>
    </Dialog>
  </div>
</template>

<script>
import CardWithImage from "@/components/basics/CardWithImage.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import AppBar from "@/components/basics/AppBar.vue";
import Dialog from "@/components/basics/Dialog.vue";
import Card from "@/components/basics/Card.vue";
import router from "@/router";

export default {
  name: "CharityProfile",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
    Dialog,
    Card,
  },

  data() {
    return {
      prevRoute: null,
      showFileInput: true,

      formData: {
        name: "",
        boss: "",
        phoneNumber: "",
        correlation: "",
        other: "",
        officer: "",
        officerPhone: "",
        cardNumber: "",
        code: "",
        logo: null,
        newLogo: null,
        institute: "",
        description: "",
        address: this.$store.state.charity.address,
        latitude: this.$store.state.charity.latitude,
        longitude: this.$store.state.charity.longitude,
        password: "",
      },

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

      //add agent
      addAgentInProfileDialog: false,

      //agentList
      agentListDialog: false,

      agentList: [],

      addAgentFormData: {
        name: "",
        phoneNumber: "",
        polygon: this.$store.state.agent.polygonPoints,
        password: "",
        confirmPassword: "",
      },

      registerAlert: false,
      registerAlertMessage: "",
    };
  },

  methods: {
    clickAddress() {
      this.$updateCharityProperty("isClickAddress", true);
    },

    handleLogoChange(event) {
      const file = event;
      if (file) {
        this.formData.newLogo = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.logo = e.target.result;
        };
        reader.readAsDataURL(this.formData.newLogo);
      }
    },

    changeLogo() {
      let fileUpload = document.getElementById("fileUpload");
      if (fileUpload != null) {
        fileUpload.click();
      }
    },

    async onSubmit() {
      console.log(`in profile component: ${this.formData}`);
      const data = this.formData;

      try {
        await this.$store.dispatch("editCharityProfile", { data });

        localStorage.removeItem("charityEditProfile");
        this.$updateCharityProperty("isSetAddress", false);
        this.$updateCharityProperty("address", "");
        this.$updateCharityProperty("latitude", 0.0);
        this.$updateCharityProperty("longitude", 0.0);

        this.getCharityProfile();

        this.$store.commit("setSnackbar", true);
        this.$store.commit("snackbarMessage", `تغییرات با موفقیت انجام شد.`);
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);
      } catch (error) {
        console.error("Error during charity register:", error);
      }
    },

    async getCharityProfile() {
      try {
        await this.$store.dispatch("userProfile");
        this.formData = this.$store.state.responseData;
        console.log(this.formData);
        this.$store.commit("clearResponseData");

        this.coordinates[0] = this.formData.longitude;
        this.coordinates[1] = this.formData.latitude;

        this.$updateCharityProperty("isSetAddress", true);

        const path = this.prevRoute.path;
        if (path.includes("map")) {
          const formData = JSON.parse(
            localStorage.getItem("charityEditProfile")
          );
          if (formData) {
            this.formData = formData;
            this.formData.address = this.$store.state.charity.address;
            this.formData.latitude = this.$store.state.charity.latitude;
            this.formData.longitude = this.$store.state.charity.longitude;
          }

          if (this.$store.state.charity.isSetAddress) {
            this.coordinates[0] = this.$store.state.charity.longitude;
            this.coordinates[1] = this.$store.state.charity.latitude;
          }
        }
      } catch (error) {
        console.error("Error during getCharityProfile in component:", error);
      }
    },

    //handle AddAgent
    openAddAgentDialogInProfile() {
      this.addAgentInProfileDialog = !this.addAgentInProfileDialog;
    },
    updatAddAgentDialogInProfile(newVal) {
      this.addAgentInProfileDialog = newVal;
    },
    closeAddAgentDialogInProfile() {
      this.addAgentInProfileDialog = false;
    },

    //handle AgentList
    openAgentListDialog() {
      this.getAgentList();
      this.agentListDialog = !this.agentListDialog;
    },
    updateAgentListDialog(newVal) {
      this.agentListDialog = newVal;
    },
    closeAgentListDialog() {
      this.agentListDialog = false;
    },

    async getAgentList() {
      try {
        await this.$store.dispatch("getAgentList");
        this.agentList = this.$store.state.responseData;
        console.log(this.$store.state.responseData);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getAgentList in component:", error);
      }
    },

    async deleteAgent(agent) {
      console.log(agent)
      console.log(agent.id)
      const id = agent.id
      try {
        await this.$store.dispatch("deleteAgent", { id });
        this.getAgentList();
      } catch (error) {
        console.error("Error during getAgentList in component:", error);
      }
    },

    clickPolygon() {
      localStorage.setItem(
        "addAgentFormData",
        JSON.stringify(this.addAgentFormData)
      );
      this.$updateAgentProperty("isClickPolygon", true);
    },

    async onSubmitAddAgent() {
      console.log(this.addAgentFormData);
      const data = this.addAgentFormData;

      try {
        this.registerAlert = false;
        await this.$store.dispatch("registerAgent", { data });

        localStorage.removeItem("addAgentFormData");
        this.$updateAgentProperty("isClickPolygon", false);
        this.$updateAgentProperty("isSetPolygon", false);
        this.$updateAgentProperty("polygonPoints", []);

        this.$store.commit("setSnackbar", true);
        this.$store.commit(
          "snackbarMessage",
          `اطلاعات سفیر جدید با موفقیت ثبت شد.`
        );
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);

        this.closeAddAgentDialogInProfile();
      } catch (error) {
        console.error("Error during agent register:", error);
        this.registerAlert = true;
        this.registerAlertMessage = error;
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  mounted() {
    this.getCharityProfile();

    if (this.$store.state.agent.isClickPolygon) {
      this.addAgentInProfileDialog = true;
      const formData = JSON.parse(localStorage.getItem("addAgentFormData"));
      if (formData) {
        this.addAgentFormData = formData;
        this.addAgentFormData.polygon = this.$store.state.agent.polygonPoints;
      }
    }
  },

  watch: {
    formData: {
      handler() {
        localStorage.setItem(
          "charityEditProfile",
          JSON.stringify(this.formData)
        );
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
