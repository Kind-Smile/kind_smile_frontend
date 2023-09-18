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
            <Card
              :cardColor="getCardColor"
              title
              text
              :image="false"
              v-if="this.charityList.length > 0"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                سفره مهربانی
              </div>

              <v-row slot="cardText">
                <template v-for="charity in charityList">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="charity.id">
                    <Card
                      title
                      text
                      :actions="charity.isInside"
                      imageNewLine
                      :cardImage="charity.logo"
                      :cardColor="getCharityCardColors(charity)"
                    >
                      <div
                        slot="cardTitle"
                        :style="{ color: $vuetify.theme.currentTheme.primary }"
                        class="bold semiSmall"
                      >
                        <a @click="opencharityInfoDialog(charity.id)"
                          >خیریه {{ charity.name }}</a
                        >
                      </div>

                      <div slot="cardText">
                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">مدیریت:</p>
                          <p style="display: inline">
                            <b>{{ charity.boss }}</b>
                          </p>
                        </div>

                        <div class="mb-1" v-if="charity.correlation">
                          <p style="display: inline" class="ml-1">وابسته به:</p>
                          <p style="display: inline">
                            <b>{{ charity.correlation }}</b>
                          </p>
                        </div>

                        <div>
                          <p style="display: inline" class="ml-1">
                            آدرس خیریه:
                          </p>
                          <p style="display: inline">
                            <b>{{ charity.other }}</b>
                          </p>
                        </div>

                        <div class="mt-3" v-if="!charity.isInside">
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
                      </div>

                      <v-row
                        slot="cardActions"
                        class="justify-end px-4 pt-5 pb-3"
                        v-if="charity.isInside"
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="مشاهده سفره‌های مهربانی"
                          @click="seeFoodsCharity(charity.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>در حال حاضر هیچ خیریه‌ای دارای سفره مهربانی موجود نمی‌باشد.</p>
              <router-link to="/">بازگشت به صفحه اصلی</router-link>
            </div>
          </v-col>
        </v-row>

        <Dialog
          :dialogOpen="charityInfoDialog"
          @update:dialogOpen="updateCharityInfoDialog"
          title="اطلاعات خیریه"
        >
          <div slot="dialogText" class="mb-n4">
            <div class="mb-1" v-if="charityInfo.boss">
              <p style="display: inline" class="ml-1">مدیریت خیریه:</p>
              <p style="display: inline">
                <b>{{ charityInfo.boss }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.code">
              <p style="display: inline" class="ml-1">کد ثبت:</p>
              <p style="display: inline">
                <b>{{ charityInfo.code }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.correlation">
              <p style="display: inline" class="ml-1">وابسته به:</p>
              <p style="display: inline">
                <b>{{ charityInfo.correlation }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.officer">
              <p style="display: inline" class="ml-1">مسئول ارتباط مردمی:</p>
              <p style="display: inline">
                <b>{{ charityInfo.officer }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.officerPhone">
              <p style="display: inline" class="ml-1">
                شماره تماس ارتباط مردمی:
              </p>
              <p style="display: inline">
                <b>{{ charityInfo.officerPhone }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.institute">
              <p style="display: inline" class="ml-1">هیئت امنا:</p>
              <p style="display: inline">
                <b>{{ charityInfo.institute }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.description">
              <p style="display: inline" class="ml-1">توضیحات:</p>
              <p style="display: inline">
                <b>{{ charityInfo.description }}</b>
              </p>
            </div>

            <div class="mb-1" v-if="charityInfo.other">
              <p style="display: inline" class="ml-1">آدرس خیریه:</p>
              <p style="display: inline">
                <b v-if="charityInfo.state">{{ charityInfo.state }}، </b>
                <b>{{ charityInfo.other }}</b>
              </p>
            </div>

            <div class="mt-3 mb-1">
              <router-link
                :to="{
                  path: '/map',
                  query: {
                    coordinates: [charityInfo.longitude, charityInfo.latitude],
                    disable: true,
                  },
                }"
              >
                <div :style="{ color: $vuetify.theme.currentTheme.thirdColor }">
                  مشاهده آدرس خیریه روی نقشه
                </div>
              </router-link>
            </div>
          </div>
        </Dialog>
      </v-main>
    </div>
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
  name: "FoodCharities",

  data() {
    return {
      charityInfoDialog: false,
      charityList: [],
      charityInfo: [],

      isInside: false,
    };
  },

  components: {
    AppBar,
    Card,
    Button,
    Dialog,
  },

  methods: {
    async opencharityInfoDialog(charityId) {
      this.charityInfoDialog = !this.charityInfoDialog;

      const charityInformation = this.charityList.find(
        (charity) => charity.id == charityId
      );
      if (charityInformation) {
        this.charityInfo = charityInformation;
      }
    },

    updateCharityInfoDialog(newVal) {
      this.charityInfoDialog = newVal;
    },

    async getFoodCharities() {
      try {
        await this.$store.dispatch("foodCharities");
        this.charityList = this.$store.state.responseData;
        console.log(this.$store.state.responseData);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getFoodCharities in component:", error);
      }
    },

    seeFoodsCharity(id) {
      router.push(`/foods-charity/${id}`);
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getCharityCardColors() {
      return (charity) => {
        const agents = charity.agents;

        for (const agent of agents) {
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

          console.log(`${charity.name} ${isInside}`);

          agent.isInside = isInside;
          console.log(this.charityList);

          if (agent.isInside) {
            charity.isInside = agent.isInside;
            return this.$hexToRgba(
              this.$vuetify.theme.currentTheme.primary,
              0.15
            );
          }
        }

        return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
      };
    },
  },

  created() {
    this.getFoodCharities();
  },
};
</script>
