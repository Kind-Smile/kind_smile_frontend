<template>
  <div>
    <AppBar></AppBar>
    <card-with-image class="my-3" :image="false">
      <div slot="rightPart">
        <v-toolbar class="elevation-0 ma-0">
          <v-toolbar-title class="mx-auto semi-larg"
            >ثبت‌نام خیریه</v-toolbar-title
          >
        </v-toolbar>

        <v-form @submit.prevent="onSubmit">
          <v-row class="mb-2 mt-4 justify-start">
            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="name"
                type="text"
                v-model.trim="formData.name"
                labelTag
                labelText="نام خیریه"
                placeholder="نام خیریه"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="boss"
                type="text"
                v-model.trim="formData.boss"
                labelTag
                labelText="نام مدیر"
                placeholder="نام مدیر"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <div class="custom-input-suffix">
                <Input
                  outlined
                  dense
                  name="phoneNumber"
                  type="number"
                  v-model.trim="formData.phoneNumber"
                  labelTag
                  labelText="شماره تلفن"
                  placeholder="شماره تلفن"
                  suffix="| 98+"
                  hide_details
                  class="mb-2 mx-2"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="correlation"
                type="text"
                v-model.trim="formData.correlation"
                labelTag
                labelText="وابسته به"
                placeholder="وابسته به"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <label> شهر </label>
              <v-autocomplete
                outlined
                v-model="formData.selectedState"
                :items="states"
                item-text="name"
                item-value="id"
                hide-details
                placeholder="شهر خود را انتخاب کنید"
                class="ma-2"
              >
              </v-autocomplete>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="officer"
                type="text"
                v-model.trim="formData.officer"
                labelTag
                labelText="نام مسئول ارتباط مردمی"
                placeholder="نام مسئول ارتباط مردمی"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="officerPhone"
                type="number"
                v-model.trim="formData.officerPhone"
                labelTag
                labelText="شماره ارتباط مردمی"
                placeholder="شماره ارتباط مردمی"
                suffix="| 98+"
                hide_details
                append-icon="''"
                class="mb-2 mx-2 custom-input"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="cardNumber"
                type="number"
                v-model.trim="formData.cardNumber"
                labelTag
                labelText="شماره کارت خیریه"
                placeholder="شماره کارت خیریه"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <Input
                outlined
                dense
                name="code"
                type="number"
                v-model.trim="formData.code"
                labelTag
                labelText="شماره ثبت"
                placeholder="شماره ثبت"
                hide_details
                class="mb-2 mx-2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <label> هیئت امنا </label>
              <v-textarea
                outlined
                clearable
                hide-details
                clear-icon="mdi-close-circle"
                v-model="formData.institute"
                class="ma-2"
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="4">
              <label> توضیحات </label>
              <v-textarea
                outlined
                clearable
                hide-details
                clear-icon="mdi-close-circle"
                v-model="formData.description"
                class="ma-2"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="6"
              v-if="!this.$store.state.charity.isSetAddress"
              class="ma-2"
            >
              <a
                href="/map"
                :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                @click="this.$store.state.charity.isClick = true"
                >انتخاب آدرس خیریه از روی نقشه</a
              >
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" v-else>
              <v-col cols="12" sm="12" md="12" lg="12">
                <Input
                  outlined
                  dense
                  name="address"
                  type="text"
                  v-model="formData.address"
                  :value="this.$store.state.charity.address"
                  labelTag
                  labelText="آدرس"
                  placeholder="آدرس"
                  hide_details
                  disabled
                />
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12">
                <a
                  href="/map"
                  :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
                  style="font-size: 0.8rem"
                  class="mb-2"
                  @click="this.$store.state.charity.isClick = true"
                  >برای تغییر آدرس اینجا کلیک کنید.</a
                >
              </v-col>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12">
              <Input
                outlined
                dense
                name="password"
                type="password"
                v-model.trim="formData.password"
                labelTag
                labelText="رمز عبور"
                placeholder="رمز عبور"
                hint="حداقل 8 کاراکتر"
                :rules="[rules.password]"
                class="mb-n2"
              />
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <Button
                input_value="ثبت نام"
                type="submit"
                :color="$vuetify.theme.currentTheme.thirdColor"
                dark
                block
                large
                class="my-2"
              >
              </Button>
            </v-col>
          </v-row>
        </v-form>
        <v-divider class="mt-1 mb-5"></v-divider>

        <p class="ma-0 text-center text--secondary">
          <small>حسابی ندارید؟</small>
          <small>
            <a
              href="/register"
              title="Register"
              :style="{ color: $vuetify.theme.currentTheme.thirdColor }"
            >
              ثبت نام
            </a>
          </small>
        </p>
      </div>
    </card-with-image>
  </div>
</template>

<script>
import CardWithImage from "@/components/basics/CardWithImage.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import AppBar from "@/components/basics/AppBar.vue";
import router from "@/router";

export default {
  name: "RegisterCharity",

  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },

  data() {
    return {
      formData: {
        name: "",
        boss: "",
        phoneNumber: "",
        correlation: "",
        selectedState: "",
        officer: "",
        officerPhone: "",
        cardNumber: "",
        code: "",
        institute: "",
        description: "",
        address: this.$store.state.charity.address,
        password: "",
      },

      states: [
        { name: "اصفهان", id: 1 },
        { name: "تهران", id: 2 },
        { name: "شیراز", id: 3 },
        { name: "بوشهر", id: 4 },
        { name: "رشت", id: 5 },
      ],

      rules: {
        required: (value) => {
          return !!value || "Required.";
        },
        email: (value) => {
          const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          return value.length >= 8;
        },
      },
    };
  },

  methods: {
    onSubmit() {
      console.log(this.formData);
      const data = this.formData;
      // this.$store.dispatch('login', {data})
      this.$store.commit("login", "absdf");
      router.push("/");
    },
    logout() {
      this.$store.commit("logout");
      router.push("/");
    },
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },
};
</script>

<style>
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  min-height: 40px;
}

.autocomplete input[type="text"] {
  caret-color: #ffcc66;
}

.v-text-field__suffix {
  color: #312e2e;
}

.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 0.2rem;
}
</style>
