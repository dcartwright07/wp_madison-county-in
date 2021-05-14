<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <!-- show featured image if any -->
    <v-img src="" height="200px"></v-img>

    <v-card-title @click="show = !show">
        <!-- page.title -->
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
        <!-- will show child page.description -->
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
    <!-- <div class="row"><div class="col-12 col-md-6 col-lg-4"><a href="/government/departments-and-agencies" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-university"></span> <span>Departments &amp; Agencies</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/county-governments" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-city"></span> <span>County Governments</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="http://lrb.hawaii.gov/directory" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-address-book"></span> <span>Government Guide &amp; Directory</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/state-officials" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-users"></span> <span>State Officials</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/hawaii-legislature" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-bell"></span> <span>Hawaiʻi Legislature</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/hawaii-judiciary" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-gavel"></span> <span>Hawaiʻi Judiciary</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/federal-government" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-flag-usa"></span> <span>Federal Government</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="/government/voting-and-elections" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-person-booth"></span> <span>Voting &amp; Elections</span></div></a></div><div class="col-12 col-md-6 col-lg-4"><a href="http://opendata.hawaii.gov/" class="card tile hoverEffect"><div class="card-body"><span class="fad fa-chart-bar"></span> <span>Open Data</span></div></a></div></div> -->
  
</template>

<script>
export default {

}
</script>

<style>

</style>


