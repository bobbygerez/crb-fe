<template>
  <div>
    <generic-list-data-table
      :data="holdings"
      :columns="columns"
      color="primary"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      theme="secondary"
      v-show="tableViewSettingsGlobal.mode === 'list'"
    />
    <generic-grid-data-table
      :data="holdings"
      :columns="columns"
      color="primary"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      theme="secondary"
      v-show="tableViewSettingsGlobal.mode === 'grid'"
    />
  </div>
</template>

<script>
import { mapHoldingFields } from '../../../../../store/pattys'
import GenericListDataTable from 'components/data-table/generic-list-data-table'
import GenericGridDataTable from 'components/data-table/generic-grid-data-table'
import { mapGlobalFields } from '../../../../../store/globals'

export default {
  components: {
    GenericListDataTable,
    GenericGridDataTable
  },
  data () {
    return {
      selectedCountry: '',
      terms: '',
      holdingName: '',
      minimizedModal: false,
      rowsOptions: [3, 5, 7, 10, 15, 25, 50, 0],
      loading: false,
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
      filter: '',
      visibleColumns: ['name', 'address', 'created_at'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [],
      pagination: {
        page: 2
      },
      paginationControl: { rowsPerPage: 7, page: 1 }
    }
  },
  computed: {
    ...mapHoldingFields(['newHoldingModal', 'holding', 'holdings', 'editHoldingView', 'editHolding']),
    ...mapGlobalFields(['tableViewSettingsGlobal'])
  },
  methods: {
    // customFilter (rows, terms, cols, cellValue) {
    //   // push columns you want to include in filtering
    //   cols.push(
    //     { field: row => row.address.country.description },
    //     { field: row => row.address.region.description },
    //     { field: row => row.address.city.description },
    //     { field: row => row.address.province.description }
    //   )
    //   const lowerTerms = terms ? terms.toLowerCase() : ''
    //   return rows.filter(row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1))
    // },
    hideModal () {
      this.$store.dispatch('pattys/setNewHoldingModal', false)
    },
    index () {
      this.$axios
        .get(`/holdings`)
        .then(res => {
          this.$store.dispatch('pattys/setHoldings', res.data.holdings)
        })
        .catch()
    },

    deleteRow (id) {
      this.$axios
        .get(`/holdings/${id}?id=${id}`)
        .then(res => {
          this.$store.dispatch('pattys/setHolding', res.data.holding)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${this.holding.name}?`,
            actions: [
              {
                label: 'OK',
                handler: () => {
                  this.$axios
                    .delete(
                      `/holdings/${this.holding.id}?id=${this.holding.id}`
                    )
                    .then(res => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.holding.name} deleted successfully`
                      })
                      this.index()
                    })
                    .catch(err => {
                      this.$q.notify({
                        color: 'negative',
                        icon: 'delete',
                        message: `${err.response}`
                      })
                    })
                }
              }
            ]
          })
        })
        .catch()
    },
    edit (id) {
      this.$axios
        .get(`/holdings/${id}/edit?id=${id}`)
        .then(res => {
          this.editHolding = res.data.holding
          this.editHoldingView = true
        })
        .catch()
    }

  },
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
