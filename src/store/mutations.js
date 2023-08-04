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
};
