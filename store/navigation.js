export const state = () => ({
  drawer: false
});

export const mutations = {
  TOGGLE_HOME_NAVIGATION_DRAWER(state, boolean) {
    state.drawer = boolean;
  }
};

export const actions = {
  updateDrawer({ commit }, value) {
    console.log(value);
    commit("TOGGLE_HOME_NAVIGATION_DRAWER", value);
  }
};
