<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="Server-side Pagination"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      @request="request"
      :loading="loading"
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>
    </q-table>
  </div>
</template>

<script>
import tableData from 'assets/table-data'
export default {
  data () {
    return {
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
			page(){
				return this.$store.getters['companies/page']
			},
			perPage(){
				return this.$store.getters['companies/perPage']
			}
		},
  methods: {
    request (props) {
      this.loading = true
      let data = this
      this.$axios.get(process.env.API + `/companies?page=${this.page}&perPage=${this.perPage}`)
				.then(function (res) {
          // data.$store.dispatch('companies', res.data.companies)
          console.log(res.data.companies.data)
          data.serverPagination =  props.pagination
          let
          table = data.$refs.table,
          // rows = tableData.slice(),
          rows = res.data.companies.data,
          { page, rowsPerPage, sortBy, descending } = props.pagination

          data.serverPagination.rowsNumber = res.data.companies.data.length
          if (rowsPerPage) {
            rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }
          data.serverData = rows
          data.loading = false
          console.log(data.serverData)
        })
        
      setTimeout(() => {
        // this.serverPagination = props.pagination
        // let
        //   table = this.$refs.table,
        //   rows = tableData.slice(),
        //   { page, rowsPerPage, sortBy, descending } = props.pagination
        
        // console.log(rows)
        // if (props.filter) {
        //   rows = table.filterMethod(rows, props.filter)
        // }
        // if (sortBy) {
        //   rows = table.sortMethod(rows, sortBy, descending)
        // }

        // this.serverPagination.rowsNumber = rows.length
        // if (rowsPerPage) {
        //   rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        // }
        // this.serverData = rows
        // this.loading = false
      }, 1500)

    }
  },
    mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>