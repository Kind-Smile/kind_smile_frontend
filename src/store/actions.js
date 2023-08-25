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
        // commit("login", data.access);
        commit("login", { access: data.access, role: data.role });
        // console.log(`in actions role is: ${data.role}`);
        // console.log(
        //   `loged in successfully! and this is your access token: ${data.access}`
        //   // User and Charity and
        // );
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
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
    const charityData = new FormData();

    charityData.append("name", data.name);
    charityData.append("boss", data.boss);
    charityData.append("phoneNumber", parseInt(data.phoneNumber, 10));
    charityData.append("correlation", data.correlation);
    charityData.append("state", data.selectedState);
    charityData.append("region", data.selectedRegion);
    charityData.append("other", data.other);
    charityData.append("officer", data.officer);
    charityData.append("officerPhone", parseInt(data.officerPhone, 10));
    charityData.append("cardNumber", parseInt(data.cardNumber, 10));
    charityData.append("code", parseInt(data.code, 10));
    charityData.append("institute", data.institute);
    charityData.append("description", data.description);
    charityData.append("latitude", data.latitude);
    charityData.append("longitude", data.longitude);
    charityData.append("password", data.password);

    if (data.logo) {
      charityData.append("logo", data.logo);
    }

    await axios
      .post(`http://127.0.0.1:8000/auth/CharityRegister/`, charityData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  async registerAgent({ state }, { data }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const agentData = new FormData();
    agentData.append("name", data.name);
    agentData.append("phoneNumber", parseInt(data.phoneNumber, 10));
    agentData.append("polygon", JSON.stringify(data.polygon));
    agentData.append("password", data.password);

    await axios
      .post(`http://127.0.0.1:8000/auth/AgentRegister/`, agentData, config)
      .then((response) => {
        let data = response.data;
        // commit("registerAgent", data.access);
        console.log(`registerAgent successfully!`);
      })
      .catch((error) => {
        console.log("in action error");
        console.error("Error:", error);
      });
  },

  async regionsByState({ commit }, { data }) {
    const config = {
      params: { state: data },
    };
    console.log(`in regionsByState actions: data is: ${data}`);

    await axios
      .get("http://127.0.0.1:8000/auth/citiesByState/", config)
      .then((response) => {
        let responseMessage = response.data.cities;
        console.log(`action response: ${responseMessage}`);
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching regionsByState:", error);
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

  async charityAgentList({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/auth/agentList/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setCharityAgentList", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching charityAgentList:", error);
      });
  },

  async foodBenefactorList({ state, commit }, {data}) {
    console.log(data)
    const config = {
      data: { id: data },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/food/foodDonors/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setCharityAgentList", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching benefactorList:", error);
      });
  },

  async addFood({ state }, { data }) {
    // console.log("I am in: action->addFood");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/food/create/`,
        {
          request: parseInt(data.request, 10),
          eventDate: data.eventDate.replace("/", "-").replace("/", "-"),
          eventTime: data.eventTime,
          agent: data.agent,
          recreate: data.recreate,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(`addFood successfully! this is response: ${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async removeFood({ state }, { id }) {
    // console.log("I am in: action->removeFood");
    const config = {
      data: { id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };
    await axios
      .delete(`http://127.0.0.1:8000/food/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error removeFood:", error);
      });
  },

  async editFood({ state }, { data }) {
    // console.log("I am in: action->editFood");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .put(
        `http://127.0.0.1:8000/food/editFood/`,
        {
          id: data.id,
          request: parseInt(data.request, 10),
          eventDate: data.eventDate.replace("/", "-").replace("/", "-"),
          eventTime: data.eventTime,
          agent: data.agent.id,
          recreate: data.recreate,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(`addFood successfully! this is response: ${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async getFoodsCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/food/own/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getFoodsCharity:", error);
      });
  },

  async charityInfo({ state, commit }, { data }) {
    const config = {
      params: { id: data },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/charityInfo/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching charityInfo:", error);
      });
  },

  async foodCharities({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/food/charityFood/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching foodCharity:", error);
      });
  },

  async notificationCharities({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/notif/charityNotif/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching notificationCharity:", error);
      });
  },
};
