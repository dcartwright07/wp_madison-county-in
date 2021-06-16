<template>
  <v-container>
      <v-row>
          <v-col>
              <h2>Our Team</h2>
          </v-col>
      </v-row>

      <v-row justify='center' >
          <!-- picture with hover affect will be -->
        <v-col v-for="profile in profiles" :key='profile.id' sm="3">
            <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                <v-avatar
                v-bind="attrs"
                v-on="on"
                size="128">
                    <v-img v-if="profile.media_url" cover max-height="250" max-width="250" :src="profile.media_url" />
                    <v-img v-else cover max-height="250" max-width="250" :src="require('~/assets/madison_silhouettes_1.png')" />
                       <!-- <v-img :src="profile.media_url ? profile.media_url : require('~/assets/madison_silhouettes_1.jpg') "/> -->
                </v-avatar>
                </template>
                <v-card>
                    <v-card-title v-html="profile.title" class="headline grey lighten-2"></v-card-title>
                    <v-card-subtitle v-html="profile.titlerole"></v-card-subtitle>
                    <v-card-text v-html="profile.content"></v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        email
                    </v-btn>
                    </v-card-actions>
            </v-card>
            </v-dialog>
            <h3 v-html="profile.title"></h3>
            <span v-html="profile.titlerole"></span>
        </v-col>          
              <!-- {{post}} -->
          <!-- about or mission statment department -->
      </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.sectionHeader{
    &::before{
        content: "";
        width: 100%;
        height:2px;
        background:'secondary';
    }
}
</style>
<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
      profiles: [], 
      logo: 'https://madisoncounty.in.gov/images/recoloredlogo.png',
		}
	},

	computed: {
        ...mapState([
            'offices',
            'categories',
             'categoryMap',
              'countyProfiles','featuredImages','tags'])},

	created() {
    const category_slug = this.$route.params.department
    const slug = this.$route.params.office
    const category_id = this.categoryMap[category_slug]
    const tag_id = this.tags[slug]
    this.profiles = this.countyProfiles.filter(({categories, tags}) => 
      categories.includes(category_id) && tags.includes(tag_id)
    ) 
	},   
}
</script>