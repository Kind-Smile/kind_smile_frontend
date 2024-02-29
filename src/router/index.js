import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";

//benefactor account
import FoodCharities from "@/views/benefactorUser/FoodCharitiesView.vue";
import FoodsCharity from "@/views/benefactorUser/FoodsCharity.vue"
import MoneyCharities from "@/views/benefactorUser/MoneyCharities.vue"
import MoniesCharity from "@/views/benefactorUser/MoniesCharity.vue"
import ClotheCharities from "@/views/benefactorUser/ClotheCharities.vue"
import ClothesCharity from "@/views/benefactorUser/ClothesCharity.vue"
import NotificationCharities from "@/views/benefactorUser/NotificationCharities.vue";
import NotificationsCharity from "@/views/benefactorUser/NotificationsCharity.vue"
// /notifications-charity/${id}

//charity account
import CharityFood from "@/views/charityUser/Food.vue"
import CharityMoney from "@/views/charityUser/Money.vue"
import CharityClothes from "@/views/charityUser/Clothes.vue"
import CharityNotifications from "@/views/charityUser/Notification.vue"
import CharityEditProfile from "@/views/Profile.vue"

//agent account
import AgentFoods from "@/views/AgentUser/Food.vue"
import FoodDonors from "@/views/AgentUser/FoodDonors.vue"
import AgentClothe from "@/views/AgentUser/Clothe.vue"
import ClotheDonors from "@/views/AgentUser/ClotheDonors.vue"

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
    name: "food-charities",
    component: FoodCharities,
  },

  {
    path: "/foods-charity/:id",
    name: "foodsCharity",
    component: FoodsCharity,
  },

  {
    path: "/clothe-charities",
    name: "clothe-charities",
    component: ClotheCharities,
  },

  {
    path: "/clothes-charity/:id",
    name: "clothes-charity",
    component: ClothesCharity,
  },

  {
    path: "/money-charities",
    name: "money-charities",
    component: MoneyCharities,
  },

  {
    path: "/monies-charity/:id",
    name: "moniesCharity",
    component: MoniesCharity,
  },  

  {
    path: "/notification-charities",
    name: "notification",
    component: NotificationCharities,
  },

  {
    path: "/notifications-charity/:id",
    name: "notifications-charity",
    component: NotificationsCharity,
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
    path: "/clothes-agent",
    name: "AgentClothe",
    component: AgentClothe,
  },

  {
    path: "/clothe-donors/:id",
    name: "ClotheDonors",
    component: ClotheDonors,
  },

  {
    path: "/charity-food",
    name: "charity-food",
    component: CharityFood,
  },

  {
    path: "/charity-money",
    name: "charity-money",
    component: CharityMoney,
  },

  {
    path: "/charity-clothes",
    name: "charity-clothes",
    component: CharityClothes,
  },

  {
    path: "/charity-notifications",
    name: "charity-notifications",
    component: CharityNotifications,
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
    path: "/profile",
    name: "profile",
    component: CharityEditProfile,
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
