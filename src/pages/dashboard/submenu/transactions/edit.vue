<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-xs-12">
        <div class="q-title q-mb-md">Edit Transaction </div>
      </div>
      <div class="col-xs-3">
        <q-select
          v-model="transaction.transaction_type_id"
          :options="transactionTypes"
          float-label="Transaction Type"
          clearable
        />
        <q-select
          v-model="transaction.chart_account_id"
          filter
          :options="chartAccounts"
          float-label="GL account"
          clearable
        />
        <q-input
          v-model="transaction.remarks"
          type="textarea"
          float-label="Remarks"
          :max-height="100"
          rows="2"
          hide-underline
        />
      </div>
      <div class="col-xs-3">
        <input-price
          label="Total Amount"
          :value="transaction.total_amount"
          v-model="transaction.total_amount"
          class="q-ml-sm"
          :disabled="true"
        ></input-price>
        <q-input
          v-model="createdBy"
          float-label="Created By"
          disable
          class="q-ml-sm"
        />
      </div>
      <div
        class="col-xs-6"
        v-if="transactionType.taccount_id !== 3"
      >
        <div class="row">
          <div class="col-xs-12">
            <q-input
              v-model="payee.name"
              float-label="Pay To"
              class="q-ml-sm"
              disable
            />
          </div>
          <div class="col-xs-12">
            <q-input
              v-model="numToWords"
              float-label="In Words"
              class="q-ml-sm"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              v-model="transaction.checknumber"
              float-label="Check number"
              class="q-ml-sm"
            />
          </div>
        </div>

      </div>

    </div>
    <br />
    <br />
    <hr />
    <div class="row">
      <div class="col-xs-12">
        <div class="q-title q-mb-md">General Ledgers</div>
      </div>
    </div>
    <div
      class="row"
      v-for="(gl, index) in generalLedgers"
      :key="index"
    >
      <!-- <div class="col-xs-2" v-if="transactionType.taccount_id !== 3">
            <q-input float-label="Item" />
        </div>
        <div class="col-xs-1" v-if="transactionType.taccount_id !== 3">
            <q-input float-label="Qty" />
        </div> -->
      <div class="col-xs-4">
        <q-input
          v-model="gl.particulars"
          float-label="Particulars"
        />
      </div>
      <div class="col-xs-3">
        <q-select
          v-model="gl.chart_account_id"
          filter
          :options="chartAccounts"
          float-label="GL account"
          clearable
        />
      </div>

      <div
        class="col-xs-2"
        v-if="transactionType.taccount_id === 2 || transactionType.taccount_id === 3"
      >
        <negative-price
          label="Debit Amount"
          :value="gl.debit_amount"
          v-model="gl.debit_amount"
        ></negative-price>
      </div>
      <div
        class="col-xs-1"
        v-if="transactionType.taccount_id !== 3"
      >
        <q-btn
          color="primary"
          size="sm"
          icon="close"
          flat
          round
          class="float-right"
          @click="removeGl(index)"
          v-if="transactionType.taccount_id === 2"
        />
        <input-price
          label="Tax"
          :value="gl.tax"
          v-model="gl.tax"
        ></input-price>
      </div>
      <div
        class="col-xs-2"
        v-if="transactionType.taccount_id === 1 || transactionType.taccount_id === 3"
      >
        <q-btn
          color="primary"
          size="sm"
          icon="close"
          flat
          round
          class="float-right"
          @click="removeGl(index)"
        />
        <negative-price
          label="Credit Amount"
          :value="gl.credit_amount"
          v-model="gl.credit_amount"
        ></negative-price>
      </div>

    </div>
    <br />
    <q-btn
      color="primary"
      label="Update"
      class="float-left"
      @click="update"
    />
    <q-btn
      color="primary"
      flat
      class="float-right"
      @click="addGl"
    >
      <q-icon name="more_vert"></q-icon> More
    </q-btn>
    <br />
    <br />
  </div>
</template>

