<template>
  <v-container fluid class="overflow-hidden ma-0 pa-0">
    <v-row no-gutter v-for="(category,index) in categoriesWithPosts" :key="category.slug" :class="{'flex-row': index % 2 === 0, 'flex-row-reverse': index % 2 !== 0 }" no-gutters>
      <v-col class="primary text-center pa-5 white--text" cols="12" md="6" >
        <v-sheet
          color="accent"
          elevation="4"
          rounded
          shaped>
          <v-card-title>
            <nuxt-link :to="'/'+ category.name">
            {{category.name}} 
            </nuxt-link>
          </v-card-title>
          <v-container class="pa-2">
            <v-row>
              <v-col
                v-for="post in category.posts" :key="post.slug"
                cols="12"
                md="6"
              >
                <nuxt-link :to="'/'+ category.name +'/' + post.slug">
                  <v-card
                    height="200"
                   color="secondary pa-4">
                    <span v-html="post.title"/>
          
                  </v-card>
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
          aspect-ratio="1.7"
          cover
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang='scss' scoped>

</style>

<script>
import { mapState } from 'vuex'

function PageNotFoundException(slug) {
  this.value = slug;
  this.message = `Couldn't find page with slug: '${slug}'`;
  this.toString = function() {
    return `${this.value}: ${this.message}`
  };
}

function FeaturedMediaURLNotFoundException(id) {
  this.value = id;
  this.message = `Couldn't find featured media url with id: '${id}'`;
  this.toString = function() {
    return `${this.value}: ${this.message}`
  };
}


export default {
	data() {
		return {
      categoriesWithPosts: [], 
			tiles: [],
      imageUrl: 'localhost/wp-json/wp/v2/media/?id=',
		}
	},

	computed: {...mapState(['tilePosts','Categories','landingPages','featuredImages'])},

  pageswithimage: function () {
     return this.landingPages.filter(function (page) {
      return page.featured_media > 0
    })
  }, 

  methods: {
    categoryFeaturedMedia: function (slug) {
      try {
        const page = this.getPageWithSlug(slug); 
        const id = this.getFeaturedMediaIDFromPage(page); 
        return this.getFeaturedMediaURLFromID(id); 
      } catch (error) {
        console.log(error.message)
        return ''; 
      }
    }, 
    
    categoryPosts: function(category_id) {
      let hasPost = function (p) {
        return p.categories[0] === category_id;
      }; 
      return this.tilePosts.filter(hasPost).map(post => {
        return {title: post.acf.title_1, slug: post.slug}; 
      }); 
    }, 

    getFeaturedMediaIDFromPage: function (page) {
      /* Returns featured media id from page
       */ 
      return page.featured_media
    }, 
    
    getFeaturedMediaURLFromID: function (featured_media_id) {
      /* Returns featured media url with featured_media_id 
       * If a url was not found throws FeaturedMediaURLNotFoundException 
       */ 
      
      // if it equals 0, the page was not found
      if (featured_media_id === 0) {
        throw new FeaturedMediaURLNotFoundException(featured_media_id) 
      } else {
        // featuredImage is array of obj filter  by id
        console.log(this.featuredImages); 
        for(let i = 0; i < this.featuredImages.length; i++) {
          let image = this.featuredImages[i]; 
          console.log("this is for".image);
          if (image.id === featured_media_id) {
            return image.guid.rendered; 
          }
        }
        // return ''; 
        throw new FeaturedMediaURLNotFoundException(featured_media_id) 
      }
    },

    getPageWithSlug: function (slug) {
      /* Returns page with matching slug if found 
       * Otherwise raises PageNotFoundException 
       */ 
      for(let i = 0; i < this.landingPages.length; i++) {
        let current_page = this.landingPages[i]; 
        if (current_page.slug === slug) {
          return current_page;
        }
      }
      throw new PageNotFoundException(slug); 
    },   
  },

	created() {
		this.categoriesWithPosts = this.Categories.map(c => {
      let category = Object.assign({}, c); 
      category.featured_media_url = this.categoryFeaturedMedia(category.slug); 
      category.posts = this.categoryPosts(category.id);
      return category; 
		});

    console.log('Landing Pages'); 
    this.landingPages.forEach(page => {
      console.log(`Slug: ${page.slug}`); 
    }); 
	},
}
</script>