<template>
  <v-app-bar
    elevate-on-scroll
    app
    tile
    color="transparent"
    class="blur-primary-color lightgrey--text"
    style="z-index:2;"
    dark
  >
    <div class="blur-container">
      <div class="blur-content" style=""></div>
    </div>
    <nuxt-link
      class="d-flex text-decoration-none justify-center align-center flex-nowrap"
      to="/"
    >
      <v-img
        class="mr-3"
        max-height="45"
        max-width="45"
        src="https://madisoncounty.in.gov/images/recoloredlogo.png"
        lazy-src="https://madisoncounty.in.gov/images/recoloredlogo.png"
      ></v-img>

      <v-toolbar-title
        class="mr-16 lightgrey--text text-decoration-none"
        v-text="location.county + ', ' + location.state.abbrv"
      />
    </nuxt-link>
    <v-spacer />
    <v-btn class="ml-16" icon>
      <v-icon class="lightgrey--text">mdi-magnify</v-icon>
    </v-btn>

    <v-app-bar-nav-icon
      class="lightgrey--text"
      @click.stop="drawer = !drawer"
    />
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      drawer: false
    };
  },

  watch: {
    drawer(value) {
      this.updateDrawer(value);
    },
    stateDrawer(value) {
      this.drawer = value;
    }
  },

  computed: mapState({
    stateDrawer: state => state.navigation.drawer
  }),

  methods: mapActions("navigation", ["updateDrawer"]),

  created() {
    this.drawer = this.stateDrawer;
  }
};
</script>

<style lang="scss" scoped>
.v-app-bar{
&.v-app-bar--is-scrolled.blur-primary-color{
  background-color:rgba(68,100,100,.75) !important;
  backdrop-filter: blur(10px);
  }
}
</style>
