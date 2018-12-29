<template>
  <div>
    <serverside-dynamic-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete', 'read']"
      :search-field="filter"
      :pagination="serverPagination"
      :inner-loading="loading"
      theme="secondary"
      @edit="edit"
      @delete="deleteRow"
      @serverside-request="request"
      @search-change="filter = $event"
    />
  </div>
</template>

<script>
import ServersideDynamicTable from 'components/data-table/serverside-dynamic-table'
import TableMixin from 'components/mixins/serverside-table-mixin.js'

export default {
  // check the mixin for other setup abstracted in this component
  mixins: [TableMixin],
  components: {
    ServersideDynamicTable
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Created At',
          field: 'created_at',
          align: 'left',
          sortable: true,
          hideonload: true
        }
      ],
      options: [5, 10, 15, 20]
    }
  },
  created () {
    // merge array of table columns if you want to show the address fields also which is defined in the table-mixin
    const cols = this.columns.slice(0, 1).concat(this.addressColumns.concat(this.columns.slice(1)))
    this.columns = cols
    // set the module name for api calls in the actions
    this.moduleName = 'holdings'
  }
}
</script>
