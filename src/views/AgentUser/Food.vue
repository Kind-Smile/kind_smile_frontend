<template>
  <div>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <div v-if="this.$store.state.isLoading">
        <h4>صبر کنید...</h4>
      </div>

      <v-row v-else>
        <div v-if="this.foodsList.length == 0" class="pa-5">
          <h6>سفره‌ای برای شما ثبت نشده است.</h6>
        </div>

        <v-col lg="12" md="12" sm="12" cols="12" v-else>
          <Card :cardColor="getCardColor" title text :image="false">
            <div
              slot="cardTitle"
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
            >
              سفره مهربانی
            </div>

            <v-row slot="cardText">
              <template v-for="food in foodsList">
                <v-col lg="4" md="4" sm="6" cols="12" :key="food.id">
                  <Card text :actions="food.collection > 0" :image="false">
                    <div slot="cardText">
                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          کل غذای مورد نیاز:
                        </p>
                        <p style="display: inline">
                          <b>{{ food.request }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1" v-if="food.collection > 0">
                        <p style="display: inline" class="ml-1">
                          تعداد غذای ثبت‌شده تاکنون:
                        </p>
                        <p style="display: inline">
                          <b>{{ food.collection }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          زمان جمع‌آوری:
                        </p>
                        <p style="display: inline">
                          <b
                            >{{
                              food.eventDate.replace("-", "/").replace("-", "/")
                            }}
                            ساعت
                            {{ food.eventTime.slice(0, -3) }}
                          </b>
                        </p>
                      </div>

                      <!-- <div class="mb-1" v-if="food.collection > 0">
                        <p style="display: inline" class="ml-1">
                          تعداد غذای جمع‌آوری شده تاکنون:
                        </p>
                        <p style="display: inline">
                          <b>{{ food.collection }} پرس</b>
                        </p>
                      </div> -->

                      <div class="mt-3 mb-1" v-if="food.collection == 0">
                        <small class="ml-1 bold" :style="{ color: $vuetify.theme.currentTheme.primary }">
                          هنوز مشارکتی ثبت نشده است.
                        </small>
                      </div>
                    </div>

                    <v-row
                      slot="cardActions"
                      class="justify-end px-4 pt-5 pb-3"
                    >
                      <Button
                        v-if="food.collection > 0"
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="مشاهده مشارکت‌های ثبت‌شده"
                        @click="showDonor(food.id)"
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
  name: "foods",

  data() {
    return {
      foodsList: [],
    };
  },

  components: {
    AppBar,
    Card,
    Button,
  },

  methods: {
    async getFoodsCharity() {
      try {
        await this.$store.dispatch("getAgentFoodsCharity");
        this.foodsList = this.$store.state.responseData;
        console.log(this.foodsList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getAgentFoodsCharity in component:", error);
      }
    },

    showDonor(id) {
      router.push(`/food-donors/${id}`);
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  created() {
    this.getFoodsCharity();
  },
};
</script>
