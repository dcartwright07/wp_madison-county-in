<template>
  <div
    class="v-sheet theme--light grey lighten-3"
    style="height: 20vh; min-height: 300px;"
  >
    <div class="container fill-height">
      <div class="row fill-height justify-center align-content-center">
        <div class="col col-12">
          <!-- <h1 class="display-2 text-center" v-html="office.name">
          </h1> -->
        </div>
        <ul class="v-breadcrumbs grey--text pb-0 px-3 theme--light">
          <li>
            <!-- <nuxt-link to="/">
              <span class="v-breadcrumbs__item"></span>
            </nuxt-link> -->
          </li>
          <li class="v-breadcrumbs__divider">/</li>
          <!-- <li>
            <div class="v-breadcrumbs__item" v-html="office.name"></div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped></style>
