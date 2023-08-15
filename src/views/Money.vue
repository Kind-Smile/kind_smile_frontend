<template>
  <div>
    <img :src="charityLogoUrl" alt="Charity Logo" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      charityLogoUrl: "", // Initialize with an empty string
    };
  },
  mounted() {
    // Make an API request to fetch the charity data including the logo URL
    this.fetchCharityData();
  },
  methods: {
    async fetchCharityData() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/userProfile/", config
        ); 
        this.charityLogoUrl = response.data.logo;
        console.log(response.data)
      } catch (error) {
        console.log("in catch")
        console.error("Error fetching charity data:", error);
      }
    },
  },
};
</script>
