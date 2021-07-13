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
  token: "",
  events: [],
  directory: [],
  destinations: []
});

export const mutations = {
  UPDATE_TOKEN: (state, string) => {
    state.token = string;
  },
  UPDATE_EVENTS: (state, array) => {
    state.events = array;
  },
  UPDATE_DIRECTORY: (state, array) => {
    state.directory = array;
  },
  UPDATE_DESTINATIONS: (state, array) => {
    state.destinations = array;
  }
};

export const actions = {
  async setApiToken({ commit }) {
    const auth = await getAuthorization(this.$config, this.$axios);
    await commit("UPDATE_TOKEN", auth.data.access_token);
  },

  async getEvents({ state, dispatch, commit }) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const events = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/event?organization_id=" +
          this.$config.orgId +
          "&copromotions=1",
        {
          headers: {
            Authorization: "Bearer " + state.token,
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
  },

  async getDirectory({ state, dispatch, commit }) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const directory = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/directory?organization_id=" +
          this.$config.orgId +
          "&copromotions=1",
        {
          headers: {
            Authorization: "Bearer " + state.token,
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
    commit("UPDATE_DIRECTORY", directory);
  },

  async getDestinations({ state, dispatch, commit }) {
    if (!state.token) {
      await dispatch("setApiToken");
    }

    const destinations = await this.$axios
      .get(
        this.$config.wuApiUrl +
          "/destination?organization_id=" +
          this.$config.orgId +
          "&copromotions=1",
        {
          headers: {
            Authorization: "Bearer " + state.token,
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
    commit("UPDATE_DESTINATIONS", destinations);
  }
};
