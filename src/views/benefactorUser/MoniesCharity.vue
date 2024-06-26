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
            <Card :cardColor="getCardColor" title text :image="false" v-if="this.moniesList.length > 0">
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
                        <div class="mb-2">
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

                        <div class="mb-2" v-if="money.money.collection > 0">
                          <p style="display: inline" class="ml-1">
                            میزان مشارکت ثبت‌شده:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                money.money.collection.toLocaleString("fa-IR")
                              }}
                              تومان</b
                            >
                          </p>
                        </div>

                        <div class="mb-2" v-if="money.money.collection > 0">
                          <p style="display: inline" class="ml-1">
                            میزان مورد نیاز باقیمانده:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                (
                                  money.money.money_need -
                                  money.money.collection
                                ).toLocaleString("fa-IR")
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
                          <div class="mb-2">
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

                          <v-row>
                            <v-col lg="6" md="6" sm="12" cols="12">
                              <a
                                :style="{
                                  color: $vuetify.theme.currentTheme.thirdColor,
                                }"
                                @click="
                                  openReceiptDialog(
                                    money.receipt_image,
                                    money.receipt_text
                                  )
                                "
                                >مشاهده رسید واریز</a
                              >
                            </v-col>

                            <v-col lg="6" md="6" sm="12" cols="12">
                              <Button
                                :block="!$vuetify.breakpoint.mdAndUp"
                                dark
                                small
                                :color="$vuetify.theme.currentTheme.primary"
                                input_value="ویرایش واریز"
                                :class="{
                                  'mt-3': !$vuetify.breakpoint.mdAndUp,
                                }"
                                @click="openEditMoneyDialog(money)"
                              ></Button>
                            </v-col>
                          </v-row>

                          <div class="mt-4 mb-1">
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

            <div v-else>
              <p>
                در حال حاضر برای این خیریه پویش مهربانی موجود نمی‌باشد.
              </p>
              <router-link to="/">بازگشت به صفحه اصلی</router-link>
            </div>
          </v-col>
        </v-row>

        <Dialog
          :dialogOpen="donateMoneyDialog"
          @update:dialogOpen="updateDonateMoneyDialog"
          :title="donateMoneyText"
        >
          <div slot="dialogText" class="mb-n4">
            <v-alert
              v-if="alert"
              dense
              :color="
                this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)
              "
              type="error"
              icon="mdi-alert-circle-outline"
              border="left"
              class="mb-1"
            >
              {{ alertMessage }}
            </v-alert>

            <v-form @submit.prevent="onSubmit">
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

              <v-divider class="mb-5"></v-divider>

              <p>رسید واریز خود را به صورت متنی یا تصویری ارسال کنید:</p>

              <label> رسید واریز متنی </label>
              <v-textarea
                outlined
                clearable
                placeholder="رسید واریز خود را به صورت متنی در این قسمت وارد نمایید."
                hide-details
                clear-icon="mdi-close"
                v-model="formData.receiptText"
                @input="handleInput"
                class="my-3"
              ></v-textarea>

              <label class="mr-3"> رسید واریز تصویری </label>
              <v-file-input
                v-model="formData.receiptImage"
                :rules="rules.fileInput"
                outlined
                color="#ffcc66"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="رسید واریز خود را به صورت تصویری بارگذاری کنید"
                prepend-icon="mdi-camera"
                @change="handleReceiptChange"
                class="my-2"
              ></v-file-input>

              <Button
                input_value="ثبت‌"
                type="submit"
                block
                large
                class="mb-3 mt-5"
                :disabled="
                  this.formData.moneyCollect === '' ||
                  (this.formData.receiptText === '' &&
                    this.formData.receiptImage == null)
                "
              >
              </Button>
            </v-form>
          </div>
        </Dialog>

        <Dialog
          :dialogOpen="editMoneyDialog"
          @update:dialogOpen="updateEditMoneyDialog"
          title="ویرایش واریز"
        >
          <v-form
            @submit.prevent="onEdit"
            slot="dialogText"
            class="mb-n4"
            ref="editReceipt"
          >
            <Input
              outlined
              dense
              name="moneyCollect"
              type="number"
              v-model.trim="editFormData.moneyCollect"
              labelTag
              labelText="مبلغ اهدایی"
              placeholder="مبلغ اهدایی"
              hide_details
              suffix="تومان"
              class="mb-5"
            />

            <v-divider class="mb-5"></v-divider>

            <p>رسید واریز خود را به صورت متنی یا تصویری ارسال کنید:</p>

            <label> رسید واریز متنی </label>
            <v-textarea
              outlined
              clearable
              placeholder="رسید واریز خود را به صورت متنی در این قسمت وارد نمایید."
              hide-details
              clear-icon="mdi-close"
              v-model="editFormData.receiptText"
              @input="handleInputForEdit"
              class="my-3"
            ></v-textarea>

            <div class="mt-5">
              <a
                :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                @click="changeLogo"
                >{{ receiptFileText }}</a
              >
            </div>

            <v-file-input
              v-model="editFormData.receiptImage"
              :rules="rules.fileInput"
              outlined
              color="#ffcc66"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="رسید واریز خود را به صورت تصویری بارگذاری کنید"
              prepend-icon=""
              @change="handleReceiptChange"
              hide-input
              id="receiptFile"
              class="my-2"
            ></v-file-input>

            <Button
              input_value="ویرایش"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="
                this.editFormData.moneyCollect === '' ||
                (this.editFormData.receiptText === '' &&
                  this.editFormData.receiptImage == null)
              "
            >
            </Button>
          </v-form>
        </Dialog>

        <Dialog
          :dialogOpen="receiptDialog"
          @update:dialogOpen="updateReceiptDialog"
          title="رسید واریز شما:"
        >
          <div slot="dialogText" class="mb-n4">
            <v-img :src="receiptImage" v-if="receiptImage != null" />
            <p v-if="receiptText != null" class="mt-4">رسید متنی شما:</p>
            <p v-html="receiptText" v-if="receiptText != null" class="mt-2"></p>
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
        receiptText: "",
        receiptImage: null,
      },
      formattedReceiptText: "",

      editFormData: {
        id: 0,
        moneyCollect: "",
        receiptText: "",
        receiptImage: null,
      },

      receiptFileText: "بارگزاری رسید تصویری",
      donateMoneyText: "",

      rules: {
        fileInput: [
          (value) => {
            return (
              !value ||
              value.size < 5000000 ||
              "حجم فایل لوگوی شما باید کمتر از ۵ مگابایت باشد."
            );
          },
        ],
      },

      donateMoneyDialog: false,

      editMoneyDialog: false,

      receiptDialog: false,
      receiptImage: null,
      receiptText: "",

      alert: false,
      alertMessage: "",
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
    //handle donateMoneyDialog
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

    //handle editMoneyDialog
    openEditMoneyDialog(passedMoney) {
      const id = passedMoney.money.id;
      if (passedMoney.receipt_image != null) {
        this.receiptFileText = "تغییر رسید تصویری";
      }
      console.log(passedMoney);
      this.editMoneyDialog = !this.editMoneyDialog;
      const money = this.moniesList.find((item) => item.money.id == id);
      console.log(money);
      money.moneyCollect = money.money_collect.toString();
      money.receiptText = money.receipt_text;
      if (money.receiptText != null) {
        money.receiptText = money.receiptText.replace(/<br>/g, "\n");
      }
      // money.receiptImage = money.receipt_image;
      this.editFormData = { ...money, id };
    },
    updateEditMoneyDialog(newVal) {
      this.editMoneyDialog = newVal;
    },
    closeEditMoneyDialog() {
      this.editMoneyDialog = false;
    },

    //handle receiptDialog
    openReceiptDialog(image, text) {
      this.receiptDialog = !this.receiptDialog;
      this.receiptImage = image;
      this.receiptText = text;
      console.log(this.receiptText == null);
      console.log(image);
    },
    updateReceiptDialog(newVal) {
      this.receiptDialog = newVal;
    },

    handleInput() {
      this.formattedReceiptText = this.formData.receiptText.replace(
        /\n/g,
        "<br>"
      );
    },

    handleInputForEdit() {
      this.formattedReceiptText = this.editFormData.receiptText.replace(
        /\n/g,
        "<br>"
      );
    },

    changeLogo() {
      let receiptFile = document.getElementById("receiptFile");
      if (receiptFile != null) {
        receiptFile.click();
      }
    },

    async getMoniesCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("getMoniesCharity", { id });
        this.moniesList = this.$store.state.responseData;
        if (this.moniesList.length > 0) {
          this.charityName = this.moniesList[0].money.charity.name;
          this.cardNumber = this.moniesList[0].money.charity.cardNumber;
          this.donateMoneyText =
            "برای ثبت مشارکت در این سفره، مبلغ مورد نظر خود را به شماره حساب خیریه به شماره: " +
            this.cardNumber +
            " واریز و موارد زیر را تکمیل نمایید:";
        }
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getMoniesCharity in component:", error);
      }
    },

    async onSubmit() {
      this.formData.receiptText = this.formattedReceiptText;
      // console.log(this.formData.receiptText);
      const data = this.formData;
      // console.log(this.formData);

      try {
        this.alert = false;

        await this.$store.dispatch("donateMoney", { data });
        this.getMoniesCharity();
        this.closeDonateMoneyDialog();
        this.formData.id = "";
        this.formData.moneyCollect = "";
        this.formData.receiptText = "";
        this.formData.receiptImage = null;
      } catch (error) {
        console.error("Error during onSubmit in component:", error);
        this.alert = true;
        this.alertMessage = error;
      }
    },

    handleReceiptChange(event) {
      const file = event;
      if (file) {
        this.formData.receiptImage = file;
      }
    },

    async onEdit() {
      if (
        this.formattedReceiptText != "" ||
        this.formattedReceiptText != null
      ) {
        this.editFormData.receiptText = this.formattedReceiptText;
      }
      console.log(this.editFormData);
      const data = this.editFormData;

      try {
        await this.$store.dispatch("editMoneyForBenefactor", { data });
        this.getMoniesCharity();
        this.closeEditMoneyDialog();
      } catch (error) {
        console.error("Error during onEdit money in component:", error);
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
