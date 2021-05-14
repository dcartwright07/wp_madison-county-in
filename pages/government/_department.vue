<template>
  <section

  >
    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12"
        md="6"
      >
 

        <base-heading>
          Recent Projects
        </base-heading>

        <base-text class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipi<br>
          scin elit. Etiam vulputate augue vel felis gravida<br>
          porta. Lorem ipsum dolor sit amet.
        </base-text>

        {{ pageContent }}

        <v-card color="primary">
          <v-container class="pa-2">
            <v-row>
              <!-- <v-col
                v-for="tile in tilePosts"
                :key="tile"
                cols="12"
                md="4"
                sm="12"
              > -->
                <!-- <a href="#"> -->
                   
                  <!-- <v-img
                    :src="tilePosts[0].featured_media"
                  /> -->
                <!-- </a> -->
              <!-- </v-col> -->
            </v-row>
          </v-container>
        </v-card>
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