<template>
    <row>
        <v-parallax
    height="400"
    src="https://images.unsplash.com/photo-1573344176794-e7f9403f5a43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80"
    cover
    class="pa-0"
  >

 <div class="overlay_parallax absolute blackish fill-height col-12"></div>

    <div class="parallax-text-content ">
        <div class="container">
            <v-row class="row">
                <v-col>
                    <div class="d-flex flex-column col-lg-6 col-sm-8 align-space-around" >
                        
                        <h2 class="display-1">Madison County Visitor's Bureau</h2>
                 
                        <v-btn id="visitorsbtn" color="primary" class="ma-2 white--text">
                            Learn More
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>



  </v-parallax>
    </row>
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