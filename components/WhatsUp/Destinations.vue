<template>
  <v-row no-gutters>
    <v-col
      v-for="destination in randomDestinations"
      :key="destination.id"
      cols="12"
      md="6"
      lg="4"
    >
      <v-hover v-slot="{ hover }">
        <a
          :href="
            `https://www.whatsup247.com/destinations/detail/${destination.id}`
          "
          target="_blank"
        >
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-img :aspect-ratio="16 / 9" :src="destination.listing_image">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out v-card--reveal white--text"
                  style="height: 30%;"
                >
                  <h3>{{ destination.name }}</h3>
                  <p>{{ destination.city }}, {{ destination.state }}</p>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </a>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
    await this.getDestinations();
  },

  computed: {
    randomDestinations() {
      let array = [];
      let arrayContainer = [];
      const genNum = Math.floor(Math.random() * 20);
      arrayContainer.push(genNum);

      for (let counter = 0; counter < 9; counter++) {
        let newGen = Math.floor(Math.random() * 20);
        while (arrayContainer.lastIndexOf(newGen) !== -1) {
          newGen = Math.floor(Math.random() * 20);
        }
        arrayContainer.push(newGen);
        array.push(this.destinations[newGen]);
      }

      return array;
    },

    ...mapState({
      destinations: state => state.wuapi.destinations
    })
  },

  methods: mapActions("wuapi", ["getDestinations"])
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: rgba(68, 100, 100, 0.75);
  padding: 10px;
}
.v-sheet.v-card {
  border-radius: 0;
}
</style>
