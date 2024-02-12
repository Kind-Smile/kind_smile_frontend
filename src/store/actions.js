import axios from "axios";
import { BASE_URL } from "@/globalFunctions";

export default {
  async login({ commit }, { data }) {
    // console.log("I am in: action->login");
    await axios
      .post(`${BASE_URL}auth/token/`, {
        phoneNumber: data.phoneNumber,
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
        console.error("Error:", error.response.data.non_field_errors[0]);
        throw error.response.data.non_field_errors[0];
      });
  },

  async registerBenefactor({ commit }, { data }) {
    // console.log("I am in: action->register");
    await axios
      .post(`${BASE_URL}auth/PersonRegister/`, {
        name: data.name,
        phoneNumber: data.phoneNumber,
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
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async registerCharity({ commit }, { data }) {
    // console.log("I am in: action->register");
    const charityData = new FormData();

    charityData.append("name", data.name);
    charityData.append("boss", data.boss);
    charityData.append("phoneNumber", data.phoneNumber);
    charityData.append("correlation", data.correlation);
    charityData.append("state", data.selectedState);
    charityData.append("region", data.selectedRegion);
    charityData.append("other", data.other);
    charityData.append("officer", data.officer);
    charityData.append("officerPhone", data.officerPhone);
    charityData.append("cardNumber", data.cardNumber);
    charityData.append("code", data.code);
    charityData.append("institute", data.institute);
    charityData.append("description", data.description);
    charityData.append("latitude", data.latitude);
    charityData.append("longitude", data.longitude);
    charityData.append("password", data.password);

    if (data.logo) {
      charityData.append("logo", data.logo);
    }

    await axios
      .post(`${BASE_URL}auth/CharityRegister/`, charityData, {
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
        console.error("Error:", error.response.data);
        throw error.response.data;
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
    agentData.append("phoneNumber", data.phoneNumber);
    agentData.append("polygon", JSON.stringify(data.polygon));
    agentData.append("password", data.password);

    await axios
      .post(`${BASE_URL}auth/AgentRegister/`, agentData, config)
      .then((response) => {
        let data = response.data;
        // commit("registerAgent", data.access);
        console.log(`registerAgent successfully!`);
      })
      .catch((error) => {
        // console.log("in action error");
        // console.error("Error:", error);
        console.error("Error:", error.response.data);
        // throw error.response.data;
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
      .get(`${BASE_URL}auth/userProfile/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching userProfile:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async regionsByState({ commit }, { data }) {
    const config = {
      params: { state: data },
    };
    console.log(`in regionsByState actions: data is: ${data}`);

    await axios
      .get(`${BASE_URL}auth/citiesByState/`, config)
      .then((response) => {
        let responseMessage = response.data.cities;
        console.log(`action response: ${responseMessage}`);
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching regionsByState:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async getVerifycode({ commit }, { data }) {
    await axios
      .post(`${BASE_URL}auth/sendSms/`, {
        phoneNumber: data,
      })
      .then((response) => {
        let responseMessage = response.data;
        console.log(`this is response of getVerifycode: ${responseMessage}`);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async checkVerifycode({ commit }, { data }) {
    await axios
      .post(`${BASE_URL}auth/validate/`, {
        validationCode: data.verifycode,
        phoneNumber: data.phoneNumber,
      })
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        // console.error("Error:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}auth/agentList/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setCharityAgentList", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching charityAgentList:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}food/foodDonors/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching foodDonorsList:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}food/create/`,
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
        // console.error("Error:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .delete(`${BASE_URL}food/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        // console.error("Error removeFood:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}food/editFood/`,
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
        // console.error("Error:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}food/own/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getFoodsCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}charityInfo/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching charityInfo:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}food/charityFood/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching foodCharities:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}food/show/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getFoodsCharityForBenefactor:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}food/createDonor/`,
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
        `${BASE_URL}clothes/create/`,
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
        console.log(
          `addClothes successfully! this is response: ${responseMessage}`
        );
      })
      .catch((error) => {
        // console.error("Error fetching addClothes:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}clothes/own/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getClothesCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .delete(`${BASE_URL}clothes/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        // console.error("Error removeClothe:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async editClothe({ state }, { data }) {
    console.log(data.id);
    // console.log("I am in: action->editClothe");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .put(
        `${BASE_URL}clothes/editClothes/`,
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
        // console.error("Error fetching editClothe:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}clothes/clothesDonors/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching clotheDonorsList:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}money/create/`,
        {
          name: data.name,
          money_need: parseInt(data.moneyNeed, 10),
          expireDate: data.expireDate.replace("/", "-").replace("/", "-"),
          description: data.description,
        },
        config
      )
      .then((response) => {
        let data = response.data;
        console.log(`addMoney successfully! this is response: ${data}`);
      })
      .catch((error) => {
        // console.error("Error:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}money/own/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getMoneyCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}money/moneyDonors/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching moneyDonorsList:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .delete(`${BASE_URL}money/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        // console.error("Error removeMoney:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  //notif
  async addNotification({ state }, { data }) {
    // console.log("I am in: action->addNotification");
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const notificationData = new FormData();

    notificationData.append("name", data.name);
    notificationData.append("description", data.description);
    notificationData.append(
      "expireDate",
      data.expireDate.replace("/", "-").replace("/", "-")
    );

    if (data.picture) {
      notificationData.append("picture", data.picture);
    }

    await axios
      .post(`${BASE_URL}notif/create/`, notificationData, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(
          `addNotification successfully! this is response: ${responseMessage}`
        );
      })
      .catch((error) => {
        // console.error("Error addNotification:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async getNotificationsCharity({ state, commit }) {
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get(`${BASE_URL}notif/ownNotif/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getNotificationsCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async removeNotification({ state }, { id }) {
    // console.log("I am in: action->removeNotification");
    const config = {
      data: { id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };
    await axios
      .delete(`${BASE_URL}notif/delete/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
      })
      .catch((error) => {
        // console.error("Error removeNotification:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}notif/charityNotif/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching notificationCharities:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async getNotificationsCharityForBenefactor({ state, commit }, { id }) {
    const config = {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .get(`${BASE_URL}notif/show/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error(
        //   "Error fetching getNotificationsCharityForBenefactor:",
        //   error
        // );
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}auth/changePassword/`,
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
        // throw error.response.data[0].Error[0][0];
        throw error.response.data;
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
      .get(`${BASE_URL}food/agentFood/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getAgentFoodsCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}food/isCollected/`,
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
        // console.error("Error:", error);
        // throw error;
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}clothes/agentClothes/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getAgentClothesCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },

  async agentReceiveClothe({ state, commit }, { id }) {
    // console.log("I am in: action->agentReceiveClothe");
    console.log(`user_id is ${id[0]}`);
    console.log(`clothes_id is ${id[1]}`);
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `${BASE_URL}clothes/isCollected/`,
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
        // console.error("Error fetching agentReceiveClothe:", error);
        // throw error;
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}money/charityMoney/`, config)
      .then((response) => {
        let responseMessage = response.data;
        console.log(responseMessage);
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching moneyCharities:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}money/show/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching getMoniesCharity:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}money/createDonor/`,
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
        // console.error("Error:", error);
        // throw error;
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}clothes/charityClothes/`, config)
      .then((response) => {
        let responseMessage = response.data;
        state.isLoading = false;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error("Error fetching clotheCharities:", error);
        console.error("Error:", error.response.data);
        throw error.response.data;
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
        `${BASE_URL}clothes/createDonor/`,
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
        // console.error("Error fetching donateClothe:", error);
        // throw error;
        console.error("Error:", error.response.data);
        throw error.response.data;
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
      .get(`${BASE_URL}clothes/show/`, config)
      .then((response) => {
        let responseMessage = response.data;
        commit("setResponseData", responseMessage);
      })
      .catch((error) => {
        // console.error(
        //   "Error fetching getClothesCharityForBenefactor:",
        //   error.response.data
        // );
        console.error("Error:", error.response.data);
        throw error.response.data;
      });
  },
};
