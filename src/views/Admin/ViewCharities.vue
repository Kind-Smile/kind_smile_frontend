<template>
  <div class="ma-5">
    <div v-for="charity in charitiesList" :key="charity.id">
      <div>{{ charity }}</div>
      <a @click="clickCharity(charity.id)" v-if="!showData">اطلاعات بیشتر</a>
      <a @click="closeExtraInfo()" v-if="showData">بستن اطلاعات</a>
      <h5 v-if="showData">اطلاعات بیشتر:</h5>
      <div v-if="showData">{{ charitiesData }}</div>
      <v-divider color="primary"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCharities",

  data() {
    return {
      id: 0,
      showData: false,
      charitiesList: [],

      charitiesData: [],
    };
  },

  methods: {
    async showCharities() {
      try {
        await this.$store.dispatch("showCharitiesToAdmin");
        this.charitiesList = this.$store.state.responseData;
        console.log(this.charitiesList);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during showCharities in component:", error);
      }
    },

    clickCharity(id) {
      this.showData = true;
      this.id = id;
      this.getEventsOfCharity();
    },

    closeExtraInfo() {
      this.showData = false;
    },

    async getEventsOfCharity() {
      const id = this.id;
      try {
        await this.$store.dispatch("showEventsOfCharityToAdmin", { id });
        this.charitiesData = this.$store.state.responseData;
        console.log(this.charitiesData);
        this.$store.commit("clearResponseData");
      } catch (error) {
        console.error("Error during getEventsOfCharity in component:", error);
      }
    },
  },

  mounted() {
    this.showCharities();
  },
};
</script>
