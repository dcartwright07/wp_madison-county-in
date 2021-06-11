<template>
    <v-container fluid class="pa-0 fill-height ma-0 relative">
        <!-- background & overlay -->

         <v-carousel
           cycle
            hide-delimiters
            :show-arrows="false"
            width="100vw"
            min-width="320"
            height="100vh"
            interval=2000
            v-model="carouselIndex"
            >
                <!-- carousel that transition each item -->
                <!-- carousel-item to have title, sub-header, img, description, organiztion_event  -->
                <!-- carousel-item to have title(R_L), sub-header(T_B), img(slide), description(fade), organiztion_event(fade)  -->
                    <!--!   carousel with carousel-item carousel-item carousel-item  -->
                    <!-- -->


            <v-carousel-item  transition="slide-x-reverse-transition" class="accent" v-for="homepost in homeFeatures" :key="homepost.id" width="100%" min-height="320" @change="show">
                    <v-img class="fill-height" :src='homepost.acf.hero_image.url'></v-img>
            </v-carousel-item>
        </v-carousel>
        <v-sheet elevation="3" class="fill-height gradient absolute hero-content-sheet ">
                <v-row class=" header-wrap pl-md-16 pr-md-16 absolute z-1 " v-for="(post, index) in homeFeatures" :key="post.id">
                    <v-slide-x-transition> 
                        <h2 color='primary' class="accent--text h2 ma-0 pa-0 " v-show="carouselIndex === index"  v-html="post.acf.subheader"></h2>
                    </v-slide-x-transition>
                    <v-slide-x-reverse-transition >
                        <h1 color='primary' class="lightgrey--text h1 ma-0 pa-0" v-show="carouselIndex === index" v-html="post.title.rendered"></h1>
                    </v-slide-x-reverse-transition> 
                    <v-slide-x-transition> 
                        <div class="lightgrey--text postcontent mr-10" v-show="carouselIndex === index" v-html="homeFeatures[carouselIndex].acf.hero_short_description"></div>
                    </v-slide-x-transition>
                </v-row>      
        </v-sheet>
    <BaseEventCards/>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {

  data () {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 1,
      show: false,
      hidden: true,
      carouselIndex: 0,
    }
  },
  computed:{
    ...mapState([
      'homeFeatures',
      ]),
    //     getfullname : function(){
    //      return this.$route.internalLazyValue;
    //   },
  },
}
</script>

<style lang="scss" scoped>
    .show{
        display: inline-block;
    }
    .hide{
        display: none;
    }
    .hero-content-sheet{
        
        // top: calc(0vw + 64px);
        left: 0;
        background: transparent;
        width: 100%;
                 // &:after{
            //     content: "";
            //     background: #000;
            //     height: 110%;
            //     width: 110%;
            //     position: absolute;
            //     border-radius: 10px;
            //     opacity: .7;
            //     z-index: -1;
            //     left: 5%;
            // }
        // height: calc(100vh - 64px);

        .header-wrap{
            // margin-left: -6%;
            top: 30%;
            max-width:1026px;
            display: flex;
            flex-direction: column;

            .h1,.h2{
                font-size: 4.0vw;
            }
            .h2{
                font-weight: 200;
            }
   

        }
    }
    .postcontent{
        width: inherit;
    }
    .z-1{
        z-index: 1;
    }
    .relative{
        position: relative;
    }
    .gradient{
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 28%, rgba(0,0,0,0.0) 100%) !important;
    // background: linear-gradient(236deg, rgba(2,0,36,0.5) 0%, rgba(9,9,121,0) 20%, rgba(0,212,255,0.500437675070028) 100%) !important;
    }
</style>