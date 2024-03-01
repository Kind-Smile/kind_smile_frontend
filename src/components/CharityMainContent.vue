<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="3" md="4" sm="4" cols="12">
        <a>
          <v-hover v-slot="{ hover }">
            <div @click="charityAgentList('foods')">
              <Card
                :cardColor="getCardColor"
                title
                localImage
                cardImage="food.png"
                :hover="hover"
                :elevationValue="1"
              >
                <div
                  slot="cardTitle"
                  :style="{ color: $vuetify.theme.currentTheme.primary }"
                  class="bold pt-1"
                >
                  سفره مهربانی
                </div>
              </Card>
            </div>
          </v-hover>
        </a>
      </v-col>

      <v-col lg="3" md="4" sm="4" cols="12">
        <a>
          <v-hover v-slot="{ hover }">
            <div @click="charityAgentList('clothes')">
              <Card
                :cardColor="getCardColor"
                title
                localImage
                cardImage="clothes.png"
                :hover="hover"
                :elevationValue="1"
              >
                <div
                  slot="cardTitle"
                  :style="{ color: $vuetify.theme.currentTheme.primary }"
                  class="bold pt-1"
                >
                  پوشاک مهربانی
                </div>
              </Card>
            </div>
          </v-hover>
        </a>
      </v-col>

      <v-col lg="3" md="4" sm="4" cols="12">
        <router-link :to="`/charity-money`">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              localImage
              cardImage="money.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold pt-1"
              >
                هدیه مهربانی
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>

      <v-col lg="3" md="4" sm="4" cols="12">
        <router-link :to="`/charity-notifications`">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              localImage
              cardImage="notifications.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold pt-1"
              >
                اخبار مهربانی
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>

    <Dialog
      :dialogOpen="addAgentDialog"
      @update:dialogOpen="updateAddAgentDialog"
      title="شما برای خیریه خود نماینده‌ای ثبت نکرده‌اید. در صورت تمایل می‌توانید نماینده خود را اضافه نمایید:"
      @close="closeAddAgentDialog"
    >
      <div slot="dialogText" class="mb-n4">
        <Button
          input_value="ثبت نماینده خیریه"
          type="button"
          :color="this.$vuetify.theme.currentTheme.primary"
          dark
          block
          large
          @click="openRegisterAgentDialog"
          class="mb-3 mt-7"
        >
        </Button>
      </div>
    </Dialog>

    <Dialog
      :dialogOpen="registerAgentDialog"
      @update:dialogOpen="updateRegisterAgentDialog"
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

        <v-form @submit.prevent="onSubmit" class="mb-n4">
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
            class="mb-3"
          />

          <Input
            outlined
            dense
            name="confirmPassword"
            type="password"
            v-model.trim="formData.confirmPassword"
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
              محدوده مکانی مورد نظر شما انتخاب شده است. برای نمایش یا تغییر محدوده تحت پوشش سفیر مهربانی اینجا کلیک کنید.
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
              this.formData.name === '' ||
              this.formData.phoneNumber === '' ||
              this.formData.polygon.length === 0 ||
              this.formData.password === '' ||
              this.formData.confirmPassword === ''
            "
          >
          </Button>
        </v-form>
      </div>
    </Dialog>

    <Dialog
      v-if="!hasChangePass"
      :dialogOpen="changePassDialog"
      @update:dialogOpen="updateChangePassDialog"
      title="برای حفظ امنیت، در اولین ورود به سامانه باید رمز عبور خود را تغییر دهید."
      :closeButton="false"
    >
      <div slot="dialogText">
        <v-alert
          v-if="changePassAlert"
          dense
          :color="
            this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)
          "
          type="error"
          icon="mdi-alert-circle-outline"
          border="left"
          class="mb-1"
        >
          {{ changePassAlertMessage }}
        </v-alert>

        <v-form @submit.prevent="changePass" class="mb-n4">
          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="changePassFormData.oldPassword"
            labelTag
            labelText="رمز عبور قبلی"
            placeholder="رمز عبور قبلی"
            class="mb-n2"
          />

          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="changePassFormData.newPassword"
            labelTag
            labelText="رمز عبور جدید"
            placeholder="رمز عبور جدید"
            hint="حداقل 8 کاراکتر"
            class="mb-n2"
          />

          <Button
            input_value="تغییر رمز"
            type="submit"
            block
            large
            class="mb-3 mt-5"
            :disabled="
              this.changePassFormData.oldPassword === '' ||
              this.changePassFormData.newPassword === ''
            "
          >
          </Button>
        </v-form>
      </div>
    </Dialog>
  </v-main>
