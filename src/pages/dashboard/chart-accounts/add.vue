<template>
   <div class="q-ma-md">
    <form @submit.prevent="$emit('add')">
        <div class="row">
            <div class="col-12">
                <p class="text-h5 q-ma-sm">
                    <q-icon name="add_circle" color="grey" /> {{ chartAccount.name }}
                </p>
            </div>
            <div class="col-12">
                <q-input outlined v-model="parentAccount.name" label="Parent Account" class="q-ma-sm" disable/>
            </div>
            <div class="col-12">
                <q-select outlined :options="tAccounts" label="Supervisor" class="q-ma-sm" bottom-slots error-message="Supervisor role is required." />
            </div>
            <div class="col-4">
                <q-input outlined v-model="$v.chartAccount.name.$model" label="Chart Account Name" class="q-ma-sm" :error="$v.chartAccount.name.$dirty && !$v.chartAccount.name.required" bottom-slots error-message="Name is required." />
            </div>
            <div class="col-4">
                <q-input outlined v-model="$v.accountCode.name.$model" label="Account Code" class="q-ma-sm" :error="($v.accountCode.name.$dirty && !$v.accountCode.name.required) || !$v.accountCode.name.numeric" bottom-slots error-message="Account Code must be a number and required." />
            </div>
            <div class="col-4">
                <q-input outlined v-model="$v.displayCode.$model" label="Display Code" class="q-ma-sm" :error="$v.displayCode.$dirty && !$v.displayCode.required" bottom-slots error-message="Display code required." />
            </div>
            <div class="col-12">
                <q-input outlined v-model="remarks" label="Remarks"  type="textarea"/>
            </div>
            <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
        </div>
        </div>
    </form>
</div>
</template>
<script>
import {
  required, numeric
} from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      parentAccount: {
        name: ''
      },
      accountCode: {
        name: ''
      },
      displayCode: '',
      remarks: ''
    }
  },
  validations: {
    chartAccount: {
      name: {
        required
      }
    },
    accountCode: {
      name: {
        required,
        numeric
      }
    },
    displayCode: {
      required
    }
  },
  computed: {
    ...mapState('chartAccounts', ['chartAccount', 'selectedChartAccount']),
    ...mapActions('companies', ['selectedCompany'])
  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccount']),
    cancel () {
      this.$router.go(-1)
    },
    add () {
      this.$axios.post(`chart_accounts`, {
        name: this.parentAccount.name,
        account_code: this.accountCode.name,
        account_display: this.displayCode,
        company_id: this.selectedCompany.value

      })
    },
    getParentChartAccount () {
      this.$axios.get(`chart_accounts/create?id=${this.selectedChartAccount}`)
        .then(res => {
          this.parentAccount = res.data.parentAccount
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
