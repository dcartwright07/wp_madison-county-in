<template>
  <section id="welcome" class="overflow-hidden">
    <BaseHeroslider />

    <BaseIntrobar />
    <BaseTwoCol />
  </section>
</template>

<style scoped>
.homeHeroHeader {
  z-index: 1;
}
.r-gradient {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}
.homeHeroTitle {
  position: absolute;
  top: 0;
}
.homeHeroHeader .v-window-item {
  /* top: 20%; */
  position: relative;
}
.backgroundhero {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.h1 {
  font-size: 4rem;
  z-index: 6;
  position: absolute;
  top: 30%;
}
.HomeSubHeader {
  font-size: 2.4rem;
  font-weight: 300;
  z-index: 6;
  position: absolute;
  top: 23.5%;
}
.fheight {
  height: 100vh;
}
/*********************/
</style>

<script>
import { mapActions } from "vuex";
// import Header from "../components/nav.vue";

export default {
  data() {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 0
    };
  },

  async fetch() {
    await this.getLandingPages();
    await this.getOffices();
    await this.getCategories();
    // await this.getTags();
    await this.getFeaturedImages();
    // await this.getCountyProfiles();
  },

  methods: mapActions([
    "getLandingPages",
    "getOffices",
    "getCategories",
    // "getTags",
    "getFeaturedImages"
    // "getCountyProfiles"
  ]),

  computed: {
    // regServices: state => {
    //   return this.homeFeatures.filter(
    //     project => project.ACF.service_type === "Regular"
    //   );
    // },
    // ry$protectionServices: state => {
    //   return this.homeFeatures.filter(
    //     project => project.ACF.service_type === "Protection"
    //   );
    // },
    // ...mapState(["homePage", "landingPages"])
  }
};
</script>
