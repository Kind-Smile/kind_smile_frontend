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
            <Card :cardColor="getCardColor" title text :image="false" v-if="this.notificationsList.length > 0">
              <v-row
                slot="cardTitle"
                class="d-flex justify-space-between pb-5 px-5"
              >
                <div
                  :style="{ color: $vuetify.theme.currentTheme.primary }"
                  class="bold"
                >
                  خیریه {{ charityName }}
                </div>
              </v-row>

              <v-row slot="cardText">
                <template v-for="notification in notificationsList">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="notification.id">
                    <Card
                      :text="notification.description != null"
                      title

                      :cardImage="notification.picture"
                      @expandImage="openExpandImageDialog(notification.picture)"
                    >
                      <div
                        slot="cardTitle"
                        :style="{ color: $vuetify.theme.currentTheme.primary }"
                        class="semiSmall bold"
                      >
                        {{ notification.name }}
                      </div>

                      <div slot="cardText">
                        <div class="mb-1 mt-3">
                          <small style="display: inline">
                            <b>{{ notification.description }}</b>
                          </small>
                        </div>
                      </div>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>
                در حال حاضر برای این خیریه اخبار مهربانی موجود نمی‌باشد.
              </p>
              <router-link to="/">بازگشت به صفحه اصلی</router-link>
            </div>
          </v-col>
        </v-row>

        <Dialog
          :dialogOpen="expandImageDialog"
          @update:dialogOpen="updateExpandImageDialog"
        >
          <div slot="dialogText" class="mb-n4">
            <v-img :src="expandImage"/>
          </div>
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
import Dialog from "@/components/basics/Dialog.vue"

export default {
  name: "NotificationsCharity",

  data() {
    return {
      id: 0,
      charityName: "",
      notificationsList: [],

      expandImageDialog: false,
      expandImage: null,
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
    openExpandImageDialog(image) {
      this.expandImageDialog = !this.expandImageDialog;
      this.expandImage = image;
    },
    updateExpandImageDialog(newVal) {
      this.expandImageDialog = newVal;
    }, 

    async getNotificationsCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getNotificationsCharityForBenefactor", {
          id,
        });
        this.notificationsList = this.$store.state.responseData;
        console.log(this.$store.state.responseData)
        if (this.notificationsList.length > 0) {
          this.charityName = this.notificationsList[0].charity.name;
        }
        this.notificationsList.forEach((notification) => {
          notification.picture = notification.picture;
        });
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error(
          "Error during getNotificationsCharity in component:",
          error
        );
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
    console.log(this.id);

    this.getNotificationsCharity(this.id);
  },
};
</script>
