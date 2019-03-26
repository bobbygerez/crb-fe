<template>
<div>
    <generic-table :data="serverData" :columns="columns" :pagination="serverPagination" @serverside-request="request" @search-change="filter = $event" :search-field="filter" @selected="selected" ref="userTable" :title="'All Users'" :loading="loading" :search-placeholder="'Search Users...'">
    </generic-table>
    <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
        <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
            <q-btn-group>
                <q-btn icon="edit" color="primary" @click="edit">
                    <q-tooltip :delay="1000" :offset="[0, 10]">Edit User</q-tooltip>
                </q-btn>
                <q-btn icon="delete" color="primary"  @click="del">
                    <q-tooltip :delay="1000" :offset="[0, 10]">Delete User</q-tooltip>
                </q-btn>
            </q-btn-group>
        </transition>
    </q-page-sticky>
</div>
</template>

<script>
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
      }
      ],
      filter: ''
    }
  },
  computed: {
    ...mapState('users', ['users', 'editUser'])
  },

  methods: {
    ...mapActions('users', ['setUsers', 'setEditUser']),
    selected (val) {
      this.selectedValue = val
    },
    del () {
      if (this.selectedValue.length > 0) {
        let optimusId = head(this.selectedValue).optimus_id
        this.$axios
          .get(`/users/${optimusId}/edit?id=${optimusId}`)
          .then(res => {
            this.setEditUser(res.data.user)
            this.$q.notify({
              color: 'negative',
              icon: 'warning',
              message: `Delete ${this.editUser.information.firstname} ${this.editUser.information.lastname}?`,
              actions: [{
                label: 'OK',
                handler: () => {
                  this.$axios
                    .delete(`/users/${this.editUser.optimus_id}?id=${this.editUser.optimus_id}`)
                    .then(res => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.editUser.firstname} ${this.editUser.information.lastname} deleted successfully`
                      })
                      this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                      })
                      this.$refs.userTable.selected = []
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
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a user to delete.'
        })
      }
    },
    edit () {
      if (this.selectedValue.length > 0) {
        this.$axios.get(`/users/${head(this.selectedValue).optimus_id}/edit?id=${head(this.selectedValue).optimus_id}`)
          .then(res => {
            this.setEditUser(res.data.user)
            this.$router.push({
              path: `/dashboard/user/${head(this.selectedValue).optimus_id}`
            })
          })
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a user to edit.'
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
      this.$axios.get(`/users?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
        .then(res => {
          this.serverData = values(res.data.users.data)
          this.serverPagination.rowsNumber = res.data.users.total
          this.serverPagination = props.pagination
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
