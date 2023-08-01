<template>
  <div>
    <AppBar></AppBar>
    <card-with-image>
      <div slot="rightPart">
        <v-toolbar class="elevation-0 mb-3">
          <v-toolbar-title
            class="mx-auto semi-larg" 
            >رمز عبورتان را فراموش کرده اید؟</v-toolbar-title
          >
        </v-toolbar>

        <v-row class="justify-space-around mb-1">
          <v-col cols="5" sm="5" md="5">
            <Button
              input_value="ورود"
              to="/login"
              color="info"
              dark
              block
              outlined
              large
            ></Button>
          </v-col>
          <v-col cols="5" sm="5" md="5">
            <Button
              input_value="ثبت نام"
              to="/register"
              color="#5a8dee"
              dark
              block
              outlined
              large
            ></Button>
          </v-col>
        </v-row>

        <p class="text-center">
          <small class="text-center">
            ایمیل و یا شماره تماسی که برای ثبت نام استفاده کرده اید را وارد کنید
            تا رمز عبور موقت برای شما ارسال شود
          </small>
        </p>

        <v-form @submit.prevent="" class="mt-4 mb-5">
          <Input
            outlined
            dense
            name="email-tellphone"
            type="text"
            v-model.trim="email"
            labelTag
            labelText="ایمیل یا تلفن"
            placeholder="ایمیل یا تلفن"
            class="mb-3"
          />
          <Button
            input_value="ارسال رمز عبور"
            color="#5a8dee"
            to="/"
            dark
            block
            large
            class="px-0"
          >
            <v-icon small left slot="buttonSlotAfter"> mdi-arrow-left </v-icon>
          </Button>
        </v-form>

        <p class="text-center mb-8">
          <small>
            <a
              href="/login"
              style="color: gray"
              title="Remember Password"
              class="text-decoration-none"
            >
              رمز عبورم را به خاطر آوردم
            </a>
          </small>
        </p>

        <v-row>
          <v-col cols="2" sm="2" md="3">
            <v-divider></v-divider>
          </v-col>

          <v-col cols="8" sm="8" md="6" class="mt-n3">
            <p class="text-center text--secondary">
              <small>یا توسط گزینه‌های زیر وارد شوید</small>
            </p>
          </v-col>

          <v-col cols="2" sm="2" md="3">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row class="mb-3">
          <v-col cols="12" sm="12" md="6">
            <Button input_value="گوگل" color="#dd4b39" dark block large>
              <v-icon small left slot="buttonSlotBefor"> mdi-google </v-icon>
            </Button>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <Button input_value="فیسبوک" color="#3b5998" dark block large>
              <v-icon small left slot="buttonSlotBefor"> mdi-facebook </v-icon>
            </Button>
          </v-col>
        </v-row>
      </div>
    </card-with-image>
  </div>
</template>

<script>
import CardWithImage from "@/components/basics/CardWithImage.vue";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import AppBar from "@/components/basics/AppBar.vue";
export default {
  name: "ForgetPassword",
  components: {
    CardWithImage,
    Button,
    Input,
    AppBar,
  },
  data() {
    return {
      email: "",
      items: [
        {
          src: require("../assets/images/clothes.png"),
        },
        {
          src: require("../assets/images/food.png"),
        },
        {
          src: require("../assets/images/money.png"),
        },
      ],
    };
  },
  methods: {},
};
</script>
