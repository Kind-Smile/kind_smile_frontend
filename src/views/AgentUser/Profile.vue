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
            <v-col cols="12" sm="12" md="12" lg="4">
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
                  labelText="شماره تماس"
                  placeholder="شماره تماس"
                  hide_details
                  class="mb-2 mx-2"
                  disabled
                />
              </div>
            </v-col>

            <router-link
              :to="{
                path: '/polygon',
                query: {
                  disable: true,
                },
              }"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
              style="font-size: 0.8rem"
              class="mb-2 mr-5"
              ><div
                @click="clickPolygon"
                :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
              >
                برای نمایش یا تغییر محدوده تحت پوشش اینجا کلیک کنید.
              </div>
            </router-link>

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
                :disabled="this.formData.name === ''"
              >
              </Button>
            </v-col>
          </v-row>
        </v-form>
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
  name: "AgentProfile",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },

  data() {
    return {
      prevRoute: null,
      showFileInput: true,

      formData: {
        name: "",
        phoneNumber: "",
        polygonPoints: [],
        password: "",
      },

      rules: {
        required: [
          (value) => {
            return !!value || "Required.";
          },
        ],
        password: [
          (value) => {
            return value.length >= 8;
          },
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      console.log(`in profile component: ${this.formData}`);
      const data = this.formData;

      try {
        await this.$store.dispatch("editAgentProfile", { data });

        localStorage.removeItem("agentEditProfile");
        this.$updateAgentProperty("isSetAddress", false);
        this.$updateAgentProperty("address", "");
        this.$updateAgentProperty("latitude", 0.0);
        this.$updateAgentProperty("longitude", 0.0);

        this.getAgentProfile();

        this.$store.commit("setSnackbar", true);
        this.$store.commit("snackbarMessage", `تغییرات با موفقیت انجام شد.`);
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);
      } catch (error) {
        console.error("Error during Agent register:", error);
      }
    },

    async getAgentProfile() {
      try {
        await this.$store.dispatch("userProfile");
        this.formData = this.$store.state.responseData;
        this.$store.commit("clearResponseData");

        this.$updateAgentProperty("isSetPolygon", true);

        const coordinatesArray = [];

        for (const point of this.formData.polygon) {
          coordinatesArray.push([point.longitude, point.latitude]);
        }

        this.$updateAgentProperty("polygonPoints", coordinatesArray);

        const path = this.prevRoute.path;
        if (path.includes("polygon")) {
          const formData = JSON.parse(localStorage.getItem("agentEditProfile"));
          if (formData) {
            this.formData = formData;
            this.formData.polygonPoints = this.$store.state.agent.polygonPoints;
          }
        }
      } catch (error) {
        console.error("Error during getAgentProfile in component:", error);
      }
    },

    clickPolygon() {
      localStorage.setItem("agentEditProfile", JSON.stringify(this.formData));
      this.$updateAgentProperty("isClickPolygon", true);
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  mounted() {
    this.getAgentProfile();
  },

  watch: {
    formData: {
      handler() {
        localStorage.setItem("agentEditProfile", JSON.stringify(this.formData));
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
