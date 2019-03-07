<template>
<div>
    <q-table :data="serverData" :columns="columns" row-key="id" :pagination.sync="serverPagination" :loading="loading" :filter="filter" @request="request" title="All Access Rights">
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search Access Right..." outlined class="q-ma-sm">
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
                <q-td key="description">
                    {{props.row.description}}
                </q-td>
                <q-td key="action">
                    <q-btn outline size="sm" class="q-ml-sm" color="secondary" @click="edit(props.row.optimus_id)" icon="edit">
                        <q-tooltip anchor="top left" self="top middle">
                            Edit Role
                        </q-tooltip>
                    </q-btn>
                    <q-btn outline size="sm" class="q-ml-sm" color="primary" icon="delete" @click="deleteRole(props.row.optimus_id)">
                        <q-tooltip anchor="top left" self="top middle">
                            Delete Role
                        </q-tooltip>
                    </q-btn>
                </q-td>
            </q-tr>
        </template>

    </q-table>
</div>
</template>

<script>
import {
  debounce
} from 'quasar'
import {
  values
} from 'lodash'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      debouncedFunction: '',
      selected: [],
      loading: false,
      options: [5, 10, 15, 20],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      serverData: [],
      columns: [{
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'description',
        label: 'Description',
        align: 'left',
        field: 'description'
      },
      {
        name: 'action',
        label: 'Action',
        align: 'left',
        field: 'Action'
      }
      ],
      filter: ''
    }
  },
  computed: {
    ...mapState('roles', ['role'])
  },
  methods: {
    ...mapActions('roles', ['setRole']),
    deleteRole (optimusId) {
      this.$axios
        .get(`/dashboard_role/${optimusId}/edit?id=${optimusId}`)
        .then(res => {
          this.setRole(res.data.role)
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Delete ${this.role.name}?`,
            actions: [{
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/dashboard_role/${this.role.optimus_id}?id=${this.role.optimus_id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.role.name}  deleted successfully`
                    })
                    this.request({
                      pagination: this.serverPagination,
                      filter: this.filter
                    })
                  })
                  .catch(err => {
                    console.log(`${err.response.data.message}`)
                    this.$q.notify({
                      color: 'negative',
                      icon: 'warning',
                      message: 'Delete Failed... Integrity Constraint' // `${err.response.data.message}`
                    })
                  })
              }
            }]
          })
        })
    },
    edit (optimusId) {
      this.$axios.get(`/dashboard_role/${optimusId}/edit?id=${optimusId}`)
        .then(res => {
          this.setRole(res.data.role)
          this.$router.push({
            path: `/dashboard/role/${optimusId}`
          })
        })
    },
    request (props) {
      this.debouncedFunction(props)
    }
  },
  mounted () {
    this.debouncedFunction = debounce((props) => {
      this.loading = true
      this.$axios.get(`/dashboard_role?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = values(res.data.roles.data)
          this.serverPagination.rowsNumber = res.data.roles.total
          this.lastPage = res.data.roles.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    }, 500)

    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>
