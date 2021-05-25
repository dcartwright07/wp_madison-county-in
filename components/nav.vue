<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      temporary
      right
      app
      color="primary"
    >
    <v-list-item>
      <nuxt-link to='/'>
        <v-list-item-content>
          <v-list-item-title class="white--text title" v-text="location.county" >
          </v-list-item-title>
          <v-list-item-subtitle class="white--text" v-text="location.state.name">
          </v-list-item-subtitle>
        </v-list-item-content>
        </nuxt-link>
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
</template>

<script>
  export default {}
</script>

<style>
.title{
  color:#fff !important;
}

</style>