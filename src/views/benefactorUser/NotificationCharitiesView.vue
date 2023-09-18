<template>
  <div>
    <div v-if="this.$store.state.role != 'User'">
      <v-img src="@/assets/images/401error.png"></v-img>
    </div>
    <div v-else>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <div v-if="this.$store.state.isLoading"><h4>صبر کنید...</h4></div>

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
              اطلاعیه‌ها
            </div>

            <v-row slot="cardText">
              <template v-for="charity in charityList">
                <v-col lg="4" md="6" sm="6" cols="12" :key="charity.id">
                  <Card title actions cardImage="razavi.jpg">
                    <div
                      slot="cardTitle"
                      :style="{ color: $vuetify.theme.currentTheme.primary }"
                      class="bold semiSmall"
                    >
                      <a @click="opencharityInfoDialog(charity.id)">{{
                        charity.charityName
                      }}</a>
                    </div>

                    <v-row slot="cardActions" class="justify-end px-4 py-3">
                      <Button
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="مشاهده اطلاعیه‌ها"
                        :small="!$vuetify.breakpoint.mdAndUp"
                        @click="showNotifications(charity.charityName)"
                      ></Button>
                    </v-row>
                  </Card>
                </v-col>
              </template>
            </v-row>
          </Card>

          <div v-else>
            <p>در حال حاضر هیچ خیریه‌ای دارای اطلاعیه موجود نمی‌باشد.</p>
            <router-link to="/">بازگشت به صفحه اصلی</router-link>
          </div>
        </v-col>
      </v-row>

      <Dialog
        :dialogOpen="charityInfoDialog"
        @update:dialogOpen="updateCharityInfoDialog"
        @close="closeCharityInfo"
        title="اطلاعات خیریه"
      >
        <div slot="dialogText" class="mb-n4">
          <p>این خیریه....</p>
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
import router from "@/router";

export default {
  name: "NotificationCharities",

  data() {
    return {
      charityInfoDialog: false,
      charityList: [],
      // charityInfo: {
      //   name: "",
      //   boss: "",
      //   phoneNumber: "",
      //   correlation: "",
      //   selectedState: "",
      //   selectedRegion: "",
      //   other: "",
      //   officer: "",
      //   officerPhone: "",
      //   cardNumber: "",
      //   code: "",
      //   institute: "",
      //   description: "",
      //   address: this.$store.state.charity.address,
      // },
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
      console.log(charityId);
      this.charityInfoDialog = !this.charityInfoDialog;

      // try {
      //   await this.$store.dispatch("charityInfo", { charityId });
      //   this.charityInfo = this.$store.state.responseData;

      //   //چک کنم اینجا چی برمیگردونه تا بتونم نمایشش بدم توی چریتی اینفو و توی دیالوگ

      //   this.charityInfoDialog = !this.charityInfoDialog;
      // } catch (error) {
      //   console.error("Error during login:", error);
      //   // Handle error, show error message, etc.
      // }
    },

    updateCharityInfoDialog(newVal) {
      this.charityInfoDialog = newVal;
    },

    closeCharityInfo() {
      this.$store.commit("clearResponseData");
    },

    showNotifications(id){
      router.push(`notifications-${id}`)
    }
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  created() {
    // this.$store.dispatch('notificationCharities');
    // this.charityList = this.$store.state.responseData
    // this.$store.commit("clearResponseData");

    this.charityList = this.$store.state.charityList;
  },
};
</script>
