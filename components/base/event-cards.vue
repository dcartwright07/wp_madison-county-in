<template>
  <v-item-group
    class="absolute event-bar pl-5 pr-5 pl-md-16 pr-md-16"
    active-class="primary"
  >
    <v-row>
      <v-col
        v-for="event in eventList"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          elevation="2"
          class="event-card"
          height="100%"
          :to="{ name: 'events-id', params: { id: event.id } }"
        >
          <v-card-title class="pb-2 accent--text">{{ event.name }}</v-card-title>
          <v-card-text>
            <p>{{ event.start | formatDate($moment, "MMMM D") }}</p>
            <p class="mb-0">{{ event.description | truncateText(60) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
    let options = {
      type: "featured",
      limit: "3",
      categories: '18,7,11,9,6,3,4,16'
    };
    await this.getEvents(options);
  },

  computed: mapState({
    eventList() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return this.featuredEvents.slice(0, 1)
        case 'sm':
          return this.featuredEvents.slice(0, 2)
        case 'md':
        case 'lg':
        case 'xl':
          return this.featuredEvents
      }
    },
    featuredEvents: state => state.wuapi.featuredEvents
  }),

  methods: mapActions("wuapi", ["getEvents"])
};
</script>

<style lang="scss" scoped>
.event-bar {
  width: 100%;
  bottom: 5vh;
}

.event-card {
  background-color: rgba(4,4,4,0.5);
  color: #fff;
  .v-card__title {
    font-size: 17px;
    line-height: 1.2;
  }
  p {
    color: #fff;
    font-size: 14px;
  }
}
</style>
