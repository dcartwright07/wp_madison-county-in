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
                class="primary fill-height flex-grow-1 animate-center text-center"
              >
                <v-btn>
                  Learn more
                </v-btn>
              </div>
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
  bottom: 15px;
}
</style>
