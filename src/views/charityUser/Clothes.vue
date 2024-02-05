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
              v-if="this.clothesCharity.length > 0"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                پوشاک مهربانی
              </div>

              <v-row slot="cardText">
                <template v-for="clotheCharity in clothesCharity">
                  <v-col lg="4" md="6" sm="6" cols="12" :key="clotheCharity.id">
                    <Card
                      text
                      actions
                      :image="false"
                      :cardColor="clotheCardColor(clotheCharity)"
                    >
                      <div slot="cardText">
                        <div class="mb-1">
                          <p style="display: inline" class="ml-1">
                            زمان جمع‌آوری:
                          </p>
                          <p style="display: inline">
                            <b
                              >{{
                                clotheCharity.eventDate
                                  .replace("-", "/")
                                  .replace("-", "/")
                              }}
                              ساعت
                              {{ clotheCharity.eventTime.slice(0, -3) }}</b
                            >
                          </p>
                        </div>

                        <div>
                          <p style="display: inline" class="ml-1">
                            سفیر مهربانی:
                          </p>
                          <p style="display: inline">
                            <b>{{ clotheCharity.agent.name }}</b>
                          </p>
                        </div>

                        <v-row
                          class="mt-2 my-auto"
                          no-gutters
                          v-if="!clotheCharity.isExpired"
                        >
                          <v-col
                            lg="8"
                            md="8"
                            sm="12"
                            cols="12"
                            v-if="clotheCharity.recreate"
                          >
                            <small
                              :style="{
                                color: $vuetify.theme.currentTheme.thirdColor,
                              }"
                              >این پوشاک مهربانی برای ۳۰ روز آینده تمدید خواهد
                              شد.</small
                            >
                          </v-col>

                          <v-col lg="4" md="4" sm="12" cols="12">
                            <p
                              :class="{
                                'text-lg-left': clotheCharity.recreate,
                                'text-md-left': clotheCharity.recreate,
                              }"
                            >
                              <small>
                                <a
                                  @click="
                                    openEditClotheDialog(clotheCharity.id)
                                  "
                                >
                                  ویرایش
                                </a>
                              </small>
                            </p>
                          </v-col>
                        </v-row>
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
                          @click="openBenefactorListDialog(clotheCharity.id)"
                        ></Button>

                        <Button
                          v-if="
                            !clotheCharity.isExpired &&
                            clotheCharity.collection == 0
                          "
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          small
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="حذف"
                          :class="{ 'mt-3': !$vuetify.breakpoint.mdAndUp }"
                          @click="removeClothe(clotheCharity.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>در حال حاضر هیچ پوشاک مهربانی توسط شما ثبت نشده است.</p>
              <a @click="addClothes">اضافه کردن پوشاک مهربانی جدید</a>
            </div>
          </v-col>
        </v-row>

        <v-container>
          <v-speed-dial right bottom fixed>
            <template v-slot:activator>
              <Button
                fab
                :color="$vuetify.theme.currentTheme.primary"
                @click="addClothes"
              >
                <v-icon slot="buttonSlotBefor" color="white" large
                  >mdi-plus</v-icon
                >
              </Button>
            </template>
          </v-speed-dial>
        </v-container>

        <Dialog
          :dialogOpen="editClotheDialog"
          @update:dialogOpen="updateEditClotheDialog"
          title="ویرایش مشخصات پوشاک مهربانی"
        >
          <v-form @submit.prevent="onEdit" slot="dialogText" class="mb-n4">
            <div class="mb-5">
              <custom-date-picker
                v-model="editedFormData.eventDate"
                auto-submit
                placeholder="تاریخ را انتخاب نمایید"
                :min="getDate"
                :disabled="ishaveBenefactor"
              />
            </div>

            <div class="mb-5">
              <custom-date-picker
                v-model="editedFormData.eventTime"
                type="time"
                simple
                placeholder="زمان را انتخاب نمایید"
                :disabled="ishaveBenefactor"
              />
            </div>

            <v-autocomplete
              outlined
              v-model="editedFormData.agent"
              :items="this.$store.state.charityAgentList"
              item-text="name"
              item-value="id"
              hide-details
              placeholder="سفیر مهربانی خود را انتخاب کنید"
              class="ma-2"
              :disabled="ishaveBenefactor"
            >
            </v-autocomplete>

            <v-checkbox
              v-model.trim="editedFormData.recreate"
              label="پوشاک را برای ۳۰ روز آینده تمدید کن."
              :color="$vuetify.theme.currentTheme.thirdColor"
              hide-details
              class="mb-5"
            ></v-checkbox>

            <div class="my-5" v-if="ishaveBenefactor">
              <small
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
                >به دلیل ثبت مشارکت برای این پوشاک، تنها امکان ویرایش تمدید آن
                وجود دارد و سایر موارد قابل ویرایش نیست.</small
              >
            </div>

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
            >
            </Button>
          </v-form>
        </Dialog>

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
                    <p style="display: inline" class="ml-1">آدرس:</p>
                    <p style="display: inline">
                      <b>{{ donor.user.address.slice(7) }}</b>
                    </p>
                  </div>
                </div>
              </Card>
            </v-col>
          </template>
        </Dialog>

        <Dialog
          :dialogOpen="addClothesDialog"
          @update:dialogOpen="updateaddClothesDialog"
          title="برای ثبت پوشاک مهربانی جدید اطلاعات زیر را تکمیل نمایید:"
        >
          <v-form @submit.prevent="onSubmit" slot="dialogText" class="mb-n4">
            <div class="mb-5">
              <custom-date-picker
                v-model="formData.eventDate"
                auto-submit
                placeholder="تاریخ را انتخاب نمایید"
                :min="getDate"
              />
            </div>

            <div class="mb-5">
              <custom-date-picker
                v-model="formData.eventTime"
                type="time"
                simple
                placeholder="زمان را انتخاب نمایید"
              />
            </div>

            <v-autocomplete
              outlined
              v-model="formData.agent"
              :items="this.$store.state.charityAgentList"
              item-text="name"
              item-value="id"
              hide-details
              placeholder="سفیر مهربانی خود را انتخاب کنید"
              class="ma-2"
            >
            </v-autocomplete>

            <v-checkbox
              v-model.trim="formData.recreate"
              label="پوشاک را برای ۳۰ روز آینده تمدید کن."
              :color="$vuetify.theme.currentTheme.thirdColor"
              hide-details
              class="mb-5"
            ></v-checkbox>

            <div class="my-5">
              <small
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
                >توجه داشته باشید تنها قبل از ثبت مشارکت نیکوکاران مهربان قادر
                به حذف یا ویرایش این پوشاک خواهید بود.</small
              >
            </div>

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="
                this.formData.eventDate === '' ||
                this.formData.eventTime === '' ||
                this.formData.agent === ''
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
  name: "Clothes",

  components: {
    AppBar,
    Button,
    Input,
    Card,
    Dialog,
  },

  data() {
    return {
      clothesCharity: [],
      benefactorList: [],

      benefactorListMessage: "هنوز مشارکتی برای این سفره ثبت نشده است.",

      ishaveBenefactor: false,

      addClothesDialog: false,
      benefactorListDialog: false,
      editClotheDialog: false,

      formData: {
        eventDate: "",
        eventTime: "",
        agent: "",
        recreate: "",
      },

      editedFormData: {
        id: 0,
        eventDate: "",
        eventTime: "",
        agent: "",
        recreate: "",
      },
    };
  },

  methods: {
    async getClothesCharity() {
      try {
        await this.$store.dispatch("getClothesCharity");
        this.clothesCharity = this.$store.state.responseData;
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getClothesCharity in component:", error);
      }
    },

    //handle addClothesDialog
    openaddClothesDialog() {
      this.addClothesDialog = !this.addClothesDialog;
    },
    updateaddClothesDialog(newVal) {
      this.addClothesDialog = newVal;
    },
    closeaddClothesDialog() {
      this.addClothesDialog = false;
    },

    //handle editClotheDialog
    openEditClotheDialog(id) {
      this.editClotheDialog = !this.editClotheDialog;
      const clothe = this.clothesCharity.find((item) => item.id == id);
      this.editedFormData = { ...clothe, id };

      if (clothe.collection == 0) {
        this.ishaveBenefactor = false;
      } else {
        this.ishaveBenefactor = true;
      }
    },
    updateEditClotheDialog(newVal) {
      this.editClotheDialog = newVal;
    },
    closeEditClotheDialog() {
      this.editClotheDialog = false;
    },

    //handle benefactorListDialog
    async openBenefactorListDialog(id) {
      this.benefactorListDialog = !this.benefactorListDialog;
      await this.getBenefactorList(id);
      if (this.benefactorList.length != 0) {
        this.benefactorListMessage =
          "افراد زیر در این سفره مهربانی مشارکت داشته‌اند:";
      } else {
        this.benefactorListMessage = "هنوز مشارکتی برای این سفره ثبت نشده است.";
      }
    },
    updateBenefactorListDialog(newVal) {
      this.benefactorListDialog = newVal;
    },
    closeBenefactorListDialog() {
      this.benefactorListDialog = false;
    },

    async getBenefactorList(clotheId) {
      const id = clotheId;
      try {
        await this.$store.dispatch("clotheDonorsList", { id });
        this.benefactorList = this.$store.state.responseData[0].donors;
        console.log(this.benefactorList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getBenefactorList in component:", error);
      }
    },

    async getAgentList() {
      if (this.$store.state.charityAgentList.length == 0) {
        try {
          await this.$store.dispatch("charityAgentList");
        } catch (error) {
          console.error("Error during charityAgentList in component:", error);
        }
      }
    },

    addClothes() {
      this.openaddClothesDialog();
      this.getAgentList();
    },

    async removeClothe(id) {
      try {
        await this.$store.dispatch("removeClothe", { id });
        this.getClothesCharity();
      } catch (error) {
        console.error("Error during removeClothe in component:", error);
      }
    },

    async onEdit() {
      console.log(this.editedFormData);
      const data = this.editedFormData;

      try {
        await this.$store.dispatch("editClothe", { data });
        this.getClothesCharity();
        this.closeEditClotheDialog();
      } catch (error) {
        console.error("Error during onEdit clothe in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("addClothes", { data });
        this.getClothesCharity();
        this.closeaddClothesDialog();
        this.formData.eventDate = "";
        this.formData.eventTime = "";
        this.formData.agent = "";
        this.formData.recreate = false;
      } catch (error) {
        console.error("Error during add clothes in component:", error);
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

    clotheCardColor() {
      return (clotheCharity) => {
        if (clotheCharity.isExpired) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        } else if (clotheCharity.isDone) {
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
    this.getAgentList();

    this.getClothesCharity();
  },
};
</script>
