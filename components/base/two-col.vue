<template>
  <v-container fluid class="pa-0">
    <v-row
      v-for="(category, index) in categoriesWithPosts"
      :key="category.slug"
      :id="category.slug"
      class="flex-sm-column-reverse ma-0"
      :class="{
        'flex-md-row': index % 2 === 0,
        'flex-md-row-reverse': index % 2 !== 0
      }"
      justify="center"
    >
      <v-col v-if="!category.posts.length < 1" cols="12" md="4">
        <v-sheet rounded shaped class="icon-section">
          <div class="mb-5">
            <h2 class="section-name">
              {{ category.name }}
            </h2>
          </div>
          <nuxt-link
            v-for="post in category.posts"
            :key="post.slug"
            style="text-decoration: none;"
            :to="'/' + category.slug + '/' + post.slug"
            class="d-inline-flex ma-4"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :class="{
                    primary: index % 5 === 0,
                    secondary: index % 5 === 1,
                    hyperlink: index % 5 === 2,
                    accent: index % 5 === 3
                  }"
                  v-bind="attrs"
                  v-on="on"
                  class="circular-reveal"
                  width="100"
                  height="100"
                  elevation="2"
                  fab
                  icon
                  :style="{ content: 'post.slug' }"
                >
                  <v-icon size="40">
                    {{ post.icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span
                class="white--text cardpost_h2_title pa-3"
                v-html="post.name"
              />
            </v-tooltip>
          </nuxt-link>
        </v-sheet>
      </v-col>

      <v-col v-if="!category.posts.length < 1" cols="12" md="6">
        <v-sheet class="full-height" elevation="4">
          <v-img
            height="100%"
            elevation="4"
            :src="category.featured_media_url"
            :aspect-ratio="961 / 762"
            cover
          ></v-img>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  async fetch() {
    await this.getCategoriesWithPosts();
  },

  computed: mapState(["categoriesWithPosts"]),

  methods: mapActions(["getCategoriesWithPosts"])
};
</script>

<style lang="scss" scoped>
.row {
  padding: 100px 0;
}
.gray-background {
  background-color: #f2f2f2;
  .icon-section {
    background-color: #f2f2f2;
  }
}
.v-icon {
  font-size: 40px;
}
.section-name {
  font-size: 3.125rem;
}

.circular-reveal {
  width: 256px;
  height: 256px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.circular-reveal img {
  width: 100%;
}

.circular-reveal::after {
  // content: '';
  position: absolute;
  background: rgba(149, 116, 215, 0.509);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 60px;
  transition: transform 0.2s cubic-bezier(0, 0, 0.3, 1),
    opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
  transform: rotate(10deg);
  opacity: 0;
}

.circular-reveal:hover::after {
  transform: rotate(0deg);
  opacity: 1;
}
</style>
