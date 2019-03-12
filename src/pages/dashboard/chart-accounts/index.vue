<template>
<div>
    <div>
        <q-tree accordion :nodes="chartAccounts" :selected.sync="selectedChartAccount" node-key="id" label-key="label">
            <div slot="default-body" slot-scope="prop">
                <div class="text-weight-thin">Account display: {{ prop.node.account_display }}</div>
                <div class="text-weight-thin">T-Account: {{ prop.node.taccount }}</div>
            </div>

        </q-tree>
        <q-pagination v-model="current" :max="5">
        </q-pagination>
        <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
            <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <q-btn-group>
                    <q-btn icon="add" color="primary">
                        <q-tooltip :delay="1000" :offset="[0, 10]">Add User</q-tooltip>
                    </q-btn>
                    <q-btn icon="edit" color="primary" >
                        <q-tooltip :delay="1000" :offset="[0, 10]">Edit User</q-tooltip>
                    </q-btn>
                    <q-btn icon="delete" color="primary" >
                        <q-tooltip :delay="1000" :offset="[0, 10]">Delete User</q-tooltip>
                    </q-btn>
                </q-btn-group>
            </transition>
        </q-page-sticky>
    </div>
</div>
</template>

<script>
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
      current: 3,
      selectedChartAccount: 0,
      // Chart Account End here!
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
        name: 'account_display',
        label: 'Account Display',
        align: 'left',
        field: 'account_display'
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
    ...mapState('roles', ['role']),
    chartAccounts () {
      let chartAccounts = values(this.$store.getters['chartAccounts/chartAccounts'].data)
      const map = e => ({
          id: e.id,
          label: e.name,
          remarks: e.remarks,
          taccount: e.t_account.name,
          account_display: e.account_display,
          children: e.all_children.map(map) // recursive call
        }),
        tree = chartAccounts.map(map)

      console.log(tree)
      return tree
    }
  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccounts']),
    ...mapActions('roles', ['setRole']),
    add () {
      this.$router.push({
        path: `/dashboard/role`
      })
    }
  },
  mounted () {
    this.$axios.get(`/chart_accounts?page=1&perPage=10&filter=${this.filter}`)
      .then(res => {
        this.setChartAccounts(res.data.chartAccounts)
      })
  }
}
</script>
