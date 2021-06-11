<template>
  <section>
	<BaseSubpageheader />
	<v-container>
		<v-row >
			<!-- {{office[0].length == 0}} -->
			<v-col  v-html="office[0].acf.content">
			</v-col>
		</v-row>
	</v-container>
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
        ...mapState([
            'offices',
            'categories',
            'categoryMap',
            'countyProfiles','featuredImages','tags'])},

	created() {
    const category_slug = this.$route.params.department
    const slug = this.$route.params.office
    const category_id = this.categoryMap[category_slug]
	const content = this.offices[0].acf.content
    const tag_id = this.tags[slug]
	this.office = this.offices.filter(({categories, tags, slug}) => categories.includes(category_id) && tags.includes(tag_id) && slug ),
    this.profiles = this.countyProfiles.filter(({categories, tags}) => 
      categories.includes(category_id) && tags.includes(tag_id)
    ) 
	},
}
</script>

<style>

</style>