<template>
<div>
    <q-table :data="serverData" :columns="columns" row-key="id" :pagination.sync="serverPagination" :loading="loading" :filter="filter" @request="request" title="All Users">
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search user..." outlined class="q-ma-sm">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="name">
                    {{props.row.fullname}}
                </q-td>
                <q-td key="email">
                    {{props.row.email}}
                </q-td>
                <q-td key="mobile">
                    {{props.row.mobile}}
                </q-td>
                <q-td key="created_at">
                    {{props.row.mobile}}
                </q-td>
                <q-td key="action">
                    <q-btn flat color="secondary" @click="edit(props.row.optimus_id)" icon="edit">
                        <q-tooltip anchor="top left" self="top middle">
                            Edit User
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat color="primary" icon="delete" @click="deleteUser(props.row.optimus_id)">
                        <q-tooltip anchor="top left" self="top middle">
                            Delete User
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
        field: 'fullname',
        align: 'left'
      },
      {
        name: 'email',
        label: 'Email',
        align: 'left',
        field: 'email'
      },
      {
        name: 'mobile',
        label: 'Mobile',
        align: 'left',
        field: 'mobile'
      },
      {
        name: 'created_at',
        label: 'Created At',
        align: 'left',
        field: 'created_at'
      },
      {
        name: 'action',
        label: 'Action',
        align: 'left',
        field: 'action'
      }
      ],
      filter: ''
    }
  },
  computed: {
    ...mapState('users', ['users', 'editUser']),
    data () {
      return this.users.data
    }
  },
  methods: {
    ...mapActions('users', ['setUsers', 'setEditUser']),
    deleteUser (optimusId) {
      this.$axios
        .get(`/users/${optimusId}/edit?id=${optimusId}`)
        .then(res => {
          this.setEditUser(res.data.user)
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Delete ${this.editUser.firstname} ${this.editUser.lastname}?`,
            actions: [{
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/users/${this.editUser.optimus_id}?id=${this.editUser.optimus_id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.editUser.firstname} ${this.editUser.lastname} deleted successfully`
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
                      message: 'Failed... Integrity Constraint' // `${err.response.data.message}`
                    })
                  })
              }
            }]
          })
        })
    },
    edit (optimusId) {
      this.$axios.get(`/users/${optimusId}/edit?id=${optimusId}`)
        .then(res => {
          this.setEditUser(res.data.user)
          this.$router.push({
            path: `/dashboard/user/${optimusId}`
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
      this.$axios.get(`/users?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = values(res.data.users.data)
          this.serverPagination.rowsNumber = res.data.users.total
          this.lastPage = res.data.users.last_page
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
