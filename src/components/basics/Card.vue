<template>
  <v-card
    :color="cardColor"
    :dark="dark"
    class="rounded-lg pa-3"
    :elevation="elevation"
    :class="{ 'on-hover': hover }"
  >
    <v-row no-gutters>
      <v-col
        lg="3"
        md="3"
        :sm="imageNewLine ? '7' : '3'"
        :cols="imageNewLine ? '7' : '3'"
        class="mx-auto"
        :class="{ 'my-auto': !imageNewLine, 'mt-lg-5 mt-md-5': imageNewLine }"
        v-if="image"
      >
        <v-img :src="getImagePath(cardImage)" class="mr-3"></v-img>
      </v-col>

      <v-col
        :lg="image ? '9' : '12'"
        :md="image ? '9' : '12'"
        :sm="!image || imageNewLine ? '12' : '9'"
        :cols="!image || imageNewLine ? '12' : '9'"
        :class="{
          'text-center':
            (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) &&
            imageNewLine,
        }"
      >
        <v-card-title v-if="title" class="px-4 pb-3">
          <slot name="cardTitle"></slot>
        </v-card-title>

        <v-card-subtitle v-if="subtitle" class="px-4 pt-0 pb-3">
          <slot name="cardSubtitle"></slot>
        </v-card-subtitle>

        <v-card-text v-if="text" class="px-4 pt-0 pb-3">
          <slot name="cardText"></slot>
        </v-card-text>

        <v-card-actions v-if="actions" class="px-4 pt-0 pb-3">
          <slot name="cardActions"></slot>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    cardColor: {
      type: String,
      default: function () {
        return this.$hexToRgba(this.$vuetify.theme.currentTheme.primary, 0.15);
      },
    },
    hover: Boolean,
    elevationValue: {
      type: Number,
      default: 0,
    },
    cardImage: String,
    dark: Boolean,

    image: {
      type: Boolean,
      default: true,
    },
    imageNewLine: Boolean,

    title: Boolean,
    subtitle: Boolean,
    text: Boolean,
    actions: Boolean,
  },

  methods: {
    getImagePath(imagePath) {
      return require(`@/assets/images/${imagePath}`);
    },
  },

  computed: {
    elevation() {
      return this.hover ? 5 : this.elevationValue;
    },
  },
};
</script>
