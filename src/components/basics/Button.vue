<template>
  <v-btn
    :href="href"
    :to="to"
    :type="type"
    :outlined="outlined"
    :plain="plain"
    :text="text"
    :block="block"
    :rounded="rounded"
    :color="color"
    :dark="dark"
    :light="light"
    :depressed="depressed"
    :disabled="disabled"
    :elevation="elevation"
    :fab="fab"
    :height="height"
    :width="width"
    :max-height="max_height"
    :max-width="max_width"
    :min-height="min_height"
    :min-width="min_width"
    :icon="icon"
    :large="large"
    :small="small"
    :x-large="x_large"
    :x-small="x_small"
    :loading="loading"
    @click="onClick"
    :class="{ notActiveClass: notActive }"
    class="px-3"
  >
    <slot name="buttonSlotBefor"></slot>
    {{ input_value }}
    <slot name="buttonSlotAfter"></slot>
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {};
  },

  props: {
    href: String,
    to: String,
    type: String,
    outlined: Boolean,
    plain: Boolean,
    text: Boolean,
    block: Boolean,
    rounded: Boolean,
    color: {
      type: String,
      default: function () {
        return this.$vuetify.theme.currentTheme.thirdColor
      },
    },
    dark: Boolean,
    light: Boolean,
    depressed: Boolean,
    disabled: Boolean,
    elevation: Number,
    fab: Boolean,
    height: Number,
    width: Number,
    max_height: Number,
    max_width: Number,
    min_height: Number,
    min_width: Number,
    icon: Boolean,
    input_value: String,
    large: Boolean,
    small: Boolean,
    x_large: Boolean,
    x_small: Boolean,
    loading: Boolean,
    notActive: Boolean,
  },

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>
