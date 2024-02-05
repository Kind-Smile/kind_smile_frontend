<template>
  <div>
    <div v-if="this.$store.state.role != 'Agent'">
      <v-img src="@/assets/images/401error.png"></v-img>
    </div>
    <div v-else>
      <AppBar></AppBar>
      <v-main class="mt-8 mb-5 mx-5">
        <div v-if="this.$store.state.isLoading">
          <h4>صبر کنید...</h4>
        </div>

        <v-row v-else class="pa-5">
          <div v-if="isFinished">
            <h6>
              دریافت پوشاک از تمام نیکوکاران مهربان به پایان رسید. با تشکر از
              زحمات شما
            </h6>
            <router-link to="/clothes-agent">بازگشت به صفحه قبل</router-link>
          </div>

          <v-col lg="12" md="12" sm="12" cols="12" v-else>
            <Card :cardColor="getCardColor" title text :image="false">
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                پوشاک مهربانی
              </div>

              <v-row slot="cardText">
                <template v-for="donor in donorsList">
                  <v-col lg="4" md="4" sm="6" cols="12" :key="donor.id">
                    <Card
                      title
                      text
                      :actions="!donor.isCollected"
                      :image="false"
                    >
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
                            <b>{{ donor.user.phoneNumber }}</b>
                          </p>
                        </div>

                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">آدرس:</p>
                          <p style="display: inline">
                            <b>{{ donor.user.address.slice(7) }}</b>
                          </p>
                        </div>

                        <router-link
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
                            class="mb-1"
                          >
                            مشاهده آدرس از روی نقشه
                          </div>
                        </router-link>

                        <div class="mb-1" v-if="donor.isCollected">
                          <p
                            :style="{
                              color: $vuetify.theme.currentTheme.primary,
                            }"
                            class="bold mb-0"
                          >
                            دریافت شده
                          </p>
                        </div>
                      </div>

                      <v-row
                        slot="cardActions"
                        class="justify-end px-4 pt-5 pb-3"
                        v-if="!donor.isCollected"
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="دریافت شد"
                          @click="received(donor.user.id)"
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
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";
import Button from "@/components/basics/Button.vue";
import router from "@/router";

export default {
  name: "ClotheDonors",

  data() {
    return {
      id: 0,
      donorsList: [],
      isFinished: false,
      coordinates: [51.420296, 35.732379],
    };
  },

  components: {
    AppBar,
    Card,
    Button,
  },

  methods: {
    async getAgentClothesDonors() {
      try {
        const id = this.id;
        await this.$store.dispatch("clotheDonorsList", { id });
        this.donorsList = this.$store.state.responseData[0].donors;
        this.isFinished = this.$store.state.responseData[0].finished;
        console.log(this.donorsList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getAgentclotheDonors in component:", error);
      }
    },

    async received(userId) {
      try {
        const id = [];
        id[0] = userId;
        id[1] = parseInt(this.id, 10);
        await this.$store.dispatch("agentReceiveClothe", { id });
        await this.getAgentClothesDonors();
      } catch (error) {
        console.error("Error during received in component:", error);
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

    this.getAgentClothesDonors();
  },
};
</script>
