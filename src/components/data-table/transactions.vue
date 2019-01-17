<template>
<div>
    <q-table ref="table" color="primary" :title="`${entity.name} Transactions`" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
        <template slot="top-right" slot-scope="props">
            <q-search hide-underline v-model="filter" />
        </template>

        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                
                <q-td key="chartAccount">{{props.row.chart_account.name }}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="$emit(action, props.row)" v-close-overlay>
                                    <q-item-main :label="action" />
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>
                </q-td>
                <q-td key="transactionType">{{props.row.transaction_type.name }}</q-td>
                <q-td key="total_amount">{{props.row.total_amount |currency('₱ ') }}</q-td>
                <q-td key="remarks">{{props.row.remarks }}</q-td>
                <q-td key="created_at">{{props.row.created_at }}</q-td>
            </q-tr>
        </template>

    </q-table>
    <q-modal v-model="newTransactionType" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="row">
                <div class="col-xs-12">
                    <div class="q-display-1 q-mb-md">New Transaction Type</div>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="transactionType.name" float-label="Transaction Type" clearable />
                </div>

                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="transactionType.desc" float-label="Description" type="textarea" :max-height="100" rows="2" clearable />
                </div>
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm" />
        </div>
    </q-modal>
    <q-modal v-model="editTransactionType" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="row">
                <div class="col-xs-12">
                    <div class="q-display-1 q-mb-md">Edit {{ transactionType.name }}</div>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="transactionType.name" float-label="Transaction Type" clearable />
                </div>

                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="transactionType.desc" float-label="Description" type="textarea" :max-height="100" rows="2" clearable />
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
import slug from 'components/mixins/slug'
import _ from 'lodash';
import {
    mapState
} from 'vuex'

export default {
    mixins: [slug],
    data() {
        return {
            companyId: '',
            name: '',
            actions: ['edit', 'delete'],
            selectedChartAccount: 0,
            columns: [
                 {
                    name: 'chartAccount',
                    label: 'Chart of Account',
                    align: 'left',
                    field: 'chartAccount'
                },
                {
                    name: 'transactionType',
                    label: 'Transaction Type',
                    field: 'transactionType',
                    align: 'left'
                },
                {
                    name: 'total_amount',
                    label: 'Total Amount',
                    align: 'left',
                    field: 'total_amount'
                },
                 {
                    name: 'remarks',
                    label: 'Remarks',
                    align: 'left',
                    field: 'remarks'
                },
                {
                    name: 'created_at',
                    label: 'Created At',
                    align: 'left',
                    field: 'created_at'
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
        ...mapState('transactionTypes', ['editTransactionType', 'transactionType', 'newTransactionType']),
        ...mapState('transactions', ['entity', 'company'])
      
    },
    methods: {

        store() {

            this.$axios
                    .post(`/transaction_types`, this.transactionType)
                    .then(res => {
                        this.hideModal()
                        this.$q.notify({
                            color: 'positive',
                            icon: 'check',
                            message: `${this.transactionType.name} created successfully`
                        })
                        this.request({
                            pagination: this.serverPagination,
                            filter: this.filter
                        })
                    })

        },
        hideModal() {
            this.$store.dispatch('transactionTypes/newTransactionType', false)
            this.$store.dispatch('transactionTypes/editTransactionType', false)
        },
        showModal() {
            this.$store.dispatch('transactionTypes/editTransactionType', true)
        },
        update() {

             this.$axios
                .put(`/transaction_types/${this.transactionType.id}?id=${this.transactionType.id}`, this.transactionType)
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
           
        },
        request(props) {

            this.loading = true
            this.$axios
                .get(
                    `/transactions?entity=${this.entity.entity}&id=${this.entity.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}`
                )
                .then(res => {
                    this.serverPagination = props.pagination
                    this.serverData = _.values(res.data.transactions.data)
                    this.serverPagination.rowsNumber = res.data.transactions.total
                    this.lastPage = res.data.transactions.last_page
                    this.loading = false

                })
                .catch(error => {
                    // there's an error... do SOMETHING
                    // we tell QTable to exit the "loading" state
                    this.loading = false
                })

        },

        index() {
            this.request({
                pagination: this.serverPagination,
                filter: this.filter
            })

        }
    },

    mounted() {
        this.index()
        this.$on('edit', function (obj) {
            this.$router.push({
                    path: `/dashboard/transactions/${this.slug(this.company.companyName)}/${this.slug(this.entity.name)}/${this.slug(obj.chart_account.name)}/edit`
                })
            this.$store.dispatch('transactions/transaction', obj)
        })

    },
    watch: {
        'transactionType.name'(val) {
            this.$store.dispatch('transactionTypes/transactionTypeName', val)
        },
        'transactionType.desc'(val) {
            this.$store.dispatch('transactionTypes/transactionTypeDesc', val)
        }
    }
}
</script>
