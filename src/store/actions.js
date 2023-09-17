import axios from "axios";

export default {
  async login({ commit }, { data }) {
    // console.log("I am in: action->login");
    await axios
      .post(`http://127.0.0.1:8000/auth/token/`, {
        phoneNumber: parseInt(data.phoneNumber, 10),
        password: data.password,
      })
      .then((response) => {
        let data = response.data;
        commit("login", {
          access: data.access,
          role: data.role,
          completeData: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error.response.data.detail);
        throw error.response.data.detail;
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

  async userProfile({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/auth/userProfile/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching userProfile:", error);
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

  async foodDonorsList({ state, commit }, { id }) {
    const config = {
      params: { id: id },
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
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching foodDonorsList:", error);
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
        console.log(`editFood successfully! this is response: ${data}`);
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
        console.log(responseMessage)
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching foodCharities:", error);
      });
  },

  async getFoodsCharityForBenefactor({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/food/show/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getFoodsCharityForBenefactor:", error);
      });
  },

  async donateFood({ state, commit }, { data }) {
    // console.log("I am in: action->donateFood");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/food/createDonor/`,
        {
          food_type: data.selectedFood,
          food_collect: parseInt(data.foodCollect, 10),
          food: parseInt(data.id, 10),
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching donateFood:", error);
        throw error;
      });
  },

  //clothes
  async addClothes({ state }, { data }) {
    // console.log("I am in: action->addClothes");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/clothes/create/`,
        {
          eventDate: data.eventDate.replace("/", "-").replace("/", "-"),
          eventTime: data.eventTime,
          agent: data.agent,
          recreate: data.recreate,
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(`addClothes successfully! this is response: ${responseMessage}`);
      })
      .catch((error) => {
        console.error("Error fetching addClothes:", error);
      });
  },

  async getClothesCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/clothes/own/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getClothesCharity:", error);
      });
  },

  async removeClothe({ state }, { id }) {
    // console.log("I am in: action->removeFood");
    const config = {
      data: { id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };
    await axios
      .delete(`http://127.0.0.1:8000/clothes/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error removeClothe:", error);
      });
  },

  async editClothe({ state }, { data }) {
    console.log(data.id)
    // console.log("I am in: action->editClothe");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .put(
        `http://127.0.0.1:8000/clothes/editClothes/`,
        {
          id: data.id,
          eventDate: data.eventDate.replace("/", "-").replace("/", "-"),
          eventTime: data.eventTime,
          agent: data.agent.id,
          recreate: data.recreate,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(`editClothe successfully! this is response: ${data}`);
      })
      .catch((error) => {
        console.error("Error fetching editClothe:", error);
      });
  },

  async clotheDonorsList({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/clothes/clothesDonors/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching clotheDonorsList:", error);
      });
  },

  //money
  async addMoney({ state }, { data }) {
    // console.log("I am in: action->addMoney");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/money/create/`,
        {
          name: data.name,
          money_need: parseInt(data.moneyNeed, 10),
          expireDate: data.expireDate.replace("/", "-").replace("/", "-"),
          description: data.description
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(`addMoney successfully! this is response: ${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  async getMoneyCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/money/own/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getMoneyCharity:", error);
      });
  },

  async moneyDonorsList({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/money/moneyDonors/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching moneyDonorsList:", error);
      });
  },

  async removeMoney({ state }, { id }) {
    // console.log("I am in: action->removeMoney");
    const config = {
      data: { id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };
    await axios
      .delete(`http://127.0.0.1:8000/money/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error removeMoney:", error);
      });
  },

  //notif
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

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Agent
  async agentChangePass({ state, commit }, { data }) {
    // console.log("I am in: action->agentChangePass");
    console.log(data);
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .put(
        `http://127.0.0.1:8000/auth/changePassword/`,
        {
          old_password: data.oldPassword,
          new_password: data.newPassword,
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        throw error.response.data[0].Error[0][0];
      });
  },

  //food
  async getAgentFoodsCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/food/agentFood/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getAgentFoodsCharity:", error);
      });
  },

  async agentReceiveFood({ state, commit }, { id }) {
    // console.log("I am in: action->agentReceiveFood");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/food/isCollected/`,
        {
          user_id: id[0],
          food_id: id[1],
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },

  //clothe
  async getAgentClothesCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/clothes/agentClothes/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getAgentClothesCharity:", error);
      });
  },

  async agentReceiveClothe({ state, commit }, { id }) {
    // console.log("I am in: action->agentReceiveClothe");
    console.log(`user_id is ${id[0]}`)
    console.log(`clothes_id is ${id[1]}`)
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/clothes/isCollected/`,
        {
          user_id: id[0],
          clothes_id: id[1],
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching agentReceiveClothe:", error);
        throw error;
      });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //benefactor

  //money
  async moneyCharities({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/money/charityMoney/", config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage)
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching moneyCharities:", error);
      });
  },

  async getMoniesCharity({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/money/show/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getMoniesCharity:", error);
      });
  },

  async donateMoney({ state, commit }, { data }) {
    // console.log("I am in: action->donateMoney");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/money/createDonor/`,
        {
          money_collect: parseInt(data.moneyCollect, 10),
          money: parseInt(data.id, 10),
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },

  //clothes
  async clotheCharities({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/clothes/charityClothes/", config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching clotheCharities:", error);
      });
  },

  async donateClothe({ state, commit }, { id }) {
    // console.log("I am in: action->donateClothe");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/clothes/createDonor/`,
        {
          clothes: parseInt(id, 10),
        },
        config
      )
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching donateClothe:", error);
        throw error;
      });
  },

  async getClothesCharityForBenefactor({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get("http://127.0.0.1:8000/clothes/show/", config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        console.error("Error fetching getClothesCharityForBenefactor:", error.response.data);
      });
  },
};
