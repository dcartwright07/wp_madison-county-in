<template>
  <v-container>
      <v-row>
          <!-- picture with hover affect will be -->
          <v-col>
              {{$nuxt.$route.path}}<br>
              {{countyProfiles[0]}}<br>
              {{profile}}
              {{categoriesWithPosts}}
              <!-- {{post}} -->
          </v-col>
          <!-- about or mission statment department -->
          <v-col></v-col>
      </v-row>
  </v-container>
</template>
<style lang="scss" scoped>

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

	computed: {...mapState(['tilePosts','Categories','countyProfiles','featuredImages','Tags'])},

  pageswithimage: function () {
     return this.countyProfiles.filter(function (profile) {
      return profile
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
    
    categoryProfile: function(category_id) {
      let hasPost = function (p) {
        return p.categories[0] === category_id;
      }; 
      return this.countyProfiles.filter(hasPost).map(profile => {
        return {title: profile.title.rendered, slug: profile.slug, content: profile.content.rendered}; 
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
    
        for(let i = 0; i < this.featuredImages.length; i++) {
          let image = this.featuredImages[i]; 
      
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
      for(let i = 0; i < this.countyProfiles.length; i++) {
        let current_page = this.countyProfiles[i]; 
        if (current_page.slug === slug) {
          return current_page;
        }
      }
      throw new PageNotFoundException(slug); 
    },   
  },

	created() {
		this.categoriesWithPosts = this.Tags.map(c => {
            let category = Object.assign({}, c); 
            category.featured_media_url = this.categoryFeaturedMedia(category.slug); 
            category.posts = this.categoryPosts(category.id);
            return category; 
		});
		this.tagsWithProfile = this.Tags.map(c => {
      let tag = Object.assign({}, c); 
      tag.featured_media_url = this.categoryFeaturedMedia(tag.slug); 
      tag.profiles = this.categoryPosts(category.id);
      return category; 
		});
	},

    
}
</script>