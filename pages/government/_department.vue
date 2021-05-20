<template>
  <section

  >
    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12"
        md="6"
      >
 

       <BaseTeam />
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
       Test col 2
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
	async fetch({ store, error, params }) {
		try {
			await store.dispatch("fetchDepartment", params.department);
		} catch (e) {
			error({
				statusCode: 503,
				message: "Unable to fetch event #" + params.department
			});
		}
	},

    computed: {
		regServices: (state) => {
			return state.tilePosts.filter((project) => project.ACF.service_type === 'Regular')
		},
		protectionServices: (state) => {
			return state.tilePosts.filter((project) => project.ACF.service_type === 'Protection')
		},
		...mapState(['pageContent']),
	},
}

</script>

<style>

</style>