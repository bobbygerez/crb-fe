<template>
  <div>
    <serverside-dynamic-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete', 'read']"
      :searchField="filter"
      :pagination="serverPagination"
      :innerLoading="loading"
      theme="secondary"
      @edit="edit"
      @delete="deleteRow"
      @serverside-request="request"
      @search-change="filter = $event"
    />
  </div>
</template>

<script>
import { mapHoldingFields } from '../../../../../store/pattys'
import { mapGlobalFields } from '../../../../../store/globals'
import ServersideListTable from 'components/data-table/serverside-list-table'
import ServersideGridTable from 'components/data-table/serverside-grid-table'
import ServersideDynamicTable from 'components/data-table/serverside-dynamic-table'
import TableMixin from 'components/mixins/table-mixin.js'

export default {
  mixins: [TableMixin],
  components: {
    ServersideListTable,
    ServersideGridTable,
    ServersideDynamicTable
  },
  data () {
    return {
      moduleName: 'holdings',
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
  computed: {
    ...mapHoldingFields(['newHoldingModal', 'holding', 'holdings', 'editHoldingView', 'editHolding']),
    ...mapGlobalFields(['tableViewSettingsGlobal'])
  },
  created () {
    // merge array of table columns
    let cols = this.columns.slice(0, 1).concat(this.addressColumns.concat(this.columns.slice(1)))
    this.columns = cols
    console.log('columns', this.columns)
  }
}
</script>
