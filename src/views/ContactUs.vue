<template>
  <div>
    <AppBar></AppBar>
    <v-main class="mt-8 mb-5 mx-5">
      <Card :cardColor="getCardColor" title text :image="false">
        <h3 slot="cardTitle">ارتباط با ما</h3>
        <div slot="cardText">
          <v-row align="center" class="my-4 mr-2">
            <div>
              <p>
                <strong>ایتا:</strong
                ><a href="https://eitaa.com/N_Madanian" target="_blank">
                  <i class="fab fa-facebook-square"></i> N_Madanian
                </a>
              </p>
              <p>
                <strong>تلگرام:</strong
                ><a href="https://t.me/N_Madanian" target="_blank">
                  <i class="fab fa-facebook-square"></i> N_Madanian
                </a>
              </p>
            </div>
          </v-row>
          <p>
            ما در این تیم، به دنبال تسهیل و تسریع انجام امور خیر هستیم. این
            پروژه در راستای مسئولیت اجتماعی جمعی از افراد در حال فعالیت است.
            <br />از مشارکت شما همراهان سپاسگزاریم.
          </p>
        </div>
      </Card>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/basics/AppBar.vue";
import Card from "@/components/basics/Card.vue";

export default {
  name: "ContactUs",

  components: {
    AppBar,
    Card,
  },

  computed: {
    getCardColor() {
      return this.$hexToRgba(this.$vuetify.theme.currentTheme.secondary, 0.15);
    },
  },
};
</script>
