<template>
<div>
    <div>
        <generic-table :data="serverData" :columns="columns" :pagination="serverPagination" @serverside-request="request" @search-change="filter = $event" :search-field="filter" @selected="selected" ref="roleTable" :title="'All Branches'" :loading="loading" :search-placeholder="'Search Branch...'">
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
import genericTable from 'components/data-table/generic'
import {
  debounce
} from 'quasar'
import {
  head,
  values
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
        name: 'initial',
        label: 'Initial',
        field: 'initial',
        align: 'left'
      },
      {
        name: 'bir',
        label: 'BIR',
        field: 'bir',
        align: 'left'
      },
      {
        name: 'tel',
        label: 'Tel. #',
        field: 'tel',
        align: 'left'
      },
      {
        name: 'created_at',
        label: 'Created At',
        field: 'created_at',
        align: 'left'
      }
      ],
      filter: ''
    }
  },
  computed: {
    ...mapState('roles', ['role'])
  },
  methods: {
    ...mapActions('branches', ['setBranch']),
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
              icon: 'delete',
              message: `Delete ${this.role.name}?`,
              actions: [{
                label: 'OK',
                textColor: 'white',
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
      this.setBranch({
        name: '',
        code: '',
        initial: '',
        bir: '',
        created_at: ''
      })
      this.$router.push({
        path: `/dashboard/settings/branches/create`
      })
    },
    edit () {
      if (this.selectedValue.length > 0) {
        let optimusId = head(this.selectedValue).optimus_id
        this.$axios.get(`/dashboard_role/${optimusId}/edit?id=${optimusId}`)
          .then(res => {
            this.setRole(res.data.role)
            this.$router.push({
              path: `/dashboard/settings/roles/${optimusId}`
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
      this.$axios.get(`/branches?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = values(res.data.branches.data)
          this.serverPagination.rowsNumber = res.data.branches.total
          this.lastPage = res.data.branches.last_page
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
