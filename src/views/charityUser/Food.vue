<template>
  <div>
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
            v-if="this.foodsCharity.length > 0"
          >
            <div
              slot="cardTitle"
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
            >
              سفره مهربانی
            </div>

            <v-row slot="cardText">
              <template v-for="foodCharity in foodsCharity">
                <v-col
                  lg="4"
                  md="6"
                  sm="6"
                  cols="12"
                  :key="foodCharity.id"
                >
                  <Card
                    text
                    actions
                    :image="false"
                    :cardColor="foodCardColor(foodCharity)"
                  >
                    <div slot="cardText">
                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          کل غذای مورد نیاز:
                        </p>
                        <p style="display: inline">
                          <b>{{ foodCharity.request }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1" v-if="foodCharity.collection > 0">
                        <p style="display: inline" class="ml-1">
                          تعداد مشارکت ثبت‌شده:
                        </p>
                        <p style="display: inline">
                          <b>{{ foodCharity.collection }} پرس</b>
                        </p>
                      </div>

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          زمان جمع‌آوری:
                        </p>
                        <p style="display: inline">
                          <b
                            >{{
                              foodCharity.eventDate
                                .replace("-", "/")
                                .replace("-", "/")
                            }}
                            ساعت
                            {{ foodCharity.eventTime.slice(0, -3) }}</b
                          >
                        </p>
                      </div>

                      <div>
                        <p style="display: inline" class="ml-1">
                          سفیر مهربانی:
                        </p>
                        <p style="display: inline">
                          <b>{{ foodCharity.agent.name }}</b>
                        </p>
                      </div>

                      <v-row
                        class="mt-2 my-auto"
                        no-gutters
                        v-if="!foodCharity.isExpired"
                      >
                        <v-col
                          lg="8"
                          md="8"
                          sm="12"
                          cols="12"
                          v-if="foodCharity.recreate"
                        >
                          <small
                            :style="{
                              color: $vuetify.theme.currentTheme.thirdColor,
                            }"
                            >این سفره به‌صورت هفتگی تمدید خواهد شد.</small
                          >
                        </v-col>

                        <v-col lg="4" md="4" sm="12" cols="12">
                          <p
                            :class="{
                              'text-lg-left': foodCharity.recreate,
                              'text-md-left': foodCharity.recreate,
                            }"
                          >
                            <small>
                              <a @click="openEditFoodDialog(foodCharity.id)">
                                ویرایش سفره
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
                        @click="openBenefactorListDialog(foodCharity.id)"
                      ></Button>

                      <Button
                        v-if="
                          !foodCharity.isExpired && foodCharity.collection == 0
                        "
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        small
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="حذف این سفره"
                        :class="{ 'mt-3': !$vuetify.breakpoint.mdAndUp }"
                        @click="removeFood(foodCharity.id)"
                      ></Button>
                    </v-row>
                  </Card>
                </v-col>
              </template>
            </v-row>
          </Card>

          <div v-else>
            <p>در حال حاضر هیچ سفره‌ای برای شما ثبت نشده است.</p>
            <a @click="addFood">اضافه کردن سفره جدید</a>
          </div>
        </v-col>
      </v-row>

      <v-container>
        <v-speed-dial right bottom fixed>
          <template v-slot:activator>
            <Button
              fab
              :color="$vuetify.theme.currentTheme.primary"
              @click="addFood"
            >
              <v-icon slot="buttonSlotBefor" color="white" large
                >mdi-plus</v-icon
              >
            </Button>
          </template>
        </v-speed-dial>
      </v-container>

      <Dialog
        :dialogOpen="editFoodDialog"
        @update:dialogOpen="updateEditFoodDialog"
        title="ویرایش مشخصات سفره مهربانی"
      >
        <v-form
          @submit.prevent="onEdit"
          slot="dialogText"
          class="mb-n4"
          ref="editFood"
        >
          <Input
            outlined
            dense
            name="request"
            type="number"
            v-model.trim="editedFormData.request"
            labelTag
            labelText="تعداد غذای مورد نیاز"
            placeholder="تعداد غذای مورد نیاز"
            hide_details
            :disabled="ishaveBenefactor"
            class="mb-5"
          />

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
            :disabled="ishaveBenefactor"
            class="ma-2"
          >
          </v-autocomplete>

          <v-checkbox
            v-model.trim="editedFormData.recreate"
            label="هر هفته سفره با زمان فوق را تمدید کن."
            :color="$vuetify.theme.currentTheme.thirdColor"
            hide-details
            class="mb-5"
          ></v-checkbox>

          <div class="my-5" v-if="ishaveBenefactor">
            <small
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
              >به دلیل ثبت مشارکت برای این سفره، تنها امکان ویرایش تمدید هفتگی
              وجود دارد و سایر موارد قابل ویرایش نیست.</small
            >
          </div>

          <Button
            input_value="ثبت‌"
            type="submit"
            dark
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
        <div slot="dialogText">
          <!-- <Card></Card> -->
        </div>
      </Dialog>

      <Dialog
        :dialogOpen="addFoodDialog"
        @update:dialogOpen="updateaddFoodDialog"
        title="برای ثبت سفره جدید اطلاعات زیر را تکمیل نمایید:"
      >
        <v-form
          @submit.prevent="onSubmit"
          slot="dialogText"
          class="mb-n4"
          ref="addFood"
        >
          <Input
            outlined
            dense
            name="request"
            type="number"
            v-model.trim="formData.request"
            labelTag
            labelText="تعداد غذای مورد نیاز"
            placeholder="تعداد غذای مورد نیاز"
            hide_details
            class="mb-5"
          />

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
            label="هر هفته سفره با زمان فوق را تمدید کن."
            :color="$vuetify.theme.currentTheme.thirdColor"
            hide-details
            class="mb-5"
          ></v-checkbox>

          <div class="my-5">
            <small
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
              >توجه داشته باشید تنها قبل از ثبت مشارکت نیکوکاران مهربان قادر به
              حذف یا ویرایش این سفره خواهید بود.</small
            >
          </div>

          <Button
            input_value="ثبت‌"
            type="submit"
            dark
            block
            large
            class="mb-3 mt-5"
          >
          </Button>
        </v-form>
      </Dialog>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import Card from "@/components/basics/Card.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "Food",

  components: {
    AppBar,
    Button,
    Input,
    Card,
    Dialog,
  },

  data() {
    return {
      foodsCharity: [],
      benefactorList: [],

      benefactorListMessage: "هنوز مشارکتی برای این سفره ثبت نشده است.",

      ishaveBenefactor: false,

      addFoodDialog: false,
      benefactorListDialog: false,
      editFoodDialog: false,

      formData: {
        request: "",
        eventDate: "",
        eventTime: "",
        agent: "",
        recreate: false,
      },

      editedFormData: {
        id: 0,
        request: "",
        eventDate: "",
        eventTime: "",
        agent: "",
        recreate: false,
      },
    };
  },

  methods: {
    async getFoodsCharity() {
      try {
        await this.$store.dispatch("getFoodsCharity");
        this.foodsCharity = this.$store.state.responseData;
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getFoodsCharity in component:", error);
      }
    },

    //handle addFoodDialog
    openaddFoodDialog() {
      this.addFoodDialog = !this.addFoodDialog;
    },
    updateaddFoodDialog(newVal) {
      this.addFoodDialog = newVal;
    },
    closeaddFoodDialog() {
      this.addFoodDialog = false;
    },

    //handle editFoodDialog
    openEditFoodDialog(id) {
      this.editFoodDialog = !this.editFoodDialog;
      const food = this.foodsCharity.find((item) => item.id == id);
      food.request = food.request.toString();
      this.editedFormData.id = id;
      this.editedFormData = food;

      if (!food.collection == 0) {
        this.ishaveBenefactor = true;
      } else {
        this.ishaveBenefactor = false;
      }

      console.log(id);
    },
    updateEditFoodDialog(newVal) {
      this.editFoodDialog = newVal;
    },
    closeEditFoodDialog() {
      this.editFoodDialog = false;
    },

    //handle benefactorListDialog
    async openBenefactorListDialog(id) {
      this.benefactorListDialog = !this.benefactorListDialog;
      await this.getBenefactorList(id);
      console.log(this.benefactorList.length != 0);
      if (this.benefactorList.length != 0) {
        this.benefactorListMessage =
          "افراد زیر در این سفره مهربانی مشارکت داشته‌اند:";
      }else{
        this.benefactorListMessage =
        "هنوز مشارکتی برای این سفره ثبت نشده است.";
      }
    },
    updateBenefactorListDialog(newVal) {
      this.benefactorListDialog = newVal;
    },
    closeBenefactorListDialog() {
      this.benefactorListDialog = false;
    },

    async getBenefactorList(foodId) {
      const id = foodId;
      try {
        await this.$store.dispatch("foodDonorsList", { id });
        this.benefactorList = this.$store.state.responseData;
        console.log(this.benefactorList)
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

    addFood() {
      this.openaddFoodDialog();
      this.getAgentList();
    },

    async removeFood(id) {
      try {
        await this.$store.dispatch("removeFood", { id });
        this.getFoodsCharity();
      } catch (error) {
        console.error("Error during removeFood in component:", error);
      }
    },

    async onEdit() {
      console.log(this.editedFormData);
      const data = this.editedFormData;

      try {
        await this.$store.dispatch("editFood", { data });
        this.getFoodsCharity();
        this.closeEditFoodDialog();
      } catch (error) {
        console.error("Error during onEdit food in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("addFood", { data });
        this.getFoodsCharity();
        this.closeaddFoodDialog();
        this.formData.request = "";
        this.formData.eventDate = "";
        this.formData.eventTime = "";
        this.formData.agent = "";
        this.formData.recreate = false;
      } catch (error) {
        console.error("Error during add food in component:", error);
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

    foodCardColor() {
      return (foodCharity) => {
        if (foodCharity.isExpired) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        } else if (foodCharity.isDone) {
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

    this.getFoodsCharity();
  },
};
</script>
