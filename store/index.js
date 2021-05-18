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
    featuredImages: [],  
})
/*
this will update the state
*/
export const mutations = {
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
	updatefeaturedImages: (state, array) => {
		state.featuredImages = array;
	}
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
        
          // console.log( JSON.stringify(homeFeatures[0].acf.filter(function (n){n.acf.startsWith('hero_image')} ) + ' <--homeFeatures.acf')
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
  async gettilePosts({state, commit}) {
    // if (state.tilePosts.length) return
    try {
      let tilePosts = await fetch(
        'http://localhost/wp-json/wp/v2/tile'
        ).then((res) => res.json())
        console.log(tilePosts)
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
  async getCategories({ state, commit}){
    try {
      let Categories = await fetch(
        'http://localhost/wp-json/wp/v2/categories'
      ).then((res) => res.json())
      
      console.log('cats: ' + Categories);
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
}