<script>
import _ from 'lodash'
import inputPrice from 'components/inputs/price'
import negativePrice from 'components/inputs/negativePrice'
import numberToWords from 'components/mixins/numberToWords'
import {
  mapState
} from 'vuex'
export default {
  mixins: [numberToWords],
  data () {
    return {
      checkNumber: '',
      numToWords: '',
      debit_amount: 0,
      credit_amount: 0,
      tax: 0,
      generalLedgers: [{
        product_id: '',
        qty: '',
        particulars: '',
        chart_account_id: '',
        debit_amount: 0,
        tax: 0,
        credit_amount: 0
      }
      ],
      selectedChartAccount: 0
    }
  },
  computed: {
    ...mapState('transactions', ['company', 'transaction', 'selectedEntity', 'selectedUserEntity', 'payee', 'transactionType']),
    transactionTypes () {
      return this.$store.getters['transactions/transactionTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    chartAccounts () {
      let chartAccounts = _.values(this.$store.getters['transactions/chartAccounts'])
      let res = []
      const cb = (e) => {
        res.push({
          value: e.id,
          label: `(${e.account_code})  ${e.name}`
        })
        e.all_children && e.all_children.forEach(cb)
      }
      chartAccounts.forEach(cb)
      return res
    },
    createdBy () {
      return `${this.transaction.created_by.firstname} ${this.transaction.created_by.lastname}`
    }
  },
  methods: {
    removeGl (index) {
      if (this.generalLedgers[index].id !== '') {
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${this.generalLedgers[index].particulars}?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                var generalLedger = _.head(this.generalLedgers.splice(index, 1))
                this.$axios.delete(`/general_ledgers/${generalLedger.id}?id=${generalLedger.id}`)
                  .then((res) => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${generalLedger.particulars} deleted successfully`
                    })
                  })
                  .catch((err) => {
                    this.$q.notify({
                      color: 'negative',
                      icon: 'warning',
                      message: `${err.response.data.message}`
                    })
                  })
              }
            }
          ]
        })
      } else {
        this.generalLedgers.splice(index, 1)
      }
    },
    addGl () {
      this.generalLedgers.push({
        id: '',
        particulars: '',
        chart_account_id: '',
        debit_amount: 0,
        tax: 0,
        credit_amount: 0
      })
    },
    getTransactionTypes () {
      this.$axios.get(`transactions/${this.$route.params.id}/edit?id=${this.$route.params.id}&modelType=${this.selectedEntity}&modelId=${this.selectedUserEntity}`)
        .then(res => {
          this.$store.dispatch('transactions/transactionTypes', res.data.transactionTypes)
          this.$store.dispatch('transactions/transaction', res.data.transaction)
          this.generalLedgers = res.data.transaction.general_ledgers
          this.$store.dispatch('transactions/chartAccounts', res.data.chartAccounts)
          this.$store.dispatch('transactions/payee', res.data.payee)
        })
    },
    update () {
      if (this.transactionType.taccount_id === 3) {
        if (this.debit_amount !== this.credit_amount) {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Debit and Credit amount must be equal.`
          })
        } else {
          this.updateTransaction()
        }
      } else {
        this.updateTransaction()
      }
    },
    updateTransaction () {
      this.$axios
        .put(`/transactions/${this.transaction.id}?id=${this.transaction.id}`, {
          transaction: {
            transactable_id: this.transaction.transactable_id,
            transactable_type: this.transaction.transactable_type,
            transaction_type_id: this.transaction.transaction_type_id,
            chart_account_id: this.transaction.chart_account_id,
            total_amount: this.transaction.total_amount,
            checknumber: this.transaction.checknumber,
            remarks: this.transaction.remarks
          },
          generalLedgers: this.generalLedgers
        })
        .then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `This transaction has been updated successfully`
          })
        })
        .catch()
    },
    totalAmount (generalLedgers) {
      /* eslint-disable */
      let debit_amount = _.sumBy(generalLedgers, function (i) {
        return i.debit_amount
      })
      this.debit_amount = debit_amount
      let credit_amount = _.sumBy(generalLedgers, function (i) {
        return i.credit_amount
      })
      this.credit_amount = credit_amount
      let tax = _.sumBy(generalLedgers, function (i) {
        return i.tax
      })
      this.tax = tax
      // Disbursement Selected Normal balance is debit
      // contra account credit

      if (this.transactionType.taccount_id === 1) {
        let total_amount = parseFloat(credit_amount) + parseFloat(tax)
        this.numToWords = this.withDecimal(total_amount)
        this.$store.dispatch('transactions/transactionTotalAmount', total_amount)
        // Reciept Selected Normal balance is credit
        // contrac account debit
      } else if (this.transactionType.taccount_id === 2) {
        let total_amount = parseFloat(debit_amount) + parseFloat(tax)
        this.numToWords = this.withDecimal(total_amount)
        this.$store.dispatch('transactions/transactionTotalAmount', total_amount)
        // Debit or credit should be balance
      } else if (this.transactionType.taccount_id === 3) {
        let total_amount = parseFloat(debit_amount) - parseFloat(credit_amount)
        if (debit_amount === credit_amount) {
          this.numToWords = this.withDecimal(debit_amount)
          this.$store.dispatch('transactions/transactionTotalAmount', parseFloat(debit_amount))
        } else {
          this.numToWords = ''
          this.$store.dispatch('transactions/transactionTotalAmount', 0)
        }
      }
      /* eslint-enable */
    }
  },
  mounted () {
    this.getTransactionTypes()
  },
  components: {
    inputPrice,
    negativePrice
  },
  watch: {
    'transaction.transaction_type_id' (val) {
      this.$axios.get(`transactions-get-transaction-type?id=${val}`)
        .then(res => {
          this.$store.dispatch('transactions/transactionType', res.data.transactionType)
          this.totalAmount(this.generalLedgers)
        })
      this.$store.dispatch('transactions/transactionTypeId', val)
    },
    'transaction.checknumber' (val) {
      this.$store.dispatch('transactions/transactionCheckNumber', val)
    },
    'transaction.remarks' (val) {
      this.$store.dispatch('transactions/transactionRemarks', val)
    },
    generalLedgers: {
      handler: function (after, before) {
        this.totalAmount(after)
      },
      deep: true
    }
  }
}
</script>
