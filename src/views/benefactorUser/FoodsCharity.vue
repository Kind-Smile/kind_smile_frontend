<template>
  <div>
    <div v-if="this.$store.state.role != 'User'">
      <v-img src="@/assets/images/401error.png"></v-img>
    </div>
    <div v-else>
      <AppBar></AppBar>
      <v-main class="mt-8 mb-5 mx-5">
        <div v-if="this.$store.state.isLoading">
          <h4>صبر کنید...</h4>
        </div>

        <v-row v-else>
          <v-col lg="12" md="12" sm="12" cols="12">
            <Card :cardColor="getCardColor" title text :image="false" v-if="this.foodsList.length > 0">
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                خیریه {{ charityName }}
              </div>

              <v-row slot="cardText">
                <template v-for="food in foodsList">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="food.food.id">
                    <Card
                      text
                      :actions="
                        food.food_collect == null &&
                        food.food.isInside &&
                        !food.food.isDone &&
                        !food.food.isExpired
                      "
                      :image="false"
                      :cardColor="getFoodCardColors(food.food)"
                      :showBorder="showBorder[food.food.id]"
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
                            تعداد غذای ثبت شده تاکنون:
                          </p>
                          <p style="display: inline">
                            <b>{{ food.food.collection }} پرس</b>
                          </p>
                        </div>

                        <div class="mb-1" v-if="food.food.numberOfAllCollected > 0">
                          <v-icon
                            :style="{
                              color: $vuetify.theme.currentTheme.thirdColor,
                            }"
                            size="16"
                            >mdi-check</v-icon
                          >
                          <p style="display: inline" class="ml-1">
                            تعداد غذای جمع‌آوری شده تاکنون:
                          </p>
                          <p style="display: inline">
                            <b>{{ food.food.numberOfAllCollected }} پرس</b>
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

                        <div class="mt-3" v-if="food.food.isExpired">
                          <small
                            style="display: inline"
                            class="ml-1 bold gray"
                          >
                            منقضی شده
                          </small>
                        </div>

                        <div v-if="food.food.isDone">
                          <div class="mt-3 mb-1">
                            <v-icon
                              :style="{
                                color: $vuetify.theme.currentTheme.thirdColor,
                              }"
                              >mdi-check-circle</v-icon
                            >
                            <p style="display: inline">
                              به لطف مشارکت‌های مردمی، تعداد غذای مورد نیاز در
                              این سفره تامین شده است.
                            </p>
                          </div>
                        </div>

                        <div v-if="food.food_collect != null">
                          <v-divider class="my-3"></v-divider>
                          <div class="mb-1">
                            <p style="display: inline" class="ml-1">
                              میزان مشارکت شما:
                            </p>
                            <p style="display: inline">
                              <b>{{ food.food_collect }} پرس</b>
                            </p>
                          </div>

                          <div class="mb-1">
                            <p style="display: inline" class="ml-1">نوع غذا:</p>
                            <p style="display: inline">
                              <b>{{ food.food_type }}</b>
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
                              <b>{{ food.food.agent.phoneNumber }}</b>
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
                              از مشارکت شما نیکوکار گرامی متشکریم. <br />در صورت
                              نیاز با سفیر مهربانی تماس حاصل فرمایید.
                            </p>
                          </div>
                        </div>
                      </div>

                      <v-row
                        slot="cardActions"
                        class="justify-end px-4 pt-5 pb-3"
                        v-if="
                          food.food_collect == null &&
                          food.food.isInside &&
                          !food.food.isDone &&
                          !food.food.isExpired
                        "
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="ثبت مشارکت"
                          @click="openDonateFoodDialog(food.food.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>
                در حال حاضر برای این خیریه سفره مهربانی موجود نمی‌باشد.
              </p>
              <router-link to="/">بازگشت به صفحه اصلی</router-link>
            </div>
          </v-col>
        </v-row>

        <Dialog
          :dialogOpen="donateFoodDialog"
          @update:dialogOpen="updateDonateFoodDialog"
          title="برای ثبت مشارکت در این سفره، اطلاعات زیر را تکمیل نمایید:"
        >
          <v-form
            @submit.prevent="onSubmit"
            slot="dialogText"
            class="mb-n4"
            ref="addFood"
          >
            <v-autocomplete
              outlined
              v-model="formData.selectedFood"
              :items="this.$store.state.foodsList"
              hide-details
              placeholder="نوع غذای خود را انتخاب کنید"
              class="mb-5"
            >
            </v-autocomplete>

            <Input
              outlined
              dense
              name="foodCollect"
              type="number"
              v-model.trim="formData.foodCollect"
              labelTag
              labelText="تعداد غذای اهدایی"
              placeholder="تعداد غذای اهدایی"
              hide_details
              class="mb-5"
            />

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="
                this.formData.selectedFood === '' ||
                this.formData.foodCollect === ''
              "
            >
            </Button>
          </v-form>
        </Dialog>
      </v-main>
    </div>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";
import Input from "@/components/basics/Input.vue";
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

      formData: {
        id: "",
        selectedFood: "",
        foodCollect: "",
      },

      donateFoodDialog: false,

      showBorder: [],
    };
  },

  components: {
    AppBar,
    Card,
    Input,
    Button,
    Dialog,
  },

  methods: {
    openDonateFoodDialog(id) {
      this.donateFoodDialog = !this.donateFoodDialog;
      this.formData.id = id;
    },
    updateDonateFoodDialog(newVal) {
      this.donateFoodDialog = newVal;
    },
    closeDonateFoodDialog() {
      this.donateFoodDialog = false;
    },

    async getFoodsCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getFoodsCharityForBenefactor", { id });
        this.foodsList = this.$store.state.responseData;
        if (this.foodsList.length > 0) {
          this.charityName = this.foodsList[0].food.charity.name;
        }
        this.$store.commit("clearResponseData");

        this.showBorder = new Array(this.foodsList.length).fill(false);
      } catch (error) {
        console.error(
          "Error during getFoodsCharityForBenefactor in component:",
          error
        );
      }
    },

    async onSubmit() {
      const data = this.formData;
      console.log(this.formData);

      try {
        await this.$store.dispatch("donateFood", { data });
        this.getFoodsCharity();
        this.closeDonateFoodDialog();
        this.formData.id = "";
        this.formData.selectedFood = "";
        this.formData.foodCollect = "";
      } catch (error) {
        console.error("Error during onSubmit in component:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getFoodCardColors() {
      return (food) => {
        const agent = food.agent;

        console.log(JSON.stringify(agent.polygon))

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

        if (!isInside || food.isExpired) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        }
 
        if (food.isDone && food.isAllCollected) {
          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.thirdColor,
            0.15
          );
        }

        if (food.isDone || food.isAllCollected) {
          this.showBorder[food.id] = true;

          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.primary,
            0.15
          );
        }

        if (isInside) {
          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.primary,
            0.15
          );
        }
      };
    },
  },

  created() {
    this.id = this.$route.params.id;

    this.getFoodsCharity(this.id);
  },
};
</script>
