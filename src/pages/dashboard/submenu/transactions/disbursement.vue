<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-9">
            <q-card inline class="full-width">
                <q-card-title>
                    <div class="row">
                        <div class="col-xs-9">
                            <div class="q-title">New Transaction</div>
                        </div>
                        <div class="col-xs-3">
                            <q-datetime v-model="date" type="date" float-label="Date" />
                        </div>
                        
                    </div>
                </q-card-title>
                <q-card-main>
                    <div class="row">
                        <div class="col-xs-4">
                            <q-select v-model="transaction.transactable_type" filter :options="entities" float-label="Vendor Type" clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-4">
                            <q-select v-model="transaction.transactable_id" filter :options="vendorableNames" float-label="Vendor Name" clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-4">
                            <q-input v-model="transaction.checknumber" float-label="Check number" class="q-ml-sm" />
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <q-input v-model="numToWords" float-label="In Words" class="q-ml-sm" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 ">
                            <br />
                            <div class="q-heading">Pay to the Order of:</div>
                            <div class="caption q-ml-md"> {{ entity.name }}</div>
                            <div class="caption q-ml-md"> {{ entity.address.street_lot_blk }}</div>
                            <div class="caption q-ml-md"> {{ entity.address.brgy.description}} {{ entity.address.city.description }} {{ entity.address.province.description }}</div>
                        </div>
                        <div class="col-xs-3 ">
                            <input-price label="Vatable Sales" :value="transaction.vatable_sales" v-model="transaction.vatable_sales"></input-price>
                            <input-price label="Zero Rated Sales" :value="transaction.zero_rated_sales" v-model="transaction.zero_rated_sales"></input-price>
                        </div>
                        <div class="col-xs-3 ">
                            <input-price label="VAT-Exempt Sales" :value="transaction.vat_exempt_sales" v-model="transaction.vat_exempt_sales"></input-price>
                            <input-price label="VAT Amount" :value="transaction.vat_amount" v-model="transaction.vat_amount"></input-price>
                        </div>
                    </div>
                </q-card-main>
                <q-card-separator />

            </q-card>
        </div>
        <div class="col-xs-3 ">
            <div class="col-xs-8">
                <q-card inline class="q-ml-sm">
                    <q-card-main>
                        <q-select v-model="transaction.chart_account_id" filter :options="chartAccounts" float-label="CASH ACCOUNT" clearable />
                        <br />
                        <input-price label="Total Discount" :value="transaction.total_discount" v-model="transaction.total_discount" class="q-ml-sm"></input-price>
                        <input-price label="Cash Account Balance" :value="transaction.total_amount" v-model="transaction.total_amount" class="q-ml-sm"></input-price>
                        <q-input v-model="transaction.remarks" type="textarea" float-label="Remarks" :max-height="150" rows="4" hide-underline />
                    </q-card-main>
                    <q-card-separator />

                </q-card>
            </div>
        </div>
        <div class="col-xs-6" v-if="transactionType.taccount_id != 3">
            <div class="row">

            </div>

        </div>

    </div>
    <br />
    <br />
    <hr />
    <div class="row">
        <div class="col-xs-12">
            <q-tabs animated swipeable inverted color="primary" align="left">
                <q-tab default name="invoices" slot="title" icon="assignment" label="Apply to Invoices" />
                <q-tab name="expenses" slot="title" icon="library_books" label="Apply to Expenses" />
                <q-tab-pane name="invoices">
                    <div class="row" v-for="(invoice, key) in invoices" :key="key">
                        <div class="col-xs-3">
                            <q-btn color="primary" flat class="float-right">
                                <q-icon name="pageview"></q-icon>
                            </q-btn>
                            <q-select v-model="invoice.purchase_received_id" filter :options="purchaseReceived" float-label="Invoice No." clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-datetime v-model="invoice.date_due" type="date" float-label="Date Due" />
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Amount Due" :value="invoice.amount_due" v-model="invoice.amount_due" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-3">
                            <q-input v-model="invoice.description" float-label="Description" class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Discount" :value="invoice.discount" v-model="invoice.discount" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-1">
                              <input-price label="Amount Paid" :value="invoice.amount_paid" v-model="invoice.amount_paid" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-1">
                            <q-checkbox class="q-mt-lg" v-model="invoice.pay" checked-icon="check" unchecked-icon="close" />
                            <q-btn color="primary" size="sm" icon="close" flat round class="float-right" @click="removeInvoice(key)" />
                        </div>
                    </div>
                </q-tab-pane>
                <q-tab-pane name="expenses">Alarms tab</q-tab-pane>
            </q-tabs>
        </div>
    </div>

    <!-- <div class="row" v-for="(item, index) in purchasesItems.items" :key="index">
        <div class="col-xs-3">
            <q-select v-model="item.id" filter :options="entityItems" float-label="Item Name" clearable class="q-ml-sm" />
        </div>

        <div class="col-xs-2">
            <q-input :value="item.desc" float-label="Particulars" disable />
        </div>
        <div class="col-xs-2">
            <q-select v-model="item.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable />
        </div>
        <div class="col-xs-2">
            <q-input :value="item.tax_type.name" float-label="Tax Type" disable />
        </div>
        <div class="col-xs-1" v-if="transactionType.taccount_id !== 3">
            <q-input float-label="Qty" v-model="item.pivot.qty" disable />
        </div>
        <div class="col-xs-1">
            <negative-price label="Price" :value="item.pivot_price" v-model="item.pivot_price" :disabled="true"></negative-price>
        </div>
        <div class="col-xs-1">
            <negative-price label="Credit Amount" :value="item.total_amount" v-model="item.total_amount" :disabled="true"></negative-price>
        </div>

    </div>
    <span v-if="selectedPurchase === null">
     <div class="row" v-for="(gl, index) in generalLedgers" :key="index" >
        <div class="col-xs-2" v-if="transactionType.taccount_id !== 3">
            <q-select v-model="gl.item_id" filter :options="entityItems" float-label="Item" class="q-ml-sm"/>
        </div>

        <div :class="transactionType.taccount_id != 3 ? 'col-xs-3' : 'col-xs-5'">
            <q-input v-model="gl.particulars" float-label="Particulars" />
        </div>
        <div class="col-xs-2">
            <q-select v-model="gl.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable />
        </div>
        <div class="col-xs-2" v-if="transactionType.taccount_id === 2 || transactionType.taccount_id === 3">
            <negative-price label="Debit Amount" :value="gl.debit_amount" v-model="gl.debit_amount"></negative-price>
        </div>
         <div class="col-xs-1">
            <q-input :value="gl.tax_type" float-label="Tax Type" disable />
        </div>
        <div class="col-xs-1" v-if="transactionType.taccount_id !== 3">
            <q-input float-label="Qty"  v-model="gl.qty"/>
        </div>
        <div class="col-xs-1">
            <negative-price label="Price" :value="gl.price" v-model="gl.price" ></negative-price>
        </div>
        <div class="col-xs-2" v-if="transactionType.taccount_id === 1 || transactionType.taccount_id === 3">
            <q-btn color="primary" size="sm" icon="close" flat round class="float-right" @click="removeGl(index)" />
            <negative-price label="Credit Amount" :value="gl.credit_amount" v-model="gl.credit_amount"></negative-price>
        </div>
    </div>
    </span> -->
    <br />
    <q-btn color="primary" label="Submit" class="float-left" @click="store" />
    <q-btn color="primary" flat class="float-right" @click="addInvoice" v-if="selectedPurchase == null">
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
import numberToWords from 'components/mixins/numberToWords'
import {
    mapState
} from 'vuex'
export default {
    mixins: [numberToWords],
    data() {
        return {
            date: '',
            cashAccountBalance: 0,
            selectedItem: '',
            purchasesItems: [],
            selectedPurchase: null,
            checkNumber: '',
            numToWords: '',
            debit_amount: 0,
            credit_amount: 0,
            tax: 0,
            invoices: [],
            oldInvoices: [],
            selectedChartAccount: 0
        }
    },
    computed: {
        ...mapState('transactions', ['company', 'transaction', 'selectedEntity', 'selectedUserEntity', 'payee', 'transactionType', 'entities', 'entity']),
        entityItems() {
            return this.$store.getters['transactions/entityItems'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        purchaseReceived() {
            return this.$store.getters['transactions/purchaseReceived'].map(e => {
             
                return {
                    label: `${e.invoice_no.substring(1, 21)}`,
                    value: e.id,
                    items: e.items,
                    grand_total: e.grand_total,
                    received_date: e.received_date,
                    discount: e.discount,
                    date_due: e.date_due,
                    vatable_sales: e.vatable_sales,
                    vat_exempt_sales: e.vat_exempt_sales,
                    zero_rated_sales: e.zero_rated_sales,
                    vat_amount: e.vat_amount

                }
            })
        },
        vendorableNames() {
            return this.$store.getters['transactions/vendorableNames'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        payeeName() {
            if (this.payee !== null) {
                return this.payee.name
            }
            return ''
        },
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

        removeInvoice(index) {
            this.invoices.splice(index, 1)
        },
        addInvoice() {

            let id = 1
            if (this.invoices.length > 0) {
                id = _.maxBy(this.invoices, function (o) {
                    return o.id;
                }).id + 1;
            }

            this.invoices.push({
                id: id,
                purchase_received_id: '',
                date_due: '',
                amount_due: 0,
                description: '',
                discount: 0,
                amount_paid: 0,
                vatable_sales: 0,
                vat_exempt_sales: 0,
                zero_rated_sales: 0,
                vat_amount: 0,
                pay: true
            })
            this.setValue();

        },
        getTransactionTypes() {
            this.$axios.get(`transactions/create?modelType=${this.selectedEntity}&modelId=${this.selectedUserEntity}`)
                .then(res => {
                    this.$store.dispatch('transactions/transactionTypes', res.data.transactionTypes)
                    this.$store.dispatch('transactions/chartAccounts', res.data.chartAccounts)
                    this.$store.dispatch('transactions/createdBy', res.data.createdBy)

                    // this.generalLedgers = res.data.transaction.general_ledgers
                    // this.$store.dispatch('transactions/payee', res.data.payee)
                })
        },
        store() {
             this.$axios
                .post(`/transactions`, {
                    transaction: this.transaction,
                    payee: {
                        vendorableName: this.selectedVendorableName,
                        vendorableType: this.selectedVendorableType
                    }
                })
                .then(res => {
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `This transaction has been updated successfully`
                    })
                    this.generalLedgers = []
                    this.addGl()
                    this.intialize()
                })
                .catch()
        },
        intialize() {
            this.$store.dispatch('transactions/chartAccountId', 0)
            this.$store.dispatch('transactions/transactionRemarks', '');
        },
        setValue: function () {
            this.$data.oldInvoices = _.cloneDeep(this.$data.invoices);
        },
        dateNow(){
            var now = new Date();
            var y = now.getFullYear() + '/';
            var m = now.getMonth() + 1;
            var d = now.getDate();
            return '' + y + (m < 10 ? '0' : '') + m + '/' + (d < 10 ? '0' : '') + d;
        }
    },
    mounted() {
        this.getTransactionTypes()
        this.intialize()
        this.addInvoice()
        this.setValue()
        this.date = this.dateNow()
        console.log(this.date)
    },
    components: {
        inputPrice,
        negativePrice
    },
    watch: {
        'transaction.chart_account_id'(val) {
            this.$store.dispatch('transactions/chartAccountId', val)
        },
        'transaction.remarks'(val) {
            this.$store.dispatch('transactions/transactionRemarks', val)
        },
        'transaction.checknumber'(val) {
            this.$store.dispatch('transactions/transactionCheckNumber', val)
        },
        invoices: {
            handler: function (after, before) {
                var vm = this;

                let changed = after.filter(function (p, idx) {
                    return Object.keys(p).some(function (prop) {
                        return p[prop] !== vm.$data.oldInvoices[idx][prop];
                    })
                })

                if (changed.length === 1) {

                let purchaseReceived =  _.find(vm.purchaseReceived, {value:_.head(changed).purchase_received_id});

                let headChange =  _.head(changed)

                    Object.keys(vm.invoices).forEach(function (key) {
                        if (vm.invoices[key].id === headChange.id) {
                            vm.invoices[key].date_due = purchaseReceived.date_due
                            vm.invoices[key].discount = purchaseReceived.discount
                            vm.invoices[key].amount_due = purchaseReceived.grand_total
                            vm.invoices[key].vatable_sales = purchaseReceived.vatable_sales
                            vm.invoices[key].vat_exempt_sales = purchaseReceived.vat_exempt_sales
                            vm.invoices[key].zero_rated_sales = purchaseReceived.zero_rated_sales
                            vm.invoices[key].vat_amount = purchaseReceived.vat_amount

                            if(headChange.amount_paid > 0){
                                vm.invoices[key].amount_paid = headChange.amount_paid
                            }else{
                                 vm.invoices[key].amount_paid = purchaseReceived.grand_total
                            }

                        }
                    });

                }

                vm.$store.dispatch('transactions/transactionVatableSales',  _.sumBy(vm.invoices, (i) => {
                                return i.vatable_sales;
                            }))
                vm.$store.dispatch('transactions/transactionVatExemptSales', _.sumBy(vm.invoices, (i) => {
                                return i.vat_exempt_sales;
                            }))
                vm.$store.dispatch('transactions/transactionZeroRatedSales', _.sumBy(vm.invoices, (i) => {
                                return i.zero_rated_sales;
                            }))
                vm.$store.dispatch('transactions/transactionVatAmount', _.sumBy(vm.invoices, (i) => {
                                return i.vat_amount;
                            }))
                vm.$store.dispatch('transactions/transactionDiscount', _.sumBy(vm.invoices, (i) => {
                                return i.discount;
                            }) )
                let totalAmount =  _.sumBy(vm.invoices, (i) => {
                                return i.amount_paid;
                            })
                vm.$store.dispatch('transactions/transactionTotalAmount', totalAmount )

                this.numToWords = this.withDecimal(totalAmount)
            },
            deep: true,
        },
        'transaction.transactable_type'(val) {
            if (val !== '') {
                this.$axios
                    .get(
                        `/transactions-entities?modelType=${val}`
                    )
                    .then(res => {
                        this.$store.dispatch('transactions/vendorableNames', res.data.userEntities)
                    })
            }
            this.$store.dispatch('transactions/transactionTransactableType', val)
        },
        'transaction.transactable_id'(val) {
            this.$axios.get(`transactions-get-purchase-received?modelType=${this.transaction.transactable_type}&modelId=${val}`)
                .then(res => {
                    this.invoices = []
                    this.addInvoice()
                    this.setValue()
                    this.$store.dispatch('transactions/purchaseReceived', res.data.purchaseReceived)
                    this.$store.dispatch('transactions/entityItems', res.data.entityItems)
                    this.$store.dispatch('transactions/entity', res.data.entity)
                    // console.log('res.data')
                })
            this.$store.dispatch('transactions/transactionTransactableId', val)
        }
    }
}
</script>
