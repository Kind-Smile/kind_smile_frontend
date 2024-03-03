<template>
  <div>
    <v-row>
      <v-col md="6" cols="12">
        <Button
          input_value="مشخصات خیریه‌ها"
          type="button"
          block
          large
          class="my-2"
          @click="showCharities"
        >
        </Button>
      </v-col>

      <v-col md="6" cols="12">
        <Button
          input_value="مشخصات نیکوکاران"
          type="button"
          block
          large
          class="my-2"
          @click="showBenefactors"
        >
        </Button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Button from "@/components/basics/Button.vue";
import router from "@/router";

export default {
  name: "ViewCharities",

  components: {
    Button,
  },

  data() {
    return {
      id: 0,
      showData: false,
      charitiesList: [],
      charitiesData: [],
    };
  },

  methods: {
    showCharities(){
        router.push("/viewCharities")
    },
    showBenefactors(){
        router.push("/viewBenefactors")
    },
  },

  mounted() {
    this.showCharities();
  },
};
</script>
