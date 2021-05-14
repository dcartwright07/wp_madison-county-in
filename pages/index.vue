<template>
  <section
    id="welcome"
    class="overflow-hidden"
    
  >
  <v-container fluid class="pa-0">
    <v-row :align="align" no-gutters class=".flex-sm-column">
      <v-card
        class="col-md-8"
        height="100vh"
      >
          <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
          :z-index="1"
          class=".md-8"
        ></v-overlay>
          <v-carousel
                class="backgroundhero"
  
                cycle
                hide-delimiters 
                :show-arrows="false"
                v-model="model"
                height="100vh"
                >
            <v-carousel-item
            v-for="homeFeature in homeFeatures"
                    :key="homeFeature.id">
            <v-img
              :src='homeFeature.acf.hero_image.url'
              height="100vh"
            />
            </v-carousel-item>
            </v-carousel>
          <v-carousel
                class="homeHeroHeader"

                cycle
                hide-delimiters 
                :show-arrows="false"
                v-model="model"
                height="100vh"
                >
    
          <v-carousel-item
          transition="scroll-y-transition"
          v-for="homeFeature in homeFeatures"
                  :key="homeFeature.id">
          <h3 gutter class="pl-5 HomeSubHeader">{{homeFeature.acf.subheader}}</h3>
          </v-carousel-item>
          </v-carousel>
          <v-carousel
                class="homeHeroHeader homeHeroTitle"
                cycle
                hide-delimiters 
                :show-arrows="false"
                v-model="model"
                height="100vh"
                >

          <v-carousel-item
          nuxt
          transition="fade-transition"
          duration="{enter: 1.5, leave: 4 }"
          v-for="homeFeature in homeFeatures"
                  :key="homeFeature.id">
        
          <h1 class="h1 pl-4 ma-auto" v-html="homeFeature.title.rendered"></h1>
          </v-carousel-item>
          </v-carousel> 

       
      </v-card>
      <v-card
        class="pa-5 pt-16 col-md-4 col-sm-12"
        height="100vh"
        style="background-color:#92A7A7;"
      >
              <container 
                class=" d-inline-flex flex-column fheight justify-space-around pt-5"
              >
              <v-carousel
                
                hide-delimiters 
                :show-arrows="false"
              >
              <v-carousel-item
                transition="scroll-x-transition"
                v-for="homeFeature in homeFeatures"
                :key="homeFeature.id"
                >
                <h3 class="mt-16">{{homeFeature.title.rendered}}</h3>
              </v-carousel-item>
              </v-carousel>
              <v-carousel
              cycle
              hide-delimiters 
              :show-arrows="false"
              >  
                <v-carousel-item
                transition="scroll-x-transition"
                v-for="homeFeature in homeFeatures"
                :key="homeFeature.id"
                >
                  {{homeFeature.acf.hero_short_description}}
                  <br>
                   <v-btn elevation="1" medium rounded color='#426464' class="mt-2">
                     Learn More
                    <v-icon>
                      mdi-arrow-right-circle-outline
                    </v-icon>
                  </v-btn>

                </v-carousel-item>
              </v-carousel>
              </container>
      </v-card>
    </v-row>
  
    <v-row>
      <BaseTwoCol />
    </v-row>
    <v-row>
     <v-btn color="primary" large to="/government">
							Subscribe
						</v-btn>
    </v-row>
    </v-container>
  </section>
</template>


<style scoped>
.homeHeroHeader{
  z-index: 1;

}
.homeHeroTitle{
  position: absolute;
  top:0;
}
.homeHeroHeader .v-window-item {
    /* top: 20%; */
    position: relative;
}
.backgroundhero{
  position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .h1{
    font-size:4rem;
    z-index: 6;
    position: absolute;
    top: 30%;
  }
  .HomeSubHeader{
    font-size:2.4rem;
    font-weight: 300;
    z-index: 6;
    position: absolute;
    top: 23.5%;
  }
  .fheight{
    height:100vh;
  }
/*********************/
</style>
<script>
import { mapState } from 'vuex'
import Header from '../components/nav.vue'
export default {

  data () {
    return {
      absolute: true,
      opacity: 0.35,
      overlay: true,
      zIndex: 0,
      // fheight: '100vh',
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  computed:{
    ...mapState([
      'homePage',
      'landingPages',
      'homeFeatures',
      ]),
    regServices: (state) => {
      return state.homeFeatures.filter(
        (project) => project.ACF.service_type === 'Regular'
      )
    },
    protectionServices: (state) => {
      return state.homeFeatures.filter(
        (project) => project.ACF.service_type === 'Protection'
      )
    },
  },
}

</script>