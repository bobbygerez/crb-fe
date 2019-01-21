<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-12">
            <div class="q-title q-mb-md">Edit Transaction </div>
        </div>
        <div class="col-xs-6">
            Chequee
        </div>
        <div class="col-xs-3">
            <q-select v-model="transaction.transaction_type_id" :options="transactionTypes" float-label="Transaction Type" clearable />
            <q-select v-model="transaction.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable />
            <q-input v-model="createdBy" float-label="Created By" disable />

        </div>
        <div class="col-xs-3">
            <q-input v-model="payee.name" float-label="Pay to" disable />
            <input-price label="Price" :value="transaction.total_amount" v-model="transaction.total_amount"></input-price>
            <q-input v-model="transaction.remarks" type="textarea" float-label="Remarks" :max-height="100" rows="2" hide-underline />
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
    <div class="row" v-for="(gl, index) in generalLedgers" :key="index">
        <div class="col-xs-4">
            
            <q-input v-model="gl.particulars" float-label="Particulars" />
        </div>
        <div class="col-xs-3">
            <q-select v-model="gl.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable />
        </div>
        <div class="col-xs-2">
            <input-price label="Debit Amount" :value="gl.debit_amount" v-model="gl.debit_amount"></input-price>
        </div>
        <div class="col-xs-1">
           <input-price label="Tax" :value="gl.tax" v-model="gl.tax"></input-price>
        </div>
        <div class="col-xs-2">
            <q-btn
                color="primary"
                size="sm"
                icon="close"
                flat
                round
                class="float-right"
                @click="removeGl(index)"
            />
            <negative-price label="Credit Amount" :value="gl.credit_amount" v-model="gl.credit_amount"></negative-price>
        </div>
    </div>
    <br />
    <q-btn color="primary" label="Update" class="float-left" @click="update" />
    <q-btn color="primary" flat class="float-right" @click="addGl" >
         <q-icon name="more_vert"></q-icon> More
    </q-btn>
    <br />
    <br />
</div>
</template>

<script>
import _ from 'lodash';
import inputPrice from 'components/inputs/price'
import negativePrice from 'components/inputs/negativePrice'
import {
    mapState
} from 'vuex'

export default {
    data() {
        return {
            generalLedgers: [{
                particulars: '',
                chart_account_id: '',
                debit_amount: 0,
                tax: 0,
                credit_amount: 0
            }],
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
        createdBy() {
            return `${this.transaction.created_by.firstname} ${this.transaction.created_by.lastname}`
        }
    },
    methods: {
        removeGl(index){
            this.generalLedgers.splice(index, 1)
        },
        addGl() {
            this.generalLedgers.push({
                particulars: '',
                chart_account_id: '',
                debit_amount: 0,
                tax: 0,
                credit_amount: 0
            })
        },
        getTransactionTypes() {
            this.$axios.get(`transactions/${this.$route.params.id}/edit?id=${this.$route.params.id}&modelType=${this.selectedEntity}&modelId=${this.selectedUserEntity}`)
                .then(res => {
                    this.$store.dispatch('transactions/transactionTypes', res.data.transactionTypes)
                    this.$store.dispatch('transactions/transaction', res.data.transaction)
                    this.generalLedgers = res.data.transaction.general_ledgers
                    this.$store.dispatch('transactions/chartAccounts', res.data.chartAccounts)
                    this.$store.dispatch('transactions/payee', res.data.payee)
                })

        },
        update(){
             this.$axios
                .put(`/transactions/${this.transaction.id}?id=${this.transaction.id}`, {

                })
                .then(res => {
                this.hideModal()
                this.$q.notify({
                    color: 'positive',
                    icon: 'check',
                    message: `${this.transactionType.name} update successfully`
                })
                this.request({
                    pagination: this.serverPagination,
                    filter: this.filter
                })
                })
                .catch()
        }
    },
    created() {
        this.getTransactionTypes()
    },
    components: {
        inputPrice,
        negativePrice
    }
}
</script>
