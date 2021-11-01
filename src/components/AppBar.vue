<template>
  <v-app-bar
      v-if="!isMobile()" class="d-flex justify-content-center">
    <router-link to="/" class="mr-2 text-decoration-none">
      <v-btn text x-large>Home</v-btn>
    </router-link>
    <router-link to="/import" class="mr-2 text-decoration-none">
      <v-btn text x-large>Import file</v-btn>
    </router-link>
  </v-app-bar>
  <v-app-bar
      v-else
      color="primary"
      dark>
    <v-menu
        bottom
        left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="d-flex justify-content-start text-start">
          <v-list-item-title>
            <router-link to="/">Home</router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="d-flex justify-content-start text-start">
          <v-list-item-title>
            <router-link to="/import">Import file</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-toolbar-title class="ml-3">
      <router-link to="/" class="text-white text-decoration-none">PHP Frontend</router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      menuBar: false,
    }
  },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  }
}
</script>

<style scoped>

</style>