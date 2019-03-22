<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-6">
            <q-input outlined v-model="searchChartAccount" label="Search Chart of Account..." class="q-ma-sm" debounce="500">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div class="col-12">
            <q-tree color="primary" :nodes="chartAccountTree" :selected.sync="selectedChartAccount" node-key="id" label-key="label">
                <div slot="default-body" slot-scope="prop" v-if="prop.node.taccount !== ''">
                    <div class="text-weight-thin q-ml-lg">Account display: {{ prop.node.account_display }}</div>
                    <div class="text-weight-thin q-ml-lg">Normal Balance: {{ prop.node.taccount }}</div>
                </div>

            </q-tree>
        </div>
        <div class="col-12">
            <!-- <q-pagination v-model="current" :max="chartAccounts.last_page" color="primary" class="q-mt-md" v-if="chartAccounts.last_page > 1">
            </q-pagination> -->
            <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
                <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                    <q-btn-group>
                        <q-btn icon="add" color="primary" @click="add">
                            <q-tooltip :delay="1000" :offset="[0, 10]">New Chart of Account</q-tooltip>
                        </q-btn>
                        <q-btn icon="edit" color="primary" @click="edit">
                            <q-tooltip :delay="1000" :offset="[0, 10]">Edit Chart of Account</q-tooltip>
                        </q-btn>
                        <q-btn icon="delete" color="primary" @click="del">
                            <q-tooltip :delay="1000" :offset="[0, 10]">Delete Chart of Account</q-tooltip>
                        </q-btn>
                    </q-btn-group>
                </transition>
            </q-page-sticky>
        </div>
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
      current: 1,
      perPage: 10,
      loading: false,
      filter: ''
    }
  },
  computed: {
    ...mapState('chartAccounts', ['chartAccounts', 'chartAccount']),
    selectedChartAccount: {
      get () {
        return this.$store.getters['chartAccounts/selectedChartAccount']
      },
      set (val) {
        this.setSelectedChartAccount(val)
      }
    },
    chartAccountTree () {
      let chartAccounts = values(this.chartAccounts.data)
      const map = e => ({
          id: e.account_code,
          label: e.name,
          taccount: e.t_account ? e.t_account.name : '',
          account_display: e.account_display,
          children: e.all_children.map(map) // recursive call
        }),
        tree = chartAccounts.map(map)

      return tree
    },
    searchChartAccount: {
      get () {
        return this.$store.getters['chartAccounts/searchChartAccount']
      },
      set (val) {
        this.setSearchChartAccount(val)
      }
    }
  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccounts', 'setSelectedChartAccount', 'setSearchChartAccount', 'setChartAccount', 'setParentAccount']),
    add () {
      if (this.selectedChartAccount === 0 || this.selectedChartAccount === null) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a parent Chart of Account.'
        })
      } else {
        this.setChartAccount({
          name: '',
          account_code: '',
          account_display: '',
          taccount_id: ''
        })
        this.setParentAccount({
          name: ''
        })
        this.$router.push({
          path: `/dashboard/settings/chart-of-accounts/create`
        })
      }
    },
    edit () {
      if (this.selectedChartAccount === 0 || this.selectedChartAccount === null) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a parent Chart of Account.'
        })
      } else {
        this.$router.push({
          path: `/dashboard/settings/chart-of-accounts/${this.selectedChartAccount}`
        })
      }
    },
    del () {
      if (this.selectedChartAccount === 0 || this.selectedChartAccount === null) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a Chart of Account to delete'
        })
      } else {
        this.$axios
          .get(`/chart_accounts/${this.selectedChartAccount}?account_code=${this.selectedChartAccount}`)
          .then(res => {
            this.setChartAccount(res.data.chartAccount)
            this.$q.notify({
              color: 'negative',
              icon: 'delete',
              message: `Delete ${this.chartAccount.name}?`,
              actions: [{
                label: 'OK',
                textColor: 'white',
                handler: () => {
                  this.$axios
                    .delete(`/chart_accounts/${this.chartAccount.account_code}?account_code=${this.chartAccount.account_code}`)
                    .then(res => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.chartAccount.name}  deleted successfully`
                      })
                      this.getChartAccounts()
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
      }
    },
    getChartAccounts () {
      this.$axios.get(`/chart_accounts?page=${this.current}&perPage=${this.perPage}&filter=${this.searchChartAccount}`)
        .then(res => {
          this.setChartAccounts(res.data.chartAccounts)
        })
    }
  },
  mounted () {
    this.getChartAccounts()
  },
  watch: {
    current (val) {
      this.getChartAccounts()
    },
    searchChartAccount () {
      this.getChartAccounts()
    }
  }
}
</script>
