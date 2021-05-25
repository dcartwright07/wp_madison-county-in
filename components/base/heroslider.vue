<template>
    <v-container fluid class="pa-0 fill-height ma-0">
        <!-- background & overlay -->

         <v-carousel max 
            cycle  
            hide-delimiters
            :show-arrows="false"
            width="100vw"
            min-width="320"
            height="100vh">
            <v-carousel-item  class=" accent" v-for="homepost in homeFeatures" :key="homepost.id" width="100%" min-height="320" @change="show">
                <v-sheet elevation="3" class="fill-height hero-sheet">
                    <div class="fill-height absolute fill-width gradient z-1"></div>
                    <div class="header-wrap pl-md-16 pr-md-16 absolute z-1">
                        <transition name="fade" mode="out-in">
                            <h2 color='primary' class="h2 ma-0 pa-0 " v-html="homepost.acf.subheader" ></h2>
                        </transition>
                        <transition name="fade" mode="out-in">
                            <h1 color='primary' class="h1 ma-0 pa-0" v-html="homepost.title.rendered" ></h1>
                        </transition>
                        <div class="postcontent mr-10">
                            {{homepost.acf.hero_short_description}}
                        </div>
                    </div>
                    <v-img class="fill-height" :src='homepost.acf.hero_image.url'></v-img>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <!-- headers -->
        <!-- paragraph -->
        <!-- event list -->

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
      show: true
       
    }
  },
  computed:{
    ...mapState([
      'homeFeatures',
      ]),
  },
}
</script>

<style lang="scss" scoped>
    .hero-sheet{
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
            &:after{
                content: "";
                background: #000;
                height: 110%;
                width: 110%;
                position: absolute;
                border-radius: 10px;
                opacity: .7;
                z-index: -1;
                left: 5%;
            }
            
        }
    }
    .postcontent{
        width: inherit;
    }

    .slide-fade-enter-active {
    transition: all .3s ease;
    }
    .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
    }
    .z-1{
        z-index: 1;
    }
    .gradient{
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.500437675070028) 100%) !important;
    }
</style>