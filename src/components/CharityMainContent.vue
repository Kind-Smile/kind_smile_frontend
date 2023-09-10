<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="3" md="4" sm="4" cols="12">
        <a>
          <v-hover v-slot="{ hover }">
            <div @click="charityAgentList">
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
        <router-link :to="`#`">
          <v-hover v-slot="{ hover }">
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
          </v-hover>
        </router-link>
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
        <router-link :to="`#`">
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
                اطلاعیه‌ها
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
      <v-form @submit.prevent="onSubmit" slot="dialogText" class="mb-n4">
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
            برای نمایش یا تغییر محدوده تحت پوشش سفیر مهربانی اینجا کلیک کنید.
          </div>
        </router-link>

        <div class="my-5">
          <small
            :style="{ color: $vuetify.theme.currentTheme.primary }"
            class="bold"
            >توجه داشته باشید بایستی رمز عبور مشخص شده در این قسمت را در اختیار
            سفیر خود با شماره تلفن فوق بگذارید.</small
          >
        </div>

        <Button
          input_value="ثبت‌نام"
          type="submit"
          dark
          block
          large
          class="mb-3 mt-5"
        >
        </Button>
      </v-form>
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
      addAgentDialog: false,
      registerAgentDialog: false,

      formData: {
        name: "",
        phoneNumber: "",
        polygon: this.$store.state.agent.polygonPoints,
        password: "",
      },
    };
  },

  methods: {
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

    async charityAgentList() {
      try {
        await this.$store.dispatch("charityAgentList");
        if (this.$store.state.charityAgentList.length == 0) {
          this.openAddAgentDialog();
        } else {
          router.push("charity-food");
        }
      } catch (error) {
        console.error("Error during charityAgentList in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("registerAgent", { data });

        localStorage.removeItem("agentFormData");
        this.$updateAgentProperty("isClickPolygon", false);
        this.$updateAgentProperty("isSetPolygon", false);
        this.$updateAgentProperty("polygonPoints", []);

        this.closeRegisterAgentDialog();
      } catch (error) {
        console.error("Error during benefactor register:", error);
        // Handle error, show error message, etc.
      }
    },
  },

  created() {
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
