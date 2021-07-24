<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader :image="destination.listing_image" />
    <!-- Content -->
    <v-container class="container">
      <v-row
        class="d-flex flex-md-row justify-center flex-sm-column-reverse pa-10"
      >
        <v-col class="col-md-7 col-lg-7 mb-3">
          <div class="">
            <div class="detail-tile mb-4">
              <h1 v-html="destination.name" />
              <p
                class="text-muted"
                v-html="
                  destination.address +
                  destination.city +
                  ' ' +
                  destination.state +
                  ', ' +
                  destination.zip
                "
              />
              <v-btn
                disabled
                rounded
                class="text-uppercase primary mr-2"
                v-for="item in destination.categories"
                :key="item.name"
              >
                {{ item.name }}
              </v-btn>
            </div>
            <div class="nav-wrapper">
              <v-tabs
                v-model="tab"
                class="nav nav-pills nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                role="tablist"
              >
                <v-tab
                  class="nav-link mb-sm-3 mb-md-0 active show"
                  id="tabs-icons-text-1-tab"
                  data-toggle="tab"
                  href="#tabs-icons-text-1"
                  role="tab"
                  aria-controls="tabs-icons-text-1"
                  aria-selected="true"
                >
                  <i class="fa fa-info-circle mr-2"></i>About
                </v-tab>

                <v-tab
                  class="nav-link mb-sm-3 mb-md-0"
                  id="tabs-icons-text-2-tab"
                  data-toggle="tab"
                  href="#tabs-icons-text-2"
                  role="tab"
                  aria-controls="tabs-icons-text-2"
                  aria-selected="false"
                >
                  <i class="fa fa-calendar-alt mr-2"></i>Events
                </v-tab>
              </v-tabs>
            </div>

            <v-card class="card shadow">
              <v-card-text class="card-body mt-5">
                <div class="tab-content" id="destinationTabContent">
                  <v-tabs-items v-model="tab">
                    <v-tab-item id="tabs-icons-text-1">
                      <div class="tab-pane fade active show">
                        <p
                          v-if="!destination.content"
                          class="description"
                          v-html="destination.description"
                        />
                        <p
                          v-else
                          class="description"
                          v-html="destination.content"
                        />
                        {{ destination }}
                      </div>
                    </v-tab-item>

                    <v-tab-item id="tabs-icons-text-2">
                      <div class="tab-pane fade">
                        organization.event.listing
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <v-col md="3" lg="3" class="pt-md-16">
          <!-- <BaseSidebar/> -->
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
      tab: null,
    }
  },

  computed: mapState({
    destination: (state) => state.wuapi.destination,
  }),

  methods: mapActions("wuapi", ["getDestination"]),

  created() {
    this.getDestination(this.$route.params.id)
  },
}
</script>
