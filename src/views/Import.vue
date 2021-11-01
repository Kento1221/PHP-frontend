<template>
  <v-container class="d-flex justify-content-center align-center">
    <v-sheet class="pt-3" width="800">
      <v-card>
        <v-card-title>Import .csv file</v-card-title>
        <v-card-text>
          <v-file-input
              v-model="file"
              chips
              counter
              show-size
              truncate-length="50"
              accept="text/csv"
          ></v-file-input>
          <v-radio-group
              v-model="importType"
              dense
              class="d-flex align-center"
          >
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
                elevation="2" dark
            ><span class="font-weight-semibold">Import</span></v-btn>
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
      importType: 'records'
    }
  },
  methods: {
    import() {
      let formData = new FormData();
      formData.append(this.importType, this.file);
      axios
          .post('/import/' + this.importType + ".php", formData)
          .then(function (response) {
              console.log(response.data);
          });
      this.file = null;
      alert('Imported successfully');
    }
  }
}
</script>

<style scoped>

</style>