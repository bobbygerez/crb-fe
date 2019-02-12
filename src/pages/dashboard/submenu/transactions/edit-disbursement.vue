<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-9">
            <q-card inline class="full-width">
                <q-card-title>
                    <div class="row">
                        <div class="col-xs-9">
                            <div class="q-title">Edit Transaction</div>
                        </div>
                        <div class="col-xs-3">
                            <q-datetime v-model="date" type="date" float-label="Date" />
                        </div>
                    </div>
                </q-card-title>
                <q-card-main>
                    <div class="row">
                        <div class="col-xs-4">
                            <q-select v-model="editTransaction.payee.payable_type" filter :options="entities" float-label="Vendor Type" clearable class="q-ml-sm" disable/>
                        </div>
                        <div class="col-xs-4">
                            <q-select v-model="editTransaction.payee.payable_id" filter :options="vendorableNames" float-label="Vendor Name" clearable class="q-ml-sm" disable/>
                        </div>
                        <div class="col-xs-4">
                            <q-input v-model="editTransaction.checknumber" float-label="Check number" class="q-ml-sm" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <q-input v-model="numToWords" float-label="In Words" class="q-ml-sm" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <br>
                            <div class="q-heading">Pay to the Order of:</div>
                            <div class="caption q-ml-md">{{ entity.name }}</div>
                            <div class="caption q-ml-md">{{ entity.address.street_lot_blk }}</div>
                            <div class="caption q-ml-md">{{ entity.address.brgy.description}} {{ entity.address.city.description }} {{ entity.address.province.description }}</div>
                        </div>
                        <div class="col-xs-3">
                            <input-price label="Vatable Sales" :value="editTransaction.vatable_sales" v-model="editTransaction.vatable_sales"></input-price>
                            <input-price label="Zero Rated Sales" :value="editTransaction.zerorated_sales" v-model="editTransaction.zero_rated_sales"></input-price>
                        </div>
                        <div class="col-xs-3">
                            <input-price label="VAT-Exempt Sales" :value="editTransaction.vatexempt_sales" v-model="editTransaction.vat_exempt_sales"></input-price>
                            <input-price label="VAT Amount" :value="editTransaction.vat_amount" v-model="editTransaction.vat_amount"></input-price>
                        </div>
                    </div>
                </q-card-main>
                <q-card-separator />
            </q-card>
        </div>
        <div class="col-xs-3">
            <div class="col-xs-8">
                <q-card inline class="q-ml-sm">
                    <q-card-main>
                        <q-select v-model="editTransaction.chart_account_id" filter :options="chartAccounts" float-label="CASH ACCOUNT" clearable />
                        <br>
                        <input-price label="Total Discount" :value="editTransaction.total_discount" v-model="editTransaction.total_discount" class="q-ml-sm"></input-price>
                        <input-price label="Cash Account Balance" :value="editTransaction.total_amount" v-model="editTransaction.total_amount" class="q-ml-sm"></input-price>
                        <q-input v-model="editTransaction.remarks" type="textarea" float-label="Remarks" :max-height="150" rows="4" hide-underline />
                    </q-card-main>
                    <q-card-separator />
                </q-card>
            </div>
        </div>

    </div>
    <br>
    <br>
    <hr>
    <div class="row">
        <div class="col-xs-12">
            <q-tabs animated swipeable inverted color="primary" align="left">
                <q-tab default name="invoices" slot="title" icon="assignment" label="Apply to Invoices" />
                <q-tab name="expenses" slot="title" icon="library_books" label="Apply to Expenses" @click="applyToExpenses" />
                <q-tab-pane name="invoices">
                    <div class="row" v-for="(invoice, key) in invoices" :key="key">
                        <div class="col-xs-3">
                            <q-btn color="primary" flat class="float-right" @click="getPurchaseReceived(invoice.purchase_received_id)">
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
                    <q-btn color="primary" flat class="float-right" @click="addInvoice">
                        <q-icon name="more_vert"></q-icon>More
                    </q-btn>
                </q-tab-pane>
                <q-tab-pane name="expenses">
                    <div class="row" v-for="(item, index) in additionalItems" :key="index">
                        <div class="col-xs-3">
                            <q-select v-model="item.item_id" filter :options="entityItems" float-label="Item Name" clearable class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-input v-model="item.desc" float-label="Particulars" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-select v-model="item.chart_account_id" filter :options="chartAccounts" float-label="GL account" clearable class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-input :value="item.tax_type" float-label="Tax Type" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-input float-label="Qty" v-model="item.qty" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-1">
                            <negative-price label="Price" :value="item.price" v-model="item.price" class="q-mr-sm"></negative-price>
                        </div>
                        <div class="col-xs-1">
                            <negative-price label="Credit Amount" :value="item.amount" v-model="item.amount"></negative-price>
                        </div>
                    </div>
                    <q-btn color="primary" flat class="float-right" @click="addAdditionalItems">
                        <q-icon name="more_vert"></q-icon>More
                    </q-btn>
                </q-tab-pane>
            </q-tabs>
        </div>
    </div>
    <q-btn color="primary" label="Update" class="float-left" @click="update" />

    <br>
    <br>
  </div>
