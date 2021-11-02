<template>
  <v-container class="d-flex justify-content-center align-center">
    <v-sheet class="pt-3" width="800">
      <v-card>
        <v-card-title>Import .csv file</v-card-title>
        <v-card-text>
          <v-form v-model="isFormValid">
            <v-file-input
                v-model="file"
                :rules="rules"
                chips
                counter
                show-size
                truncate-length="50"
                accept=".csv"
                required
            ></v-file-input>
          </v-form>
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

            <v-dialog
                v-model="dialog"
                width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="importFile"
                    elevation="2"
                    v-on="on"
                    v-bind="attrs"
                    :disabled="!isFormValid"
                ><span class="font-weight-semibold">Import</span></v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Result
                </v-card-title>

                <v-card-text>
                  <h4 class="mt-12">{{ dialogText }}</h4>
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
            </v-dialog>
          </v-row>
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
      importType: 'records',
      isFormValid: false,
      rules: [
        value => !!value || 'Required.',
        value => !value || value.size < 2000000 || 'File size should be less than 2 MB!',
        value => !value || value.name.substr(value.name.length - 3) === 'csv' || 'File must be of .csv extension!',
      ],
    }
  },
  methods: {
    importFile() {
      let formData = new FormData();
      formData.append(this.importType, this.file);
      this.file = null;
      axios
          .post('/import/' + this.importType, formData)
          .then(response => {
            this.dialogText =
                response.status === 200
                && response.data === ''
                    ? "Import completed."
                    : "Import failed";
          });
    }
  },
  watch: {
    dialog: function (val) {
      if (!val)
        this.dialogText = null;
    }
  }
}
</script>

<style scoped>

</style>