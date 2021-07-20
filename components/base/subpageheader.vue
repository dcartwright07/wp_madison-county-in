<template>
  <div
    class="v-sheet theme--light grey lighten-3"
    style="height: 20vh; min-height: 500px;"
  >
  <v-overlay absolute style="margin:0; z-index:0;">

  
    <div class="container fill-height">
      <div class="row fill-height justify-center align-content-center">
        <div class="col col-12">
          <h1 class="display-2 lightgrey--text text-left" v-html="office.name">
          </h1>
        </div>
        <div class="col-12">
          {{office.acf.description}}
          <!-- <div :v-html="office"></div> -->
        <!-- <ul class="v-breadcrumbs grey--text pb-0 px-3 theme--light">
          <li>
            <nuxt-link to="/">
              <span class="v-breadcrumbs__item"></span>
            </nuxt-link>
          </li>
          <li class="v-breadcrumbs__divider">/</li>
          <li>
            <div class="v-breadcrumbs__item" v-html="office.name"></div>
          </li>
        </ul> -->
        </div>
      </div>
    </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    office: Object
  }
};
</script>

<style lang="scss" scoped>
.v-sheet.theme--light.grey.lighten-3{
  background-image: url(http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1602992708529-c9fdb12905c9-scaled.jpeg);
  background-size:  cover;
  background-position: center;
  position: relative;
  &::after{
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    color: #efefef;
    left: 0;
    top: 0;
  }
}
</style>
