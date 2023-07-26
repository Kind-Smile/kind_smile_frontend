<template>
  <div>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <Card :cardColor="getCardColor" title text :image="false">
            <div
              slot="cardTitle"
              :style="{ color: $vuetify.theme.currentTheme.primary }"
              class="bold"
            >
              سفره مهربانی
            </div>

            <v-row slot="cardText">
              <template v-for="charity in charityList">
                <v-col lg="4" md="6" sm="6" cols="12" :key="charity.id">
                  <Card title text actions imageNewLine cardImage="razavi.jpg">
                    <div
                      slot="cardTitle"
                      :style="{ color: $vuetify.theme.currentTheme.primary }"
                      class="bold semiSmall"
                    >
                      <a @click="showDialog">{{ charity.charityName }}</a>
                    </div>

                    <div
                      slot="cardText"
                      :style="{
                        color: $vuetify.theme.currentTheme.textColor,
                      }"
                    >
                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          زمان جمع‌آوری:
                        </p>
                        <p style="display: inline">
                          <b>{{ charity.collectionTime }}</b>
                        </p>
                      </div>

                      <div class="mb-1">
                        <p style="display: inline" class="ml-1">
                          تعداد غذای مورد نیاز:
                        </p>
                        <p style="display: inline">
                          <b>{{ charity.foodRequired }} پرس</b>
                        </p>
                      </div>

                      <div>
                        <p style="display: inline" class="ml-1">
                          تعداد غذای مورد نیاز باقیمانده:
                        </p>
                        <p style="display: inline">
                          <b>{{ charity.foodRequiredLeft }} پرس</b>
                        </p>
                      </div>
                    </div>

                    <v-row slot="cardActions" class="justify-end px-4 py-3">
                      <Button
                        :block="!$vuetify.breakpoint.mdAndUp"
                        dark
                        :color="$vuetify.theme.currentTheme.primary"
                        input_value="ثبت مشارکت"
                      ></Button>
                    </v-row>
                  </Card>
                </v-col>
              </template>
            </v-row>
          </Card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";
import Button from "@/components/basics/Button.vue";

export default {
  name: "Food",

  data() {
    return {
      isShowDialog: false,
    };
  },

  components: {
    AppBar,
    Card,
    Button,
  },

  methods: {
    showDialog() {
      this.isShowDialog = !this.isShowDialog;
      console.log(this.isShowDialog);
    },
  },

  computed: {
    charityList() {
      return this.$store.state.charityList;
    },

    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },
};
</script>
