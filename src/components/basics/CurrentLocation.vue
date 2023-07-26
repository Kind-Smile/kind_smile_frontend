<template>
  <div>
    <Button @click="getLocation" color="primary" input_value="مکان فعلی"></Button>
  </div>
</template>

<script>
import axios from "axios";
import Button from "@/components/basics/Button.vue"

export default {
  name: "CurrentLocation",

  components:{
    Button
  },

  data() {
    return {
      currentLocation: null,
      currentAddress: null,
      mapirToken: process.env.VUE_APP_MAPIR_API_KEY,
    };
  },
  methods: {
    async getLocation() {
  try { 
    // Get the user's current location using the browser's geolocation API
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      this.currentLocation = {
        latitude,
        longitude,
      };

      // Alert here after getting the location
      alert("Location obtained successfully!");

      // Call the Map.ir Advanced Geolocation API to get the address
      const response = await axios.get(
        `https://map.ir/advancedgeolocation/reverse?lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "x-api-key": this.mapirToken,
          },
        }
      );

      this.currentAddress = response.data.address;
      alert(`مکان فعلی شما: ${this.currentAddress}`);
    });
  } catch (error) {
    console.error("Error getting location or fetching address:", error);
  }
},

  },
};
</script>
