<template>
  <v-app>
    <v-main>
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
        :dialogOpen="addFoodDialog"
        @update:dialogOpen="updateaddFoodDialog"
        title="برای ثبت سفره جدید اطلاعات زیر را تکمیل نمایید:"
      >
        <v-form @submit.prevent="onSubmit" slot="dialogText" class="mb-n4">
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
              placeholder="تاریخ را انتخاب نمایید"
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

          <Button
            input_value="ثبت‌نام"
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
  </v-app>
</template>

<script>
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import Dialog from "@/components/basics/Dialog.vue";

export default {
  name: "Food",

  components: {
    Button,
    Input,
    Dialog,
  },

  data() {
    return {
      addFoodDialog: false,

      formData: {
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
      } catch (error) {
        console.error("Error during getFoodsCharity in component:", error);
      }
    },

    openaddFoodDialog() {
      this.addFoodDialog = !this.addFoodDialog;
    },
    updateaddFoodDialog(newVal) {
      this.addFoodDialog = newVal;
    },
    closeaddFoodDialog() {
      this.addFoodDialog = false;
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
    },

    async onSubmit() {
      console.log(this.formData);
      const data = this.formData;

      try {
        await this.$store.dispatch("addFood", { data });
        this.closeaddFoodDialog();
      } catch (error) {
        console.error("Error during add food in component:", error);
      }
    },
  },

  created() {
    this.getAgentList();

    // this.getFoodsCharity();
  },
};
</script>
