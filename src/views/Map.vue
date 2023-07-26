<template>
  <div style="width: 100%; height: 100%" class="pb-10">
    <mapir :apiKey="mapirToken" :center="coordinates" @click="mapOnClick">
      <mapMarker
        v-if="markerCoordinates"
        :coordinates="markerCoordinates"
        color="#0"
        :draggable="true"
        @dragend="onMarkerDragEnd"
      ></mapMarker>
    </mapir>

    <div style="position: absolute; bottom: 100px; right: 10px;">
      <CurrentLocation />
    </div>
  </div>
</template>

<script>
import { mapir, mapMarker } from "mapir-vue";
import axios from "axios";
import CurrentLocation from "@/components/basics/CurrentLocation.vue"

export default {
  name: "Map",

  components: {
    mapir,
    mapMarker,
    CurrentLocation
  },
  data() {
    return {
      coordinates: [51.655306, 32.656192],
      markerCoordinates: null,
      mapirToken: process.env.VUE_APP_MAPIR_API_KEY,
    };
  },
  methods: {
    async mapOnClick(e) {
      this.markerCoordinates = [
        e.actualEvent.lngLat.lng,
        e.actualEvent.lngLat.lat,
      ];

      try {
        const response = await axios.get(
          `https://map.ir/reverse?lat=${this.markerCoordinates[1]}&lon=${this.markerCoordinates[0]}`,
          {
            headers: {
              "x-api-key": this.mapirToken,
            },
          }
        );

        const address = response.data.address;
        alert(
          `${address}`
        );
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }
    },

    async onMarkerDragEnd(e) {
      this.markerCoordinates = [
        e.actualEvent.target._lngLat.lng,
        e.actualEvent.target._lngLat.lat,
      ];
      try {
        const response = await axios.get(
          `https://map.ir/reverse?lat=${this.markerCoordinates[1]}&lon=${this.markerCoordinates[0]}`,
          {
            headers: {
              "x-api-key": this.mapirToken,
            },
          }
        );

        const address = response.data.address;
        alert(
          `${address}`
        );
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }
    },
  },
};
</script>
