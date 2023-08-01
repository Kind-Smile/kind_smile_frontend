<template>
  <div style="width: 100%; height: 100%" class="pb-10">
    <mapir :apiKey="mapirToken" :center="coordinates" @click="mapOnClick" ref="mapir">
      <mapMarker
        v-for="(point, index) in points"
        :key="index"
        :coordinates="point"
        color="#0"
        :draggable="true"
        @dragend="onMarkerDragEnd(index)"
      ></mapMarker>
    </mapir>

    <div class="point-panel">
      <button @click="addPoint">Add Point</button>
      <button @click="removeLastPoint">Remove Last Point</button>
      <button @click="removeAllPoints">Remove All Points</button>
    </div>
  </div>
</template>

<script>
import { mapir, mapMarker } from "mapir-vue";
import axios from "axios";

export default {
  name: "Map",

  components: {
    mapir,
    mapMarker,
  },
  data() {
    return {
      coordinates: [51.655306, 32.656192],
      points: [],
      mapirToken: process.env.VUE_APP_MAPIR_API_KEY,
      mapInstance: null,
      polygonLayerAdded: false,
    };
  },
  watch: {
    points: {
      handler() {
        this.drawPolygon();
      },
      deep: true,
    },
  },
  methods: {
    async mapOnClick(e) {
      const newPoint = [e.actualEvent.lngLat.lng, e.actualEvent.lngLat.lat];
      this.addPointToMap(newPoint);
      await this.reverseGeocode(newPoint);
    },

    onMarkerDragEnd(index) {
      const updatedPoint = [this.points[index][0], this.points[index][1]];
      this.points.splice(index, 1, updatedPoint);
      // Optionally, you can perform reverse geocoding here if needed.
    },

    async reverseGeocode(point) {
      try {
        const response = await axios.get(
          `https://map.ir/reverse?lat=${point[1]}&lon=${point[0]}`,
          {
            headers: {
              "x-api-key": this.mapirToken,
            },
          }
        );
        const address = response.data.address;
        alert(`${address}`);
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }
    },

    addPoint() {
      // Logic to add a new point at a specific location (e.g., center of the map)
      const newPoint = [...this.coordinates];
      this.addPointToMap(newPoint);
    },

    addPointToMap(point) {
      this.points.push(point);
    },

    removeLastPoint() {
      this.points.pop();
    },

    removeAllPoints() {
      this.points = [];
    },

    drawPolygon() {
      if (this.mapInstance && this.points.length >= 3) {
        if (!this.polygonLayerAdded) {
          this.mapInstance.addLayer({
            id: "polygon-layer",
            type: "fill",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [this.points],
                },
              },
            },
            paint: {
              "fill-color": "#00F",
              "fill-opacity": 0.3,
            },
          });
          this.polygonLayerAdded = true;
        } else {
          this.mapInstance.getSource("polygon-layer").setData({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [this.points],
            },
          });
        }
      } else if (this.polygonLayerAdded) {
        this.mapInstance.removeLayer("polygon-layer");
        this.mapInstance.removeSource("polygon-layer");
        this.polygonLayerAdded = false;
      }
    },
  },
  mounted() {
    this.mapInstance = this.$refs.mapir.mapInstance;
  },
};
</script>

<style>
.point-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
