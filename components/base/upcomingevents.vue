<template>
  <div class="lightgrey pb-10">
    <div class="d-flex justify-space-around mt-8 mb-10 pt-8 pb-5">
			<h2 class="head-line display-3 text-center blackish--text">
        <small class="top-subheader primary--text text-left">Stay Engaged</small><br/>Upcoming Events
			</h2>
		</div>

		<v-container>
			<v-row class="row d-flex justify-center">
        <v-col class="col-lg-2" v-for="event in latestEvents" :key="event.name">
          <v-card class="card card-lift--hover shadow border-0">
            <v-img height="250" class="img-fluid" :src="event.image" alt=""/>
            <v-card-title class="font-weight-normal event_name" >{{event.name}}</v-card-title>
            <v-card-text class="card-body text-left py-4">
              <p class="font-weight-medium">{{event.start | formatDate($moment, "DD MMMM YYYY")}}</p>
              <p class="description mb-4">{{event.desc}}</p>
              <a class="btn btn-primary" href="javascript:void(0);">Read More</a>
            </v-card-text>
          </v-card>
        </v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
	let options = {
		type: "latest",
		limit: "5"
	};
    await this.getEvents(options);
  },

  computed: mapState({
    latestEvents: state => state.wuapi.latestEvents
  }),

  methods: mapActions("wuapi", ["getEvents"])
};
</script>

<style lang="scss" scoped>
h2{
  small{
    font-size: 1.5rem;
  }
}
.event_name{
    word-break: break-word !important;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 700!important;
}
.h5, h5 {
    font-size: 1.25rem;
}
.lead{
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.7;
}
.sub-title {
    font-size: 30px;
    margin-top: 50px;
    margin-bottom: 10px;
    padding-bottom: 0;
    font-weight: 300;
}

</style>
