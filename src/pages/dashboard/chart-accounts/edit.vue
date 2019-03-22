<template>
<div class="q-ma-md">
    <generic-form :parent-account="parentAccount" :chart-account="chartAccount" :selected-chart-account="selectedChartAccount" :show="false">
        <div class="col-12">
            <q-btn @click="back" color="secondary" label="Back" class="q-ma-sm" />
            <q-btn @click="update" color="primary" label="Update" class="q-ma-sm" />
        </div>
    </generic-form>
</div>
</template>

<script>
import { find } from 'lodash'
import genericForm from 'pages/dashboard/chart-accounts/form/generic-form'
import {
  required,
  numeric
} from 'vuelidate/lib/validators'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  components: {
    genericForm
  },
  validations: {
    chartAccount: {
      name: {
        required

      },
      account_code: {
        required,
        numeric
      },
      account_display: {
        required

      },
      taccount_id: {
        required
      }
    }
  },
  computed: {
    ...mapState('chartAccounts', ['chartAccount', 'selectedChartAccount', 'parentAccount']),
    ...mapState('global', ['page', 'perPage', 'filter']),
    tAccounts () {
      return this.$store.getters['tAccounts/tAccounts'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }

  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccount', 'setParentAccount', 'setChartAccounts', 'setTAccountId']),
    ...mapActions('tAccounts', ['setTAccounts']),
    getChartAccounts () {
      this.$axios.get(`/chart_accounts?page=${this.page}&perPage=${this.perPage}&filter=${this.filter}`)
        .then(res => {
          this.setChartAccounts(res.data.chartAccounts)
        })
    },
    back () {
      this.$router.go(-1)
    },
    update () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please check the form fields.`
        })
      } else {
        this.$axios.put(`chart_accounts/${this.selectedChartAccount}?account_codee=${this.selectedChartAccount}`, {
          taccount_id: this.chartAccount.taccount_id.value,
          parent_code: this.chartAccount.parent_code,
          name: this.chartAccount.name,
          account_code: this.chartAccount.account_code,
          account_display: this.chartAccount.account_display
        }).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.chartAccount.name} update successfully.`
          })
          this.getChartAccounts()
          // this.setChartAccount({
          //   name: '',
          //   account_code: '',
          //   account_display: '',
          //   remarks: '',
          //   taccount_id: ''
          // })
        })
      }
    },
    getParentChartAccount () {
      this.$axios.get(`chart_accounts/create?account_code=${this.selectedChartAccount}`)
        .then(res => {
          this.setParentAccount(res.data.parentAccount)
          this.setTAccounts(res.data.tAccounts)
        })
      this.$axios.get(`chart_accounts/${this.selectedChartAccount}/edit?account_code=${this.selectedChartAccount}`)
        .then(res => {
          this.setChartAccount(res.data.chartAccount)
          this.setTAccountId(
            find(this.tAccounts, { 'value': res.data.chartAccount.taccount_id })
          )
        })
    }
  },
  mounted () {
    this.getParentChartAccount()
  },
  watch: {
    chartAccount: {
      handler (val) {
        this.setChartAccount(val)
      },
      deep: true
    }
  }
}
</script>
