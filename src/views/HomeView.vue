<template>
  <div>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <v-row>
        <v-col lg="4" md="6" sm="6" cols="12">
          <router-link :to="`/food`">
            <v-hover v-slot="{ hover }">
              <Card
                :cardColor="getCardColor"
                title
                text
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

                <div
                  slot="cardText"
                  class="textColor"
                >
                  شما می‌توانید با ثبت غذای خود، در اطعام چندین نیازمند سهیم
                  شوید.
                </div>
              </Card>
            </v-hover>
          </router-link>
        </v-col>
        <v-col lg="4" md="6" sm="6" cols="12">
          <router-link :to="`#`">
            <v-hover v-slot="{ hover }">
              <Card
                :cardColor="getCardColor"
                title
                text
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

                <div
                  slot="cardText"
                  class="textColor"
                >
                  شما می‌توانید با ثبت لباس‌های مناسب خود، در تامین پوشاک چندین
                  نیازمند سهیم شوید.
                </div>
              </Card>
            </v-hover>
          </router-link>
        </v-col>
        <v-col lg="4" md="6" sm="6" cols="12">
          <router-link :to="`#`">
            <v-hover v-slot="{ hover }">
              <Card
                :cardColor="getCardColor"
                title
                text
                cardImage="money.png"
                :hover="hover"
                :elevationValue="1"
              >
                <div
                  slot="cardTitle"
                  :style="{ color: $vuetify.theme.currentTheme.primary }"
                  class="bold"
                >
                  کمک‌های نقدی
                </div>

                <div
                  slot="cardText"
                  class="textColor"
                >
                  شما می‌توانید با کمک‌های نقدی خود، در رفع نیازهای چندین
                  نیازمند سهیم شوید.
                </div>
              </Card>
            </v-hover>
          </router-link>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "Home",

  components: {
    AppBar,
    Card,
    Dialog,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },
};
</script>
