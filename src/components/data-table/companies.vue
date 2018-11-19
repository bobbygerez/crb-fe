<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Companies"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
      <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
      <div class="q-mr-sm" style="font-size: small">
        Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
      </div>
      <q-btn round dense size="sm" icon="redo" color="secondary" :disable="paginationLast(props.pagination.page)" @click="props.nextPage" />
    </div>

    </q-table>
  </div>
</template>

<script>
import tableData from 'assets/table-data'
import _ from 'lodash'
export default {
  data () {
    return {
      options: [0],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
        },
        { name: 'desc', label: 'Description', field: 'desc',  align: 'left'},
        { name: 'fat', label: 'Fat (g)', field: 'fat' },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
       
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
    paginationLast(currentPage){
      if(this.lastPage > currentPage ){
        return false
      }
      return true
    },
    request (props) {
      this.loading = true
      let data = this
      this.$axios
            .get(process.env.API + `/companies?page=${props.pagination.page}&perPage=10`)
            .then(function(res){
              //I cannot disable the props.isLastPage
              data.serverPagination = props.pagination
              console.log(data.serverPagination)
              data.serverData = _.values(res.data.companies.data)
               data.serverPagination.rowsNumber = res.data.companies.total
               data.lastPage = res.data.companies.last_page
               data.loading = false
              
            })
            
            .catch(error => {
                // there's an error... do SOMETHING
                console.log(error)
                // we tell QTable to exit the "loading" state
                this.loading = false
            })

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