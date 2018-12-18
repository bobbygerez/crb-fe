<template>
  <div>
    <serverside-list-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      :pagination="serverPagination"
      :innerLoading="loading"
      theme="secondary"
      @serverside-request="request"
      @search-change="filter = $event"
      :searchField="filter"
      v-show="tableViewSettingsGlobal.mode === 'list'"
    />
    <serverside-grid-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      :pagination="serverPagination"
      :innerLoading="loading"
      theme="secondary"
      @serverside-request="request"
      @search-change="filter = $event"
      :searchField="filter"
      v-show="tableViewSettingsGlobal.mode === 'grid'"
    />
  </div>
</template>

<script>
import { mapHoldingFields } from '../../../../../store/pattys'
import GenericListDataTable from 'components/data-table/generic-list-data-table'
import GenericGridDataTable from 'components/data-table/generic-grid-data-table'
import { mapGlobalFields } from '../../../../../store/globals'
import ServersideListTable from 'components/data-table/serverside-list-table'
import ServersideGridTable from 'components/data-table/serverside-grid-table'
import TableMixin from 'components/mixins/table-mixin.js'

export default {
  mixins: [TableMixin],
  components: {
    GenericListDataTable,
    GenericGridDataTable,
    ServersideListTable,
    ServersideGridTable
  },
  data () {
    return {
      moduleName: 'holdings',
      markers: [
        {
          position: { lat: 12.879721, lng: 121.774017 }
        }
      ],
      markersPosition: { lat: 12.879721, lng: 121.774017 },
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
          name: 'address',
          label: 'Address',
          field: row => row.address.street_lot_blk,
          align: 'left',
          sortable: true
        },
        {
          name: 'brgy',
          label: 'Barangay',
          field: row => row.address.brgy.description,
          align: 'left',
          sortable: true,
          hideonload: true
        },
        {
          name: 'city',
          label: 'City',
          field: row => row.address.city.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'province',
          label: 'Province',
          field: row => row.address.province.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'region',
          label: 'Region',
          field: row => row.address.region.description,
          align: 'left',
          sortable: true,
          hideonload: true
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
  methods: {
    index () {
      this.$axios
        .get(`/holdings`)
        .then(res => {
          this.$store.dispatch('pattys/setHoldings', res.data.holdings)
        })
        .catch()
    }

    // deleteRow (id, row) {
    //   console.log('rowdata', row)
    //   this.$axios
    //     .get(`/holdings/${id}?id=${id}`)
    //     .then(res => {
    //       this.$store.dispatch('pattys/setHolding', res.data.holding)
    //       this.$q.notify({
    //         color: 'negative',
    //         icon: 'delete',
    //         message: `Delete ${this.holding.name}?`,
    //         actions: [
    //           {
    //             label: 'OK',
    //             handler: () => {
    //               this.$axios
    //                 .delete(
    //                   `/holdings/${this.holding.id}?id=${this.holding.id}`
    //                 )
    //                 .then(res => {
    //                   this.$q.notify({
    //                     color: 'positive',
    //                     icon: 'check',
    //                     message: `${this.holding.name} deleted successfully`
    //                   })
    //                   this.index()
    //                 })
    //                 .catch(err => {
    //                   this.$q.notify({
    //                     color: 'negative',
    //                     icon: 'delete',
    //                     message: `${err.response}`
    //                   })
    //                 })
    //             }
    //           }
    //         ]
    //       })
    //     })
    //     .catch()
    // },
    // edit (id) {
    //   this.$axios
    //     .get(`/holdings/${id}/edit?id=${id}`)
    //     .then(res => {
    //       this.editHolding = res.data.holding
    //       this.editHoldingView = true
    //       this.$emit('edit-data')
    //     })
    //     .catch()
    // }

  },
  // mounted () {
  //   this.request({
  //     pagination: this.serverPagination,
  //     filter: this.filter
  //   })
  // },
  watch: {
    'paginationControl.page' (page) {
      this.$q.notify({
        color: 'secondary',
        message: `Navigated to page ${page}`,
        actions:
          page < 4
            ? [
              {
                label: 'Go to last page',
                handler: () => {
                  this.paginationControl.page = 4
                }
              }
            ]
            : null
      })
    }
  }
}
</script>
