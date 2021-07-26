<template>
  <v-card elevation="0" class="boxed-widget lightgrey mt-4">
    <v-card-title>Contact Information</v-card-title>

    <v-card-text>
      <v-list dense>
        <v-list-item v-if="c_name">
          <v-list-item-icon>
            <v-icon dense class="fa-fw">
              fa-user-circle
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="c_name" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="phone">
          <v-list-item-icon>
            <v-icon dense class="fa-fw">
              fa-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="phone" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="email">
          <v-list-item-icon>
            <v-icon dense class="fa-fw">
              fa-envelope
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="email" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    c_name: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-list {
  background: transparent;
}
</style>
