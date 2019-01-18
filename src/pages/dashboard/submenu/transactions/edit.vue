<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-12">
            <div class="q-title q-mb-md">Edit Transaction </div>
        </div>
        <div class="col-xs-6">
            <q-select v-model="transaction.transaction_type_id" :options="transactionTypes" float-label="Transaction Type" clearable />
            <q-select v-model="transaction.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable />
            <q-input v-model="createdBy" float-label="Created By" disable />
            
        </div>
        <div class="col-xs-6">
            <q-input v-model="payee.name" float-label="Pay to" disable />
            <input-price
              label="Price"
              :value="transaction.total_amount"
              v-model="transaction.total_amount"
            ></input-price>
            <q-input
              v-model="transaction.remarks"
              type="textarea"
              float-label="Remarks"
              :max-height="100"
              rows="2"
            />
        </div>
        
        
    </div>
</div>
</template>

<script>
import _ from 'lodash';
import inputPrice from 'components/inputs/price'
import {
    mapState
} from 'vuex'

function getObject(array, key, value) {
    var o
    array.some(function iter(a) {
        if (a[key] === value) {
            o = a
            return true
        }
        return Array.isArray(a.children) && a.children.some(iter)
    })
    return o
}
export default {
    data() {
        return {
            selectedChartAccount: 0
        }
    },
    computed: {
        ...mapState('transactions', ['company', 'transaction', 'selectedEntity', 'selectedUserEntity', 'payee']),
        transactionTypes() {
            return this.$store.getters['transactions/transactionTypes'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        chartAccounts() {
            let chartAccounts = _.values(this.$store.getters['transactions/chartAccounts'])
            
            let res = []
            const cb = (e) => {
                res.push({
                    value: e.id,
                    label: `(${e.account_code})  ${e.name}`,
                });
                e.all_children && e.all_children.forEach(cb);
            }
            chartAccounts.forEach(cb);
            return res

        },
        createdBy(){
            return `${this.transaction.created_by.firstname} ${this.transaction.created_by.lastname}`
        }
    },
    methods: {
        getTransactionTypes() {
            this.$axios.get(`transactions/${this.$route.params.id}/edit?id=${this.$route.params.id}&modelType=${this.selectedEntity}&modelId=${this.selectedUserEntity}`)
                .then(res => {
                    this.$store.dispatch('transactions/transactionTypes', res.data.transactionTypes)
                    this.$store.dispatch('transactions/transaction', res.data.transaction)
                    this.$store.dispatch('transactions/chartAccounts', res.data.chartAccounts)
                    this.$store.dispatch('transactions/payee', res.data.payee)
                })

           
        }
    },
    created() {
        this.getTransactionTypes()
    },
    components: {
      inputPrice
    }
}
</script>
