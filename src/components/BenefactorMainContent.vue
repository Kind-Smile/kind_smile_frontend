<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="4" md="6" sm="6" cols="12">
        <router-link :to="`/food-charities`">
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
        </router-link>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <router-link :to="`/clothe-charities`">
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
                پوشاک مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما می‌توانید با ثبت لباس‌های مناسب خود، در تامین پوشاک چندین
                نیازمند سهیم شوید.
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <router-link :to="`/money-charities`">
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
                هدیه مهربانی
              </div>

              <div slot="cardText" class="textColor">
                شما می‌توانید با کمک‌های نقدی خود، در رفع نیازهای چندین نیازمند
                سهیم شوید.
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>

      <v-col lg="4" md="6" sm="6" cols="12">
        <router-link :to="`/notification-charities`">
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
                اطلاعیه‌ها
              </div>

              <div slot="cardText" class="textColor">
                شما در این بخش می‌توانید از رویدادها و اطلاعیه‌های خیریه‌ها مطلع
                شوید.
              </div>
            </Card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import Card from "@/components/basics/Card.vue";

export default {
  name: "BenefactorMainContent",

  components: {
    Card,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },
};
</script>