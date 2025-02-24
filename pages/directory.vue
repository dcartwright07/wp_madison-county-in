<template>
  <v-card>
    <v-card-title class="primary white--text text-h5 mt-15">
      Madison County Directory
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="2">
        <v-list-item
          v-for="filter in filters"
          :key="filter.id"
          @click="setFilter(filter.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ filter.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="4" class="d-flex" style="overflow: scroll; height: 85vh;">
        <div
          v-if="!items"
          class="text-h6 grey--text text--lighten-1 font-weight-light"
        >
          Select a Category
        </div>
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchOrganizations"
          :open.sync="open"
          activatable
          color="primary"
          open-on-click
          transition
          hoverable
          dense
          @update:open="updateOrganizationList"
        ></v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
          >
            Select an Organization
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar
                v-if="selected.organization_image"
                size="100"
                class="mb-8"
              >
                <v-img :src="selected.organization_image"></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selected.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.email }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                <!-- {{ selected.username }} -->
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-row class="text-left" tag="v-card-text">
              <v-col class="mr-2 mb-1" tag="strong" cols="5">
                Location:
              </v-col>
              <v-col>
                {{ selected.address }} {{ selected.city }},
                {{ selected.state }} {{ selected.zip }}
              </v-col>
            </v-row>

            <v-row v-if="selected.phone" class="text-left" tag="v-card-text">
              <v-col class="mr-2 mb-1" tag="strong" cols="5">
                Phone:
              </v-col>
              <v-col>{{ selected.phone }}</v-col>
            </v-row>

            <v-row v-if="selected.website" class="text-left" tag="v-card-text">
              <v-col class="mr-2 mb-1" tag="strong" cols="5">
                Website:
              </v-col>
              <v-col>
                <a :href="`${selected.website}`" target="_blank">
                  {{ selected.website }}
                </a>
              </v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import { mapState } from "vuex"

export default {
  data: () => ({
    active: [],
    open: [],
    filters: [
      {
        name: "By Category",
        id: 1,
      },
      {
        name: "By City",
        id: 2,
      },
    ],
    selectedFilter: 0,
    cityList: [],
    categoryList: [],
    items: undefined,
  }),

  async fetch({ store }) {
    let options = {
      limit: "500",
    }
    await store.dispatch("wuapi/getDirectory", options)
  },

  computed: {
    ...mapState({
      organizationList: (state) => state.wuapi.directory,
      categories: (state) => state.wuapi.directory_categories,
    }),

    categoryItems() {
      let array = []

      this.categoryList.forEach((element, index) => {
        let item = {
          name: element,
          id: index,
          children: [],
        }

        array.push(item)
      })

      return array
    },

    cityItems() {
      let array = []

      this.cityList.forEach((element, index) => {
        let item = {
          name: element,
          id: index,
          children: [],
        }

        array.push(item)
      })

      return array
    },

    selected() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return this.organizationList.find(
        (organization) => organization.id === id
      )
    },
  },

  methods: {
    async fetchOrganizations(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      if (this.selectedFilter == 1) {
        this.organizationList.filter((organization) => {
          organization.categories.forEach((category) => {
            if (category.name === item.name) {
              item.children.push(organization)
            }
          })
        })
      } else if (this.selectedFilter == 2) {
        this.organizationList.filter((organization) => {
          if (organization.city === item.name) {
            item.children.push(organization)
          }
        })
      }

      return item.children
    },

    setFilter(id) {
      if (id === 1) {
        this.items = this.categoryItems
      } else if (id === 2) {
        this.items = this.cityItems
      }

      this.selectedFilter = id
    },

    updateOrganizationList(array) {
      this.open = array
    },

    getCategoryList() {
      let array = []

      this.organizationList.forEach((organization) => {
        organization.categories.forEach((category) => {
          array.push(category.name)
        })
      })

      array.sort((a, b) => {
        return a.localeCompare(b)
      })

      this.categoryList = new Set(array)
    },

    getCityList() {
      let array = []

      this.organizationList.forEach((element) => {
        if (element.city != "") {
          let city = element.city.toLowerCase()
          city = this.capitalizeWords(city)
          array.push(city)
        }
      })

      array.sort((a, b) => {
        return a.localeCompare(b)
      })

      this.cityList = new Set(array)
    },

    capitalizeWords(string) {
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase()
      })
    },
  },

  created() {
    this.getCategoryList()
    this.getCityList()
  },
}
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px;
}
</style>
