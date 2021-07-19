<template>
<div></div>
	<!-- <div class="main-wrapper">
		<title-bar title="Dingloy Place" subtitle="Explore New Places"></title-bar> -->
		<!-- Content -->
		<!-- <div class="container">
			<div class="content">
				<div class="row sticky-wrapper">
					<div class="col-md-8 col-lg-8 mb-3">
						<div class="">
							<div class="detail-tile mb-4">
								<h3 v-html="data.name"/>data.name
								<p class="text-muted" v-html="event.address + '<br/>' + event.city + ' ' + event.state + ', '+ event.zip"/>
								<span class="badge badge-pill badge-info text-uppercase mr-2">data.categories</span>
							</div>
							<div class="nav-wrapper">
								<ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
									<li class="nav-item">
										<a class="nav-link mb-sm-3 mb-md-0 active show" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="fa fa-info-circle mr-2"></i>About</a>
									</li>
									<li class="nav-item">
										<a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="fa fa-calendar-alt mr-2"></i>Events</a>
									</li>
								</ul>
							</div>
							<div class="card shadow">
								<div class="card-body">
									<div class="tab-content" id="myTabContent">
										<div class="tab-pane fade active show" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
											<p class="description" v-html="data.description"/>
											<h4 class="mb-4">
												Contact Info
											</h4>
											<div class="row mb-4">
												<div class="col-lg-4">
													<div class="detail-list mb-2">
														<div class="detail-list-label mb-1"><i aria-hidden="true" class="fa fa-phone mr-2"></i>
															<small class="text-uppercase font-weight-bold">Phone</small>
														</div>
														<p class="m-0 text-small text-muted">data.phone</p>
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
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<sidebar-layout-two></sidebar-layout-two>
					</div>
				</div>
			</div>
		</div>
	</div> -->
</template>

<script>
// import TitleBar from 'Components/globalFrontendComponents/TitleBar';
// import SidebarLayoutTwo from 'Views/listing/SidebarLayoutTwo';
export default {
	// data(){
	// 	return{
	// 		center: {
	// 			lat : -34.397,
	// 			lng : 150.644
	// 		}
	// 	}
	// },
	// components: {
	// 	TitleBar: TitleBar,
	// 	SidebarLayoutTwo: SidebarLayoutTwo
	// }
};
</script>
