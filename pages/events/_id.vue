<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader
      :image="!event.image ? defaultImage : event.image"
      :name="event.name"
      :styleHeight="!event.image ? '200' : '500'"
    />
    <!-- Content -->
    <v-container class="container">
      <v-row
        class="d-flex flex-md-row justify-center flex-sm-column-reverse pa-10 pt-15"
      >
        <v-col class="col-md-7 col-lg-7 mb-3">
          <div class="">
            <div class="detail-tile mb-4">
              <h1 v-html="event.name" />
              <p
                class="text-muted"
                v-html="
                  event.address +
                  event.city +
                  ' ' +
                  event.state +
                  ', ' +
                  event.zip
                "
              />
              <v-btn
                disabled
                rounded
                class="text-uppercase primary mr-2"
                v-for="item in event.categories"
                :key="item.name"
                small
              >
                {{ item.name }}
              </v-btn>
            </div>

            <BaseTabs
              :navigation="tabs"
              :item="event"
              :listOfEvents="listOfEvents"
            />
          </div>
        </v-col>
        <v-col md="3" lg="3" class="pt-md-16">
          <BaseSidebar
            :email="event.contact_email"
            :phone="event.contact_phone"
            :c_name="event.contact_name"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  data() {
    return {
      tabs: [
        {
          name: "About",
          icon: "fa-info-circle",
        },
        {
          name: "Related Events",
          icon: "fa-calendar-alt",
        },
      ],
      defaultImage:
        "http://mcapi.signaturewebcreations.com/wp-content/uploads/2021/07/photo-1533219057257-4bb9ed5d2cc6.jpeg",
    }
  },

  computed: mapState({
    categories: (state) => state.wuapi.event_categories,
    event: (state) => state.wuapi.event,
    listOfEvents: (state) => state.wuapi.latestEvents,
  }),

  methods: mapActions("wuapi", ["getEvent", "getEvents"]),

  async created() {
    await this.getEvent(this.$route.params.id)
    let relatedCategories = ""
    this.event.categories.forEach((element, index) => {
      relatedCategories += this.categories.find(
        (event) => event.name === element.name
      ).key
      if (index < this.event.categories.length - 1) {
        relatedCategories += ","
      }
    })

    if (!this.event.image) {
    }

    let options = {
      type: "latest",
      limit: "5",
      categories: relatedCategories,
    }
    this.getEvents(options)
  },
}
</script>
