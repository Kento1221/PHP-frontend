<template>
  <v-container class="d-flex justify-content-center align-center">
    <v-sheet class="pt-3" width="800">
      <v-card>
        <v-card-title>Import .csv file</v-card-title>
        <v-card-text>
          <v-file-input
              v-model="file"
              :rules="rules"
              :error-messages="errorMessages"
              chips
              counter
              show-size
              truncate-length="50"
              accept=".csv"
              required
          ></v-file-input>
          <p v-if="disabled && file!=null" class="red--text text-left"> File must be of csv type!</p>
          <v-radio-group
              v-model="importType"
              dense
              class="d-flex align-center"
          >
            <p>Which file are you uploading?</p>
            <v-radio
                label="cdrs.csv"
                value="records"
            ></v-radio>
            <v-radio
                label="geonames.csv"
                value="geonames"
            ></v-radio>
          </v-radio-group>
          <v-row class="p-3">
            <v-spacer></v-spacer>
            <v-btn @click="this.import"
                   elevation="2"
                   :disabled="disabled"
            ><span class="font-weight-semibold">Import</span></v-btn>
          </v-row>
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Import result
                </v-card-title>

                <v-card-text>
                  {{ dialogText }}
                </v-card-text>

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
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Import",
  data() {
    return {
      file: null,
      dialog: false,
      dialogText: "",
      errorMessages: null,
      importType: 'records',
      disabled: true,
      rules: [
        value => !value || value.size < 2000000 || 'File size should be less than 2 MB!',
      ],
    }
  },
  methods: {
    import() {
      let formData = new FormData();
      formData.append(this.importType, this.file);
      this.file = null;
      axios
          .post('/import/' + this.importType, formData)
          .then(function () {
            alert('Import file sent');
          });
    }
  },
  watch: {
    file: function (val) {
      if (!val) {
        this.disabled = true;
        return;
      }
      if (val.name.substr(val.name.length - 3) === 'csv')
        this.disabled = false;
    }
  }
}
</script>

<style scoped>

</style>