<template>
  <v-container fluid class="overflow-hidden ma-0 pa-0 pt-15 primary ">
    <v-row class="two_col_section" no-gutter  v-for="(category,index) in categoriesWithPosts" :key="category.slug " 
     :class="{'flex-row': index % 2 === 0, 'flex-row-reverse': index % 2 !== 0, 'primary': index % 5 === 0, 'accent': index % 5 === 1, 'secondary': index % 5 === 2}" 
     no-gutters>
        <v-container fluid class="d-flex">
        <v-col :id="category.name" class="text-center white--text" cols="12" md="4"
        :class="{'primary': index % 5 === 0, 'accent': index % 5 === 1, 'secondary': index % 5 === 2}"
        >
          <v-sheet
            class="d-flex flex-column justify-start pt-md-2 align-start"
            color="accent"
            height="100vh"
            rounded
            shaped>
            <v-card-title class="align-center">
              
              <h2 class="section-name">
                {{category.name}} 
              </h2>
              
            </v-card-title>
            <v-container class="pa-2 mt-5">
              <v-row>
                <v-col
                  v-for="post in category.posts" :key="post.slug"
                  class="d-inline-flex mt-5"
                >
                  <nuxt-link :to="'/'+ category.slug +'/' + post.slug">
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                          v-bind="attrs"
                          v-on="on"

                          width='128'
                          height='128'
                          elevation="2"
                          fab
                          icon
                          v-bind:class="[hover ? 'accent2' : 'secondary']">
                            <!-- <span style="color:white;" class="cardpost_h2_title pa-3" v-html="post.name"/> -->
                            MC
                          </v-btn>
                        </template>
                        <span class="white--text cardpost_h2_title pa-3" v-html="post.name"/>
                    </v-tooltip>
                  </nuxt-link>    
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col
          class="col-xs-12 col-md-8 hidden-sm-and-down"
          md="6"
        >
          <v-sheet
          class=" full-height ma-6"
            elevation="4"
          >
            <v-img
                height='100%'
                elevation="4"
                :src="category.featured_media_url"
                :aspect-ratio="961/762"
                cover
              ></v-img>

          </v-sheet>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>
<style lang='scss' scoped>
.two_col_section{
  padding-left: 6.25vw;
  padding-right: 6.25vw;
  &:not(:first-of-type){
    padding: 100px 6.25vw ;
  }
}
.section-name{
  font-size: 3.125rem;
 
}
</style>

<script>

import { mapState, mapGetters } from 'vuex'



export default {
	data() {
		return {
			tiles: [],
      imageUrl: 'localhost/wp-json/wp/v2/media/?id=',
      rowColor: ["primary", "accent", "secondary"]
		}
	},

	computed: {
    ...mapState([
      'offices',
      'categories',
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