<template>
  <section>
    <BaseSubpageheader :office="office" />

   
    <v-row class="d-flex flex-md-row flex-sm-column-reverse pa-10" v-for="(row,index) in office.acf.two_column_layout" :key="row.services"
    :class="{
        'flex-md-row': index % 2 === 0,
        'flex-md-row-reverse ': index % 2 !== 0,
        'lightgrey': index === 0,
        'greyish lightgrey--text' : index % 5 === 1,
        'lightgrey': index % 5 === 2,
        'redish lightgrey--text': index % 5 === 3
      }"
    >
    <!-- {{index === 0}} -->
      <v-col class="col-md-6 col-sm-12 mt-3 "
       
       >
       <h2 v-html="row.two_column_header"/>
       <div class="mt-7" v-html="row.services" />
       </v-col>
      <v-col class="col-md-6 col-sm-12">
        <v-sheet elevation='5'>
          <v-img :src="row.two_col_image" max-height="700"/>
        </v-sheet>
      </v-col>
    </v-row>
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
  &::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #ead11b;
    bottom: -10px;
    left: 0;
  }
}
.rtl{
  direction:rtl;
}
</style>
