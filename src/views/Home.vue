<template>
  <v-app>
    <v-container class="d-flex justify-center my-12">
      <v-sheet width="1200">
        <div id="titles">
          <p class="body-1 font-weight-bold mb-3">
            Welcome to the front for PHP-backend project
          </p>
          <p class="subheading font-weight-regular">
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

        </div>
        <div id="table">
          <v-card>
            <v-card-title>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search in all fields"
                  single-line
                  hide-details
              ></v-text-field>
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
                  <v-spacer></v-spacer>
                  <v-dialog
                      v-model="dialog"
                      max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          color="green"
                          dark rounded
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                      >
                        <span class="d-flex align-center"><v-icon class="mr-1">mdi-plus</v-icon>Add new record</span>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="d-flex justify-center pt-6">
                        <span class="text-h5">Add new record</span>
                      </v-card-title>
                      <v-card-text class="px-12">
                        <p>Input data and click save to store the record in database.</p>
                        <v-text-field
                            label="Customer ID"
                            v-model="newRecord['customer_id']"
                            filled
                            rounded
                            dense
                        >
                        </v-text-field>
                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newRecord['call_date']"
                                label="Call date"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="newRecord['call_date']"
                              @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                        <v-menu
                            ref="menu"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="newRecord['call_time']"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newRecord['call_time']"
                                label="Picker in menu"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                              v-model="newRecord['call_time']"
                              full-width
                              @click:minute="$refs.menu.save(newRecord['call_time'])"
                          ></v-time-picker>
                        </v-menu>
                        <v-text-field
                            label="Call duration (s)"
                            v-model="newRecord['call_duration']"
                            filled
                            rounded
                            dense
                        >
                        </v-text-field>
                        <v-text-field
                            label="Number called"
                            v-model="newRecord['number_called']"
                            filled
                            rounded
                            dense
                        >
                        </v-text-field>
                        <v-text-field
                            label="Customer's IP address"
                            v-model="newRecord['customer_ip']"
                            filled
                            rounded
                            dense
                        >
                        </v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.customer_id="{ item }">
                <v-chip-group>
                  <router-link :to="'/customer/'+item.customer_id">

                    <v-chip
                        color="primary lighten-1"
                        small
                        cursor="pointer"
                        dark
                    >
                      {{ item.customer_id }}
                    </v-chip>
                  </router-link>
                </v-chip-group>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
                <router-link :to="'/customer/'+item.customer_id" class="text-decoration-none ml-3">
                  <v-icon small>
                    mdi-eye
                  </v-icon>
                </router-link>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-sheet>
    </v-container>
    <v-dialog>

    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      records: [],
      loadedData: false,
      menu1: false,
      menu2: false,
      newRecord: {
        'customer_id': null,
        'call_date': null,
        'call_time': null,
        'call_duration': null,
        'number_called': null,
        'customer_ip': null
      },
      dialog: false,
      search: null,
      headers: [
        {
          text: 'Database ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {text: 'Customer ID', value: 'customer_id'},
        {text: 'Call date', value: 'call_date'},
        {text: 'Call duration (s)', value: 'call_duration'},
        {text: 'Number called', value: 'number_called'},
        {text: 'Customer IP address', value: 'customer_ip'},
        {text: 'Actions', value: 'actions'},
      ],
    }
  },
  methods: {
    getRecords: async function () {
      await axios
          .get('/record')
          .then(response => {
            this.records = response.data;
            this.loadedData = true;
          });
    },
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    deleteItem(item) {
      console.log(item.id);
      axios
          .delete('/record/destroy.php?id=' + item.id)
          .then(() => {
            window.eventBus.$emit('refresh_records');
          })
          .catch((error) => {
            if (error.response.status !== 200)
              console.log(error.response.status);
          });
    },
    save() {
      const formData = new FormData();
      let newRecord = {
        'customer_id': this.newRecord.customer_id,
        'call_date': this.newRecord.call_date + " " + this.newRecord.call_time,
        'call_duration': this.newRecord.call_duration,
        'number_called': this.newRecord.number_called,
        'customer_ip': this.newRecord.customer_ip
      };
      Object.entries(newRecord).forEach(([key, value]) => {
        formData.append(key, value);
      });

      this.close();
      axios
          .post('http://localhost:8000/api/record/store.php', formData)
          .then(() => {
            alert('Successfully created record!');
            window.eventBus.$emit('refresh_records');
          })
          .catch(function (error) {
            console.log(error);
            if (error != null)
              switch (error.response.status) {
                case 422:
                  console.log(error.response.data);
                  alert(error.response.status + ": " + error.response.data.message);
                  break;
                case 409:
                  alert(error.response.status + ": Operation failed");
                  break;
              }
          });
      this.newRecord = {
        'customer_id': null,
        'call_date': null,
        'call_duration': null,
        'number_called': null,
        'customer_ip': null
      };
    }
  },
  mounted() {
    this.getRecords()
  },

  created() {
    window.eventBus.$on('refresh_records', () => {
      this.loadedData = false;
      this.getRecords();
    })
  }
}
</script>
