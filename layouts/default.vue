<template>
  <v-app>
    <NavigationDrawer :location="location" />
    <NavigationBar :location="location" />

    <v-main class="pt-0">
      <v-container fluid class="ma-0 pl-0 pt-0 pr-0">
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer
      :absolute="!fixed"
      app
      black
    >
    this is a test
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<style lang="scss" scoped>
.v-app-bar.v-app-bar--is-scrolled {
  /* background-image: url('http://madisoncounty.signaturewebcreations.com/wp-content/uploads/2021/06/navbg.png');
   */
  background-color: rgba(255, 255, 255, 0.3) !important;

  /* background-repeat: no-repeat;
	background-size: 100%;
	background-attachment: fixed; */
  .blur-container {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: relative;
    top: 0;
    transform: translate3d(0, 0, 0);
  }
  .blur-content {
    filter: blur(1rem);
    left: 0px;
    top: 0px;
    transform: translateY(-447px);
    position: absolute;
    width: 100vw;
  }
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "~/layouts/partials/NavigationDrawer";
import NavigationBar from "~/layouts/partials/NavigationBar";

export default {
  components: { NavigationDrawer, NavigationBar },

  data() {
    return {
      // zIndex: 2,
      // clipped: false,
      // drawer: false,
      // fixed: false,
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      location: {
        county: "Madison County",
        state: {
          name: "Indiana",
          abbrv: "IN"
        }
      }
    };
  },

  computed: mapState(["categories"])
};
</script>
