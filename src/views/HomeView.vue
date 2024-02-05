<template>
  <div>
    <AppBar></AppBar>
    <!-- <v-alert
      v-if="this.alert"
      dense
      :color="this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)"
      type="success"
      icon="mdi-alert-circle-outline"
      border="left"
      class="mb-1"
    >
      {{ this.alertMessage }}.
    </v-alert>
    <h1 v-if="this.alert">hello</h1> -->
    <BenefactorMainContent
      v-if="!this.$store.state.role || this.$store.state.role == 'User'"
    ></BenefactorMainContent>

    <CharityMainContent
      v-else-if="this.$store.state.role == 'Charity'"
    ></CharityMainContent>

    <AgentMainContent
      v-else-if="this.$store.state.role == 'Agent'"
    ></AgentMainContent>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";

import CharityMainContent from "@/components/CharityMainContent.vue";
import BenefactorMainContent from "@/components/BenefactorMainContent.vue";
import AgentMainContent from "@/components/AgentMainContent.vue";

export default {
  name: "Home",

  data() {
    return {
      userRole: "",
      alert: false,
      alertMessage: "",
      prevRoute: null,
    };
  },

  components: {
    AppBar,
    Card,
    CharityMainContent,
    BenefactorMainContent,
    AgentMainContent,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },

  mounted() {
    this.alert = false
    console.log(this.prevRoute.path == "/login")
    if (this.prevRoute.path == "/login"){
      this.alert = true
      this.alertMessage= "ورود شما با موفقیت انجام شد."
      console.log(this.alertMessage)
    }
  },
};
</script>
