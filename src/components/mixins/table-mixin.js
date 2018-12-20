import { values } from 'lodash'
export default {
  data () {
    return {
      rowOptions: [5, 10, 15, 20],
      serverData: [],
      serverPagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10,
        totalPages: null
      },
      filter: '',
      loading: false,
      addressColumns: [
        {
          name: 'address',
          label: 'Address',
          field: row => row.address.street_lot_blk,
          align: 'left'
        },
        {
          name: 'brgy',
          label: 'Barangay',
          field: row => row.address.brgy.description,
          align: 'left',
          hideonload: true
        },
        {
          name: 'city',
          label: 'City',
          field: row => row.address.city.description,
          align: 'left'
        },
        {
          name: 'province',
          label: 'Province',
          field: row => row.address.province.description,
          align: 'left'
        },
        {
          name: 'region',
          label: 'Region',
          field: row => row.address.region.description,
          align: 'left',
          hideonload: true
        }
      ]
    }
  },
  methods: {
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/${this.moduleName}?filter=${props.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }&sortBy=${props.pagination.sortBy}&descending=${props.pagination.descending}`
        )
        .then(res => {
          this.serverPagination = props.pagination
          // this.serverData = _.values(res.data.companies.data)
          this.serverData = values(res.data[`${this.moduleName}`].data)
          this.serverPagination.rowsNumber = res.data[`${this.moduleName}`].total
          // this.serverPagination.totalPages = res.data.companies.last_page
          // this.lastPage = res.data.holdings.last_page
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.$q.notify({
            type: 'negative',
            message: error.message
          })
        })
    },
    deleteRow (id, row) {
      this.$axios
        .get(`/${this.moduleName}/${id}?id=${id}`)
        .then(res => {
          // this.$store.dispatch('pattys/setHolding', res.data.holding)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${row.name}?`,
            actions: [
              {
                label: 'OK',
                handler: () => {
                  this.$axios
                    .delete(
                      `/${this.moduleName}/${row.id}?id=${row.id}`
                    )
                    .then(_ => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${row.name} deleted successfully`
                      })
                      this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                      })
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
        .get(`/${this.moduleName}/${id}/edit?id=${id}`)
        .then(res => {
          // this.editHolding = res.data.holding
          // this.editHoldingView = true
          this.$emit('edit-data', res.data)
          // this.request({
          //   pagination: this.serverPagination,
          //   filter: this.filter
          // })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.message
          })
        })
    },
    refreshData () {
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    }

  },
  mounted () {
    this.refreshData()
  }
}
