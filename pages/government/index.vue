<template>
	<div>
		Landing Page<br />
		<nuxt-link v-for="post in tilePosts" :key="post.slug" :to="'/government/' + post.tags[0]">{{ post.title.rendered }}</nuxt-link>
	</div>
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

	computed: mapState(['tilePosts']), 

	created() {
		this.tilePosts.forEach(element => {
		console.log(element.tags);
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