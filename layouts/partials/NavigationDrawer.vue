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
          <v-icon dense>fas fa-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="item in categorySections"
        :key="item.name"
        link
        :href="`/#${item.url}`"
      >
        <v-list-item-icon>
          <v-icon dense>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="item in wuSections"
        :key="item.name"
        link
        :href="`/#${item.url}`"
      >
        <v-list-item-icon>
          <v-icon dense>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link href="/#directory">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Directory</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- <v-list-item link href="/#events">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Events</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link href="/#destinations">
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
      categorySections: [
        {
          name: "Government",
          url: "/#government",
          icon: "fas fa-university"
        },
        {
          name: "Business",
          url: "/#business",
          icon: "fas fa-handshake"
        },
        {
          name: "Residents",
          url: "/#residents",
          icon: "fas fa-house-user"
        },
        {
          name: "Visitors",
          url: "/#visitors",
          icon: "fas fa-map-marked-alt"
        }
      ],
      wuSections: [
        {
          name: "Events",
          url: "/#events",
          icon: "fas fa-calendar-alt"
        },
        {
          name: "Directory",
          url: "/directory",
          icon: "fas fa-folder-open"
        },
        {
          name: "Destinations",
          url: "/#destinations",
          icon: "fas fa-map-signs"
        }
      ]
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