</template>

<script>
import _ from "lodash";
import inputPrice from "components/inputs/price";
import negativePrice from "components/inputs/negativePrice";
import numberToWords from "components/mixins/numberToWords";
import {
    mapState,
    mapActions
} from "vuex";
export default {
    mixins: [numberToWords],
    data() {
        return {
            additionalItems: [],
            oldAdditionalItems: [],
            date: "",
            cashAccountBalance: 0,
            selectedItem: "",
            purchasesItems: [],
            selectedPurchase: null,
            checkNumber: "",
            numToWords: "",
            debit_amount: 0,
            credit_amount: 0,
            invoices: [],
            oldInvoices: [],
            selectedChartAccount: 0
        };
    },
    computed: {
        ...mapState("transactions", [
            "company",
            "transaction",
            "payee",
            "transactionType",
            "entities",
            "entity",
            "tax",
            "editTransaction"
        ]),
        entityItems() {
            return this.$store.getters["transactions/entityItems"].map(e => {
                return {
                    label: e.name,
                    value: e.id,
                    price: e.price,
                    chart_account_id: e.chart_account_id,
                    tax_type: e.tax_type.name,
                    tax_type_id: e.tax_type_id
                };
            });
        },
        purchaseReceived() {
            return this.$store.getters["transactions/purchaseReceived"].map(e => {
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
                };
            });
        },
        vendorableNames() {
            return this.$store.getters["transactions/vendorableNames"].map(e => {
                return {
                    label: e.name,
                    value: e.id
                };
            });
        },
        payeeName() {
            if (this.payee !== null) {
                return this.payee.name;
            }
            return "";
        },
        transactionTypes() {
            return this.$store.getters["transactions/transactionTypes"].map(e => {
                return {
                    label: e.name,
                    value: e.id
                };
            });
        },
        chartAccounts() {
            let chartAccounts = _.values(
                this.$store.getters["transactions/chartAccounts"]
            );
            let res = [];
            const cb = e => {
                res.push({
                    value: e.id,
                    label: `(${e.account_code})  ${e.name}`
                });
                e.all_children && e.all_children.forEach(cb);
            };
            chartAccounts.forEach(cb);
            return res;
        }
    },
    methods: {
        ...mapActions('transactions', ['setTax', 'setEditTransaction', 'setEditTransactionTotalAmount', 'setEditTransactionZeroRatedSales', 'setEditTransactionVatableSales', 'setEditTransactionVatExemptSales', 'setEditTransactionVatAmount']),
        applyToExpenses() {
            if (this.additionalItems.length < 1) {
                this.addAdditionalItems()
                this.setValue()
            }
        },
        addAdditionalItems() {
            let id = 1;
            if (this.additionalItems.length > 0) {
                id =
                    _.maxBy(this.additionalItems, function (o) {
                        return o.id;
                    }).id + 1;
            }
            this.additionalItems.push({
                id: id,
                item_id: '',
                tax_type_id: '',
                desc: '',
                chart_account_id: '',
                tax_type: '',
                qty: 0,
                price: 0,
                amount: 0

            })
            this.setValue()
        },
        removeInvoice(index) {
            this.invoices.splice(index, 1);
        },
        addInvoice() {
            let id = 1;
            if (this.invoices.length > 0) {
                id =
                    _.maxBy(this.invoices, function (o) {
                        return o.id;
                    }).id + 1;
            }
            this.invoices.push({
                id: id,
                purchase_received_id: "",
                date_due: "",
                amount_due: 0,
                description: "",
                discount: 0,
                amount_paid: 0,
                vatable_sales: 0,
                vat_exempt_sales: 0,
                zero_rated_sales: 0,
                vat_amount: 0,
                pay: true
            });
            this.setValue();
        },
        taxPercentage() {
            this.$axios.get('/tax-percentage').then(res => {
                this.setTax(res.data.tax)
            })
        },
        getChartAccounts() {
            this.$axios
                .get(
                    `transactions-get-chart-accounts?modelType=${this.transaction.transactable_type}&modelId=${
            this.transaction.transactable_id
          }`
                )
                .then(res => {
                    this.$store.dispatch(
                        "transactions/chartAccounts",
                        res.data.chartAccounts
                    );

                });
        },
        update() {
            this.$axios
                .put(`/disbursement_transaction/${this.editTransaction.id}?id=${this.editTransaction.id}`, {
                    invoices: this.invoices,
                    additionalItems: this.additionalItems,
                    transaction: this.editTransaction
                })
                .then(res => {
                    this.$q.notify({
                        color: "positive",
                        icon: "check",
                        message: `Transaction updated successfully.`
                    });
                })
                .catch();
        },
        intialize() {
            this.$store.dispatch("transactions/chartAccountId", 0);
            this.$store.dispatch("transactions/transactionRemarks", "");
            this.$store.dispatch("transactions/transactionCheckNumber", "");
        },
        setValue: function () {
            this.$data.oldInvoices = _.cloneDeep(this.$data.invoices);
            this.$data.oldAdditionalItems = _.cloneDeep(this.$data.additionalItems);
        },
        overAllTotal() {
            var vm = this

            let invoiceVatableSales = _.sumBy(this.invoices, i => {
                return i.vatable_sales;
            })

            let vatableItems = _.filter(this.additionalItems, (i) => {
                return i.tax_type_id === 1
            })

            let additionalVatableItems = _.sumBy(vatableItems, (i) => {
                return i.amount;
            })

            let totalVatableSales = additionalVatableItems + invoiceVatableSales
            this.setEditTransactionVatableSales(parseFloat(totalVatableSales));

            let invoiceVatExemptSales = _.sumBy(this.invoices, i => {
                return i.vat_exempt_sales;
            })

            let vatExemptItems = _.filter(this.additionalItems, (i) => {
                return i.tax_type_id === 2
            })

            let additionalVatExemptItems = _.sumBy(vatExemptItems, (i) => {
                return i.amount;
            })

            let totalVatExemptitems = invoiceVatExemptSales + additionalVatExemptItems

            this.setEditTransactionVatExemptSales(totalVatExemptitems);

            let zeroRated = _.sumBy(this.invoices, i => {
                return i.zero_rated_sales;
            })

            let zeroRatedItems = _.filter(this.additionalItems, (i) => {
                return i.tax_type_id === 3
            })

            let additionalZeroRatedItems = _.sumBy(zeroRatedItems, (i) => {
                return i.amount;
            })

            let totalZeroRated = zeroRated + additionalZeroRatedItems

            this.setEditTransactionZeroRatedSales(totalZeroRated);

            let totalVatAmount = totalVatableSales * (this.tax.percent / 100)

            this.setEditTransactionVatAmount(totalVatAmount);

            this.$store.dispatch(
                "transactions/transactionDiscount",
                _.sumBy(this.invoices, i => {
                    return i.discount;
                })
            );
            let totalInvoiceAmount = _.sumBy(this.invoices, i => {
                return i.amount_paid;
            });

            let totalAdditionalItemsAmount = _.sumBy(this.additionalItems, i => {
                return i.amount;
            });

            let totalAmount = totalInvoiceAmount + totalAdditionalItemsAmount
            this.setEditTransactionTotalAmount(totalAmount)
            this.numToWords = this.withDecimal(totalAmount);
        },
        dateNow() {
            var now = new Date();
            var y = now.getFullYear() + "/";
            var m = now.getMonth() + 1;
            var d = now.getDate();
            return "" + y + (m < 10 ? "0" : "") + m + "/" + (d < 10 ? "0" : "") + d;
        },
        edit() {
            this.$axios.get(`/transactions/${this.editTransaction.id}/edit?modelType=${this.editTransaction.transactable_type}&modelId=${this.editTransaction.transactable_id}&id=${this.editTransaction.id}`)
                .then(res => {
                    this.setEditTransaction(res.data.transaction)
                    let vm = this
                    this.$store.dispatch('transactions/purchaseReceived', res.data.transaction.purchase_received)
                    res.data.transaction.purchase_received.forEach(function (p, i) {
                        vm.invoices.push({
                            id: i + 1,
                            purchase_received_id: p.id,
                            date_due: p.date_due,
                            amount_due: p.pivot_amount_due,
                            description: p.description,
                            discount: p.pivot_discount,
                            amount_paid: p.pivot_amount_paid,
                            vatable_sales: p.pivot_vatable_sales,
                            vat_exempt_sales: p.pivot_vat_exempt_sales,
                            zero_rated_sales: p.pivot_zero_rated_sales,
                            vat_amount: p.pivot_vat_amount,
                            pay: p.pivot_pay
                        })
                        vm.setValue()
                    })
                    res.data.transaction.items.forEach(function(item, i){
                        vm.additionalItems.push({
                            id: i + 1,
                            item_id: item.id,
                            tax_type_id: item.tax_type_id,
                            desc: item.desc,
                            chart_account_id: item.chart_account_id,
                            tax_type: item.pivot_tax_type,
                            qty: item.pivot_qty,
                            price: item.price,
                            amount: item.total_amount
                        })
                        vm.setValue()
                    })

                    this.$store.dispatch(
                        "transactions/vendorableNames",
                        res.data.userEntities
                    );
                    this.$store.dispatch(
                        "transactions/payee",
                        res.data.payee
                    );
                    this.$store.dispatch("transactions/entityItems", res.data.entityItems);
                })
        }
    },
    mounted() {
        this.edit()
        this.taxPercentage()
        this.getChartAccounts()
        this.intialize();
        this.date = this.dateNow();
        this.$store.dispatch('transactions/transactionTypeId', 1)

    },
    components: {
        inputPrice,
        negativePrice
    },
    watch: {
        "transaction.chart_account_id"(val) {
            this.$store.dispatch("transactions/chartAccountId", val);
        },
        "transaction.remarks"(val) {
            this.$store.dispatch("transactions/transactionRemarks", val);
        },
        "transaction.checknumber"(val) {
            this.$store.dispatch("transactions/transactionCheckNumber", val);
        },
        additionalItems: {
            handler: function (after, before) {

                var vm = this;
                let changed = after.filter(function (p, idx) {
                    return Object.keys(p).some(function (prop) {
                        return p[prop] !== vm.$data.oldAdditionalItems[idx][prop];
                    });
                });

                if (changed.length === 1) {
                    let entityItem = _.find(vm.entityItems, {
                        value: _.head(changed).item_id
                    });

                    let headChange = _.head(changed);

                    if (headChange != null) {
                        Object.keys(vm.additionalItems).forEach(function (key) {

                            if (vm.additionalItems[key].id === headChange.id) {
                                vm.additionalItems[key].price = entityItem.price;
                                vm.additionalItems[key].desc = entityItem.label;
                                vm.additionalItems[key].chart_account_id = entityItem.chart_account_id;
                                vm.additionalItems[key].tax_type = entityItem.tax_type;
                                vm.additionalItems[key].tax_type_id = entityItem.tax_type_id;
                                if (parseInt(headChange.qty) > 0) {
                                    vm.additionalItems[key].amount = parseFloat(parseInt(headChange.qty) * entityItem.price);
                                } else {
                                    vm.additionalItems[key].amount = 0;
                                }
                            }
                        });

                    }
                    vm.overAllTotal()
                }

            },
            deep: true
        },
        invoices: {
            handler: function (after, before) {
                var vm = this;
                let changed = after.filter(function (p, idx) {
                    return Object.keys(p).some(function (prop) {
                        return p[prop] !== vm.$data.oldInvoices[idx][prop];
                    });
                });
                if (changed.length === 1) {
                    let purchaseReceived = _.find(vm.purchaseReceived, {
                        value: _.head(changed).purchase_received_id
                    });
                    let headChange = _.head(changed);
                    Object.keys(vm.invoices).forEach(function (key) {
                        if (vm.invoices[key].id === headChange.id) {
                            vm.invoices[key].date_due = purchaseReceived.date_due;
                            vm.invoices[key].discount = purchaseReceived.discount;
                            vm.invoices[key].amount_due = purchaseReceived.grand_total;
                            vm.invoices[key].vatable_sales = purchaseReceived.vatable_sales;
                            vm.invoices[key].vat_exempt_sales =
                                purchaseReceived.vat_exempt_sales;
                            vm.invoices[key].zero_rated_sales =
                                purchaseReceived.zero_rated_sales;
                            vm.invoices[key].vat_amount = purchaseReceived.vat_amount;
                            if (headChange.amount_paid > 0) {
                                vm.invoices[key].amount_paid = headChange.amount_paid;
                            } else {
                                vm.invoices[key].amount_paid = purchaseReceived.grand_total;
                            }
                        }
                    });
                }
                vm.overAllTotal()
            },
            deep: true
        },
        "editTransaction.payee.payable_type"(val) {
            if (val !== "") {
                this.$axios.get(`/transactions-entities?modelType=${val}`).then(res => {
                    this.$store.dispatch(
                        "transactions/vendorableNames",
                        res.data.userEntities
                    );
                });
            }
            this.$store.dispatch("transactions/payeePayableType", val);
        },
        "editTransaction.payee.payable_id"(val) {
            this.$axios
                .get(
                    `transactions-get-purchase-received?modelType=${
            this.editTransaction.payee.payable_type
          }&modelId=${val}`
                )
                .then(res => {
                    this.invoices = [];
                    this.addInvoice();
                    this.setValue();
                    this.$store.dispatch(
                        "transactions/purchaseReceived",
                        res.data.purchaseReceived
                    );
                    this.$store.dispatch(
                        "transactions/entityItems",
                        res.data.entityItems
                    );
                    this.$store.dispatch("transactions/entity", res.data.entity);
                    // console.log('res.data')
                });
            this.$store.dispatch('transactions/payeePayableId', val)
        }
    }
};
</script>
