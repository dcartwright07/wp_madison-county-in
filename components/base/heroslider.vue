<template>
  <v-container fluid class="pa-0 relative">
    <v-carousel
      cycle
      hide-delimiters
      :show-arrows="false"
      width="100vw"
      height="100vh"
      min-width="320"
      interval="6000"
    >
      <v-carousel-item
        hide-on-leave
        transition="slide-x-reverse-transition"
        class="accent"
        v-for="post in homeFeatures"
        :key="post.id"
        width="100%"
        min-height="320"
        :style="{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 28%, rgba(0, 0, 0, 0) 100%), url(' +
            post.acf.hero_image.url +
            ')',
          'background-size': 'cover',
          'background-position': 'center'
        }"
      >
        <div align="start" class="pl-md-16 pr-md-16 header-wrap absolute">
          <h2
            color="primary"
            class="lightgrey--text h2 ma-0 pa-0"
            v-html="post.acf.subheader"
          ></h2>
          <h1
            color="primary"
            class="lightgrey--text h1 ma-0 pa-0"
            v-html="post.title.rendered"
          ></h1>
          <div
            class="lightgrey--text mr-10"
            v-html="post.acf.hero_short_description"
          ></div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <BaseEventCards />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      homeFeatures: []
    };
  },

  async fetch() {
    this.homeFeatures = await fetch(
      this.$config.apiUrl + "home_features"
    ).then(res => res.json());
    this.homeFeatures = this.homeFeatures.map(
      ({ acf, title, slug, yoast_head }) => ({
        acf,
        title,
        slug,
        yoast_head
      })
    );
  }
};
</script>

<style lang="scss" scoped>
.header-wrap {
  top: 30%;
  max-width: 1026px;
  display: flex;
  flex-direction: column;

  .h1,
  .h2 {
    font-size: 62px;
  }
  .h2 {
    font-weight: 200;
  }
}

.relative {
  position: relative;
}
</style>
