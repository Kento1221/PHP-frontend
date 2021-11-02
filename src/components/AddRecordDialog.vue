<template>
  <v-card>
    <v-card-title class="d-flex justify-center pt-6">
      <span class="text-h5">Add new record</span>
    </v-card-title>
    <v-card-text class="px-12">
      <v-form
          v-model="isFormValid">
        <p>Input data and click save to store the record in database.</p>
        <v-text-field
            label="Customer ID"
            v-model="newRecord['customer_id']"
            :rules="rules.customerId"
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
                :rules="rules.callDate"
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
                :rules="rules.callTime"
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
            :rules="rules.callDuration"
            filled
            rounded
            dense
        >
        </v-text-field>
        <v-text-field
            label="Number called"
            v-model="newRecord['number_called']"
            :rules="rules.numberCalled"
            filled
            rounded
            dense
        >
        </v-text-field>
        <v-text-field
            label="Customer's IP address"
            v-model="newRecord['customer_ip']"
            :rules="rules.customerIp"
            filled
            rounded
            dense
        >
        </v-text-field>
      </v-form>
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
          :disabled="!isFormValid"
          @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "AddRecordDialog",
  data() {
    return {
      newRecord: {},
      isFormValid: false,
      menu1: false,
      menu2: false,
      rules: {
        customerId: [
          value => !!value || "Required.",
          value => Number.isInteger(parseInt(value)) || "The value needs to be a number.",
          value => value > 0 || "Customer IDs start from 1.",
        ],
        callDate: [
          value => !!value || "Required.",
        ],
        callTime: [
          value => !!value || "Required.",
        ],
        callDuration: [
          value => !!value || "Required.",
          value => Number.isInteger(parseInt(value)) || "The value needs to be a number.",
          value => value > 0 || "Value needs to equal at least 1.",
        ],
        numberCalled: [
          value => !!value || "Required.",
          value => Number.isInteger(parseInt(value)) || "The value needs to be numerical.",
          value => /(\D*\d){9}$/.test(value) || "Number must contain at least 9 digits."
        ],
        customerIp: [
          value => !!value || "Required.",
          value => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) || "The value needs to be a valid IP Address.",
        ],
      }
    }
  },
  methods: {
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

      axios
          .post('/records/store', formData)
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
      this.newRecord = {};
      this.close();
      this.$emit('refresh-records');
    },
    close() {
      this.$emit('close-dialog');
    }
  }
}
</script>

<style scoped>

</style>