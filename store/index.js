/*
this is where we will eventually hold the data
*/
// API Configuration
// wuapi = {
//   Config : {
//       key:'b33c7738528c472eedb9f10c8a27798a',
//       secret:'',
//       url: 'https://api.whatsup247.net',
//       port: 8443,
//   },
// }

export const state = () => ({
    homePage: [],
    landingPages: [],
    homeMenus: [],
    homeFeatures: [],
    wu247Dest: [],
    wu247Evnt: [],
    wu247Dir: [],
	  tilePosts: [],
  	pageContent: [],
	  Categories: [],
	  Tags: [],
    featuredImages: [],  
    countyProfiles: [],  
    categoriesWithPosts: [],
    profilePage: null, 
})
/*
this will update the state
*/
export const mutations = {
    updateCategoriesWithPosts: (state, payload) => {
      state.categoriesWithPosts = payload; 
    }, 
    updatelandingPages: (state, payload) => {
      state.landingPages = payload
    },
    updateHome: (state, payload) => {
        state.homePage = payload
    },
    updatehomeMenus: (state, payload) => {
        state.homeMenus = payload
    },
    updatehomeFeatures:( state, payload) => {
      state.homeFeatures = payload
    },
    updatetilePosts:( state, payload) => {
      state.tilePosts = payload
    },
    setPageContent: (state, array) => {
      state.pageContent = array;
    },
    updateCategories: (state, array) => {
      state.Categories = array;
    },
    updateTag: (state, array) => {
      state.Categories = array;
    },
    updatefeaturedImages: (state, array) => {
      state.featuredImages = array;
    },
    updatecountyProfiles: (state, array) => {
      state.countyProfiles = array;
    }, 
    updateCategory: (state, profileData) => {
      state.profileData = profileData;  
    }
}

function getFeaturedMediaURL(featuredImages, featured_media_id) {
  if (featured_media_id === 0) {
    console.log(`Couldn't find url for id: ${featured_media_id}`); 
    return ''; 
  } else {
    for(let i = 0; i < featuredImages.length; i++) {
      let image = featuredImages[i]; 
      if (image.id === featured_media_id) {
        console.log(`Url: ${image.guid.rendered}`); 
        return image.guid.rendered; 
      }
    }
    console.log(`Couldn't find url for id: ${featured_media_id}`); 
    return ''; 
  }
}

