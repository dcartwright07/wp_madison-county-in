<template>
		<v-card elevation="0" class="boxed-widget lightgrey mt-4 text-center p-4">
			<v-card-title class="mb-4">Contact Information</v-card-title>
			<v-card-text>
				<v-row>
				<v-col sm="2" class="mb-2">
					<v-img
                elevation="0"
                cover
                max-height="50"
                max-width="50"
                :src="require('~/assets/madison_silhouettes_1.png')"
              />
				</v-col>
				<v-col sm="10" class="d-flex justify-left align-center">
					<h4 class="text-primary">{{event.contact_name}}</h4>
				</v-col>
			</v-row>
			<v-row v-if="event.contact_phone">
				<v-col sm="2" class="mb-2">
					<i class="fa fa-phone"/>
				</v-col>
				<v-col sm="10" class="d-flex justify-left align-center">
					<h4 class="text-primary">{{event.contact_phone}}</h4>
				</v-col>
			</v-row>
				<v-row v-if="event.contact_email">
				<v-col sm="2" class="mb-2">
				<i class="fa fa-envelope-o"/>
				</v-col>
				<v-col sm="10" class="d-flex justify-left align-center">
					<h4 class="text-primary">{{event.contact_email}}</h4>
				</v-col>
			</v-row>
			</v-card-text>
		</v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    event: state => state.wuapi.event
  }),

  methods: mapActions("wuapi", ["getEvent"]),

  created() {
    this.getEvent(this.$route.params.id);
  }
};
</script>