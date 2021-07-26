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
					<h4 class="text-primary">{{c_name}}</h4>
				</v-col>
			</v-row>
			<v-row v-if="phone">
				<v-col sm="2" class="mb-2">
					<i class="fa fa-phone"/>
				</v-col>
				<v-col sm="10" class="d-flex justify-left align-center">
					<h4 class="text-primary">{{phone}}</h4>
				</v-col>
			</v-row>
				<v-row v-if="email">
				<v-col sm="2" class="mb-2">
				<i class="fa fa-envelope"/>
				</v-col>
				<v-col sm="10" class="d-flex justify-left align-center">
					<h4 class="text-primary"> <a :href="'mailto:' + email">{{email}}</a></h4>
				</v-col>
			</v-row>
			</v-card-text>
		</v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    props: {
   email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    c_name: {
      type: String,
      default: ""
    }
  }
};
</script>