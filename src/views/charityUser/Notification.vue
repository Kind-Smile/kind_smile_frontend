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
              v-if="this.notificationsCharity.length > 0"
            >
              <div
                slot="cardTitle"
                :style="{ color: $vuetify.theme.currentTheme.primary }"
                class="bold"
              >
                اخبار مهربانی
              </div>

              <v-row slot="cardText">
                <template v-for="notificationCharity in notificationsCharity">
                  <v-col
                    lg="4"
                    md="6"
                    sm="6"
                    cols="12"
                    :key="notificationCharity.id"
                  >
                    <Card
                      title
                      :text="notificationCharity.description != ''"
                      actions
                      :image="notificationCharity.picture != null"
                      :imageNewLine="notificationCharity.picture != null"
                      :cardImage="notificationCharity.picture"
                      :cardColor="notificationCardColor(notificationCharity)"
                      @expandImage="openExpandImageDialog(notificationCharity.picture)"
                    >
                      <div
                        slot="cardTitle"
                        :style="{ color: $vuetify.theme.currentTheme.primary }"
                        class="semiSmall bold"
                      >
                        {{ notificationCharity.name }}
                      </div>

                      <div slot="cardText">
                        <div>
                          <small style="display: inline">
                            <b>{{ notificationCharity.description }}</b>
                          </small>
                        </div>
                      </div>

                      <v-row
                        no-gutters
                        slot="cardActions"
                        class="justify-center"
                      >
                        <div v-if="notificationCharity.isExpired">
                          <small style="display: inline" class="gray">منقضی شده</small>
                        </div>

                        <Button
                          v-else
                          :block="!$vuetify.breakpoint.mdAndUp"
                          dark
                          small
                          :color="$vuetify.theme.currentTheme.primary"
                          input_value="حذف"
                          :class="{ 'mt-3': !$vuetify.breakpoint.mdAndUp }"
                          @click="removeNotification(notificationCharity.id)"
                        ></Button>
                      </v-row>
                    </Card>
                  </v-col>
                </template>
              </v-row>
            </Card>

            <div v-else>
              <p>در حال حاضر هیچ اخبار مهربانی توسط شما ثبت نشده است.</p>
              <a @click="addNotification">اضافه کردن اخبار مهربانی</a>
            </div>
          </v-col>
        </v-row>

        <v-container>
          <v-speed-dial right bottom fixed>
            <template v-slot:activator>
              <Button
                fab
                :color="$vuetify.theme.currentTheme.primary"
                @click="addNotification"
              >
                <v-icon slot="buttonSlotBefor" color="white" large
                  >mdi-plus</v-icon
                >
              </Button>
            </template>
          </v-speed-dial>
        </v-container>

        <Dialog
          :dialogOpen="addNotificationDialog"
          @update:dialogOpen="updateAddNotificationDialog"
          title="برای ثبت اخبار مهربانی اطلاعات زیر را تکمیل نمایید:"
        >
          <v-form
            @submit.prevent="onSubmit"
            slot="dialogText"
            class="mb-n4"
            ref="addNotification"
          >
            <Input
              outlined
              dense
              name="name"
              type="text"
              v-model="formData.name"
              labelTag
              labelText="نام خبر"
              placeholder="نام خبر را وارد نمایید"
              hide_details
              class="mb-5"
            />

            <div class="mb-5">
              <label> تاریخ انقضای خبر </label>
              <div class="mt-2">
                <custom-date-picker
                  v-model="formData.expireDate"
                  auto-submit
                  placeholder="تاریخ انقضای خبر را انتخاب نمایید"
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
              class="my-2 mb-5"
            ></v-textarea>

            <label> تصویر خبر </label>
            <v-file-input
              v-model="formData.picture"
              :rules="rules.fileInput"
              outlined
              color="#ffcc66"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="تصویر خود را بارگذاری کنید"
              prepend-icon="mdi-camera"
              @change="handlePictureChange"
              class="my-2"
            ></v-file-input>

            <Button
              input_value="ثبت‌"
              type="submit"
              block
              large
              class="mb-3 mt-5"
              :disabled="
                this.formData.name === '' || this.formData.expireDate === '' || this.formData.picture === null
              "
            >
            </Button>
          </v-form>
        </Dialog>

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
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import Card from "@/components/basics/Card.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "Notification",

  components: {
    AppBar,
    Button,
    Input,
    Card,
    Dialog,
  },

  data() {
    return {
      notificationsCharity: [],

      addNotificationDialog: false,

      expandImageDialog: false,
      expandImage: null,

      formData: {
        name: "",
        expireDate: "",
        description: "",
        picture: null,
      },

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
    };
  },

  methods: {
    async getNotificationsCharity() {
      try {
        await this.$store.dispatch("getNotificationsCharity");
        this.notificationsCharity = this.$store.state.responseData;
        this.notificationsCharity.forEach((notification) => {
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

    //handle addNotificationDialog
    openAddNotificationDialog() {
      this.addNotificationDialog = !this.addNotificationDialog;
    },
    updateAddNotificationDialog(newVal) {
      this.addNotificationDialog = newVal;
    },
    closeAddNotificationDialog() {
      this.addNotificationDialog = false;
    },

    //handle expandImageDialog
    openExpandImageDialog(image) {
      this.expandImageDialog = !this.expandImageDialog;
      this.expandImage = image;
    },
    updateExpandImageDialog(newVal) {
      this.expandImageDialog = newVal;
    },

    addNotification() {
      this.openAddNotificationDialog();
    },

    handlePictureChange(event) {
      const file = event;
      if (file) {
        this.formData.picture = file;
      }
    },

    async removeNotification(id) {
      try {
        await this.$store.dispatch("removeNotification", { id });
        this.getNotificationsCharity();
      } catch (error) {
        console.error("Error during removeNotification in component:", error);
      }
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("addNotification", { data });
        this.getNotificationsCharity();
        this.closeAddNotificationDialog();
        this.formData.name = "";
        this.formData.expireDate = "";
        this.formData.description = "";
        this.formData.picture = null;

        this.$store.commit("setSnackbar", true);
        this.$store.commit(
          "snackbarMessage",
          `اخبار مهربانی جدید با موفقیت ایجاد شد.`
        );
        setTimeout(() => {
          this.$store.commit("setSnackbar", false);
        }, 3000);
      } catch (error) {
        console.error("Error during addNotification in component:", error);
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

    notificationCardColor() {
      return (notificationCharity) => {
        if (notificationCharity.isExpired) {
          return this.$hexToRgba(this.$vuetify.theme.currentTheme.text, 0.15);
        } else if (notificationCharity.isDone) {
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
    this.getNotificationsCharity();
  },
};
</script>
