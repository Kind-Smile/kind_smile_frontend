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
                <small>
                  شماره کارت خیریه: <b>{{ cardNumber }}</b>
                </small>
              </v-row>

              <v-row slot="cardText">
                <template v-for="money in moniesList">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="money.money.id">
                    <Card
                      text
                      title
                      :actions="money.money_collect == null"
                      :image="false"
                      :cardColor="getMoneyCardColors(money.money)"
                    >
                      <div
                        slot="cardTitle"
                        :style="{ color: $vuetify.theme.currentTheme.primary }"
                        class="semiSmall bold"
                      >
                        {{ money.money.name }}
                      </div>

                      <div slot="cardText">
                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            کل هزینه مورد نیاز:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                money.money.money_need.toLocaleString("fa-IR")
                              }}
                              تومان</b
                            >
                          </p>
                        </div>

                        <div class="mb-1" v-if="money.collection > 0">
                          <p style="display: inline" class="ml-1">
                            میزان مشارکت ثبت‌شده:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                money.collection.toLocaleString("fa-IR")
                              }}
                              تومان</b
                            >
                          </p>
                        </div>

                        <div>
                          <p style="display: inline" class="ml-1">
                            مورد نیاز تا تاریخ:
                          </p>
                          <p style="display: inline">
                            <b>{{
                              money.money.expireDate
                                .replace("-", "/")
                                .replace("-", "/")
                            }}</b>
                          </p>
                        </div>

                        <div class="mb-1 mt-3">
                          <small style="display: inline">
                            <b>{{ money.money.description }}</b>
                          </small>
                        </div>

                        <div v-if="money.money_collect != null">
                          <v-divider class="my-3"></v-divider>
                          <div class="mb-1">
                            <p style="display: inline" class="ml-1">
                              میزان مشارکت شما:
                            </p>
                            <p style="display: inline">
                              <b
                                >{{
                                  money.money_collect.toLocaleString("fa-IR")
                                }}
                                تومان</b
                              >
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
                        </div>
                      </div>

                      <v-row
                        slot="cardActions"
                        class="justify-end px-4 pt-5 pb-3"
                        v-if="money.money_collect == null"
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="ثبت مشارکت"
                          @click="openDonateMoneyDialog(money.money.id)"
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
          :dialogOpen="donateMoneyDialog"
          @update:dialogOpen="updateDonateMoneyDialog"
          title="برای ثبت مشارکت در این سفره، اطلاعات زیر را تکمیل نمایید:"
        >
          <v-form @submit.prevent="onSubmit" slot="dialogText" class="mb-n4">
            <Input
              outlined
              dense
              name="moneyCollect"
              type="number"
              v-model.trim="formData.moneyCollect"
              labelTag
              labelText="مبلغ اهدایی"
              placeholder="مبلغ اهدایی"
              hide_details
              suffix="تومان"
              class="mb-5"
            />

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="this.formData.moneyCollect === ''"
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

export default {
  name: "MoniesCharity",

  data() {
    return {
      id: 0,
      charityName: "",
      cardNumber: "",
      moniesList: [],

      formData: {
        id: "",
        moneyCollect: "",
      },

      donateMoneyDialog: false,
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
    openDonateMoneyDialog(id) {
      this.donateMoneyDialog = !this.donateMoneyDialog;
      this.formData.id = id;
    },
    updateDonateMoneyDialog(newVal) {
      this.donateMoneyDialog = newVal;
    },
    closeDonateMoneyDialog() {
      this.donateMoneyDialog = false;
    },

    async getMoniesCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getMoniesCharity", { id });
        this.moniesList = this.$store.state.responseData;
        if (this.moniesList.length > 0) {
          this.charityName = this.moniesList[0].money.charity.name;
          this.cardNumber = this.moniesList[0].money.charity.cardNumber;
        }
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getMoniesCharity in component:", error);
      }
    },

    async onSubmit() {
      const data = this.formData;
      console.log(this.formData);

      try {
        await this.$store.dispatch("donateMoney", { data });
        this.getMoniesCharity();
        this.closeDonateMoneyDialog();
        this.formData.id = "";
        this.formData.moneyCollect = "";
      } catch (error) {
        console.error("Error during onSubmit in component:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getMoneyCardColors() {
      return (charity) => {
        if (charity.isDone) {
          return this.$hexToRgba(
            this.$vuetify.theme.currentTheme.thirdColor,
            0.15
          );
        } else {
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
    console.log(this.id);

    this.getMoniesCharity(this.id);
  },
};
</script>
