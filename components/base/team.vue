<template>
  <v-container class="py-10">
    <v-row class="mb-10">
      <v-col>
        <h2>Our Team</h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <!-- picture with hover affect will be -->
      <v-col v-for="(profile, index) in members" :key="profile.id" sm="3" class="mb-10">
        <v-dialog v-model="dialog[index]" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar class="profile_av mb-4" v-bind="attrs" v-on="on" size="150">
              <v-img
                v-if="profile.media_url"
                cover
                position="top center"
                max-height="250"
                max-width="250"
                :src="profile.media_url"
              />

              <v-img
                elevation="10"
                v-else
                cover
                max-height="250"
                max-width="250"
                :src="require('~/assets/madison_silhouettes_1.png')"
              />
              <!-- <v-img :src="profile.media_url ? profile.media_url : require('~/assets/madison_silhouettes_1.jpg') "/> -->
            </v-avatar>
          </template>
          <v-card>
            <v-card-title
              v-html="profile.title"
              class="headline grey lighten-2"
            ></v-card-title>
            <v-card-subtitle v-html="profile.titlerole"></v-card-subtitle>
            <v-card-text v-html="profile.content"></v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="$set(dialog, index, false)">
                Close
              </v-btn>
              <v-btn color="primary" text>
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

<script>
export default {
  props: {
    team: {
      type: Array,
      required: true
    }
  },

  async fetch() {
    await this.setProfileImageUrl()
  },

  data() {
    return {
      dialog: [],
      logo: "https://madisoncounty.in.gov/images/recoloredlogo.png",
      members: [],
    };
  },

  methods: {
    /**
     * Used this function to get the image from the Wordpress API because
     * trying to pass the value through a function call was always returning
     * a promise and we were unable to extract the string from the promise.
     * Being pressed for time, I resorted to an old fashioned method for loop.
     */
    async setProfileImageUrl() {
      let array = []

      for (let i = 0; i < this.team.length; i++) {
        let image = await fetch(
          this.$config.apiUrl +
            "media/" +
            this.team[i].image_id
        )
          .then(response => response.json())
          .catch(error => error.response.status)
        if (!image.data) {
          this.team[i].media_url = image.guid.rendered
        } else {
          this.team[i].media_url = ""
        }
        array.push(this.team[i])
      }
      this.members = array
    }
  }
};
</script>

<style lang="scss" scoped>
.sectionHeader {
  &::before {
    content: "";
    width: 100%;
    height: 2px;
  }
}
.profile_av{
  box-shadow: 0 0 4px #444;
}
</style>
