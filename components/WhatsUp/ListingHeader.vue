
<template>
  <v-card
    class="theme--light grey lighten-3"
    style="height: 20vh; min-height: 400px;"
  >
    <v-img cover max-height="400" :src="image">
      <!-- <v-card-title>
        <v-row class="fill-height justify-left align-content-center">
          <v-col cols="12">
            <h1 class="display-2 lightgrey--text text-left" v-text="name"></h1>
          </v-col>
        </v-row>
      </v-card-title> -->
    </v-img>
  </v-card>
</template>


<script>
export default {
  props: {
    image: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped></style>