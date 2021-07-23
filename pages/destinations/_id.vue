<template>
	<div class="main-wrapper">
    <WhatsUpListingHeader :image="destination.image" />

		<title-bar :title="destination.name" subtitle="Explore New Places">{{ destination.name }}</title-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    destination: state => state.wuapi.destination
  }),

  methods: mapActions("wuapi", ["getDestination"]),

  created() {
    this.getDestination(this.$route.params.id);
  }
};
</script>
