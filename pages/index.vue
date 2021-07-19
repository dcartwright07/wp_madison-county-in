<template>
  <section id="welcome" class="overflow-hidden">
    <BaseHeroslider />
    <!-- <BaseIntrobar /> -->
    <BaseTwoCol />
    <BaseVisitorsect />
    <WhatsUpDestinations />
    <BaseUpcomingevents />

  </section>
</template>

<script>
import { mapActions } from "vuex";

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
    await this.getFeaturedImages();
  },

  methods: mapActions([
    "getLandingPages",
    "getOffices",
    "getCategories",
    "getFeaturedImages"
  ])
};
</script>

<style scoped></style>
