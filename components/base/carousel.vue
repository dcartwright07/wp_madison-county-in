<template>
<v-container>
    <v-carousel>
        <v-carousel-item v-for="source in sources" 
                         :key="source.acf.hero_image.id" 
                         :src="source.acf.hero_image.url" 
                         :alt="source.acf.hero_image.alt">
        </v-carousel-item>
    </v-carousel>
</v-container>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => ([]) 
    }
  }
}
</script>