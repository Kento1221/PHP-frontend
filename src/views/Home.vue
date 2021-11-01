<template>
  <v-app>
    <v-container class="d-flex justify-center my-12">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <p class="text-h6 font-weight-bold mb-3">
            Welcome to the front for PHP-backend project
          </p>
          <p class="text-body-1 font-weight-regular">
            You can import .csv files for records and geonames
            <router-link
                to="/import"
            >here.
            </router-link>
          </p>
          <v-chip color="primary lighten-1" class="mb-3">
            <span class="white--text">Click the <span class="yellow--text">Customer ID chip</span> or <span
                class="yellow--text"><v-icon small>mdi-eye</v-icon></span> to open customer summary</span>
          </v-chip>
        </v-card-title>
        <v-card-text id="table">
          <DataTable :search="search"/>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import DataTable from "@/components/DataTable";

export default {
  name: 'Home',
  components: {DataTable},
  data() {
    return {
      search: null
    }
  }
}
</script>
