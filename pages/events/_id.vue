<template>
  <div class="main-wrapper">
    <WhatsUpListingHeader :image="event.image" :name="event.name" />
    <!-- Content -->
    <v-container class="container">
      <v-row
        class="d-flex flex-md-row justify-center flex-sm-column-reverse pa-10"
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
                  <i class="fa fa-calendar-alt mr-2"></i>Related Events
                </v-tab>
              </v-tabs>
            </div>

            <v-card class="card shadow">
              <v-card-text class="card-body mt-5">
                <div class="tab-content" id="eventTabContent">
                  <v-tabs-items v-model="tab">
                    <v-tab-item id="tabs-icons-text-1">
                      <div class="tab-pane fade active show">
                        <p
                          v-if="!event.content || event.content === ''"
                          class="description"
                          v-html="event.description"
                        />
                        <p v-else class="description" v-html="event.content" />
                      </div>
                    </v-tab-item>

                    <v-tab-item id="tabs-icons-text-2">
                      <div class="tab-pane fade">
                        <v-list two-line>
                          <v-list-item-group
                            v-model="selected"
                            active-class="pink--text"
                            multiple
                          >
                            <template v-for="(item, index) in listOfEvents">
                              <v-list-item :key="item.id" :to="{ name: 'events-id', params: { id: item.id } }"  >
                                <template v-slot:default="{ active }" >
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-text="item.title"
                                    ></v-list-item-title>

                                    <v-list-item-subtitle
                                      class="text--primary"
                                      v-text="item.name"
                                    ></v-list-item-subtitle>

                                    <!-- <v-list-item-subtitle
                                      v-text="item.subtitle"
                                    ></v-list-item-subtitle> -->
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-list-item-action-text>{{ item.start | formatDate($moment, "MMMM D") }}</v-list-item-action-text>

                                    <v-icon
                                      v-if="!active"
                                      color="grey lighten-1"
                                    >
                                      mdi-star-outline
                                    </v-icon>

                                    <v-icon v-else color="yellow darken-3">
                                      mdi-star
                                    </v-icon>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>

                              <!-- <v-divider
                                v-if="index < items.length - 1"
                                :key="index"
                              ></v-divider> -->
                            </template>
                          </v-list-item-group>
                        </v-list>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <v-col md="3" lg="3" class="pt-md-16">
          <BaseSidebar />
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
	categories: (state) => state.wuapi.event_categories,
    event: (state) => state.wuapi.event,
    listOfEvents: (state) => state.wuapi.latestEvents,
  }),

  methods: mapActions("wuapi", ["getEvent", "getEvents"]),

  async created() {
    await this.getEvent(this.$route.params.id)
	let relatedCategories = ''
	this.event.categories.forEach( (element, index) =>{
		relatedCategories += this.categories.find(event => event.name === element.name).key
		if (index < this.event.categories.length-1){
			relatedCategories +=  ','
		}

	

	});

    let options = {
      type: "latest",
      limit: "5",
	  categories: relatedCategories,
    }
    this.getEvents(options)
  },
}
</script>
