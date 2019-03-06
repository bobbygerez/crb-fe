<template>
<div class="q-pa-md q-gutter-sm">
    <q-table :data="serverData" :columns="columns" row-key="id" :pagination.sync="serverPagination" :loading="loading" :filter="filter" @request="request" title="All Categories">
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search category..." outlined class="q-ma-sm">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="name">
                    {{props.row.name}}
                </q-td>
                <q-td key="children">
                    <q-chip dense outline color="red" text-color="white" v-for="(child, i) in recursive(serverData[props.row.__index])" :key="i">{{ child.label }}</q-chip>
                </q-td>
                <q-td key="action">
                    <q-btn flat color="secondary" icon="edit"  @click="edit(props.row.optimus_id)">
                        <q-tooltip anchor="top left" self="top middle">
                            Edit Category
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat color="negative" icon="delete">
                        <q-tooltip anchor="top left" self="top middle">
                            Delete Category
                        </q-tooltip>
                    </q-btn>
                </q-td>
            </q-tr>
        </template>

    </q-table>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      serverData: [],
      selected: [],
      columns: [{
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      }, {
        name: 'subcategories',
        label: 'Subcategories',
        field: 'children',
        align: 'left'
      }, {
        name: 'children',
        label: 'Action',
        field: 'children',
        align: 'left'
      }],
      loading: false,
      options: [5, 10, 15, 20],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      filter: ''
    }
  },
  methods: {
    recursive (array) {
      var res = []
      const cb = (e) => {
        res.push({
          id: e.id,
          label: e.name
        })
        e.all_children && e.all_children.forEach(cb)
      }
      array.all_children.forEach(cb)
      return res
    },
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    request (props) {
      this.loading = true
      this.$axios.get(`/dashboard_categories?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.categories.data)
          this.serverPagination.rowsNumber = res.data.categories.total
          this.lastPage = res.data.categories.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (optimusId) {
      this.$router.push(`/dashboard/category/${optimusId}`)
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
