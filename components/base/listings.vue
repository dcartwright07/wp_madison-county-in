
<template>

    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12"
        md="6"
      >
        <v-card color="secondary">
          <v-container class="pa-2">
            <v-row>
              <v-col
                v-for="project in offices"
                :key="project"
                cols="12"
                md="6"
              >
                <a href="#">
                  {{project.title.rendered}}
                </a>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
        color="#EB7806"
      >
        
      </v-col>
    </v-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			mainCategory: 5,
			tiles: [],
		}
	},

	computed: mapState(['offices']), 

	created() {
		this.offices.forEach(element => {
		// console.log(element.tags);
			element.categories.forEach(category => {
				if(category == this.mainCategory) {
					this.tiles.push(element);
				}
			});
		});
	},
}
</script>

<style lang="scss" scoped>

.event-card-deck {
	margin-top: 2px;
}

.event-card-deck li {
    // width: 240px;
	// height: 200px;
	list-style: none;
	margin: 15px 0;
}

.event-card {
	overflow: hidden;
	width: 630px;

	border-radius: 0.3em;
}

.event-card img {
	width: 240px;
	height: 200px;

	object-fit: cover;
}

.event-card .title {
	font-size: 2.3em;
	font-weight: 400;
}

.event-card .title a {
	text-decoration: none;
	/*color: #212121;*/
}

.event-card .date {
	font-size: 1.4em;
	font-weight: 400;
	color: #6D6D6D;
}

.event-card .location {
	font-size: 1em;
	color: #757575;
}

.event-card .location i {
	font-size: 1.1em;
	padding-right: 0.3em;
	margin-bottom: 0.085em;
}

.event-card .description {
	margin-bottom: 0.2em;
	font-size: 1.16em;
	padding-left: 0.1em;
}

.event-card .date-highlight-square {
	position: absolute;
	top: 0;
	left: 2em;
	background: #EB7806;
	color: #fff;
	padding: 0.2em 1em;
	padding-bottom: 0;
	border-radius: 0;
}

</style>