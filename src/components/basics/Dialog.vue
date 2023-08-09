<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <Card class="app" title text actions :image="false" cardColor="#ffffff">
        <div slot="cardTitle">
          <div><small>{{ title }}</small></div>
        </div>

        <div slot="cardText">
          <slot name="dialogText"></slot>
        </div>

        <div slot="cardActions" class="close-button">
          <Button
            large
            icon
            @click="closeDialog"
            :color="this.$vuetify.theme.currentTheme.primary"
          >
          <v-icon slot="buttonSlotBefor" size="22">mdi-close</v-icon>
          </Button>

          <!-- <Button
            text
            @click="closeDialog"
            input_value="ذخیره"
            color="#123aaa"
            class="mb-n3"
          ></Button> -->
        </div>
      </Card>
    </v-dialog>
  </v-row>
</template>

<script>
import Card from "@/components/basics/Card.vue";
import Button from "@/components/basics/Button.vue";

export default {
  name: "Dialog",

  components: {
    Card,
    Button,
  },

  props: {
    dialogOpen: {
      type: Boolean,
      required: true,
    },
    title: String,
  },

  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    dialogOpen: {
      immediate: true,
      handler(newVal) {
        this.dialog = newVal;
      },
    },
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("update:dialogOpen", false); // Emit event to update parent's prop
    },
    saveAndCloseDialog() {
      // Save any data if needed
      this.closeDialog();
    },
  },
};
</script>

<style>
.close-button{
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
