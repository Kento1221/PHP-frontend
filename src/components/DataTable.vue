<template>
  <v-data-table
      dense
      :headers="headers"
      :items="data"
      item-key="name"
      class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: ['records'],
  data() {
    return {
      headers: Object.keys(this.props.records[0]),
      data: [],
    }
  },
  created(){
    this.data = this.props.records;
  },
}
</script>

<style scoped>

</style>