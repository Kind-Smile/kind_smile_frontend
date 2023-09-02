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
              سفره مهربانی
            </div>

            <v-row slot="cardText">
              <template v-for="donor in donorsList">
                <v-col lg="4" md="4" sm="6" cols="12" :key="donor.id">
                  <Card title text actions :image="false">
                    <div
                      slot="cardTitle"
                      :style="{ color: $vuetify.theme.currentTheme.primary }"
                      class="semiSmall bold"
                    >
                      {{ donor.user.name }}
                    </div>

                    <div slot="cardText">
                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          شماره تماس نیکوکار مهربان:
                        </p>
                        <p style="display: inline">
                          <b>0{{ donor.user.phoneNumber }}</b>
                        </p>
                      </div>

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          تعداد غذای ثبت‌شده:
                        </p>
                        <p style="display: inline">
                          <b>{{ donor.food_collect }} پرس</b>
                        </p>
                      </div>

                      <!-- <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          نوع غذای ثبت‌شده:
                        </p>
                        <p style="display: inline">
                          <b>{{ donor.}}</b>
                        </p>
                      </div> -->

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">آدرس:</p>
                        <p style="display: inline">
                          <b>{{ donor.user.address.slice(7) }}</b>
                        </p>
                      </div>

                      <router-link
                        class="mb-1"
                        :to="{
                          path: '/map',
                          query: {
                            coordinates: [
                              donor.user.longitude,
                              donor.user.latitude,
                            ],
                            disable: true,
                          },
                        }"
                      >
                        <div
                          :style="{
                            color: $vuetify.theme.currentTheme.thirdColor,
                          }"
                        >
                          مشاهده آدرس از روی نقشه
                        </div>
                      </router-link>
                    </div>

                    <v-row
                      slot="cardActions"
                      class="justify-end px-4 pt-5 pb-3"
                    >
                      <Button
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="دریافت شد"
                      ></Button>
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
import router from "@/router";

export default {
  name: "FoodDonors",

  data() {
    return {
      id: 0,
      donorsList: [],
      coordinates: [51.420296, 35.732379],
    };
  },

  components: {
    AppBar,
    Card,
    Button,
  },

  methods: {
    async getAgentFoodsDonors() {
      try {
        const id = this.id;
        await this.$store.dispatch("foodDonorsList", { id });
        this.donorsList = this.$store.state.responseData;
        console.log(this.donorsList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getAgentFoodsDonors in component:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  created() {
    this.id = this.$route.params.id;

    this.getAgentFoodsDonors();
  },
};
</script>
