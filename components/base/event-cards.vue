<template>
  <v-item-group class="absolute event-bar" active-class="primary ">
    <v-container>
      <v-row>
        <v-col
          v-for="event in events.slice(0, 3)"
          :key="event.id"
          cols="12"
          md="2"
        >
          <v-item v-slot="{ active, toggle }">
            <v-card
              class="d-flex align-center"
              color="transparent"
              flat
              dark
              height="100"
              @click="toggle"
            >
              <v-scroll-y-transition hide-on-leave>
                <div
                  v-if="!active"
                  class="flex-grow-1 animate-center text-center"
                >
                  {{ event.name }}
                </div>
              </v-scroll-y-transition>
              <v-scroll-y-transition hide-on-leave>
                <div
                  v-if="active"
                  class=" primary fill-height flex-grow-1 animate-center text-center"
                >
                  <!-- <p>{{ token }}</p> -->

                  <v-btn>
                    Learn more
                  </v-btn>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      events: null
    };
  },

  async fetch() {
    if (this.token == null) {
      console.log("API token not set");
    } else {
      this.events = await this.$axios
        .get(
          this.$config.wuApiUrl +
            "/event?organization_id=" +
            this.$config.orgId,
          {
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          return response.data;
        });
    }
  },

  computed: mapState(["token"])
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.z-top {
  z-index: 5;
}
.animate-center {
  left: 19%;
}
.event-bar {
  width: 100%;
  bottom: 15px;
}
</style>
