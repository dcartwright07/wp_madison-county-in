<template>
  <div
    class="v-sheet theme--light grey lighten-3"
    style="height: 20vh; min-height: 600px;"
  >
  <v-overlay absolute class="justify-start" style="margin:0; z-index:0; ">

  
    <div class="container fill-height ml-lg-3 pl-lg-15">
      <div class="row fill-height justify-left align-content-center">
        <div class="col col-12">
          <h1 class="display-2 lightgrey--text text-left" v-html="office.name">
          </h1>
        </div>
        <div class="col-sm-12 col-md-6">
          {{office.acf.description}}
        </div>
      </div>
    </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    office: {
      type: Object,
      required: true
    }
  }
}
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
