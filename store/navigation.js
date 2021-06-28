export const state = () => ({
  drawer: false,
  miniVariant: false
});

export const mutations = {
  UPDATE_DRAWER(state, boolean) {
    state.drawer = boolean;
  },
  UPDATE_MINI_VARIANT(state, any) {
    state.miniVariant = any;
  }
};

export const actions = {
  updateDrawer({ commit }, value) {
    commit("UPDATE_DRAWER", value);
  }
};
