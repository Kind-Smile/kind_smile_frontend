<template>
<card-with-image>
  <div slot="rightPart">
    <v-toolbar class="elevation-0">
      <v-toolbar-title
        class="mx-auto"
        style="font-size: 1.47rem; font-weight: 400"
        >ثبت نام</v-toolbar-title
      >
    </v-toolbar>

    <!-- <p class="text-center text--secondary">
      <small
        >لطفا جزئیات خود را برای ثبت نام وارد کرده و عضوی از جامعه
        عالی ما شوید.</small
      >
    </p> -->

    <v-form @submit.prevent="onSubmit" ref="form">
      <v-row class="mb-2 mt-4 justify-space-between">
        <v-col cols="12" sm="12" md="6">
          <Input
            outlined
            dense
            name="firstname"
            type="text"
            v-model.trim="formData.firstname"
            labelTag
            labelText="نام"
            placeholder="نام"
            hide_details
            class="mb-2"
          />
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <Input
            outlined
            dense
            name="lastname"
            type="text"
            v-model.trim="formData.lastname"
            labelTag
            labelText="نام خانوادگی"
            placeholder="نام خانوادگی"
            hide_details
            class="mb-2"
          />
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <Input
            outlined
            dense
            name="email"
            type="text"
            v-model.trim="formData.email"
            labelTag
            labelText="آدرس ایمیل"
            placeholder="آدرس ایمیل"
            hide_details
            :rules="[rules.email]"
            class="mb-2"
          />
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <Input
            outlined
            dense
            name="tell"
            type="number"
            v-model.trim="formData.tell"
            labelTag
            labelText="شماره تماس"
            placeholder="شماره تماس"
            suffix="| 98+"
            @keydown="deleteZero"
            hide_details
            class="mb-2"
          />
        </v-col>
        <!-- <v-col cols="12" sm="12" md="6" class="ma-0 pa-0">
          <vue-tel-input-vuetify
            outlined
          ></vue-tel-input-vuetify>
        </v-col> -->

        <v-col cols="12" sm="12" md="12">
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
          <Input
            outlined
            dense
            name="password"
            type="password"
            v-model.trim="formData.rePassword"
            labelTag
            labelText="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
            hint="حداقل 8 کاراکتر"
            :rules="[rules.password]"
            class="mb-n2"
          />
        </v-col>

        <v-col cols="6" sm="6" md="6">
          <vue-recaptcha ref="recaptcha" sitekey="Your key here" />
          <!-- <VueRecaptcha
            :sitekey="siteKey"
            :load-recaptcha-script="true"
            @verify="handleSuccess"
            @error="handleError"
          ></VueRecaptcha> -->
        </v-col>

        <v-col cols="12" sm="12" md="12">
          <Button
            input_value="ثبت نام"
            type="submit"
            color="#5a8dee"
            dark
            block
            large
            class="my-2"
          >
            <v-icon small left slot="buttonSlotAfter">
              mdi-arrow-left
            </v-icon>
          </Button>
        </v-col>
      </v-row>
    </v-form>

    <v-divider class="mb-5"></v-divider>

    <p class="text-center text--secondary">
      <small>حساب کاربری دارید؟</small>
      <small>
        <a
          href="/login"
          style="color: #5a8dee"
          title="Login"
        >
          ورود
        </a>
        <!-- <small style="display:inline"> <router-link to='/login'>ورود</router-link> </small> -->
      </small>
    </p>
  </div>
</card-with-image>
</template>

<script>
import CardWithImage from "@/components/CardWithImage.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import router from "@/router";
import { VueRecaptcha } from 'vue-recaptcha';
export default {
  name: "Register",
  components: {
    CardWithImage,
    Button,
    Input,
    VueRecaptcha,
  },
  // setup() {
  //   const siteKey = computed(() => {
  //     return 'yourSiteAPIKey';
  //   });

  //   const handleError = () => {
  //     // Do some validation
  //   };

  //   return {
  //     handleSuccess,
  //     handleError,
  //     siteKey,
  //   };
  // },
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        tell: "",
        password: "",
        rePassword: "",
      },
      rules: {
        required: value => {return (!!value || 'Required.')},
        email: value => {
          const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: value => {
          return value.length >= 8
        }
      },
      items: [
        {
          src: require("../assets/images/1.jpg"),
        },
        {
          src: require("../assets/images/2.jpg"),
        },
        {
          src: require("../assets/images/3.jpg"),
        },
      ],
    };
  },
  methods: {
    deleteZero(){
      if (this.formData.tell.charAt(0) == "0") {
        this.formData.tell= this.formData.tell.substring(1);
      }
    },
    onSubmit() {
      this.$refs.form.reset();
      console.log(this.formData);
      // const data = this.formData;
      // this.$store.dispatch("register", { data });
      router.push("/");
    },
  },
};
</script>

<style scoped>
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
