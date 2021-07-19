<template>
  <v-parallax
    height="600"
    src="https://images.unsplash.com/photo-1573344176794-e7f9403f5a43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80"
    cover
    class="pa-0"
  >
    <v-overlay value="true" absolute>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" lg="6">
            <h2 class="display-1 mb-8">Madison County Visitor's Bureau</h2>
            <div class="white--text mt-8 mb-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam officiis corporis deleniti tempora atque adipisci minima omnis non asperiores distinctio optio maiores ipsam, alias saepe mollitia aspernatur ipsa, impedit libero!</div>

            <v-btn id="visitorsbtn" color="primary" class="ma-2 white--text">
                Learn More
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-parallax>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.overlay_parallax{
    position: absolute;
    opacity: 0.5 !important;
    left:0;


}
#visitorsbtn{
    width:150px;
}
</style>
