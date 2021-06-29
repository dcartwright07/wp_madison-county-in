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
  events: []
});

export const mutations = {
  UPDATE_EVENTS: (state, array) => {
    state.events = array;
  }
};

export const actions = {
  async getEvents({ state, commit }) {
    const auth = await getAuthorization(this.$config, this.$axios);

    const events = await this.$axios
      .get(
        this.$config.wuApiUrl + "/event?organization_id=" + this.$config.orgId,
        {
          headers: {
            Authorization: "Bearer " + auth.data.access_token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
        context.error(error);
      });
    commit("UPDATE_EVENTS", events);
  }
};
