const state = {
  text: "",
  datajson: {},
};

const mutations = {
  ChangeTextValue: (state, newState) => {
    console.log("123");
    state.text = newState;
  },
  SetglobalObj(state, newState) {
    state.globalObj.type = newState;
  },
};

const actions = {
  ChangeTextValue({ commit, dispatch }, newState) {
    commit("ChangeTextValue", newState);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
