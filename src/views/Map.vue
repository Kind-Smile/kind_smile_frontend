<template>
  <div style="width: 100%; height: 100%">
    <mapir :apiKey="mapirToken" :center="coordinates" @click="mapOnClick">
      <mapMarker
        v-if="markerCoordinates"
        :coordinates="markerCoordinates"
        color="#0"
        :draggable="true"
        @dragend="onMarkerDragEnd"
      ></mapMarker>
    </mapir>

    <v-row no-gutters>
      <v-col lg="12" md="12" sm="12" cols="12" class="map-panel px-7">
        <v-row class="justify-space-between align-center">
          <v-col
            lg="10"
            md="10"
            sm="10"
            cols="12"
            class="pa-2 py-auto"
            v-if="
              this.$store.state.charity.isSetAddress ||
              this.$store.state.benefactor.isSetAddress
            "
          >
            <Input
              filled
              dense
              name="address"
              type="text"
              v-model.trim="this.address"
              label="آدرس"
              hide_details
              readonly
            />
          </v-col>
          <v-col lg="2" md="2" sm="2" cols="12" class="pa-2 py-auto">
            <Button input_value="ثبت" @click="saveMap" block></Button>
          </v-col>
        </v-row> </v-col
    ></v-row>
  </div>
</template>

<script>
import { mapir, mapMarker } from "mapir-vue";
import axios from "axios";
import Button from "@/components/basics/Button.vue";
import Input from "@/components/basics/Input.vue";
import router from "@/router";

export default {
  name: "Map",

  components: {
    mapir,
    mapMarker,
    Button,
    Input,
  },
  data() {
    return {
      coordinates: [],
      // coordinates: [51.655306, 32.656192],
      markerCoordinates: null,
      address: "",
      mapirToken: process.env.VUE_APP_MAPIR_API_KEY,
    };
  },
  methods: {
    async mapOnClick(e) {
      this.markerCoordinates = [
        e.actualEvent.lngLat.lng,
        e.actualEvent.lngLat.lat,
      ];
      this.coordinates=this.markerCoordinates

      try {
        const response = await axios.get(
          `https://map.ir/reverse?lat=${this.markerCoordinates[1]}&lon=${this.markerCoordinates[0]}`,
          {
            headers: {
              "x-api-key": this.mapirToken,
            },
          }
        );

        this.address = response.data.address;
        alert(`${this.markerCoordinates}`);
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }
    },

    async onMarkerDragEnd(e) {
      this.markerCoordinates = [
        e.actualEvent.target._lngLat.lng,
        e.actualEvent.target._lngLat.lat,
      ];
      this.coordinates=this.markerCoordinates
      
      try {
        const response = await axios.get(
          `https://map.ir/reverse?lat=${this.markerCoordinates[1]}&lon=${this.markerCoordinates[0]}`,
          {
            headers: {
              "x-api-key": this.mapirToken,
            },
          }
        );

        this.address = response.data.address;
        alert(`${this.address}`);
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }
    },

    saveMap() {
      if (this.$store.state.benefactor.isClickAddress) {
        this.$updateBenefactorProperty("isClickAddress", false);
      } else if (this.$store.state.charity.isClickAddress) {
        this.$updateCharityProperty("isClickAddress", false);
      }

      router.back();
    },
  },

  watch: {
    address(newValue) {
      if (this.$store.state.benefactor.isClickAddress) {
        this.$updateBenefactorProperty("isSetAddress", true);
        this.$updateBenefactorProperty("address", newValue);
        // console.log(`in map component, lacal coordinates ${this.coordinates}`)
        // console.log(`in map component, stroe.state.latitude ${this.$store.state.benefactor.latitude}`)
        // console.log(`in map component, stroe.state.longitude ${this.$store.state.benefactor.longitude}`)
        this.$updateBenefactorProperty("latitude", this.coordinates[1]);
        this.$updateBenefactorProperty("longitude", this.coordinates[0]);
      } else if (this.$store.state.charity.isClickAddress) {
        this.$updateCharityProperty("isSetAddress", true);
        this.$updateCharityProperty("address", newValue);
        this.$updateCharityProperty("latitude", this.coordinates[1]);
        this.$updateCharityProperty("longitude", this.coordinates[0]);
      }
    },
  },

  created() {
    this.coordinates = this.$route.query.coordinates;
    if(this.$store.state.charity.isSetAddress || this.$store.state.benefactor.isSetAddress){
      this.markerCoordinates = this.coordinates
    }
  },

  mounted() {
    if (
      this.$store.state.benefactor.isClickAddress &&
      this.$store.state.benefactor.isSetAddress
    ) {
      this.address = this.$store.state.benefactor.address;
    } else if (
      this.$store.state.charity.isClickAddress &&
      this.$store.state.charity.isSetAddress
    ) {
      this.address = this.$store.state.charity.address;
    }
  },
};
</script>

<style>
.map-panel {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
