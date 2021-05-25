<template>
<div class="v-sheet theme--light grey lighten-3" style="height: 20vh; min-height: 300px;">
    <div class="container fill-height">
        <div class="row fill-height justify-center align-content-center">
            <div class="col col-12">
                <h1 class="display-2 text-center">
                    About Me
                    </h1>
                    </div>
                    <ul class="v-breadcrumbs grey--text pb-0 px-3 theme--light">
                        <li>
                            <nuxt-link to='/'>
                            <span class="v-breadcrumbs__item">Home</span>
                            </nuxt-link>
                        </li>
                        <li class="v-breadcrumbs__divider">/</li>
                        <li><div class="v-breadcrumbs__item">About Me</div>
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
		...mapState(['countyProfiles', 'pageContent', 'tags']),
	},
}
</script>

<style lang="scss" scoped>

</style>