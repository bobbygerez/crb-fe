<template>
<div>
    <div>
        <generic-table :data="serverData" :columns="columns" :pagination="serverPagination" @serverside-request="request" @search-change="filter = $event" :search-field="filter" @selected="selected" ref="roleTable" :title="'All Roles'" :loading="loading">
        </generic-table>
        <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
            <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <q-btn-group>
                    <q-btn icon="add" color="primary" @click="add">
                        <q-tooltip :delay="1000" :offset="[0, 10]">Add User</q-tooltip>
                    </q-btn>
                    <q-btn icon="edit" color="primary" @click="edit">
                        <q-tooltip :delay="1000" :offset="[0, 10]">Edit User</q-tooltip>
                    </q-btn>
                    <q-btn icon="delete" color="primary" @click="del">
                        <q-tooltip :delay="1000" :offset="[0, 10]">Delete User</q-tooltip>
                    </q-btn>
                </q-btn-group>
            </transition>
        </q-page-sticky>
    </div>
</div>
</template>

<script>
function truncate (text, max) {
  return text.substr(0, max - 1) + (text.length > max ? '...' : '')
}
import genericTable from 'components/data-table/generic'
import {
  debounce
} from 'quasar'
import {
  values,
  head
} from 'lodash'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  components: {
    genericTable
  },
  data () {
    return {
      selectedValue: [],
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
        name: 'subordinate',
        label: 'Subordinates',
        align: 'left',
        style: 'word-wrap: break-word;',
        field: (row) => this.allchildren(row)

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
    allchildren (row) {
      var res = []
      const cb = (e) => {
        res.push(e.name)
        e.all_children && e.all_children.forEach(cb)
      }
      row.all_children.forEach(cb)
      return truncate(res.toString(), 30)
    },
    selected (val) {
      this.selectedValue = val
    },
    del () {
      if (this.selectedValue.length > 0) {
        let optimusId = head(this.selectedValue).optimus_id
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
                      this.$refs.roleTable.selected = []
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
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a role to delete.'
        })
      }
    },
    add () {
      this.setRole({
        name: '',
        description: '',
        parent_id: {
          label: '',
          value: 0
        }
      })
      this.$router.push({
        path: `/dashboard/role`
      })
    },
    edit () {
      if (this.selectedValue.length > 0) {
        let optimusId = head(this.selectedValue).optimus_id
        this.$axios.get(`/dashboard_role/${optimusId}/edit?id=${optimusId}`)
          .then(res => {
            this.setRole(res.data.role)
            this.$router.push({
              path: `/dashboard/role/${optimusId}`
            })
          })
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a role to edit.'
        })
      }
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
