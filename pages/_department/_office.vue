<template>
  <section>
    <BaseSubpageheader :office="office" />

    <v-container>
      <v-row class=" pa-5 d-flex flex-column">
        <v-col
          class="section__content"
          tag="p"
          v-html="office.acf.description"
        ></v-col>
        <v-col class="section__content" v-html="office.acf.content"></v-col>
      </v-row>
    </v-container>

    <v-row no-gutters>
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
      console.log(this.tag_id);
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

    ...mapState([
      "offices",
      "categories",
      "categoryMap",
      "countyProfiles",
      "tags"
    ])
  },

  created() {
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
</style>
