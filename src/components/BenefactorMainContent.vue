<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="4" md="6" sm="6" cols="12">
        <a @click="handleFood">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              text
              localImage
              cardImage="food.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                سفره مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما می‌توانید با ثبت غذای خود، در اطعام چندین نیازمند سهیم شوید.
              </div>
            </Card>
          </v-hover>
        </a>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <a @click="handleClothe">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              text
              localImage
              cardImage="clothes.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
              هدیه مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما می‌توانید با ثبت اجناس مناسب خود، در تامین هدیه چندین
                نیازمند سهیم شوید.
              </div>
            </Card>
          </v-hover>
        </a>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <a @click="handleMoney">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              text
              localImage
              cardImage="money.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                پویش مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما می‌توانید با کمک‌های نقدی خود، در رفع نیازهای چندین نیازمند
                سهیم شوید.
              </div>
            </Card>
          </v-hover>
        </a>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <a @click="handleNotification">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
              text
              localImage
              cardImage="notifications.png"
              :hover="hover"
              :elevationValue="1"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                اخبار مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما در این بخش می‌توانید از رویدادها و اطلاعیه‌های خیریه‌ها مطلع
                شوید.
              </div>
            </Card>
          </v-hover>
        </a>
      </v-col>
    </v-row>

    <Dialog
      :dialogOpen="notAuthenticatedDialog"
      @update:dialogOpen="updateNotAuthenticatedDialog"
      title="برای ادامه باید وارد سامانه شوید."
    >
      <div slot="dialogText" class="mb-n4 mt-2">
          <Button
            input_value="ورود"
            type="button"
            :color="this.$vuetify.theme.currentTheme.primary"
            dark
            block
            large
            to="/login"
          >
          </Button>
      </div>
    </Dialog>
  </v-main>
</template>

<script>
import Card from "@/components/basics/Card.vue";
import Button from "@/components/basics/Button.vue";
import Dialog from "@/components/basics/Dialog.vue";
import router from "@/router";

export default {
  name: "BenefactorMainContent",

  components: {
    Card,
    Button,
    Dialog,
  },

  data() {
    return {
      notAuthenticatedDialog: false,
    };
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  methods: {
    openNotAuthenticatedDialog() {
      this.notAuthenticatedDialog = !this.notAuthenticatedDialog;
    },
    updateNotAuthenticatedDialog(newVal) {
      this.notAuthenticatedDialog = newVal;
    },
    closeNotAuthenticatedDialog() {
      this.notAuthenticatedDialog = false;
    },

    handleFood() {
      if (this.$store.state.token == "") {
        this.openNotAuthenticatedDialog();
      } else {
        router.push(`/food-charities`);
      }
    },

    handleClothe() {
      if (this.$store.state.token == "") {
        this.openNotAuthenticatedDialog();
      } else {
        router.push(`/clothe-charities`);
      }
    },

    handleMoney() {
      if (this.$store.state.token == "") {
        this.openNotAuthenticatedDialog();
      } else {
        router.push(`/money-charities`);
      }
    },

    handleNotification() {
      if (this.$store.state.token == "") {
        this.openNotAuthenticatedDialog();
      } else {
        router.push(`/notification-charities`);
      }
    },
  },
};
</script>
