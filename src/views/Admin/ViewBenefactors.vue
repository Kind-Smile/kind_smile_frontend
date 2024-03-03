<template>
  <div class="ma-5">
    <div v-for="benefactor in benefactorList" :key="benefactor.id">
      <div>{{ benefactor }}</div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCharities",

  data() {
    return {
      benefactorList: [],
    };
  },

  methods: {
    async showBenefactors() {
      try {
        await this.$store.dispatch("showPersonsToAdmin");
        this.benefactorList = this.$store.state.responseData;
        console.log(this.benefactorList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during showBenefactors in component:", error);
      }
    },
  },

  mounted() {
    this.showBenefactors();
  },
};
</script>
