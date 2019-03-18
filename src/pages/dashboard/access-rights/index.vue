<template>
<div>
    <generic-table :data="serverData" :columns="columns" :pagination="serverPagination" @serverside-request="request" @search-change="filter = $event" :search-field="filter" @selected="selected" ref="accessRightTable" :title="'All Access Rights'" :loading="loading" :search-placeholder="'Search Access Rights...'" />
    <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
            <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <q-btn-group>
                    <q-btn icon="add" color="primary"  @click="add">
                        <q-tooltip :delay="1000" :offset="[0, 10]">New Access Right</q-tooltip>
                    </q-btn>
                    <q-btn icon="edit" color="primary">
                        <q-tooltip :delay="1000" :offset="[0, 10]">Edit User</q-tooltip>
                    </q-btn>
                    <q-btn icon="delete" color="primary">
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
  values
} from 'lodash'
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      debouncedFunction: '',
      selectedValue: [],
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
      }
      ],
      filter: ''
    }
  },
  components: {
    genericTable
  },
  computed: {
    ...mapState('roles', ['role'])
  },
  methods: {
    selected (val) {
      this.selectedValue = val
    },
    add () {
      console.log('asdf')
      this.$router.push({
        path: `/dashboard/transactions/access-right/create`
      })
    },
    request (props) {
      this.debouncedFunction(props)
    }
  },
  mounted () {
    this.debouncedFunction = debounce((props) => {
      this.loading = true
      this.$axios.get(`/access_rights?page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}&filter=${this.filter}`)
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
