/**
 * @usage
 * Include this mixin for the common setup for the
 * dynamic serverside table setup
 */
export default {
  data () {
    return {
      /**
       * @field moduleName
       * !important you set this up at your created hook
       * for the api module
       * ie. holdings / companies / branches etc..
       * so that the request serverside function will
       * call the appropriate api on your backend
       */
      moduleName: '',
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
      loading: false
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
          this.serverData = res.data[`${this.moduleName}`].data
          this.serverPagination.rowsNumber = res.data[`${this.moduleName}`].total
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
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${row.name}?`,
            actions: [{
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
            }]
          })
        })
        .catch()
    },
    edit (id) {
      this.$axios
        .get(`/${this.moduleName}/${id}/edit?id=${id}`)
        .then(res => {
          this.$emit('edit-data', res.data)
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
