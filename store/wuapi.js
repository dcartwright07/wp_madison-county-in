const getAuthorization = (config, axios) => {
  return axios.post(
    "/oauth",
    {
      grant_type: "client_credentials",
      client_id: config.apiClientId,
      client_secret: config.apiClientSecret,
      scope: ""
    },
    {
      baseURL: config.wuApiUrl,
      headers: { Accept: "application/json" }
    }
  );
};

export const state = () => ({
  // token: null,
  events: []
});

export const mutations = {
  // UPDATE_TOKEN: (state, string) => {
  //   state.token = string;
  // },

  UPDATE_EVENTS: (state, array) => {
    state.events = array;
  }
};

export const actions = {
  async getEvents({ commit }) {
    const auth = await getAuthorization(this.$config, this.$axios);
    // commit("UPDATE_TOKEN", auth.data.access_token);

    const events = await this.$axios
      .get("/wuapi/event?organization_id=" + this.$config.orgId, {
        headers: {
          Authorization: "Bearer " + auth.data.access_token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        return response.data;
      });
    commit("UPDATE_EVENTS", events);
  }
};
