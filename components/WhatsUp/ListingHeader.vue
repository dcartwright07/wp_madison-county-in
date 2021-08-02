<template>
  <v-card
    class="theme--light grey lighten-3"
    :style="`height: 25vh; min-height: ${styleHeight}px;`"
  >
    <v-img cover style="height: 100%;" :src="image" />
  </v-card>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    styleHeight: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped></style>
