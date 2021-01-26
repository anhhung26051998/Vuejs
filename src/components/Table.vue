<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  props: {
    datatable: Array[Object],
    tablefiles: Array,
    text: String,
  },
  data() {
    return {
      fields: this.tablefiles,
      items: this.datatable,
    };
  },
  mounted() {
    // console.log(this.datatable);
  }
};
</script>