export const getters = {
  getProfiles: function (state) {
    // filter profiles that have a given category and a tag. 
    return []
  }, 
}
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
	async fetchDepartment({ commit }, value) {
		try {
			let array = await fetch('http://localhost/wp-json/wp/v2/pages').then((res) => res.json());
			console.log(array);
			commit("setPageContent", array);
	  	} catch (err) {
			console.log(err);
		}
	},

  async getlandingPages({ state, commit }) {
    if (state.landingPages.length) return
    try {
      let landingPages = await fetch(
        'http://localhost/wp-json/wp/v2/pages'
      ).then((res) => res.json())
 
      landingPages = landingPages.filter((el) => el.status === 'publish' && el.parent === 0);
      landingPages = landingPages.map(({ ACF, title, slug, yoast_head, content,categories,parent,featured_media}) => ({
        ACF,
        title,
        slug,
        yoast_head,
        content,
        categories,
        parent,
        featured_media
      }))
      commit('updatelandingPages', landingPages)
    } catch (err) {
        console.log(err);
    }
  },

  async gethomeFeatures({ state, commit }) {
    if (state.homeFeatures.length) return
    try {
      let homeFeatures = await fetch(
        'http://localhost/wp-json/wp/v2/home_features'
        ).then((res) => res.json())
        homeFeatures = homeFeatures.map(({ acf, title, slug, yoast_head }) => ({
          acf,
          title,
          slug,
          yoast_head,
        }))
        
      commit('updatehomeFeatures', homeFeatures)
    } catch (err) {
        console.log(err);
    }
  },

  async getHome({ state, commit }) {

    try {
      const homePage = await fetch(
        'http://localhost/wp-json/wp/v2/pages/11?dbi-ajaxx'
      ).then((res) => res.json())
      commit('updateHome', homePage)
    } catch (err) {
        console.log(err);
    }
  },

  async gethomeMenus({ state, commit }) {
    try {
      // console.log('menu method was tried')
      const homeMenus = await fetch(
        'http://localhost/wp-json/menus/v1/menus/2'
        ).then((res) => res.json()) 
        // console.log(homeMenus.items)

      commit('updatehomeMenus', homeMenus)
    } catch (err) {
        console.log(err);
    }
  },

  async wu247Dest({ state, commit}){
    try{
      const wu247Dest = await fetch(
        ''
      ).then((res) => res.json())
    } catch(err) {}
    
  },

  async wu247Evnt({ state, commit}){
    try{
      const wu247Evnt = await fetch(
        ''
        ).then((res) => res.json())
      } catch(err) {}
  },
  async wu247Dir({ state, commit}){
    try{
      const wu247Dir = await fetch(
        ''
        ).then((res) => res.json())
       }catch(err) {}
    
  },

  async gettilePosts({commit}) {
    try {
      let tilePosts = await fetch(
        'http://localhost/wp-json/wp/v2/tile'
        ).then((res) => res.json())
        // console.log(tilePosts)
        tilePosts = tilePosts.map(({ acf, slug, yoast_head, categories, tags }) => ({
          acf,
          slug,
          yoast_head,
			    categories,
		      tags,
        }))
      commit('updatetilePosts', tilePosts)
    } catch (err) {
        console.log(err);
    }
  },

  async getCategories({commit}){
    try {
      let Categories = await fetch(
        'http://localhost/wp-json/wp/v2/categories'
      ).then((res) => res.json())
      
      Categories = Categories.map(({slug, id, name}) => ({
        slug,
        id,
        name,
      }))
      commit('updateCategories', Categories)
    } catch (error) {
      console.log(error);
    }
  },

  async getTags({ state, commit}){
    try {
      let Tags = await fetch(
        'http://localhost/wp-json/wp/v2/Tags'
      ).then((res) => res.json())
      
      // console.log('Tags: ' + Tags);
      Tags = Tags.map(({slug, id, name}) => ({
        slug,
        id,
        name,
      }))
      commit('updateTags', Tags)
    } catch (error) {
      console.log(error);
    }
  },

  async getfeaturedImages({ state, commit}){
    try {
      let featuredImages = await fetch(
        'http://localhost/wp-json/wp/v2/media'
        ).then((res) => res.json())
        featuredImages = featuredImages.map(({guid, id}) => ({
          guid,
          id,
        }))
        commit('updatefeaturedImages', featuredImages)
      } catch (error) {
        console.log(error);
      }
    },

  async getcountyProfiles({commit}, {featuredImages}){
    try {
      let countyProfiles = await fetch('http://localhost/wp-json/wp/v2/profile').then((res) => res.json())
      // console.log(countyProfiles)
      countyProfiles = countyProfiles.map(({title, content, id, acf}) => ({
        title, 
        content,
        id,
        acf,
      }))
      countyProfiles.featured_media_url = getFeaturedMediaURL(featuredImages, countyProfiles.id); 
      commit("updatecountyProfiles", countyProfiles);
    } catch (err) {
      console.log(err);
		}
  },

  async getCategoriesWithPosts({commit, dispatch, state}, {categories, featuredImages, landingPages, tilePosts}){ 
    const result = categories.map(c => {
      let category = Object.assign({}, c); 
      try {
        const page = getPageWithSlug(category.slug); 
        const id = page.featured_media; 
        category.featured_media_url = getFeaturedMediaURL(featuredImages, id); 
      } catch {
        category.featured_media_url = ''; 
      }
      category.posts = categoryPosts(category.id);
      return category; 
		});

    categories.forEach(({name, featured_media_url}) => {
      console.log(`Category: ${name} => ${featured_media_url}`)
    })

    commit('updateCategoriesWithPosts', result); 

    function categoryPosts(category_id){
        let hasPost = function (p) {
          return p.categories[0] === category_id;
        }; 
        return tilePosts.filter(hasPost).map(post => {
          return {title: post.acf.title_1, slug: post.slug}; 
        }); 
    }

    function getPageWithSlug(slug){
      /* Returns page with matching slug if found */ 
      for(let i = 0; i < landingPages.length; i++) {
        let current_page = landingPages[i]; 
        if (current_page.slug === slug) {
          return current_page;
        }
      }
      throw new `Couldn't find page for slug ${slug}`; 
    }
  }, 
}