<template>
  <div style="width: 100%; height: 100%">
    <mapir :apiKey="mapirToken" :center="coordinates" @click="mapOnClick">
      <mapMarker
        v-if="markerCoordinates"
        :coordinates="markerCoordinates"
        color="#0"
        :draggable="!disable"
        @dragend="onMarkerDragEnd"
      ></mapMarker>
    </mapir>

    <v-row no-gutters v-if="!disable">
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
              v-model.trim="address"
              label="آدرس"
              hide_details
              readonly
            />
          </v-col>
          <v-alert
            dense
            :color="
              this.$hexToRgba(this.$vuetify.theme.currentTheme.thirdColor, 0.3)
            "
            type="error"
            border="left"
            v-if="this.markerCoordinates == null"
            class="mb-1"
          >
          روی قسمتی از نقشه که نشان‌دهنده آدرس شما است، کلیک کنید تا مکان‌نما در آنجا نمایش داده شود.
          </v-alert>
          <v-col
            lg="2"
            md="2"
            sm="2"
            cols="12"
            class="pa-2 py-auto"
            v-else
          >
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
      disable: false,
    };
  },

  methods: {
    async mapOnClick(e) {
      if (!this.disable) {
        this.markerCoordinates = [
          e.actualEvent.lngLat.lng,
          e.actualEvent.lngLat.lat,
        ];
        this.coordinates = this.markerCoordinates;

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
          console.log(this.address);
        } catch (error) {
          console.error("Error fetching reverse geocoding data:", error);
        }
      }
    },

    async onMarkerDragEnd(e) {
      if (!this.disable) {
        this.markerCoordinates = [
          e.actualEvent.target._lngLat.lng,
          e.actualEvent.target._lngLat.lat,
        ];
        this.coordinates = this.markerCoordinates;

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
          console.log(this.address);
        } catch (error) {
          console.error("Error fetching reverse geocoding data:", error);
        }
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
        console.log(`in watcher local address ${this.address}`);

        this.$updateBenefactorProperty("isSetAddress", true);
        this.$updateBenefactorProperty("address", newValue);
        this.$updateBenefactorProperty("latitude", this.coordinates[1]);
        this.$updateBenefactorProperty("longitude", this.coordinates[0]);

        console.log(
          `in watcher vuex address ${this.$store.state.benefactor.address}`
        );
      } else if (this.$store.state.charity.isClickAddress) {
        console.log(`in watcher local address ${this.address}`);

        this.$updateCharityProperty("isSetAddress", true);
        this.$updateCharityProperty("address", newValue);
        this.$updateCharityProperty("latitude", this.coordinates[1]);
        this.$updateCharityProperty("longitude", this.coordinates[0]);

        console.log(
          `in watcher vuex address ${this.$store.state.charity.address}`
        );
      }
    },
  },

  created() {
    console.log(
      `charity.isClickAddress ${this.$store.state.charity.isClickAddress}`
    );
    console.log(
      `benefactor.isClickAddress ${this.$store.state.benefactor.isClickAddress}`
    );

    this.coordinates = this.$route.query.coordinates;
    this.disable = this.$route.query.disable;
    if (
      this.$store.state.charity.isSetAddress ||
      this.$store.state.benefactor.isSetAddress ||
      this.$route.query.disable
    ) {
      this.markerCoordinates = this.coordinates;
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

.clickable {
  cursor: pointer;
}
</style>
