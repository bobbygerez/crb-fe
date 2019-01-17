<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-12">
            <div class="q-title q-mb-md">Edit Transaction </div>
        </div>
        <div class="col-xs-6">
            
        </div>
        <div class="col-xs-6">
            <q-select v-model="transaction.transaction_type_id" :options="transactionTypes" float-label="Transaction Type" clearable />
            <q-select v-model="transaction.transaction_type_id" :options="[]" float-label="Cash Account" clearable />
            <q-tree :nodes="chartAccounts" color="secondary" :selected.sync="transaction.chart_account_id" node-key="id" label-key="label" >
            </q-tree>
            <input-price
              label="Price"
              :value="transaction.total_amount"
              v-model="transaction.total_amount"
              :disabled="true"
            ></input-price>
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
        ...mapState('transactions', ['company', 'transaction']),
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
            const map = e => ({
                    id: e.id,
                    label: e.name,
                    children: e.all_children.map(map) // recursive call
                }),
                tree = chartAccounts.map(map)

                console.log(tree)
             return tree
        }
    },
    methods: {
        getTransactionTypes() {
            this.$axios.get(`transactions-transaction-types?companyId=${this.company.id}`)
                .then(res => {
                    this.$store.dispatch('transactions/transactionTypes', res.data.transactionTypes)
                })

            this.$axios.get(`transactions-chart-accounts?companyId=${this.company.id}`)
                .then(res => {
                    this.$store.dispatch('transactions/chartAccounts', res.data.chartAccounts)
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
