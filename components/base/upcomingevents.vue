<template>
<v-row class="lightgrey" no-gutters>
    <!-- <v-col v-for="event in latestEvents" :key="event.id" col="12" md="4" lg="3">
        <v-card
            class="mx-auto my-12"
            max-width="374"
            
        >

            <v-img
            height="250"
            :src="event.image"
            ></v-img>

            <v-card-title v-html='event.name'/>

            <v-card-text>

            <div class="my-4 text-subtitle-1" v-html="event.address + '<br/>' + event.city + ' ' + event.state + ', '+ event.zip"/>

            <div v-html="event.description" ></div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>
				<p class="my-4 body-2"><span class="" >Date:</span> {{ event.start | formatDate($moment, "MMMM Do") }}<br/>
				<span class="" >Time:</span> {{ event.start | formatDate($moment, "h:mm a") }}
				</p>
			</v-card-title>

            <v-card-text>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
            >
                Reserve
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-col> -->

	<div class="block-space ">
		<div class="block-head text-center mb-5">
			<p class="lead mt-2 head-desc primary--text">Stay Engage</p>
			<h2 class="head-line display-3 blackish--text">
				Upcoming Events
			</h2>
		</div>
		<v-container>
			<v-row class="row d-flex justify-center">
                <v-col class="col-lg-2" v-for="event in latestEvents" :key="event.name">
                    <v-card class="card card-lift--hover shadow border-0">
                        <v-img height="250" class="img-fluid" :src="event.image" alt=""/>
                        <v-card-text class="card-body py-4">
                            <h5>{{event.name}}</h5>
                            <p class="text_muted">{{event.start | formatDate($moment, "DD MMMM YYYY")}}</p>
                            <p class="description mb-4">{{event.desc}}</p>
                            <a class="btn btn-primary" href="javascript:void(0);">Read More</a>
                        </v-card-text>
                    </v-card>
                </v-col>
			</v-row>
		</v-container>
	</div>


  </v-row>
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