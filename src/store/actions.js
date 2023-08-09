import axios from "axios";

export default {
  async login({ commit }, { data }) {
    // console.log("I am in: action->login");
    await axios
      .post(`http://127.0.0.1:8000/auth/token/`, {
        phoneNumber: parseInt(data.phoneNumber, 10),
        password: data.password,
        // rememberMe: data.rememberMe,
      })
      .then((response) => {
        let data = response.data;
        commit("login", data.access);
        console.log(
          `loged in successfully! and this is your access token: ${data.access}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async registerBenefactor({ commit }, { data }) {
    // console.log("I am in: action->register");
    await axios
      .post(`http://127.0.0.1:8000/auth/PersonRegister/`, {
        name: data.name,
        phoneNumber: parseInt(data.phoneNumber, 10),
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        password: data.password,
      })
      .then((response) => {
        let data = response.data;
        commit("registerBenefactor", data.access);
        console.log(`registerBenefactor successfully!`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async registerCharity({ commit }, { data }) {
    // console.log("I am in: action->register");
    await axios
      .post(`http://127.0.0.1:8000/auth/CharityRegister/`, {
        name: data.name,
        boss: data.boss,
        phoneNumber: parseInt(data.phoneNumber, 10),
        correlation: data.correlation,
        state: data.selectedState,
        region: data.selectedRegion,
        other: data.other,
        officer: data.officer,
        officerPhone: parseInt(data.officerPhone, 10),
        cardNumber: parseInt(data.cardNumber, 10),
        code: parseInt(data.code, 10),
        institute: data.institute,
        description: data.description,
        // address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        // polygon: data.polygon,
        password: data.password,
      })
      .then((response) => {
        let data = response.data;
        commit("registerCharity", data.access);
        console.log(`registered successfully!`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async getVerifycode({ commit }, { data }) {
    await axios
      .post(`http://127.0.0.1:8000/auth/sendSms/`, {
        phoneNumber: parseInt(data, 10),
      })
      .then((response) => {
        let responseMessage = response.data;
        console.log(`this is response of getVerifycode: ${responseMessage}`);
      })
      .catch((error) => {
        console.error("Error:", error.response.data.phoneNumber[0]);
      });
  },

  async checkVerifycode({ commit }, { data }) {
    await axios
      .post(`http://127.0.0.1:8000/auth/validate/`, {
        validationCode: parseInt(data.verifycode, 10),
        phoneNumber: parseInt(data.phoneNumber, 10),
      })
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
