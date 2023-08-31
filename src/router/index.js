import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";

//benefactor account
import FoodCharities from "@/views/benefactorUser/FoodCharitiesView.vue";
import NotificationCharities from "@/views/benefactorUser/NotificationCharitiesView.vue";
import FoodsCharity from "@/views/benefactorUser/FoodsCharity.vue"

//charity account
import AgentFoods from "@/views/AgentUser/Food.vue"
import CharityFood from "@/views/charityUser/Food.vue"

//agent account
import FoodDonors from "@/views/AgentUser/FoodDonors.vue"

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
    path: "/food-charities",
    name: "food",
    component: FoodCharities,
  },

  {
    path: "/notification-charities",
    name: "notification",
    component: NotificationCharities,
  },

  {
    path: "/foods-charity/:id",
    name: "foodsCharity",
    component: FoodsCharity,
  },

  {
    path: "/foods-agent",
    name: "AgentFoods",
    component: AgentFoods,
  },

  {
    path: "/food-donors/:id",
    name: "FoodDonors",
    component: FoodDonors,
  },

  {
    path: "/charity-food",
    name: "charity-food",
    component: CharityFood,
  },

  {
    path: "/map",
    name: "map",
    component: Map,
    props: route => ({
      disable: route.query.disable === 'true' || false,
      coordinates: route.query.coordinates || null
    })
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
