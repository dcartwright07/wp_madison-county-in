<template>
  <section>
    <BaseSubpageheader :office="office" />

    <v-container>
      <v-row class=" pa-5 d-flex flex-column">
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
          <div class="col-md-6 col-sm-12">
            <v-sheet elevation='5'>
              <v-img  src="https://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1533219057257-4bb9ed5d2cc6.jpeg" height="500" />
            </v-sheet>
          </div>
        </v-col>
        <v-col class="section__content" v-html="office.acf.content"></v-col>
      </v-row>
    </v-container>
   <!-- <BaseSidebar/> -->

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

    ...mapState({
      offices: state => state.offices,
      categories: state => state.categories,
      categoryMap: state => state.categoryMap,
      countyProfiles: state => state.countyProfiles,
      tags: state => state.tags
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
</style>
