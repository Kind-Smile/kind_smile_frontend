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

  login(state, token) {
    // handle authentication
    // console.log("here");
    // console.log(localStorage);
    // console.log(token)
    if (token) {
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem("token", token);
    } else {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    }
  },

  logout(state) {
    // handle authentication
    // console.log("logout");
    // console.log("here");
    // console.log(localStorage);
    state.isAuthenticated = false;
    state.token = "";
    localStorage.removeItem("token");
  },

  checkAuthState(state) {
    const token = localStorage.getItem("token");

    if (token) {
      state.isAuthenticated = true;
      state.token = token;
    } else {
      state.isAuthenticated = false;
      state.token = "";
    }
  },

  registerBenefactor(state, data) {
    state.benefactorUsers.push(data);
  },

  registerCharity(state, data) {
    state.charityUsers.push(data);
  },
};
