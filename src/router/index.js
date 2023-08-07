import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FoodView from "@/views/FoodView.vue";

import Map from "@/views/Map.vue";
import Polygon from "@/views/Polygon.vue";

import Login from "@/views/LoginView.vue";
import RegisterBenefactor from "@/views/RegisterBenefactor.vue";
import RegisterCharity from "@/views/RegisterCharity.vue";
import ForgetPassword from "@/views/ForgetPasswordView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/food",
    name: "food",
    component: FoodView,
  },

  {
    path: "/map",
    name: "map",
    component: Map,
  },

  {
    path: "/polygon",
    name: "polygon",
    component: Polygon,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/register-benefactor",
    name: "register-benefactor",
    component: RegisterBenefactor,
  },

  {
    path: "/register-charity",
    name: "register-charity",
    component: RegisterCharity,
  },

  {
    path: "/forget-password",
    name: "forget-password",
    component: ForgetPassword,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
