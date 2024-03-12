<template>
  <div style="width: 100%; height: 100%">
    <mapir :apiKey="mapirToken" :center="coordinates" @click="mapOnClick">
      <mapGeojsonLayer
        sourceId="mySource"
        :source="geoJsonSource"
        layerId="myLayer"
        :layer="geoJsonLayer"
      />
      <mapMarker
        v-for="(point, index) in points"
        :key="index"
        :coordinates="point"
        color="#0"
        :draggable="true"
        @dragend="onMarkerDragEnd(index, $event)"
      ></mapMarker>
    </mapir>

    <div class="point-panel ml-2" v-if="!this.$route.query.disable">
      <Button
        input_value="اضافه کردن نقطه جدید"
        v-if="isAllowToAddPoints"
        @click="addPoint"
        class="mb-1"
      ></Button>

      <v-alert
        dense
        :color="this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.3)"
        type="error"
        icon="mdi-alert-circle-outline"
        border="left"
        v-else
        class="mb-1"
      >
        نقاط مجاز شما برای نشانه‌گذاری حداقل ۳ و حداکثر ۱۰ نقطه است.
      </v-alert>

      <Button
        :color="$vuetify.theme.currentTheme.secondary"
        input_value="حذف آخرین نقطه"
        @click="removeLastPoint"
        class="mb-1"
      ></Button>

      <Button
        :color="$vuetify.theme.currentTheme.primary"
        input_value="حذف همه نقاط"
        @click="removeAllPoints"
        class="mb-4"
      ></Button>

      <Button v-if="isCompleteRequiredPoints" input_value="ثبت محدوده" @click="savePolygon"></Button>
    </div>
  </div>
</template>

<script>
import { mapir, mapGeojsonLayer, mapMarker } from "mapir-vue";
import Button from "@/components/basics/Button.vue";
import router from "@/router";

export default {
  name: "PolygonView",

  components: {
    mapir,
    mapGeojsonLayer,
    mapMarker,
    Button,
  },

  data() {
    return {
      coordinates: [51.655306, 32.656192],
      mapirToken: process.env.VUE_APP_MAPIR_API_KEY,
      geoJsonSource: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [],
              },
            },
          ],
        },
      },
      geoJsonLayer: {
        id: "myLayer",
        type: "fill",
        source: "mySource",
        paint: {
          "fill-color": this.$vuetify.theme.currentTheme.secondary,
          "fill-opacity": 0.5,
        },
      },
      points: [],
      isAllowToAddPoints: true,
      isCompleteRequiredPoints: false,
    };
  },

  methods: {
    mapOnClick(e) {
      if (!this.$route.query.disable) {
        const newPoint = [e.actualEvent.lngLat.lng, e.actualEvent.lngLat.lat];
        this.addPointToMap(newPoint);
      }
    },

    onMarkerDragEnd(index, e) {
      if (!this.$route.query.disable) {
        const updatedPoint = [
          e.actualEvent.target._lngLat.lng,
          e.actualEvent.target._lngLat.lat,
        ];
        this.points.splice(index, 1, updatedPoint);
        this.updatePolygonGeoJson();
      }
    },

    addPoint() {
      const newPoint = [...this.coordinates];
      this.addPointToMap(newPoint);
      console.log(newPoint)
    },

    addPointToMap(point) {
      this.points.push(point);
      this.updatePolygonGeoJson();
      console.log(point)
    },

    removeLastPoint() {
      this.points.pop();
      this.updatePolygonGeoJson();
    },

    removeAllPoints() {
      this.points = [];
      this.updatePolygonGeoJson();
    },

    updatePolygonGeoJson() {
      this.geoJsonSource.data.features[0].geometry.coordinates = [this.points];
    },

    savePolygon() {
      this.$updateAgentProperty("isSetPolygon", true);
      this.$updateAgentProperty("polygonPoints", this.points);
      console.log(this.$store.state.agent.polygonPoints);
      router.back();
    },
  },

  watch: {
    points(newPoints) {
      this.isAllowToAddPoints = newPoints.length < 10;
      this.isCompleteRequiredPoints = newPoints.length >= 3;
    },
  },

  mounted() {
    if (this.$store.state.agent.isSetPolygon) {
      this.points = this.$store.state.agent.polygonPoints;
      this.updatePolygonGeoJson();
    }
  },
};
</script>

<style>
.point-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
}

.v-icon.notranslate.v-alert__icon.mdi.mdi-alert-circle-outline.theme--dark {
  color: #ec6262;
}
</style>
