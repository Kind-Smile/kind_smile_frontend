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
        password: data.password,
      })
      .then((response) => {
        let data = response.data;
        commit("registerBenefactor", data.access);
        console.log(
          `registerBenefactor successfully! and this is your access token: ${data.access}`
        );
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
        selectedState: data.selectedState,
        officer: data.officer,
        officerPhone: parseInt(data.officerPhone, 10),
        cardNumber: parseInt(data.cardNumber, 10),
        code: parseInt(data.code, 10),
        institute: data.institute,
        description: data.description,
        address: data.address,
        polygon: data.polygon,
        password: data.password,
      })
      .then((response) => {
        let data = response.data;
        commit("registerCharity", data.access);
        console.log(
          `registered successfully! and this is your access token: ${data.access}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
