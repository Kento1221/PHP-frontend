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
    <AddRecordDialog v-on:close-dialog="dialog=false" v-on:refresh-records="this.$emit('refresh-records')"/>
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
  }
}
</script>

<style scoped>

</style>