<template>

<v-item-group class="absolute event-bar" active-class="primary ">
    <v-container >
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="2"
        >
          <v-item v-slot="{ active, toggle }">
            <v-card
              class="d-flex align-center"
              color="transparent"
              flat
              dark
              height="100"
              @click="toggle"
            >
            <v-scroll-y-transition hide-on-leave>
            <div v-if="!active" class="flex-grow-1 animate-center text-center" > Event name</div>
            </v-scroll-y-transition>
              <v-scroll-y-transition hide-on-leave>
                <div
                  v-if="active"
                  class=" primary fill-height flex-grow-1 animate-center text-center"
                >
                  <p>Event date</p>
                  
                  <v-btn>
                  Learn more
                  </v-btn>
                  
                </div>
                
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
  export default {
    data: () => ({
      expand: false,
    }),
  }
</script>
<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.z-top{
    z-index:5;
}
.animate-center{
    left:19%
}
.event-bar{
    width: 100%;
    bottom: 15px;
}


</style>