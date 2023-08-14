<template>
  <v-main class="mt-8 mb-5 mx-5">
    <v-row>
      <v-col lg="3" md="4" sm="4" cols="12">
        <router-link :to="`/food`">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
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
        <router-link :to="`#`">
          <v-hover v-slot="{ hover }">
            <Card
              :cardColor="getCardColor"
              title
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
    </v-row>
  </v-main>
</template>

<script>
import Card from "@/components/basics/Card.vue";

export default {
  name: "AgentMainContent",

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
