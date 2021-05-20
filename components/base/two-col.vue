<template>
  <v-container fluid class="overflow-hidden ma-0 mt-n15 pa-0">
    <v-row no-gutter v-for="(category,index) in categoriesWithPosts" :key="category.slug" :class="{'flex-row': index % 2 === 0, 'flex-row-reverse': index % 2 !== 0 }" no-gutters>
      <v-col :id="category.name" class="lightgrey text-center pa-5 white--text" cols="12" md="6" >
        <v-sheet
        class="d-flex flex-column justify-space-between pt-13 align-start"
          color="accent"
          elevation="4"
          min-height="100vh"
          rounded
          shaped>
          <v-card-title class="align-center">
            
            <h2>
              {{category.name}} 
            </h2>
            
          </v-card-title>
          <v-container class="pa-2">
            <v-row>
              <v-col
                v-for="post in category.posts" :key="post.slug"
                class="d-inline-flex"
              >
                <nuxt-link :to="'/'+ category.name +'/' + post.slug">
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                    hover
                    ripple
                    min-height="90"
                    min-width="320"
                    v-bind:class="[hover ? 'accent2' : 'secondary']">
                      <span v-bind:class="[hover ? 'secondary--text' : 'accent2--text']" class="cardpost_h2_title pa-3" v-html="post.title"/>
                    </v-card>
                  </v-hover>
                </nuxt-link>    
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
      <v-img
          :src="category.featured_media_url"
          :aspect-ratio="18/6"
          cover
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang='scss' scoped>
.cardpost_h2_title{
  font-size: 2rem;
}
</style>

<script>
import { mapState, mapGetters } from 'vuex'


export default {
	data() {
		return {
			tiles: [],
      imageUrl: 'localhost/wp-json/wp/v2/media/?id=',
		}
	},

	computed: {
    ...mapState([
      'tilePosts',
      'Categories',
      'landingPages',
      'featuredImages', 
      'categoriesWithPosts'
    ]), 
    ... mapGetters([
      'getProfiles'
    ])
  },

  pageswithimage: function () {
     return this.landingPages.filter(function (page) {
      return page.featured_media > 0
    })
  }, 
}
</script>