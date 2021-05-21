<template>
  <section>
    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12">
       <BaseTeam />
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
		...mapState(['countyProfiles', 'pageContent', 'tags']),
	},
}
</script>

<style>

</style>

vb