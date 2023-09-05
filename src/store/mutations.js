import store from ".";

export default {
  updateCharity(state, payload) {
    const { property, newVal } = payload;
    if (state.charity.hasOwnProperty(property)) {
      state.charity[property] = newVal;
    }
  },

  updateBenefactor(state, payload) {
    const { property, newVal } = payload;
    if (state.benefactor.hasOwnProperty(property)) {
      state.benefactor[property] = newVal;
    }
  },

  updateAgent(state, payload) {
    const { property, newVal } = payload;
    if (state.agent.hasOwnProperty(property)) {
      state.agent[property] = newVal;
    }
  },

  updateVerificatedPhoneNumber(state, newPhoneNumber) {
    state.verificatedPhoneNumber = newPhoneNumber;
  },

  updateAgentHasChangePass(state, newstate) {
    state.agentHasChangePass = newstate;
    localStorage.setItem("agentHasChangePass", newstate);
  },

  login(state, data) {
    if (data.access) {
      state.isAuthenticated = true;
      state.token = data.access;
      state.role = data.role;

      localStorage.setItem("token", data.access);
      localStorage.setItem("role", data.role);

      if (data.role == "User") {
        state.benefactorLat = data.completeData.latitude;
        state.benefactorLng = data.completeData.longitude;

        localStorage.setItem("benefactorLat", data.completeData.latitude);
        localStorage.setItem("benefactorLng", data.completeData.longitude);
      }

      else if(data.role == "Agent") {
        state.agentHasChangePass = data.completeData.hasChangePass
        localStorage.setItem("agentHasChangePass", data.completeData.hasChangePass);
      }
    } else {
      state.isAuthenticated = false;
      state.token = "";
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  },

  logout(state) {
    state.isAuthenticated = false;
    state.token = "";
    state.role = "";
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("benefactorLat");
    localStorage.removeItem("benefactorLng");
  },

  checkAuthState(state) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      state.isAuthenticated = true;
      state.token = token;
      state.role = role;

      if (role == "User") {
        state.benefactorLat = localStorage.getItem("benefactorLat");
        state.benefactorLng = localStorage.getItem("benefactorLng");
      }

      else if(role== "Agent"){
        state.agentHasChangePass = localStorage.getItem("agentHasChangePass");
        console.log()
      }
    } else {
      state.isAuthenticated = false;
      state.token = "";
      state.role = "";
    }
  },

  registerBenefactor(state, data) {
    state.benefactorUsers.push(data);
  },

  registerCharity(state, data) {
    state.charityUsers.push(data);
  },

  registerAgent(state, data) {
    state.charityAgentList.push(data);
  },

  setCharityAgentList(state, data) {
    state.charityAgentList = data;
  },

  setResponseData(state, data) {
    state.responseData = data;
  },

  clearResponseData(state) {
    state.responseData = null;
  },

  setIsLoading(state, newVal) {
    state.isLoading = newVal;
  },
};
