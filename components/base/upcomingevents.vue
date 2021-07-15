<template>
<v-row no-gutters>
    <v-col v-for="event in latestEvents" :key="event.id" col="12" md="4" lg="3">
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
    </v-col>
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

</style>