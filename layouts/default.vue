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
      <v-list dense>
        <v-list-item
          v-for="item in categories"
          :key="item.name"
          href
        >
          <v-list-item-icon>
            <v-icon>{{ cat_icon.government }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    
    <v-app-bar
      elevate-on-scroll
      app
      tile
      color="white"
      class="dark--text"
      style="z-index:2;"
    >
      <nuxt-link class='d-flex text-decoration-none justify-center align-center flex-nowrap' to='/'>

      
        <v-img
          class="mr-3"
          max-height="45"
          max-width="45"
          src="https://madisoncounty.in.gov/images/recoloredlogo.png"
          lazy-src="https://madisoncounty.in.gov/images/recoloredlogo.png"
        ></v-img>
   

        <v-toolbar-title class="mr-16 dark--text text-decoration-none" v-text="location.county +', '+ location.state.abbrv" />
      </nuxt-link>
        <v-spacer/>
        <v-btn class="ml-16" icon>
          <v-icon class="dark--text">mdi-magnify</v-icon>
        </v-btn>
  

      <v-app-bar-nav-icon class="dark--text" @click.stop="drawer = !drawer" />
  
 


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
      },
      cat_icon:{
        government: 'mdi-bank' ,
        business: 'mdi-handshake' ,
        residents: 'mdi-homegroup ' ,
        visitors: 'mdi-mapsearch',
      },
    }
  },
  computed:{
    ...mapState(['categories', 'homePage']),
  }
}
</script>
