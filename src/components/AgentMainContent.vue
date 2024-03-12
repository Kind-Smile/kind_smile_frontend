<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="3" md="4" sm="4" cols="12">
        <router-link :to="`/foods-agent`">
          <v-hover v-slot="{ hover }">
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
          </v-hover>
        </router-link>
      </v-col>

      <v-col lg="3" md="4" sm="4" cols="12">
        <router-link :to="`/clothes-agent`">
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
                هدیه مهربانی
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>

    <Dialog
      v-if="!hasChangePass"
      :dialogOpen="changePassDialog"
      @update:dialogOpen="updateChangePassDialog"
      title="برای حفظ امنیت، در اولین ورود به سامانه باید رمز عبور خود را تغییر دهید."
      :closeButton="false"
    >
      <div slot="dialogText">
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
          {{ alertMessage }}
        </v-alert>

        <v-form @submit.prevent="onSubmit" class="mb-n4">
          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="formData.oldPassword"
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
            v-model.trim="formData.newPassword"
            labelTag
            labelText="رمز عبور جدید"
            placeholder="رمز عبور جدید"
            hint="رمز شما باید شامل ترکیبی از اعداد و حروف با حداقل طول ۸ باشد"
            class="mb-n2"
          />

          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="formData.confirmNewPassword"
            labelTag
            labelText="تکرار رمز عبور جدید"
            placeholder="تکرار رمز عبور جدید"
            hint="رمز عبور جدید را تکرار کنید"
            class="mb-n2"
          />

          <Button
            input_value="تغییر رمز"
            type="submit"
            block
            large
            class="mb-3 mt-5"
            :disabled="
              this.formData.oldPassword === '' ||
              this.formData.newPassword === '' ||
              this.formData.confirmNewPassword === ''
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
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "AgentMainContent",

  data() {
    return {
      hasChangePass: false,
      changePassDialog: true,
      formData: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      alert: false,
      alertMessage: "",
    };
  },

  components: {
    Card,
    Button,
    Input,
    Dialog,
  },

  methods: {
    updateChangePassDialog(newVal) {
      this.changePassDialog = newVal;
    },
    closeChangePassDialog() {
      this.changePassDialog = false;
    },

    async onSubmit() {
      const data = this.formData;
      console.log(data);

      try {
        this.alert = false;
        await this.$store.dispatch("changePass", { data });
        this.$store.commit("updateHasChangePass", true);

        this.$store.commit("setSnackbar", true);
        this.$store.commit(
          "snackbarMessage",
          `تغییر رمز عبور با موفقیت انجام شد.`
        );
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);

        this.closeChangePassDialog();
      } catch (error) {
        console.error("Error during changePass in component:", error);
        this.alert = true;
        this.alertMessage = error;
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  created() {
    this.hasChangePass = this.$store.state.hasChangePass;
  },
};
</script>