</template>

<script>
import Card from "@/components/basics/Card.vue";
import Dialog from "@/components/basics/Dialog.vue";
import Input from "@/components/basics/Input.vue";
import Button from "@/components/basics/Button.vue";
import router from "@/router";

export default {
  name: "CharityMainContent",

  components: {
    Card,
    Dialog,
    Input,
    Button,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  data() {
    return {
      hasChangePass: false,
      changePassDialog: true,

      changePassFormData: {
        oldPassword: "",
        newPassword: "",
      },

      addAgentDialog: false,
      registerAgentDialog: false,

      formData: {
        name: "",
        phoneNumber: "",
        polygon: this.$store.state.agent.polygonPoints,
        password: "",
        confirmPassword: "",
      },

      changePassAlert: false,
      changePassAlertMessage: "",

      registerAlert: false,
      registerAlertMessage: "",
    };
  },

  methods: {
    updateChangePassDialog(newVal) {
      this.changePassDialog = newVal;
    },
    closeChangePassDialog() {
      this.changePassDialog = false;
    },

    async changePass() {
      const data = this.changePassFormData;
      console.log(data);

      try {
        this.changePassAlert = false;
        await this.$store.dispatch("changePass", { data });
        this.closeChangePassDialog();
      } catch (error) {
        console.error("Error during changePass in component:", error);
        this.changePassAlert = true;
        this.changePassAlertMessage = error;
      }
    },

    async openAddAgentDialog() {
      this.addAgentDialog = !this.addAgentDialog;
    },
    updateAddAgentDialog(newVal) {
      this.addAgentDialog = newVal;
    },
    closeAddAgentDialog() {
      this.$store.commit("clearResponseData");
    },

    openRegisterAgentDialog() {
      this.addAgentDialog = !this.addAgentDialog;
      this.registerAgentDialog = !this.registerAgentDialog;
    },
    updateRegisterAgentDialog(newVal) {
      this.registerAgentDialog = newVal;
    },
    closeRegisterAgentDialog() {
      this.registerAgentDialog = false;
    },

    clickPolygon() {
      localStorage.setItem("agentFormData", JSON.stringify(this.formData));
      this.$updateAgentProperty("isClickPolygon", true);
    },

    async charityAgentList(value) {
      try {
        await this.$store.dispatch("charityAgentList");
        if (this.$store.state.charityAgentList.length == 0) {
          this.openAddAgentDialog();
        } else {
          if (value == "foods") {
            router.push("/charity-food");
          } else if (value == "clothes") {
            router.push("/charity-clothes");
          }
        }
      } catch (error) {
        console.error("Error during charityAgentList in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        this.registerAlert = false;
        await this.$store.dispatch("registerAgent", { data });

        localStorage.removeItem("agentFormData");
        this.$updateAgentProperty("isClickPolygon", false);
        this.$updateAgentProperty("isSetPolygon", false);
        this.$updateAgentProperty("polygonPoints", []);

        this.closeRegisterAgentDialog();
      } catch (error) {
        console.error("Error during benefactor register:", error);
        this.registerAlert = true;
        this.registerAlertMessage = error;
      }
    },
  },

  created() {
    this.hasChangePass = this.$store.state.hasChangePass;

    if (this.$store.state.agent.isClickPolygon) {
      this.registerAgentDialog = true;
      const formData = JSON.parse(localStorage.getItem("agentFormData"));
      if (formData) {
        this.formData = formData;
        this.formData.polygon = this.$store.state.agent.polygonPoints;
      }
    }
  },
};
</script>
