<template>
  <div>
    <AppBar></AppBar>
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

  watch: {
    userRole(){
      if(!this.$store.state.role){
        this.userRole=true
      }
    }
  },

  created() {
    console.log(!this.$store.state.role);
    this.userRole = this.$store.state.role
  },
};
</script>
