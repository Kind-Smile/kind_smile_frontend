<template>
  <div>
    <div v-if="this.$store.state.role != 'Charity'">
      <v-img src="@/assets/images/401error.png"></v-img>
    </div>
    <div v-else>
      <AppBar></AppBar>
      <v-main class="mt-8 mb-5 mx-5">
        <!-- <div v-if="this.$store.state.isLoading"><h4>صبر کنید...</h4></div> -->
        <!-- v-else -->
        <v-row>
          <v-col lg="12" md="12" sm="12" cols="12">
            <Card
              :cardColor="getCardColor"
              title
              text
              :image="false"
              v-if="this.moniesCharity.length > 0"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                هدیه مهربانی
              </div>

              <v-row slot="cardText">
                <template v-for="moneyCharity in moniesCharity">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="moneyCharity.id">
                    <Card
                      title
                      text
                      actions
                      :image="false"
                      :cardColor="moneyCardColor(moneyCharity)"
                    >
                      <div
                        slot="cardTitle"
                        :style="{ color: $vuetify.theme.currentTheme.primary }"
                        class="semiSmall bold"
                      >
                        {{ moneyCharity.name }}
                      </div>

                      <div slot="cardText">
                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            کل هزینه مورد نیاز:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                moneyCharity.money_need.toLocaleString("fa-IR")
                              }}
                              تومان</b
                            >
                          </p>
                        </div>

                        <div class="mb-1" v-if="moneyCharity.collection > 0">
                          <p style="display: inline" class="ml-1">
                            میزان مشارکت ثبت‌شده:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                moneyCharity.collection.toLocaleString("fa-IR")
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
                              moneyCharity.expireDate
                                .replace("-", "/")
                                .replace("-", "/")
                            }}</b>
                          </p>
                        </div>

                        <div class="mb-1 mt-3">
                          <small style="display: inline">
                            <b>{{ moneyCharity.description }}</b>
                          </small>
                        </div>
                      </div>

                      <v-row
                        no-gutters
                        slot="cardActions"
                        class="justify-space-between"
                      >
                        <Button
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          small
                          input_value="مشاهده مشارکت ثبت شده"
                          @click="openBenefactorListDialog(moneyCharity.id)"
                        ></Button>

                        <Button
                          v-if="
                            !moneyCharity.isExpired &&
                            moneyCharity.collection == 0
                          "
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          small
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="حذف"
                          :class="{ 'mt-3': !$vuetify.breakpoint.mdAndUp }"
                          @click="removeMoney(moneyCharity.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>در حال حاضر هیچ هدیه مهربانی توسط شما ثبت نشده است.</p>
              <a @click="addMoney">اضافه کردن هدیه مهربانی جدید</a>
            </div>
          </v-col>
        </v-row>

        <v-container>
          <v-speed-dial right bottom fixed>
            <template v-slot:activator>
              <Button
                fab
                :color="$vuetify.theme.currentTheme.primary"
                @click="addMoney"
              >
                <v-icon slot="buttonSlotBefor" color="white" large
                  >mdi-plus</v-icon
                >
              </Button>
            </template>
          </v-speed-dial>
        </v-container>

        <Dialog
          :dialogOpen="benefactorListDialog"
          @update:dialogOpen="updateBenefactorListDialog"
          :title="benefactorListMessage"
        >
          <template v-for="donor in benefactorList" slot="dialogText">
            <v-col lg="12" md="12" sm="12" cols="12" :key="donor.id">
              <Card title text :image="false">
                <div
                  slot="cardTitle"
                  :style="{ color: $vuetify.theme.currentTheme.primary }"
                  class="semiSmall bold mt-n5"
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
                    <p style="display: inline" class="ml-1">مبلغ اهدایی:</p>
                    <p style="display: inline">
                      <b
                        >{{
                          donor.money_collect.toLocaleString("fa-IR")
                        }}
                        تومان</b
                      >
                    </p>
                  </div>
                </div>
              </Card>
            </v-col>
          </template>
        </Dialog>

        <Dialog
          :dialogOpen="addMoneyDialog"
          @update:dialogOpen="updateAddMoneyDialog"
          title="برای ثبت هدیه مهربانی جدید اطلاعات زیر را تکمیل نمایید:"
        >
          <v-form
            @submit.prevent="onSubmit"
            slot="dialogText"
            class="mb-n4"
            ref="addMoney"
          >
            <Input
              outlined
              dense
              name="name"
              type="text"
              v-model="formData.name"
              labelTag
              labelText="نام هدیه نقدی"
              placeholder="نام هدیه نقدی را وارد نمایید"
              hide_details
              class="mb-5"
            />

            <Input
              outlined
              dense
              name="request"
              type="number"
              v-model.trim="formData.moneyNeed"
              labelTag
              labelText="هزینه مورد نیاز"
              placeholder="هزینه مورد نیاز را وارد نمایید"
              hide_details
              suffix="تومان"
              class="mb-5"
            />

            <div class="mb-5">
              <label> تاریخ پایان نیازمندی </label>
              <div class="mt-2">
                <custom-date-picker
                  v-model="formData.expireDate"
                  auto-submit
                  placeholder="تاریخ پایان نیازمندی را انتخاب نمایید"
                  :min="getDate"
                />
              </div>
            </div>

            <label> توضیحات </label>
            <v-textarea
              outlined
              clearable
              hide-details
              clear-icon="mdi-close"
              v-model="formData.description"
              class="my-2"
            ></v-textarea>

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="
                this.formData.name === '' ||
                this.formData.moneyNeed === '' ||
                this.formData.expireDate === '' ||
                this.formData.description === ''
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
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import Card from "@/components/basics/Card.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "Money",

  components: {
    AppBar,
    Button,
    Input,
    Card,
    Dialog,
  },

  data() {
    return {
      moniesCharity: [],
      benefactorList: [],

      benefactorListMessage: "هنوز مشارکتی برای این هدیه ثبت نشده است.",

      addMoneyDialog: false,
      benefactorListDialog: false,

      formData: {
        name: "",
        moneyNeed: "",
        expireDate: "",
        description: "",
      },
    };
  },

  methods: {
    async getMoneyCharity() {
      try {
        await this.$store.dispatch("getMoneyCharity");
        this.moniesCharity = this.$store.state.responseData;
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getMoneyCharity in component:", error);
      }
    },

    //handle addMoneyDialog
    openAddMoneyDialog() {
      this.addMoneyDialog = !this.addMoneyDialog;
    },
    updateAddMoneyDialog(newVal) {
      this.addMoneyDialog = newVal;
    },
    closeAddMoneyDialog() {
      this.addMoneyDialog = false;
    },

    //handle benefactorListDialog
    async openBenefactorListDialog(id) {
      this.benefactorListDialog = !this.benefactorListDialog;
      await this.getBenefactorList(id);
      if (this.benefactorList.length != 0) {
        this.benefactorListMessage =
          "افراد زیر در این هدیه مهربانی مشارکت داشته‌اند:";
      } else {
        this.benefactorListMessage = "هنوز مشارکتی برای این هدیه ثبت نشده است.";
      }
    },
    updateBenefactorListDialog(newVal) {
      this.benefactorListDialog = newVal;
    },
    closeBenefactorListDialog() {
      this.benefactorListDialog = false;
    },

    async getBenefactorList(id) {
      try {
        await this.$store.dispatch("moneyDonorsList", { id });
        this.benefactorList = this.$store.state.responseData;
        console.log(this.benefactorList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getBenefactorList in component:", error);
      }
    },

    addMoney() {
      this.openAddMoneyDialog();
    },

    async removeMoney(id) {
      try {
        await this.$store.dispatch("removeMoney", { id });
        this.getMoneyCharity();
      } catch (error) {
        console.error("Error during removeMoney in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;
      console.log(data);

      try {
        await this.$store.dispatch("addMoney", { data });
        this.getMoneyCharity();
        this.closeAddMoneyDialog();
        this.formData.name = "";
        this.formData.moneyNeed = "";
        this.formData.expireDate = "";
        this.formData.description = "";
      } catch (error) {
        console.error("Error during add Money in component:", error);
      }
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },

    getDate() {
      return localStorage.getItem("todayDate");
    },

    moneyCardColor() {
      return (moneyCharity) => {
        if (moneyCharity.isExpired) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        } else if (moneyCharity.isDone) {
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
    this.getMoneyCharity();
  },
};
</script>
