<template>
  <v-app >
    <v-spacer />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      temporary
      right
      app
      color="#426464"
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" v-text="location.county" >
          </v-list-item-title>
          <v-list-item-subtitle v-text="location.state.name">
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in homeMenus.items"
          :key="i"
          router
          exact
        >
          <v-list-item-action>
            
          </v-list-item-action>
          <v-list-item-content>
              
              <v-list-item-title v-if="!item.child_items" v-text="item.title" />


              <v-list-group v-else transition="slide-x-transition">
                <template v-slot:activator
                slide-x
                >
                  <v-list-item-content>
                    <v-list-item-title @click="show = !show" v-text="item.title"/>
                    
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(submenu, n) in item.child_items"
                  :key="n"
                  name="slide-fade"
                  :to="submenu.url"
               f   
                >
                <transition name="slide-fade">
                  <v-list-item-title v-text="submenu.title"></v-list-item-title>
                    </transition>

                  <!-- <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon> -->
                </v-list-item>
              </v-list-group>
            
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    
    <v-app-bar
      absolute
      app
      light
      color="transparent"
      style="z-index:2;"
    >
      <nuxt-link to='/'>

      
        <v-img
          class="mr-3"
          max-height="45"
          max-width="45"
          src="https://madisoncounty.in.gov/images/recoloredlogo.png"
          lazy-src="https://madisoncounty.in.gov/images/recoloredlogo.png"
        ></v-img>
        </nuxt-link>
   

        <v-toolbar-title class="mr-16" v-text="location.county +', '+ location.state.abbrv" />
        <v-spacer/>
        <v-btn class="ml-16" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
  
 


    </v-app-bar>
    <v-main class="pt-0">
      <v-container fluid class="ma-0 pl-0 pt-0 pr-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<style scoped>
  /* Enter and leave animations can use different */
/* durations and timing functions.              */
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
</style>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      zIndex: 2,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      location:{
        county: 'Madison County',
        state:{
          name:'Indiana',
          abbrv:'IN'
          }
      }
    }
  },
  computed:{
    ...mapState(['homeMenus', 'homePage']),
  }
}
</script>
