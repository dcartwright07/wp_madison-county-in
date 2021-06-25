/*
this is where we will eventually hold the data
*/

export const state = () => ({
  token: null,
  homePage: [],
  landingPages: [],
  homeMenus: [],
  wu247Dest: [],
  wu247Dir: [],
  offices: [],
  pageContent: [],
  categories: [],
  tags: null,
  categoryMap: null,
  featuredImages: [],
  countyProfiles: [],
  categoriesWithPosts: [],
  profilePage: null
});
/*
this will update the state
*/

export const mutations = {
  UPDATE_TOKEN: (state, string) => {
    state.token = string;
  },
  UPDATE_CATEGORY_MAP: (state, obj) => {
    state.categoryMap = obj;
  },
  UPDATE_CATEGORIES: (state, array) => {
    state.categories = array;
  },
  updatecategoriesWithPosts: (state, payload) => {
    state.categoriesWithPosts = payload;
  },
  updatelandingPages: (state, payload) => {
    state.landingPages = payload;
  },
  updateHome: (state, payload) => {
    state.homePage = payload;
  },
  updatehomeMenus: (state, payload) => {
    state.homeMenus = payload;
  },
  updateOffices: (state, payload) => {
    state.offices = payload;
  },
  setPageContent: (state, array) => {
    state.pageContent = array;
  },

  updateTags: (state, obj) => {
    state.tags = obj;
  },
  UPDATE_FEATURED_IMAGES: (state, array) => {
    state.featuredImages = array;
  },
  updatecountyProfiles: (state, array) => {
    state.countyProfiles = array;
  },
  updateCategory: (state, profileData) => {
    state.profileData = profileData;
  }
};

function getFeaturedMediaURL(featuredImages, featured_media_id) {
  if (featured_media_id === 0) {
    return "";
  } else {
    for (let i = 0; i < featuredImages.length; i++) {
      let image = featuredImages[i];
      if (image.id === featured_media_id) {
        return image.guid.rendered;
      }
    }
    return "";
  }
}

