<template>
  <div>
    <label v-if="labelTag"> {{ labelText }} </label>
    <v-text-field
      class="mt-2 custom-input"
      :name="name"
      :value="value"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      :append-icon="append_icon"
      :prepend-icon="prepend_icon"
      :prepend-inner-icon="prepend_inner_icon"
      :outlined="outlined"
      :background-color="background_color"
      :color="color"
      :dark="dark"
      :light="light"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :filled="filled"
      :solo="solo"
      :success="success"
      :error="error"
      :success-messages="success_messages"
      :error-messages="error_messages"
      :messages="messages"
      :hint="hint"
      :rules="rules"
      :loading="loading"
      :rounded="rounded"
      :autofocus="autofocus"
      :suffix="suffix"
      :prefix="prefix"
      :hide-details="hide_details"
      @blur="onBlur"
      @input="onInput"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {};
  },

  props: {
    name: String,
    value: String,
    type: String,
    labelTag: Boolean,
    label: String,
    labelText: String,
    placeholder: String,
    append_icon: String,
    prepend_icon: String,
    prepend_inner_icon: String,
    outlined: Boolean,
    background_color: String,
    color: String,
    dark: Boolean,
    light: Boolean,
    dense: Boolean,
    height: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    filled: Boolean,
    solo: Boolean,
    success: Boolean,
    error: Boolean,
    success_messages: String,
    error_messages: String,
    messages: String,
    hint: String,

    // rules: String,
    rules: {
      type: Array,
      required: false,
    },
    //array

    loading: Boolean,
    rounded: Boolean,
    autofocus: Boolean,
    suffix: String,
    prefix: String,
    hide_details: Boolean,
  },

  methods: {
    onBlur(event) {
      this.$emit("blur", event.target.value);
    },
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style>
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(
    .v-input--has-state
  )
  > .v-input__control
  > .v-input__slot
  fieldset {
  border: 1px solid #e6e3df;
  padding: 0.47rem 0.8rem;
  font-size: 1rem;
  line-height: 1.4;
  /* border-radius: 0.267rem; */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  color: #ffe9c0;
  border-color: #ffcc66;
  outline: 0;
  box-shadow: 0 3px 8px 0 rgba(190, 179, 138, 0.1);
  padding-left: 30px;
}

.v-input input:focus,
.v-input input:active,
.v-input textarea:focus,
.v-input textarea:active {
  caret-color: #ffcc66;
}

.custom-input input[type="number"]::-webkit-inner-spin-button,
.custom-input input[type="number"]::-webkit-outer-spin-button {
  display: none;
}
</style>
