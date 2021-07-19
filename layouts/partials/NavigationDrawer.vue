<template>
  <v-navigation-drawer
    v-model="drawer"
    @input="updateDrawer"
    fixed
    temporary
    right
    app
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://madisoncounty.in.gov/images/recoloredlogo.png" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="title" v-text="location.county">
        </v-list-item-title>
        <v-list-item-subtitle v-text="location.state.name">
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="item in categories"
        :key="item.name"
        link
        :href="`/#${item.slug}`"
      >
        <v-list-item-icon>
          <v-icon>{{ categoryIcon(item.slug) }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link to="/#directory">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Directory</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/#events">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Events</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/#destinations">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Destinations</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      cat_icon: {
        government: "mdi-bank",
        business: "mdi-handshake",
        residents: "mdi-homegroup ",
        visitors: "mdi-mapsearch"
      }
    };
  },

  computed: mapState({
    drawer: state => state.navigation.drawer,
    categories: state => state.categories
  }),

  methods: {
    categoryIcon(item) {
      return this.cat_icon[item];
    },
    ...mapActions("navigation", ["updateDrawer"])
  }
};
</script>

<style lang="scss" scoped></style>
