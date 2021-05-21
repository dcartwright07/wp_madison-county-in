<template>
	<v-container>
		<nuxt-link v-for="post in offices" :key="post.slug" :to="'/government/' + post.tags[0]">{{ post.title.rendered }}</nuxt-link>
	</v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			mainCategory: 5,
			tiles: [],
		}
	},

	computed: mapState(['offices']), 

	created() {
		this.offices.forEach(element => {
			element.categories.forEach(category => {
				if(category == this.mainCategory) {
					this.tiles.push(element);
				}
			});
		});
	},
}
</script>

<style lang="scss" scoped>

</style>