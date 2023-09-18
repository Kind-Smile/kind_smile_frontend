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
            <Card :cardColor="getCardColor" title text :image="false">
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                خیریه {{ charityName }}
              </div>

              <v-row slot="cardText">
                <template v-for="clothe in clothesList">
                  <v-col
                    lg="4"
                    md="6"
                    sm="6"
                    cols="12"
                    :key="clothe.clothes.id"
                  >
                    <!-- <div>{{ clothe.clothes }}</div> -->

                    <Card
                      text
                      :actions="
                        clothe.donateDate == null && clothe.clothes.isInside
                      "
                      :image="false"
                      :cardColor="getClotheCardColors(clothe.clothes)"
                    >
                      <div slot="cardText">
                        <div class="mb-1" v-if="clothe.clothes.collection > 0">
                          <p style="display: inline" class="ml-1">
                            تعداد مشارکت ثبت شده تاکنون:
                          </p>
                          <p style="display: inline">
                            <b>{{ clothe.clothes.collection }} نفر</b>
                          </p>
                        </div>

                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            زمان جمع‌آوری:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                clothe.clothes.eventDate
                                  .replace("-", "/")
                                  .replace("-", "/")
                              }}
                              ساعت
                              {{ clothe.clothes.eventTime.slice(0, -3) }}
                            </b>
                          </p>
                        </div>

                        <div class="mt-3" v-if="!clothe.clothes.isInside">
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

                        <div v-if="clothe.donateDate != null">
                          <v-divider class="my-3"></v-divider>

                          <div class="mb-1">
                            <p style="display: inline" class="ml-1">
                              نام سفیر مهربانی:
                            </p>
                            <p style="display: inline">
                              <b>{{ clothe.clothes.agent.name }}</b>
                            </p>
                          </div>

                          <div class="mb-1">
                            <p style="display: inline" class="ml-1">
                              شماره تماس سفیر مهربانی:
                            </p>
                            <p style="display: inline">
                              <b>0{{ clothe.clothes.agent.phoneNumber }}</b>
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
                          clothe.donateDate == null && clothe.clothes.isInside
                        "
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="ثبت مشارکت"
                          @click="openDonateClotheDialog(clothe.clothes.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>
          </v-col>
        </v-row>

        <Dialog
          :dialogOpen="donateClotheDialog"
          @update:dialogOpen="updateDonateClotheDialog"
          title="آیا از ثبت مشارکت در این پوشاک مهربانی اطمینان دارید؟"
        >
          <Button
            slot="dialogText"
            input_value="ثبت‌ مشارکت"
            type="button"
            dark
            block
            large
            class="mb-n4 mt-5"
            @click="onSubmit"
          >
          </Button>
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
  name: "ClothesCharity",

  data() {
    return {
      id: 0,
      charityName: "",
      clothesList: [],

      formData: {
        id: "",
      },

      donateClotheDialog: false,
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
    openDonateClotheDialog(id) {
      this.donateClotheDialog = !this.donateClotheDialog;
      this.formData.id = id;
    },
    updateDonateClotheDialog(newVal) {
      this.donateClotheDialog = newVal;
    },
    closeDonateClotheDialog() {
      this.donateClotheDialog = false;
    },

    async getClothesCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getClothesCharityForBenefactor", { id });
        this.clothesList = this.$store.state.responseData;
        console.log(this.clothesList[0].clothes.id);
        if (this.clothesList.length > 0) {
          this.charityName = this.clothesList[0].clothes.charity.name;
        }
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error(
          "Error during getClothesCharityForBenefactor in component:",
          error
        );
      }
    },

    async onSubmit() {
      const id = this.formData.id;

      try {
        await this.$store.dispatch("donateClothe", { id });
        this.getClothesCharity();
        this.closeDonateClotheDialog();
        this.formData.id = "";
      } catch (error) {
        console.error("Error during onSubmit in component:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getClotheCardColors() {
      return (clothe) => {
        const agent = clothe.agent;

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

        clothe.isInside = isInside;

        if (!isInside) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        }

        if (clothe.isDone) {
          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.thirdColor,
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

    this.getClothesCharity(this.id);
  },
};
</script>
