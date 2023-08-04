<template>
  <v-main class="background">
    <v-container fill-height class="py-0">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" sm="10" md="10">
          <v-card class="elevation-8 rounded-2 mx-auto">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
                :md="image ? '6' : '12'"
                :lg="image ? '6' : '12'"
                class="px-10 my-5"
                ref="rightPart"
              >
                <slot name="rightPart"></slot>
              </v-col>

              <v-col md="6" v-if="$vuetify.breakpoint.mdAndUp && image">
                <v-carousel
                  hide-delimiters
                  height="100%"
                  ref="carousel"
                  v-if="image"
                >
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    :src="item.src"
                  ></v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "CardWithImage",

  data() {
    return {
      items: [
        {
          src: require("@/assets/images/clothes.png"),
        },
        {
          src: require("@/assets/images/food.png"),
        },
        {
          src: require("@/assets/images/money.png"),
        },
      ],
    };
  },

  props: {
    image: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.mdAndUp && this.image) {
      const formHeight = this.$refs.rightPart.clientHeight + 40;
      this.$refs.carousel.$el.style.height = `${formHeight}px`;
    }
  },
};
</script>

<style>
.background {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  }
</style>
