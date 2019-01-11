<template>
<div>
    <div>{{ company.companyName }}</div>
    <q-input v-model="filter" stack-label="Filter" clearable class="q-mb-sm" />
    <q-tree :nodes="chartAccounts" color="secondary" :selected.sync="selectedChartAccount" node-key="id" label-key="label" default-expand-all>
        <div slot="default-body" slot-scope="prop">
            <div class="text-weight-thin">Account display: {{ prop.node.account_display }}</div>
            <div class="text-weight-thin">T-Account: {{ prop.node.taccount }}</div>
        </div>

    </q-tree>
    <q-modal v-model="newChartAccount" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="row">
                <div class="col-xs-12">
                    <div class="q-display-1 q-mb-md">New Chart Of Account</div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <q-input :value="parentAccount.name" float-label="Parent Account" clearable disable />
                </div>
                <div class="col-xs-12 col-sm-6">
                    <q-input v-model="company.companyName" float-label="Company Name" clearable disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="chartAccount.name" float-label="Chart of Account Name" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="chartAccount.account_display" float-label="Account Display" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-select
                        v-model="chartAccount.taccount_id"
                        :options="tAccounts"
                        float-label="T-Account"
                        clearable
                        />
                </div>
                 <div class="col-xs-12 col-sm-12">
                    <q-input v-model="chartAccount.remarks" float-label="Remarks" type="textarea" :max-height="100" rows="2" clearable />
                </div>
            </div>
            <br>
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm" />
        </div>
    </q-modal>
    <q-modal v-model="editChartAccount" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="row">
                <div class="col-xs-12">
                    <div class="q-display-1 q-mb-md">Edit {{ parentAccount.name }}</div>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="company.companyName" float-label="Company Name" clearable disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="parentAccount.name" float-label="Chart of Account Name" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="parentAccount.account_display" float-label="Account Display" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-select
                        v-model="parentAccount.taccount_id"
                        :options="tAccounts"
                        float-label="T-Account"
                        clearable
                        />
                </div>
                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="parentAccount.remarks" float-label="Remarks" type="textarea" :max-height="100" rows="2" clearable />
                </div>
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="update()" label="Update" class="q-ml-sm" />
        </div>
    </q-modal>
</div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from 'lodash';
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
            companyId: '',
            name: '',
            actions: ['chart of accounts'],
            selectedChartAccount: 0,
            columns: [{
                    name: 'name',
                    label: 'Name',
                    field: 'name',
                    align: 'left'
                },
                {
                    name: 'desc',
                    label: 'Description',
                    align: 'left',
                    field: 'desc'
                }
            ],
            filter: '',
            loading: false,
            options: [5, 10, 15, 20],
            lastPage: '',
            serverData: [],
            serverPagination: {
                page: 1,
                rowsNumber: 10,
                rowsPerPage: 10 // specifying this determines pagination is server-side
            }
        }
    },
    computed: {
        ...mapState('chartAccounts', ['company', 'companyId', 'newChartAccount', 'chartAccount', 'parentAccount', 'editChartAccount']),
        companies() {
            return this.$store.getters['chartAccounts/companies'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        tAccounts(){
            return this.$store.getters['chartAccounts/tAccounts'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        chartAccounts() {
            let chartAccounts = _.values(this.$store.getters['chartAccounts/chartAccounts'])
            const map = e => ({
                    id: e.id,
                    label: e.name,
                    remarks: e.remarks,
                    taccount: e.t_account.name,
                    account_display: e.account_display,
                    children: e.all_children.map(map) // recursive call
                }),
                tree = chartAccounts.map(map)

            return tree

        }
    },
    methods: {
       
        store() {
            this.$axios
                .post(`/chart_account`, {
                    name: this.chartAccount.name,
                    account_display: this.chartAccount.account_display,
                    company_id: this.company.id,
                    parent_id: this.selectedChartAccount,
                    taccount_id: this.chartAccount.taccount_id,
                    remarks: this.chartAccount.remarks
                })
                .then(res => {
                    this.hideModal()
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.chartAccount.name} created successfully`
                    })
                    this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                    })
                })

        },
        hideModal() {
            this.$store.dispatch('chartAccounts/newChartAccount', false)
            this.$store.dispatch('chartAccounts/editChartAccount', false)
        },

        update() {
            this.$axios
                .put(`/chart_account/${this.parentAccount.id}?id=${this.parentAccount.id}`, this.parentAccount)
                .then(res => {
                    this.hideModal()
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.parentAccount.name} update successfully`
                    })
                    this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                    })
                })
                .catch()
        },
        request(props) {
            this.$axios
                .get(`/chart_account?filter=${this.filter}&companyId=${this.$route.params.id}`)
                .then(res => {
                    this.$store.dispatch('chartAccounts/chartAccounts', res.data.chartAccounts)
                })

        },
        
        /***
         * Do not delete parent component is using the index
         */
        index() {
            this.request({
                pagination: this.serverPagination,
                filter: this.filter
            })

        },
        getTAccounts(){
            this.$axios
                .get(`/taccounts`)
                .then(res => {
                    this.$store.dispatch('chartAccounts/tAccounts', res.data.tAccounts)
                })
        }
    },

    mounted() {
        this.index()
        this.getTAccounts()
    },
    watch: {
        
        'filter'(val) {
            this.$axios
                .get(`/chart-account-search?filter=${this.filter}&companyId=${this.$route.params.id}`)
                .then(res => {
                    this.$store.dispatch('chartAccounts/chartAccounts', res.data.chartAccounts)
                })
        },
        'chartAccount.name'(val) {
            this.$store.dispatch('chartAccounts/chartAccountName', val);
        },
        'chartAccount.company_id'(val) {
            this.$store.dispatch('chartAccounts/chartAccountCompanyId', val);
        },
        'chartAccount.account_display'(val) {
            this.$store.dispatch('chartAccounts/chartAccountDisplay', val);
        },
        'chartAccount.taccount_id'(val){
            this.$store.dispatch('chartAccounts/chartAccountTAccountId', val);
        },
        'chartAccount.remarks'(val){
            this.$store.dispatch('chartAccounts/chartAccountRemarks', val);
        },
        'selectedChartAccount'(val) {
            this.$axios
                .get(`chart_account/${val}?id=${val}`)
                .then(res => {
                    if (res.data.chartAccount != null) {
                        this.$store.dispatch('chartAccounts/parentAccount', res.data.chartAccount)
                    } else {
                        this.$store.dispatch('chartAccounts/parentAccount', {
                            name: '',
                            account_display: ''
                        })
                    }
                })
        },
        'parentAccount.name'(val) {
            this.$store.dispatch('chartAccounts/parentAccountName', val);
        },
        'parentAccount.account_display'(val) {
            this.$store.dispatch('chartAccounts/parentAccountDisplay', val);
        },
        'parentAccount.remarks'(val){
            this.$store.dispatch('chartAccounts/parentAccountRemarks', val);
        },
        'parentAccount.taccount_id'(val){
             this.$store.dispatch('chartAccounts/parentAccountTAccountId', val);
        }
    }
}
</script>
