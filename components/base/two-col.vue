<template>
  <v-container fluid class="pa-0">
    <v-row
      v-for="(category, index) in categories"
      :key="category.slug"
      :id="category.slug"
      class="flex-sm-column-reverse ma-0"
      :class="{
        'flex-md-row': index % 2 === 0,
        'flex-md-row-reverse': index % 2 !== 0,
        secondary: index % 5 === 0,
        lightgrey: index % 5 === 1,
        hyperlink: index % 5 === 2,
        lightgrey: index % 5 === 3
      }"
      justify="center"
    >
      <v-col v-if="!category.posts.length < 1" cols="12" md="4">
        <v-sheet
          rounded
          shaped
          class="icon-section transparent"
          :class="{
            'text-left': index % 2 === 0,
            'text-right': index % 2 !== 0
          }"
        >
          <div
            class="mb-5"
            :class="{
              'text-right': index % 2 !== 0,
              'text-left': index % 2 === 0
            }"
          >
            <h2
              class="section-name mb-10"
              :class="{
                'text-right ml-2': index % 2 === 0,
                'text-left mr-2': index % 2 !== 0
              }"
            >
              {{ category.name }}
            </h2>
          </div>
          <div
            :class="{
              'text-right mr-4': index % 2 !== 0,
              'text-left ml-4': index % 2 === 0
            }"
            v-html="category.content"
          ></div>
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
                  v-bind="attrs"
                  v-on="on"
                  class="square-reveal lightgrey"
                  width="100"
                  height="100"
                  elevation="4"
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
        <v-sheet class="full-height transparent" elevation="4">
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
    <WhatsUpDestinations />
    <BaseUpcomingevents />
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  async fetch() {
    await this.getCategoriesWithPosts()
    await this.setFeaturedImageUrl()
  },

  data() {
    return {
      categories: []
    }
  },

  computed: mapState(["categoriesWithPosts"]),

  methods: {
    /**
     * Used this function to get the image from the Wordpress API because
     * trying to pass the value through a function call was always returning
     * a promise and we were unable to extract the string from the promise.
     * Being pressed for time, I resorted to an old fashioned method for loop.
     */
    async setFeaturedImageUrl() {
      let array = []

      for (let i = 0; i < this.categoriesWithPosts.length; i++) {
        let image = await fetch(
          this.$config.apiUrl +
            "media/" +
            this.categoriesWithPosts[i].featured_media_id
        )
          .then(response => response.json())
          .catch(error => error.response.status)
        if (!image.data) {
          this.categoriesWithPosts[i].featured_media_url = image.guid.rendered
        } else {
          this.categoriesWithPosts[i].featured_media_url = ""
        }
        array.push(this.categoriesWithPosts[i])
      }
      this.categories = array
    },
    ...mapActions(["getCategoriesWithPosts"])
  }
}
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

.square-reveal {
  width: 256px;
  height: 256px;
  border-radius: 0;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
  }
  &::after {
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

  &:hover::after {
    transform: rotate(0deg);
    opacity: 1;
  }
}
</style>
