<template>
  <div>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <div v-if="this.$store.state.isLoading">
        <h4>صبر کنید...</h4>
      </div>

      <v-row v-else>
        <v-col lg="12" md="12" sm="12" cols="12">
          <Card :cardColor="getCardColor" title text :image="false">
            <div
              slot="cardTitle"
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
            >
              {{ id }}
            </div>

            <v-row slot="cardText">
              <template v-for="food in foodsList">
                <v-col lg="4" md="6" sm="6" cols="12" :key="food.food.id">
                  <Card
                    text
                    :actions="food.food_collect == null && food.food.isInside"
                    :image="false"
                    :cardColor="getFoodCardColors(food.food)"
                  >
                    <div slot="cardText">
                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          کل غذای مورد نیاز:
                        </p>
                        <p style="display: inline">
                          <b>{{ food.food.request }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1" v-if="food.food.collection > 0">
                        <p style="display: inline" class="ml-1">
                          تعداد غذای جمع‌آوری شده تاکنون:
                        </p>
                        <p style="display: inline">
                          <b>{{ food.food.collection }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          زمان جمع‌آوری:
                        </p>
                        <p style="display: inline">
                          <b
                            >{{
                              food.food.eventDate
                                .replace("-", "/")
                                .replace("-", "/")
                            }}
                            ساعت
                            {{ food.food.eventTime.slice(0, -3) }}
                          </b>
                        </p>
                      </div>

                      <div class="mt-3" v-if="!food.food.isInside">
                        <p style="display: inline">
                          <v-icon
                            size="15"
                            :color="$vuetify.theme.currentTheme.primary"
                            >mdi-alert-circle-outline</v-icon
                          >
                        </p>
                        <small
                          style="display: inline"
                          class="ml-1 bold"
                          :style="{
                            color: $vuetify.theme.currentTheme.primary,
                          }"
                        >
                          خارج از محدوده
                        </small>
                      </div>

                      <div v-if="!food.food_collect == null">
                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            میزان مشارکت شما:
                          </p>
                          <p style="display: inline">
                            <b>{{ food.food_collect }} پرس</b>
                          </p>
                        </div>

                        <div class="mt-3 mb-1">
                          <p
                            style="display: inline"
                            :style="{
                              color: $vuetify.theme.currentTheme.thirdColor,
                            }"
                            class="ml-1"
                          >
                            از مشارکت شما نیکوکار گرامی متشکریم.
                          </p>
                        </div>

                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            نام سفیر مهربانی:
                          </p>
                          <p style="display: inline">
                            <b>{{ food.food.agent.name }}</b>
                          </p>
                        </div>

                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            شماره تماس سفیر مهربانی:
                          </p>
                          <p style="display: inline">
                            <b>0{{ food.food.agent.phoneNumber }}</b>
                          </p>
                        </div>
                      </div>
                    </div>

                    <v-row
                      slot="cardActions"
                      class="justify-end px-4 pt-5 pb-3"
                      v-if="food.food_collect == null && food.food.isInside"
                    >
                      <Button
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="ثبت مشارکت"
                      ></Button>
                      <!-- @click="seeFoodsCharity(food.food.id)" -->
                    </v-row>
                  </Card>
                </v-col>
              </template>
            </v-row>
          </Card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";
import Button from "@/components/basics/Button.vue";
import Dialog from "@/components/basics/Dialog.vue";
import * as turf from "@turf/turf";
import router from "@/router";

export default {
  name: "FoodsCharity",

  data() {
    return {
      id: 0,
      charityName: "",
      foodsList: [],
    };
  },

  components: {
    AppBar,
    Card,
    Button,
    Dialog,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getFoodCardColors() {
      return (food) => {
        const agent = food.agent;

        const coordinatesArray = [];

        for (const point of agent.polygon) {
          coordinatesArray.push([point.longitude, point.latitude]);
        }

        if (coordinatesArray.length > 0) {
          coordinatesArray.push(coordinatesArray[0]);
        }

        const lat = this.$store.state.benefactorLat;
        const lng = this.$store.state.benefactorLng;

        const isInside = turf.booleanPointInPolygon(
          [lng, lat],
          turf.polygon([coordinatesArray])
        );

        food.isInside = isInside;

        if (isInside) {
          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.primary,
            0.15
          );
        }

        return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
      };
    },
  },

  methods: {
    async getFoodsCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getBenefactorFoodsCharity", { id });
        this.foodsList = this.$store.state.responseData;
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error(
          "Error during getBenefactorFoodsCharity in component:",
          error
        );
      }
    },
  },

  created() {
    this.id = this.$route.params.id;

    this.getFoodsCharity(this.id);
  },
};
</script>
