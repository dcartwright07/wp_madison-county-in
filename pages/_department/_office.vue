<template>
  <section>
    <BaseSubpageheader :office="office" />

    <v-container>
      <v-row class=" pa-5 d-flex flex-column">
        <v-col class="section__content">
          <div class="text-center mb-10">
            <h2 class="h2">About US</h2>
          </div>
          <div
            class="text-center"
            tag="p"
            v-html="office.acf.description"
          ></div>
        </v-col>
        <v-col
          cols="12"
          class="d-flex flex-md-row flex-sm-column-reverse lightgrey pa-10"
        >
          <div class="col-md-6 col-sm-12">
            <div class="text-left mt-12 mb-6 text-center ">
              <h2 class="h2">What We Do</h2>
            </div>
            <div tag="p" v-html="office.acf.services"></div>
          </div>
          <v-img :src="office.media_url" class="col-md-6 col-sm-12 " />
        </v-col>
        <v-col class="section__content" v-html="office.acf.content"></v-col>
      </v-row>
    </v-container>
    <!-- {{office}} this is A TEST -->

    <section v-if="$route.params.office == 'visitors-bureau'">
      <div class="text-center mb-10">
        <h2 class="h2">Places to Visit</h2>
      </div>
      <v-row no-gutters>
        <v-col
          v-for="destination in randomDestinations"
          :key="destination.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-hover v-slot="{ hover }">
            <a
              :href="
                `https://www.whatsup247.com/destinations/detail/${destination.id}`
              "
              target="_blank"
            >
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-img :aspect-ratio="16 / 9" :src="destination.listing_image">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="transition-fast-in-fast-out v-card--reveal white--text"
                      style="height: 30%;"
                    >
                      <h3>{{ destination.name }}</h3>
                      <p>{{ destination.city }}, {{ destination.state }}</p>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </a>
          </v-hover>
        </v-col>
      </v-row>
    </section>

    <v-row no-gutters v-if="profiles.length > 0">
      <v-col class="secondary text-center pa-5 white--text" cols="12">
        <BaseTeam :team="profiles" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    collapseOnScroll: true,
    category_id: "",
    tag_id: ""
  }),

  async fetch({ store }) {
    await store.dispatch("getOffices");
    await store.dispatch("getCategories");
    await store.dispatch("getTags");
    await store.dispatch("getCountyProfiles");
    await store.dispatch("wuapi/getDestinations");
  },

  computed: {
    office() {
      let array = this.offices.filter(
        ({ categories, tags, slug }) =>
          categories.includes(this.category_id) &&
          tags.includes(this.tag_id) &&
          slug
      );

      return array[0];
    },

    profiles() {
      return this.countyProfiles.filter(
        ({ categories, tags }) =>
          categories.includes(this.category_id) && tags.includes(this.tag_id)
      );
    },

    randomDestinations() {
      let array = [];
      let arrayContainer = [];
      const genNum = Math.floor(Math.random() * 20);
      arrayContainer.push(genNum);

      for (let counter = 0; counter < 9; counter++) {
        let newGen = Math.floor(Math.random() * 20);
        while (arrayContainer.lastIndexOf(newGen) !== -1) {
          newGen = Math.floor(Math.random() * 20);
        }
        arrayContainer.push(newGen);
        array.push(this.destinations[newGen]);
      }

      return array;
    },

    ...mapState({
      offices: state => state.offices,
      categories: state => state.categories,
      categoryMap: state => state.categoryMap,
      countyProfiles: state => state.countyProfiles,
      tags: state => state.tags,
      destinations: state => state.wuapi.destinations
    })
  },

  async created() {
    this.category_id = this.categoryMap[this.$route.params.department];
    this.tag_id = this.tags[this.$route.params.office];
  }
};
</script>

<style lang="scss" scoped>
.intro_bar {
  padding-top: 130px;
  .section__title {
    font-size: 40px;
  }
  .section__content {
    font-size: 28px;
  }
}
.h2 {
  font-size: 30px !important;
  font-weight: 400 !important;
}

.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: rgba(68, 100, 100, 0.75);
  padding: 10px;
}
.v-sheet.v-card {
  border-radius: 0;
}
</style>
