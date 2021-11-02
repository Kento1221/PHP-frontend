<template>
  <v-card>
    <v-card-title>
      <v-text-field
          v-model="search"
          filled rounded
          append-icon="mdi-magnify"
          label="Search in all fields"
          single-line
          hide-details
      >
      </v-text-field>
    </v-card-title>
    <v-data-table
        dense
        :headers="headers"
        :items="records"
        :search="search"
        item-key="id"
        :loading="!loadedData"
        loading-text="Loading data... Please wait"
        class="elevation-2"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <span>Records</span>
          </v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <div class="d-flex align-center">

            <span class="mr-3">Truncate table:</span>
            <v-btn rounded x-small color="red" class="mr-3" @click="truncate('records')">records</v-btn>
            <v-btn rounded x-small color="red" class="mr-3" @click="truncate('geonames')">geonames</v-btn>
          </div>
          <v-spacer></v-spacer>
          <AddRecordButton v-on:refresh-records="getRecords"/>
        </v-toolbar>
      </template>
      <template v-slot:item.customer_id="{ item }">
        <router-link :to="'/customer/'+item.customer_id">
          <v-btn depressed rounded color="primary lighten-1" small class="my-1">
                    <span class="font-italic text-decoration-none">
                    {{ item.customer_id }}
                    </span>
          </v-btn>
        </router-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            color="red lighten-2"
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <router-link :to="'/customer/'+item.customer_id" class="text-decoration-none ml-3">
          <v-icon small color="primary">
            mdi-eye
          </v-icon>
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import AddRecordButton from "@/components/AddRecordButton";

export default {
  name: "DataTable",
  props: ['search'],
  components: {
    AddRecordButton
  },
  data() {
    return {
      records: [],
      geonames: [],
      table: 'records',
      loadedData: false,
      headers: [
        {
          text: 'Database ID',
          align: 'end',
          sortable: true,
          value: 'id',
        },
        {text: 'Customer ID', value: 'customer_id', align: 'center'},
        {text: 'Call date', value: 'call_date'},
        {text: 'Call duration (s)', value: 'call_duration', align: 'center'},
        {text: 'Number called', value: 'number_called', align: 'end'},
        {text: 'Customer IP address', value: 'customer_ip', align: 'end'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
    }
  },
  methods: {
    getRecords: async function () {
      await axios
          .get('http://localhost:8000/api/records')
          .then(response => {
            this.records = response.data;
            this.loadedData = true;
          });
    },
    deleteItem: async function(item) {
      await axios.delete('/records/destroy?id=' + item.id);
      await this.getRecords();
    },
    truncate: async function (table) {
      await axios.delete('http://localhost:8000/api/' + table + '/truncate');
      await this.getRecords();
    }
  },
  mounted() {
    this.getRecords();
  }
}
</script>

<style scoped>

</style>