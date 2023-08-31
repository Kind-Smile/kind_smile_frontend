<template></template>

<script>
export default {
  name: "FoodDonors",

  data() {
    return {
      id: 0,
    };
  },

  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
  },
};
</script>
