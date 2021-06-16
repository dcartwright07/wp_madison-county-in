<template>
<div class="v-sheet theme--light grey lighten-3" style="height: 20vh; min-height: 300px;">
    <div class="container fill-height">
        <div class="row fill-height justify-center align-content-center">
            <div class="col col-12">
                <h1 class="display-2 text-center">
                    {{office[0].name}}
                </h1>
            </div>
            <ul class="v-breadcrumbs grey--text pb-0 px-3 theme--light">
                <li>
                    <nuxt-link to='/'>
                    <span class="v-breadcrumbs__item" ></span>
                    </nuxt-link>
                </li>
                <li class="v-breadcrumbs__divider">/</li>
                <li><div class="v-breadcrumbs__item">{{office[0].name}}</div>
                </li>
            </ul>
        </div>
    </div>
</div>

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
            'countyProfiles','featuredImages','tags','categoriesWithPosts'])},

	created() {
    const category_slug = this.$route.params.department
    const slug = this.$route.params.office
    const category_id = this.categoryMap[category_slug]
    const tag_id = this.tags[slug]
	this.office = this.offices.filter(({categories, tags, slug}) => categories.includes(category_id) && tags.includes(tag_id) && slug ),
    this.profiles = this.countyProfiles.filter(({categories, tags}) => categories.includes(category_id) && tags.includes(tag_id),
    // this.officecategory = this.categories.filter(({office}) => office.categories))
)
    // this.tempCategory = this.categories.filter(({slug, categories}) => categories.includes(category_id) && slug)

    
    
	},
}
</script>

<style lang="scss" scoped>

</style>