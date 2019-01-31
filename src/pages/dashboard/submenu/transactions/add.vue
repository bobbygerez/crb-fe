<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-9">
            <q-card inline class="full-width">
                <q-card-title>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="q-title">New Transaction</div>
                        </div>
                        <div class="col-xs-3">
                            <q-datetime v-model="date" type="date" float-label="Date" />
                        </div>
                        <div class="col-xs-3">
                            <q-input v-model="transaction.checknumber" float-label="Check number" class="q-ml-sm" />
                        </div>
                    </div>
                </q-card-title>
                <q-card-main>
                    <div class="row">
                        <div class="col-xs-4">
                            <q-select v-model="selectedVendorableType" filter :options="entities" float-label="Vendor Type" clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-4">
                            <q-select v-model="selectedVendorableName" filter :options="vendorableNames" float-label="Vendor Name" clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-4">
                            <q-select v-model="transaction.transaction_type_id" :options="transactionTypes" float-label="Transaction Type" clearable />
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
                            <input-price label="Vatable Sales" :value="vatable" v-model="vatable"></input-price>
                            <input-price label="Zero Rated Sales" :value="zeroRated" v-model="zeroRated"></input-price>
                        </div>
                        <div class="col-xs-3 ">
                            <input-price label="VAT-Exempt Sales" :value="vatExempt" v-model="vatExempt"></input-price>
                            <input-price label="VAT Amount" :value="vatAmount" v-model="vatAmount"></input-price>
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
                            <q-btn color="primary" flat class="float-right" >
                                <q-icon name="pageview"></q-icon> 
                            </q-btn>
                            <q-select v-model="invoice.purchase_id" filter :options="purchases" float-label="Invoice No." clearable class="q-ml-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-datetime v-model="invoice.due_date" type="date" float-label="Date Due" />
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Amount Due" :value="invoice.amount_due" v-model="invoice.amount_due" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-3">
                            <q-input v-model="invoice.description" float-label="Description" class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-input v-model="invoice.discount" float-label="Discount" class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-input v-model="invoice.amount_paid" float-label="Amount Paid" class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-checkbox
                                class="q-mt-lg"
                                v-model="invoice.pay"
                                checked-icon="check"
                                unchecked-icon="close"
                            />
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
            vatAmount: 0,
            vatable: 0,
            vatExempt: 0,
            zeroRated: 0,
            selectedItem: '',
            purchasesItems: [],
            selectedPurchase: null,
            selectedVendorableName: '',
            selectedVendorableType: '',
            checkNumber: '',
            numToWords: '',
            debit_amount: 0,
            credit_amount: 0,
            tax: 0,
            generalLedgers: [],
            oldGeneralLedgers: [],
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
        purchases() {
            return this.$store.getters['transactions/purchases'].map(e => {
                let invoice = e.invoice_no
                return {
                    label: `${invoice.substring(1, 21)}`,
                    value: e.id,
                    items: e.items
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
        removeInvoice(index){
             this.invoices.splice(index, 1)
        },
        removeGl(index) {
            if (this.generalLedgers[index].id != '') {
                this.$q.notify({
                    color: 'negative',
                    icon: 'delete',
                    message: `Delete ${this.generalLedgers[index].particulars}?`,
                    actions: [{
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
                    }]
                })
            } else {
                this.generalLedgers.splice(index, 1)
            }
        },
        addInvoice(){

            let id = 1
            if (this.invoices.length > 0) {
                id = _.maxBy(this.invoices, function (o) {
                    return o.id;
                }).id + 1;
            }

            this.invoices.push({
                id: id,
                purchase_id: '',
                due_date: '',
                amount_due: 0,
                description: '',
                discountl: 0,
                amount_paid: 0,
                pay: false
            })
            this.setValue();

        },
        addGl() {
            let id = 1
            if (this.generalLedgers.length > 0) {
                id = _.maxBy(this.generalLedgers, function (o) {
                    return o.id;
                }).id + 1;
            }
            this.generalLedgers.push({
                ledgerable_id: this.selectedUserEntity,
                ledgerable_type: this.selectedEntity,
                id: id,
                item_id: 0,
                particulars: '',
                chart_account_id: '',
                tax_type_id: '',
                tax_type: '',
                qty: 0,
                price: 0,
                tax: 0,
                debit_amount: 0,
                credit_amount: 0
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
            if (this.transactionType.taccount_id === 3) {
                if (this.debit_amount != this.credit_amount) {
                    this.$q.notify({
                        color: 'negative',
                        icon: 'warning',
                        message: `Debit and Credit amount must be equal.`
                    })
                } else {
                    this.createTransaction()
                }
            } else {

                if (this.transaction.chart_account_id === 0) {
                    this.$q.notify({
                        color: 'negative',
                        icon: 'warning',
                        message: `Transaction GL account cannot be empty.`
                    })
                } else {
                    this.createTransaction()
                }

            }
        },
        createTransaction() {
            this.$axios
                .post(`/transactions`, {
                    transaction: {
                        transactable_id: this.selectedUserEntity,
                        transactable_type: this.selectedEntity,
                        transaction_type_id: this.transaction.transaction_type_id,
                        chart_account_id: this.transaction.chart_account_id,
                        total_amount: this.transaction.total_amount,
                        checknumber: this.transaction.checknumber,
                        remarks: this.transaction.remarks
                    },
                    generalLedgers: this.generalLedgers,
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
        totalAmount(generalLedgers) {
            let debit_amount = _.sumBy(generalLedgers, function (i) {
                return i.debit_amount;
            })
            this.debit_amount = debit_amount
            let credit_amount = _.sumBy(generalLedgers, function (i) {
                return i.credit_amount;
            })
            this.credit_amount = credit_amount
            let tax = _.sumBy(generalLedgers, function (i) {
                return i.tax;
            })
            this.tax = tax
            //Disbursement Selected Normal balance is debit
            //contra account credit
            if (this.transactionType.taccount_id === 1) {
                let total_amount = parseFloat(credit_amount) + parseFloat(tax);
                this.numToWords = this.withDecimal(total_amount)
                this.$store.dispatch('transactions/transactionTotalAmount', total_amount)
                //Reciept Selected Normal balance is credit
                //contrac account debit
            } else if (this.transactionType.taccount_id === 2) {
                let total_amount = parseFloat(debit_amount) + parseFloat(tax);
                this.numToWords = this.withDecimal(total_amount)
                this.$store.dispatch('transactions/transactionTotalAmount', total_amount)
                //Debit or credit should be balance
            } else if (this.transactionType.taccount_id === 3) {
                let total_amount = parseFloat(debit_amount) - parseFloat(credit_amount);
                if (debit_amount === credit_amount) {
                    this.numToWords = this.withDecimal(debit_amount)
                    this.$store.dispatch('transactions/transactionTotalAmount', parseFloat(debit_amount))
                } else {
                    this.numToWords = ''
                    this.$store.dispatch('transactions/transactionTotalAmount', 0)
                }
            }
        },
        intialize() {
            this.$store.dispatch('transactions/chartAccountId', 0)
            this.$store.dispatch('transactions/transactionRemarks', '');
        },
        setValue: function () {
            this.$data.oldInvoices = _.cloneDeep(this.$data.invoices);
        }
    },
    mounted() {
        this.getTransactionTypes()
        this.intialize()
        this.addInvoice()
        this.setValue();
    },
    components: {
        inputPrice,
        negativePrice
    },
    watch: {
        'transaction.chart_account_id'(val) {
            this.$store.dispatch('transactions/chartAccountId', val)
        },
        'transaction.transaction_type_id'(val) {
            this.$axios.get(`transactions-get-transaction-type?id=${val}`)
                .then(res => {
                    this.$store.dispatch('transactions/transactionType', res.data.transactionType)
                    this.totalAmount(this.generalLedgers)
                })
            this.generalLedgers = []
            this.addGl()
            this.$store.dispatch('transactions/transactionTypeId', val)
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

                console.log(changed)
                if (changed.length === 1) {

                    var invoice = _.head(changed)
                    this.$axios.get(`/transactions-get-purchase?purchaseId=${invoice.purchase_id}`)
                        .then(function (res) {

                        })
                    
                }
            },
            deep: true,
        },
        generalLedgers: {
            handler: function (after, before) {
                var vm = this;

                // Compare the clone array object(oldGeneralLedgers) to generalLedgers
                let changed = after.filter(function (p, idx) {
                    return Object.keys(p).some(function (prop) {
                        return p[prop] !== vm.$data.oldGeneralLedgers[idx][prop];
                    })
                })
                // Log it
                if (changed.length === 1) {

                    var item = {}
                    this.$axios.get(`/items/${_.head(changed).item_id}?id=${_.head(changed).item_id}`)
                        .then(function (res) {
                            item = res.data.item

                            Object.keys(vm.generalLedgers).forEach(function (key) {

                                if (vm.generalLedgers[key].id === _.head(changed).id) {
                                    vm.generalLedgers[key].particulars = item.desc
                                    vm.generalLedgers[key].chart_account_id = item.chart_account_id
                                    vm.generalLedgers[key].price = item.price
                                    vm.generalLedgers[key].tax_type_id = item.tax_type_id
                                    vm.generalLedgers[key].tax_type = item.tax_type.name
                                    if (_.head(changed).qty != null) {
                                        vm.generalLedgers[key].credit_amount = parseFloat(item.price) * _.head(changed).qty
                                    }

                                }
                            });

                            let vatableItems = _.filter(vm.generalLedgers, (i) => {
                                return i.tax_type_id === 1
                            })
                            vm.vatable = _.sumBy(vatableItems, (i) => {
                                return i.price * i.qty;
                            })

                            let vatExemptItems = _.filter(vm.generalLedgers, (i) => {
                                return i.tax_type_id === 2
                            })

                            vm.vatExempt = _.sumBy(vatExemptItems, (i) => {
                                return i.price * i.qty;
                            })

                            let zeroRated = _.filter(vm.generalLedgers, (i) => {
                                return i.tax_type_id === 3
                            })
                            vm.zeroRated = _.sumBy(zeroRated, (i) => {
                                return i.price * i.qty;
                            })
                        })
                }
                vm.setValue();
                this.totalAmount(after)
            },
            deep: true,
        },
        'selectedVendorableType'(val) {
            if (val !== '') {
                this.$axios
                    .get(
                        `/transactions-entities?modelType=${val}`
                    )
                    .then(res => {
                        this.$store.dispatch('transactions/vendorableNames', res.data.userEntities)
                        // this.$store.dispatch('transactions/selectedUserEntity', '')
                    })
            }
        },
        'selectedVendorableName'(val) {
            this.$axios.get(`transactions-get-purchases?modelType=${this.selectedVendorableType}&modelId=${val}`)
                .then(res => {
                    this.generalLedgers.length = 0;
                    this.addGl()
                    this.setValue();
                    this.$store.dispatch('transactions/purchases', res.data.purchases)
                    this.$store.dispatch('transactions/entityItems', res.data.entityItems)
                    this.$store.dispatch('transactions/entity', res.data.entity)
                    console.log('res.data')
                })
        },
        'selectedPurchase'(val) {
            if (val !== null) {
                this.purchasesItems = _.find(this.purchases, (x) => {
                    return x.value === val
                })
                let total_amount = _.sumBy(this.purchasesItems.items, (i) => {
                    return i.total_amount;
                })
                let vatableItems = _.filter(this.purchasesItems.items, (i) => {
                    return i.tax_type_id === 1
                })
                this.vatable = _.sumBy(vatableItems, (i) => {
                    return i.total_amount;
                })
                this.vatAmount = _.sumBy(vatableItems, (i) => {
                    return i.purchase_tax;
                })
                let vatExemptItems = _.filter(this.purchasesItems.items, (i) => {
                    return i.tax_type_id === 2
                })
                this.vatExempt = _.sumBy(vatExemptItems, (i) => {
                    return i.total_amount;
                })
                let zeroRated = _.filter(this.purchasesItems.items, (i) => {
                    return i.tax_type_id === 3
                })
                this.zeroRated = _.sumBy(zeroRated, (i) => {
                    return i.total_amount;
                })
                this.$store.dispatch('transactions/transactionTotalAmount', total_amount)
                this.numToWords = this.withDecimal(total_amount)
            } else {
                this.purchasesItems = []
            }
        }
    }
}
</script>
