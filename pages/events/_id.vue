<template>
	<div class="main-wrapper">
    <WhatsUpListingHeader :image="event.image" :name="event.name"/>
		<!-- Content -->
		<v-container class="container">
				<v-row class="d-flex flex-md-row justify-center flex-sm-column-reverse pa-10">
					<v-col class="col-md-7 col-lg-7 mb-3 pt-16">
						<div class="">
							<div class="detail-tile mb-4">
								<h1 v-html="event.name"/>
								<p class="text-muted" v-html="event.address + event.city + ' ' + event.state + ', '+ event.zip"/>
								<v-btn disabled rounded  class="text-uppercase primary mr-2" v-for="(item) in event.categories" :key="item.name">
									{{item.name}}
								</v-btn>
							</div>
							<div class="nav-wrapper">
								<v-tabs class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
									
										<v-tab class="nav-link mb-sm-3 mb-md-0 active show" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="fa fa-info-circle mr-2"></i>About</v-tab>
									
										<v-tab class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="fa fa-calendar-alt mr-2"></i>Events</v-tab>
						
								</v-tabs>
							</div>
							<v-card class="card shadow">
								<v-card-text class="card-body mt-5">
									<div class="tab-content" id="myTabContent">
										<div class="tab-pane fade active show" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
											<p class="description" v-html="event.description"/>
											<h4 class="mb-4">
												Contact Info
											</h4>
											<div class="row mb-4">
												<div class="col-lg-4">
													<div class="detail-list mb-2">
														<div class="detail-list-label mb-1"><i aria-hidden="true" class="fa fa-phone mr-2"></i>
															<small class="text-uppercase font-weight-bold">Phone</small>
														</div>
														<p class="m-0 text-small text-muted">event.contact_phone</p>
													</div>
												</div>
												<div class="col-lg-4">
													<div class="detail-list mb-2">
														<div class="detail-list-label mb-1"><i aria-hidden="true" class="fa fa-email mr-2"></i>
															<small class="text-uppercase font-weight-bold">For Complaints.</small>
														</div>
														<p class="m-0 text-small text-muted">noreply@noreply</p>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
											organization.event.listing
										</div>
									</div>
								</v-card-text>
							</v-card>
						</div>
					</v-col>
					<v-col md="3" lg="3" class="pt-md-16">
						<BaseSidebar/>
					</v-col>
				</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    event: state => state.wuapi.event
  }),

  methods: mapActions("wuapi", ["getEvent"]),

  created() {
    this.getEvent(this.$route.params.id);
  }
};
</script>
