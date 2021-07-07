<template>
  <v-item-group
    class="absolute event-bar pl-md-16 pr-md-16"
    active-class="primary"
  >
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
              <div v-if="!active" class="flex-grow-1 animate-center text-left">
                <h4 class="accent--text">
                  {{ event.name }}
                </h4>
                <p>
                  {{ event.description }}
                </p>
              </div>
            </v-scroll-y-transition>
            <v-scroll-y-transition hide-on-leave>
              <v-list
                v-if="active"
                class="primary fill-height flex-grow-1 animate-center text-left"
              >
                <v-list-item three-line>
                  <v-list-item-icon>
                    <v-icon>mdi-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{
                        event.start | formatDate($moment, "MM/DD/YYYY hh:mm")
                      }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      consectetur adipiscing elit.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-btn>
                  Learn more
                </v-btn>
              </v-list>
            </v-scroll-y-transition>
          </v-card>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
    await this.getEvents();
  },

  computed: mapState({
    events: state => state.wuapi.events
  }),

  methods: mapActions("wuapi", ["getEvents"])
};
</script>

<style lang="scss" scoped>
.animate-center {
  left: 19%;
}
.event-bar {
  width: 100%;
  top: 75vh;
  height: 235.526px;
}
</style>
