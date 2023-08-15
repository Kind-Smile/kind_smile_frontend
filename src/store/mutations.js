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

  login(state, data) {
    if (data.access) {
      state.isAuthenticated = true;
      state.token = data.access;
      state.role = data.role;

      localStorage.setItem("token", data.access);
      localStorage.setItem("role" , data.role)
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
  },

  checkAuthState(state) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      state.isAuthenticated = true;
      state.token = token;
      state.role = role
    } else {
      state.isAuthenticated = false;
      state.token = "";
      state.role = ""
    }
  },

  registerBenefactor(state, data) {
    state.benefactorUsers.push(data);
  },

  registerCharity(state, data) {
    state.charityUsers.push(data);
  },

  // registerAgent(state, data) {
  //   state.agentUsers.push(data);
  // },

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
