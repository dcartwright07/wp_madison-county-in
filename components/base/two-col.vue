<template>
  <v-container fluid flex class="overflow-hidden ma-0 pa-0   ">
    <v-row class="two_col_section pb-12" no-gutter  v-for="(category,index) in categoriesWithPosts" :key="category.slug " 
     :class="{'pt-15': index == 0}"
     no-gutters>
     
     <!-- :class="{'primary': index % 5 === 0, 'accent': index % 5 === 1, 'secondary': index % 5 === 2, 'pt-15': index == 0}"  -->
        <v-container v-if="!category.posts.length < 1" fluid class="d-flex" :class="{'flex-row': index % 2 === 0, 'flex-row-reverse': index % 2 !== 0}">
        <v-col :id="category.name" class="text-center white--text" cols="12" md="4"
        
        >
          <v-sheet
            class="d-flex flex-column justify-start pt-md-2 align-start"
            
            height="100vh"
            rounded
            shaped>
            <v-card-title class="align-center">
              
              <h2 :id="category.slug" class="section-name">
                {{category.name}} 
              </h2>
              
            </v-card-title>
            <v-container class="pa-2 mt-5">
              <v-row>
                <v-col
                  v-for="post in category.posts" :key="post.slug"
                  class="d-inline-flex mt-5"
                >
                  <nuxt-link style="text-decoration: none;" :to="'/'+ category.slug +'/' + post.slug">
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                          :class="{'primary': index % 5 === 0, 'secondary': index % 5 === 1, 'hyperlink': index % 5 === 2, 'accent': index % 5 === 3}"
                          v-bind="attrs"
                          v-on="on"
                          class="circular-reveal"
                          width='100'
                          height='100'
                          elevation="2"
                          fab
                          icon
                          :style="{content: 'post.slug'}"
                          >
                            <!-- <span style="color:white;" class="cardpost_h2_title pa-3" v-html="post.name"/> -->
                            <v-icon size='40'>
                              {{ post.icon }}
                            </v-icon>

                          </v-btn>
                        </template>
                        <span class="white--text cardpost_h2_title pa-3" v-html="post.name"/>
                    </v-tooltip>
                  </nuxt-link>    
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col
          class="col-xs-12 col-md-8 "
          md="6"
        >
        <!-- hidden-sm-and-down -->
          <v-sheet
          class=" full-height ma-6"
            elevation="4"
          >
            <v-img
                height='100%'
                elevation="4"
                :src="category.featured_media_url"
                :aspect-ratio="961/762"
                cover
              ></v-img>

          </v-sheet>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>
<style lang='scss' scoped>
.two_col_section{
  padding-left: 6.25vw;
  padding-right: 6.25vw;
  &:not(:first-of-type){
    padding: 100px 6.25vw ;
  }
}
.v-icon{
  font-size:40px;
}
.section-name{
  font-size: 3.125rem;
 
}


.circular-reveal {
  width: 256px;
  height: 256px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.circular-reveal img {
  width: 100%;
}

.circular-reveal::after {
  // content: '';
  position: absolute;
  background: rgba(149, 116, 215, 0.509);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 60px;
  transition: transform 0.2s cubic-bezier(0, 0, 0.3, 1),
      opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
  transform: rotate(10deg);
  opacity: 0;
  
}


.circular-reveal:hover::after {
  transform: rotate(0deg);
  opacity: 1;
}
</style>

<script>

import { mapState, mapGetters } from 'vuex'



export default {
	data() {
		return {
			tiles: [],
      imageUrl: 'localhost/wp-json/wp/v2/media/?id=',
      rowColor: ["primary", "accent", "secondary"]
		}
	},

	computed: {
    ...mapState([
      'offices',
      'categories',
      'landingPages',
      'featuredImages', 
      'categoriesWithPosts'
    ]), 
    ... mapGetters([
      'getProfiles'
    ])
  },

  pageswithimage: function () {
     return this.landingPages.filter(function (page) {
      return page.featured_media > 0
    })
  }, 
}

// (function() {
//   const element = document.querySelector(".circular-reveal");
//   const inner = document.querySelector(".circular-reveal__content");

//   const easing = 0.3;
//   const outScale = 0.6;
//   const inScale = 1;
//   let targetScale = outScale;
//   let elementScale = targetScale;
//   let innerScale = 1 / elementScale;

//   element.addEventListener("pointerover", () => {
//     targetScale = inScale;
//   });

//   element.addEventListener("pointerout", () => {
//     targetScale = outScale;
//   });

//   const update = () => {
//     elementScale += (targetScale - elementScale) * easing;
//     innerScale = 1 / elementScale;

//     element.style.transform = `scale(${elementScale})`;
//     inner.style.transform = `scale(${innerScale})`;

//     requestAnimationFrame(update);
//   };

//   requestAnimationFrame(update);
// })();
</script>