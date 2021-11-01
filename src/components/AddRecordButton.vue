<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="green lighten-1"
          dark rounded
          class="mb-2"
          v-bind="attrs"
          v-on="on"
      >
        <span class="d-flex align-center font-weight-bolder"><v-icon class="mr-1">mdi-plus</v-icon>Add new record</span>
      </v-btn>
    </template>
    <AddRecordDialog/>
  </v-dialog>
</template>

<script>
import AddRecordDialog from "@/components/AddRecordDialog";

export default {
  name: "AddRecordButton",
  components: {
    AddRecordDialog
  },
  data() {
    return {
      dialog: false,
    }
  },
  mounted() {
    window.eventBus.$on('dialog_close', () => {
      this.dialog = false;
    });
  }
}
</script>

<style scoped>

</style>