<template>
  <v-container class="d-flex justify-content-center pt-12">
    <v-sheet width="600px" class="pa-3 mt-3">
      <v-card class="pt-3 bg-light">
        <v-card-title class="d-block shadow-sm mx-3 bg-white">
          <v-avatar
              size="128"
              color="primary"
              class="my-3">
            <span class="white--text text-h5">Customer</span>
          </v-avatar>
          <p>Summary For The Customer</p>
          <p class="text-h6">ID: {{ customer_id }}</p>
        </v-card-title>
        <v-card-text class="d-flex flex-column justify-content-center text-left mt-3">
          <div v-if="loadedData" class="pa-3">

            <div class="mb-1">
              <span class="font-weight-bold text-h6">All calls</span>
            </div>
            <div class="mb-1"><span class="mb-3">Number of calls: </span>
              <v-chip color="primary lighten-1">{{ customer_data['all_calls'] }}</v-chip>
            </div>
            <div class="mb-1"><span class="mb-3">Sum of durations: </span>
              <v-chip color="primary lighten-1">{{ customer_data['sum_duration'] }}</v-chip>
            </div>
            <hr>
            <div class="mb-1">
              <span class="font-weight-bold text-h6">Continental calls </span></div>
            <div class="mb-1">
              <span class="mb-3">Number of calls: </span>
              <v-chip color="primary lighten-1">{{ customer_data['all_continental_calls'] }}</v-chip>
            </div>
            <div class="mb-1">
              <span class="mb-3">Sum of durations: </span>
              <v-chip color="primary lighten-1">{{ customer_data['sum_continental_duration'] }}</v-chip>
            </div>
          </div>
          <div class="d-flex justify-content-center" v-else>
            <v-progress-circular
                indeterminate
                :size="50"
                :width="5"
                color="primary"
            ></v-progress-circular>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Customer",
  data() {
    return {
      customer_id: null,
      customer_data: [],
      loadedData: false
    }
  },
  methods: {
    getCustomerData() {
      axios
          .get('/customer/index.php?id=' + this.customer_id)
          .then((response) => {
            if (response.data != null) {
              this.customer_data = response.data;
              this.loadedData = true;
            }
          }).catch((error) => {
        alert(error.response.data);
      });
    }
  },
  mounted() {
    this.customer_id = this.$route.params.customer_id;
    this.getCustomerData();
  }
}
</script>

<style scoped>

</style>