export const getters = {
  getProfiles: function(state) {
    // filter profiles that have a given category and a tag.
    return [];
  }
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  async fetchDepartment({ commit }, value) {
    try {
      let array = await fetch(this.$config.apiUrl + "pages").then(res =>
        res.json()
      );
      commit("setPageContent", array);
    } catch (err) {
      console.log(err);
    }
  },

  async getLandingPages({ state, commit }) {
    if (state.landingPages.length) return;
    try {
      let landingPages = await fetch(this.$config.apiUrl + "pages").then(res =>
        res.json()
      );

      landingPages = landingPages.filter(
        el => el.status === "publish" && el.parent === 0
      );
      landingPages = landingPages.map(
        ({
          ACF,
          title,
          slug,
          yoast_head,
          content,
          categories,
          parent,
          featured_media
        }) => ({
          ACF,
          title,
          slug,
          yoast_head,
          content,
          categories,
          parent,
          featured_media
        })
      );
      commit("updatelandingPages", landingPages);
    } catch (err) {
      console.log(err);
    }
  },

  // async gethomeFeatures({ state, commit }) {
  //   if (state.homeFeatures.length) return;
  //   try {
  //     let homeFeatures = await fetch(this.$config.apiUrl + "home_features").then(res =>
  //       res.json()
  //     );
  //     homeFeatures = homeFeatures.map(({ acf, title, slug, yoast_head }) => ({
  //       acf,
  //       title,
  //       slug,
  //       yoast_head
  //     }));

  //     commit("updatehomeFeatures", homeFeatures);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  async getHome({ state, commit }) {
    try {
      const homePage = await fetch(
        this.$config.apiUrl + "pages/11?dbi-ajaxx"
      ).then(res => res.json());
      commit("updateHome", homePage);
    } catch (err) {
      console.log(err);
    }
  },

  // async gethomeMenus({ state, commit }) {
  //   try {
  //     // console.log('menu method was tried')
  //     const homeMenus = await fetch(
  //       'http://localhost/wp-json/menus/v1/menus/2'
  //       ).then((res) => res.json())
  //       // console.log(homeMenus.items)

  //     commit('updatehomeMenus', homeMenus)
  //   } catch (err) {
  //       console.log(err);
  //   }
  // },

  async wu247Dest({ state, commit }) {
    try {
      const wu247Dest = await fetch("").then(res => res.json());
    } catch (err) {}
  },

  // async getEvents({ state, commit }) {
  //   await setApiToken();

  //   if (state.token == null) {
  //     console.log("API token not set");
  //   } else {
  //     fetch(
  //       this.$config.wuApiUrl +
  //         "/event?organization_id=5600aaf5d9ab987a5935c1af3ba840a2",
  //       {
  //         headers: {
  //           Authorization: "Bearer 31f6bbda2f30ab7d78019522f5a4734e269e8ea6",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*"
  //         },
  //         method: "GET"
  //       }
  //     ).then(res => console.log(res));
  //   }
  // },

  async wu247Dir({ state, commit }) {
    try {
      const wu247Dir = await fetch("").then(res => res.json());
    } catch (err) {}
  },

  async getOffices({ commit }) {
    try {
      let offices = await fetch(this.$config.apiUrl + "office").then(res =>
        res.json()
      );
      offices = offices.map(
        ({
          acf,
          slug,
          yoast_head,
          categories,
          tags,
          title,
          content,
          icon
        }) => ({
          acf,
          slug,
          yoast_head,
          categories,
          tags,
          name: title.rendered,
          content: acf.content,
          icon: acf.icon
        })
      );
      commit("updateOffices", offices);
    } catch (err) {
      console.log(err);
    }
  },

  async getCategories({ commit }) {
    const fields = ["id", "name", "slug"];
    const parameters = fields.join(",");
    const url = this.$config.apiUrl + `categories?_fields=${parameters}`;

    try {
      let categories = await fetch(url).then(res => res.json());
      let map = {};

      categories.forEach(({ slug, id }) => {
        map[slug] = id;
      });

      commit("UPDATE_CATEGORIES", categories);
      commit("UPDATE_CATEGORY_MAP", map);
    } catch (error) {
      console.log(error);
    }
  },

  async getTags({ state, commit }) {
    const fields = ["id", "slug"];
    const parameters = fields.join(",");
    const url = this.$config.apiUrl + `tags?_fields=${parameters}&per_page=100`;

    try {
      const tags = await fetch(url).then(res => res.json());
      let tagMap = {};
      tags.forEach(({ id, slug }) => {
        tagMap[slug] = id;
      });
      commit("updateTags", tagMap);
    } catch (error) {
      console.log(error);
    }
  },

  async getFeaturedImages({ state, commit }) {
    const fields = ["id", "guid"];
    const parameters = fields.join(",");
    const url = this.$config.apiUrl + `media?_fields=${parameters}`;
    try {
      let featuredImages = await fetch(url).then(res => res.json());
      commit("UPDATE_FEATURED_IMAGES", featuredImages);
    } catch (error) {
      console.log(error);
    }
  },

  async getCountyProfiles({ state, commit }) {
    const fields = [
      "id",
      "title.rendered",
      "content.rendered",
      "acf.titlerole",
      "acf.email",
      "acf.phone",
      "featured_media",
      "tags",
      "categories"
    ];

    const fieldParameter = fields.join(",");
    const url =
      this.$config.apiUrl + `profile?per_page=100&_fields=${fieldParameter}`;
    try {
      let profiles = await fetch(url).then(res => res.json());
      profiles = profiles.map(
        ({ id, title, content, acf, featured_media, tags, categories }) => {
          return {
            id,
            acf,
            categories,
            content: content.rendered,
            email: acf ? acf.email : "",
            media_url: getFeaturedMediaURL(
              state.featuredImages,
              featured_media
            ),
            phone: acf ? acf.phone : "",
            tags,
            title: title.rendered,
            titlerole: acf ? acf.titlerole : ""
          };
        }
      );
      commit("updatecountyProfiles", profiles);
    } catch (err) {
      console.log(err);
    }
  },

  getCategoriesWithPosts({ commit, state }) {
    function categoryOffices(category_id) {
      let hasCategory = function(office) {
        // console.log(office.categories.includes(category_id));
        return office.categories.includes(category_id);
      };
      return state.offices
        .filter(hasCategory)
        .map(({ name, slug, content, icon }) => {
          return { name, slug, content, icon };
        });
    }

    function getPageWithSlug(slug) {
      /* Returns page with matching slug if found */
      for (let i = 0; i < state.landingPages.length; i++) {
        let current_page = state.landingPages[i];
        if (current_page.slug === slug) {
          return current_page;
        }
      }
      throw new `Couldn't find page for slug ${slug}`();
    }

    const result = state.categories.map(c => {
      let category = Object.assign({}, c);
      try {
        const page = getPageWithSlug(category.slug);
        const id = page.featured_media;

        category.featured_media_url = getFeaturedMediaURL(
          state.featuredImages,
          id
        );
      } catch {
        category.featured_media_url = "";
      }
      category.posts = categoryOffices(category.id);
      return category;
    });

    commit("updatecategoriesWithPosts", result);
  }
};
