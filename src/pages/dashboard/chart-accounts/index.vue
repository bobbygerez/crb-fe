<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-6">
            <q-select outlined v-model="selectedCompany" :options="companies" bottom-slots error-message="Select a company." label="Select a company"/>
        </div>
        <div class="col-12">
            <q-tree color="primary" :nodes="chartAccountTree" :selected.sync="selectedChartAccount" node-key="id" label-key="label">
                <div slot="default-body" slot-scope="prop" v-if="prop.node.taccount !== ''">
                    <div class="text-weight-thin">Account display: {{ prop.node.account_display }}</div>
                    <div class="text-weight-thin">T-Account: {{ prop.node.taccount }}</div>
                </div>

            </q-tree>
        </div>
        <div class="col-12">
            <q-pagination v-model="current" :max="chartAccounts.last_page" color="primary" class="q-mt-md" v-if="chartAccounts.last_page > 1">
            </q-pagination>
            <q-page-sticky position="bottom" :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]" v-bind="$attrs">
                <transition appear enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                    <q-btn-group>
                        <q-btn icon="add" color="primary" @click="add">
                            <q-tooltip :delay="1000" :offset="[0, 10]">Add User</q-tooltip>
                        </q-btn>
                        <q-btn icon="edit" color="primary" @click="edit">
                            <q-tooltip :delay="1000" :offset="[0, 10]">Edit User</q-tooltip>
                        </q-btn>
                        <q-btn icon="delete" color="primary">
                            <q-tooltip :delay="1000" :offset="[0, 10]">Delete User</q-tooltip>
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
      selectedCompany: {
        value: '',
        label: ''
      },
      current: 1,
      perPage: 10,
      loading: false,
      filter: ''
    }
  },
  computed: {
    ...mapState('chartAccounts', ['chartAccounts']),
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
          id: e.optimus_id,
          label: e.name,
          remarks: e.remarks,
          taccount: e.t_account.name,
          account_display: e.account_display,
          children: e.all_children.map(map) // recursive call
        }),
        tree = chartAccounts.map(map)

      return tree
    },
    companies () {
      return this.$store.getters['companies/companies'].map(e => {
        return {
          label: e.name,
          value: e.optimus_id
        }
      })
    }
  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccounts', 'setSelectedChartAccount']),
    ...mapActions('companies', ['setCompanies', 'setSelectedCompany']),
    add () {
      if (this.selectedChartAccount === 0 || this.selectedChartAccount === null) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: 'Please select a parent Chart of Account.'
        })
      } else {
        this.$router.push({
          path: `/dashboard/chart-of-account`
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
          path: `/dashboard/chart-of-accounts/${this.selectedChartAccount}`
        })
      }
    },
    getCompanyChartAccounts () {
      this.$axios.get(`/company_chart_accounts`)
        .then(res => {
          this.setCompanies(res.data.companies)
        })
    },
    getChartAccounts () {
      this.$axios.get(`/chart_accounts?page=${this.current}&perPage=${this.perPage}&filter=${this.filter}&companyId=${this.selectedCompany.value}`)
        .then(res => {
          this.setChartAccounts(res.data.chartAccounts)
        })
    }
  },
  mounted () {
    this.getCompanyChartAccounts()
  },
  watch: {
    selectedCompany (val) {
      this.setSelectedCompany(val)
      this.getChartAccounts()
    },
    current (val) {
      this.getChartAccounts()
    }
  }
}
</script>
