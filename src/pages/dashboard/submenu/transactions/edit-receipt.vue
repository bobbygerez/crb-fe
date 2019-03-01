<template>
<div class="q-pa-sm">
    <div class="row">
        <div class="col-xs-9">
            <q-card inline class="full-width">
                <q-card-title>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="q-title">Receipt Transaction</div>
                        </div>
                        <div class="col-xs-2">
                            <q-input v-model="receiptTrans.refnum" float-label="Reference" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-input v-model="receiptTrans.receipt_number" float-label="Receipt number" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-datetime v-model="receiptTrans.created_at" type="date" float-label="Date" />
                        </div>
                    </div>
                </q-card-title>
                <q-card-main>
                    <div class="row">
                        <div class="col-xs-3">
                            <q-datetime v-model="receiptTrans.deposit_date" type="date" float-label="Deposit Ticket Id" />
                        </div>
                        <div class="col-xs-3">
                            <q-select v-model="payor.payable_type" filter :options="entities" float-label="Customer Type" class="q-ml-sm" disable />
                        </div>
                        <div class="col-xs-3">
                            <q-select v-model="payor.payable_id" filter :options="vendorableNames" float-label="Customer Name" class="q-ml-sm" disable/>
                        </div>
                        
                        <div class="col-xs-3">
                            <q-select v-model="receiptTrans.payment_method_id" filter :options="paymentMethods" float-label="Payment Method" class="q-ml-sm" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-6">
                            <br>
                            <div class="q-heading">Payor:</div>
                            <div class="caption q-ml-md">{{ receiptEntity.name }}</div>
                            <div class="caption q-ml-md">{{ receiptEntity.address.street_lot_blk }}</div>
                            <div class="caption q-ml-md">{{ receiptEntity.address.brgy.description}} {{ receiptEntity.address.city.description }} {{ receiptEntity.address.province.description }}</div>
                        </div>
                        
                        <div class="col-xs-3">
                            <input-price label="Vatable Sales" :value="receiptTrans.vatable_sales" v-model="receiptTrans.vatable_sales"></input-price>
                            <input-price label="Zero Rated Sales" :value="receiptTrans.zero_rated_sales" v-model="receiptTrans.zero_rated_sales"></input-price>
                        </div>
                        <div class="col-xs-3">
                            <input-price label="VAT-Exempt Sales" :value="receiptTrans.vat_exempt_sales" v-model="receiptTrans.vat_exempt_sales"></input-price>
                            <input-price label="VAT Amount" :value="receiptTrans.vat_amount" v-model="receiptTrans.vat_amount"></input-price>
                        </div>
                        <div class="col-xs-12">
                            <input-price label="Receipt Amount" :value="receiptTrans.receipt_amount" v-model="receiptTrans.receipt_amount"></input-price>
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
                        <q-select v-model="receiptTrans.chart_account_id" filter :options="chartAccounts" float-label="CASH ACCOUNT" />
                        <br>
                        <input-price label="Total Discount" :value="receiptTrans.total_discount" v-model="receiptTrans.total_discount" class="q-ml-sm"></input-price>
                        <!-- <input-price label="Cash Account Balance" :value="receiptTrans.total_amount" v-model="receiptTrans.total_amount" class="q-ml-sm"></input-price> -->
                        <q-input v-model="receiptTrans.remarks" type="textarea" float-label="Remarks" :max-height="150" rows="4" hide-underline />
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
                <q-tab name="revenues" slot="title" icon="library_books" label="Apply to Revenues" @click="applyToExpenses" />
                <q-tab-pane name="invoices">
                    <div class="row" v-for="(invoice, key) in invoices" :key="key">
                        <div class="col-xs-3">
                            <q-btn color="primary" flat class="float-right" @click="getSaleInvoice(invoice.sale_invoice_id)">
                                <q-icon name="pageview"></q-icon>
                            </q-btn>
                            <q-select v-model="invoice.sale_invoice_id" filter :options="saleInvoices" float-label="Invoice No." class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-datetime v-model="invoice.date_due" type="date" float-label="Date Due" />
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Amount Due" :value="invoice.amount_due" v-model="invoice.amount_due" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-2">
                            <q-input v-model="invoice.description" float-label="Description" class="q-ml-sm" />
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Discount" :value="invoice.discount" v-model="invoice.discount" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-1">
                            <input-price label="Amount Paid" :value="invoice.amount_paid" v-model="invoice.amount_paid" class="q-ml-sm"></input-price>
                        </div>
                        <div class="col-xs-2">
                            <q-select v-model="invoice.job_id" filter :options="jobs" float-label="Jobs" class="q-mr-sm" />
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
                <q-tab-pane name="revenues">
                    <div class="row" v-for="(item, index) in additionalItems" :key="index">
                        <div class="col-xs-2">
                            <q-select v-model="item.product_id" filter :options="products" float-label="Item Name" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-input v-model="item.desc" float-label="Particulars" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-select v-model="item.chart_account_id" filter :options="chartAccounts" float-label="GL account" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-2">
                            <q-select v-model="item.tax_type_id" filter :options="taxTypes" float-label="Tax types" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-1">
                            <q-input float-label="Qty" v-model="item.qty" class="q-mr-sm" />
                        </div>
                        <div class="col-xs-1">
                            <negative-price label="Price" :value="item.price" v-model="item.price" class="q-mr-sm"></negative-price>
                        </div>
                        <div class="col-xs-1">
                            <negative-price label="Discount Amt" :value="item.discount_amt" v-model="item.discount_amt" class="q-mr-sm"></negative-price>
                        </div>
                        <div class="col-xs-1">
                            <negative-price label="Credit Amount" :value="item.amount" v-model="item.amount"></negative-price>
                        </div>
                        <div class="col-xs-1">
                            <q-btn color="primary" size="sm" icon="close" flat round class="float-right" @click="removeAddtionalItems(index)" />
                            <q-select v-model="item.job_id" filter :options="jobs" float-label="Jobs" class="q-mr-sm" />

                        </div>
                    </div>
                    <q-btn color="primary" flat class="float-right" @click="addAdditionalItems">
                        <q-icon name="more_vert"></q-icon>More
                    </q-btn>
                </q-tab-pane>
            </q-tabs>
        </div>
    </div>
    <q-btn color="primary" label="Submit" class="float-left q-ml-md" @click="update" />
    <q-modal v-model="modalSaleInvoice">
        <div class="q-pa-md">
            <p class="q-title">Invoice: {{ saleInvoiceItems.label }}</p>
            <q-table ref="table" color="primary" :data="saleInvoiceItems.products" :columns="columns" hide-bottom class="no-shadow">
                
                <template slot="body" slot-scope="props">
                    <q-tr :props="props">
                        <q-td key="name" :props="props">
                            {{ props.row.name}}
                        </q-td>
                        <q-td key="qty" :props="props">
                            {{ props.row.pivot.qty }}
                        </q-td>
                        <q-td key="price" :props="props">
                            {{ props.row.pivot.price | currency('₱') }}
                        </q-td>
                    </q-tr>

                </template>
                <q-tr slot="bottom-row" slot-scope="props">
                    <q-td colspan="3" align="right">
                        <strong>{{ saleInvoiceItems.grand_total |  currency('₱') }}</strong>
                    </q-td>

                </q-tr>
            </q-table>
            <q-btn color="primary" @click="modalSaleInvoice = false" label="Close" class="q-ma-sm" />
        </div>
    </q-modal>
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
            columns: [{
                    name: 'name',
                    label: 'Name',
                    field: 'name',
                    align: 'left'
                },
                {
                    name: 'qty',
                    label: 'qty',
                    field: 'qty',
                    align: 'left'
                },
                {
                    name: 'price',
                    label: 'Price',
                    field: 'price',
                    align: 'left'
                }
            ],
            saleInvoiceItems: [],
            modalSaleInvoice: false,
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
            "receiptTrans",
            "receiptEntity",
            "payor", "editTransaction", "receiptTrans"
        ]),
        paymentMethods() {
            return this.$store.getters["transactions/paymentMethods"].map(e => {
                return {
                    label: e.name,
                    value: e.id
                };
            });
        },
        products() {
            return this.$store.getters["transactions/products"].map(e => {
                return {
                    label: e.name,
                    value: e.id,
                    price: e.price,
                    discount_amt: e.discount_amt,
                    chart_account_id: e.chart_account_id,
                    tax_type_id: e.tax_type_id
                };
            });
        },
         saleInvoices() {
            return this.$store.getters["transactions/saleInvoices"].map(e => {
                return {
                    label: `${e.invoice_no.substring(0, 21)}`,
                    value: e.id,
                    products: e.products,
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
        },
        taxTypes() {
            return this.$store.getters["transactions/taxTypes"].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
         jobs() {
            return this.$store.getters["transactions/jobs"].map(e => {
                return {
                    label: e.name,
                    value: e.id
                };
            });
        }
    },
    methods: {
        
        ...mapActions("transactions", ["setTax", "setTaxTypes", "setPaymentMethods", "setReference", "setReceiptNumber", "setCreatedAt", "setDepositDate", "setPaymentMethodId", "setReceiptEntity", "setSaleInvoices", "setChartAccountId", "setRemarks", "setTransactionTypeId", "setVatableSales", "setVatExemptSales", "setZeroRatedSales", "setVatAmount", "setTotalDiscount", "setProducts", "setReceiptAmount", "setPayor", "setReceiptTotalAmount, setEditTransaction", "setReceiptTotalAmount", "setEditTransaction", "setReceiptTrans", "setJobs"]),
        getProducts(){
            this.$axios.get('/products')
                .then(res => {
                    this.setProducts(res.data.products)
                })
        },
        getSaleInvoice(saleInvoiceId) {
            if (saleInvoiceId === "") {
                this.$q.notify({
                    color: "negative",
                    icon: "warning",
                    message: `No invoice number.`
                });
                return;
            }
            this.saleInvoiceItems = _.find(this.saleInvoices, {
                value: saleInvoiceId
            });
            this.modalSaleInvoice = true

        },
        applyToExpenses() {
            if (this.additionalItems.length < 1) {
                this.addAdditionalItems();
                this.setValue();
            }
        },
        removeAddtionalItems(index) {
            this.additionalItems.splice(index, 1);
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
                product_id: "",
                tax_type_id: "",
                desc: "",
                chart_account_id: "",
                tax_type: "",
                qty: 0,
                price: 0,
                discount_amt: 0,
                amount: 0
            });
            this.setValue();
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
                sale_invoice_id: "",
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
            this.$axios.get("/tax-percentage").then(res => {
                this.setTax(res.data.tax);
            });
        },
        create() {

            this.$axios
                .get(
                    `transactions/create?modelType=${
            this.transaction.transactable_type
          }&modelId=${this.transaction.transactable_id}`
                )
                .then(res => {
                    this.$store.dispatch(
                        "transactions/chartAccounts",
                        res.data.chartAccounts
                    );
                    this.setTaxTypes(res.data.taxTypes)
                });
        },
        update() {
            if (this.receiptTrans.transactable_type === undefined || this.receiptTrans.transactable_id === undefined) {
                this.$q.notify({
                    color: "negative",
                    icon: "warning",
                    message: `Please check the vendor.`
                });
                return;
            }
            if (this.receiptTrans.chart_account_id === 0) {
                this.$q.notify({
                    color: "negative",
                    icon: "warning",
                    message: `Please check transaction's chart of account.`
                });
                return;
            }
            this.$axios
                .put(`/sale_invoice_transaction/${this.receiptTrans.id}?id=${this.receiptTrans.id}`, {
                    invoices: this.invoices,
                    additionalItems: this.additionalItems,
                    transaction: this.receiptTrans,
                    payor: this.payor
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
            this.setChartAccountId(0)
            this.setRemarks("")
            this.setTransactionTypeId(2);

        },
        setValue: function () {
            this.$data.oldInvoices = _.cloneDeep(this.$data.invoices);
            this.$data.oldAdditionalItems = _.cloneDeep(this.$data.additionalItems);
        },
        overAllTotal() {
            var vm = this;

            let invoiceVatableSales = _.sumBy(this.invoices, i => {
                return i.vatable_sales;
            });

            let vatableItems = _.filter(this.additionalItems, i => {
                return i.tax_type_id === 1;
            });

            let additionalVatableItems = _.sumBy(vatableItems, i => {
                return i.amount;
            });
            let totalVatableSales = additionalVatableItems + invoiceVatableSales;

            this.setVatableSales(totalVatableSales)
           
            let invoiceVatExemptSales = _.sumBy(this.invoices, i => {
                return i.vat_exempt_sales;
            });
            let vatExemptItems = _.filter(this.additionalItems, i => {
                return i.tax_type_id === 2;
            });

            let additionalVatExemptItems = _.sumBy(vatExemptItems, i => {
                return i.amount;
            });
            let totalVatExemptitems =
                invoiceVatExemptSales + additionalVatExemptItems;
            
            this.setVatExemptSales(totalVatExemptitems)
            
            let zeroRated = _.sumBy(this.invoices, i => {
                return i.zero_rated_sales;
            });

            let zeroRatedItems = _.filter(this.additionalItems, i => {
                return i.tax_type_id === 3;
            });
            let additionalZeroRatedItems = _.sumBy(zeroRatedItems, i => {
                return i.amount;
            });
            let totalZeroRated = zeroRated + additionalZeroRatedItems;

            this.setZeroRatedSales(totalZeroRated)
           
            let totalVatAmount = totalVatableSales * (this.tax.percent / 100);
            
            this.setVatAmount(totalVatAmount)
            this.setTotalDiscount(
                _.sumBy(this.invoices, i => {
                    return i.discount;
                })
            )
            let totalInvoiceAmount = _.sumBy(this.invoices, i => {
                return i.amount_paid;
            });
            let totalAdditionalItemsAmount = _.sumBy(this.additionalItems, i => {
                return i.amount;
            });
            let totalAmount = totalInvoiceAmount + totalAdditionalItemsAmount;
            this.setReceiptAmount(totalAmount)
            this.setReceiptTotalAmount(totalAmount)
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
            this.$axios.get(`/sale_invoice_transaction/${this.editTransaction.id}/edit?modelType=${this.editTransaction.transactable_type}&modelId=${this.editTransaction.transactable_id}&id=${this.editTransaction.id}`)
                .then(res => {
                    this.setJobs(res.data.jobs)
                    this.setReceiptTrans(res.data.transaction)
                    let vm = this
                    this.setSaleInvoices(res.data.transaction.sale_invoices)
                    res.data.transaction.sale_invoices.forEach(function (p, i) {
                        if (res.data.transaction.sale_invoices.length > 0) {
                            vm.invoices.push({
                                id: i + 1,
                                sale_invoice_id: p.id,
                                date_due: p.date_due,
                                amount_due: p.pivot_amount_due,
                                description: p.description,
                                discount: p.pivot_discount,
                                amount_paid: p.pivot_amount_paid,
                                vatable_sales: p.pivot_vatable_sales,
                                vat_exempt_sales: p.pivot_vat_exempt_sales,
                                zero_rated_sales: p.pivot_zero_rated_sales,
                                vat_amount: p.pivot_vat_amount,
                                pay: p.pivot_pay,
                                job_id: p.pivot_job_id
                            })
                            vm.setValue()
                        }

                    })


                    let itemTransaction = res.data.transaction.product_transaction;
                    itemTransaction.forEach(function (product, i) {

                        if (itemTransaction.length > 0) {
                            vm.additionalItems.push({
                                id: i + 1,
                                product_id: product.product_id,
                                tax_type_id: product.tax_type_id,
                                desc: product.desc,
                                chart_account_id: product.chart_account_id,
                                tax_type: product.tax_type,
                                qty: product.qty,
                                price: product.price,
                                discount_amt: product.discount_amt,
                                amount: product.amount,
                                job_id: product.job_id
                            })
                            vm.setValue()

                        }

                    })

                    // this.$store.dispatch(
                    //     "transactions/vendorableNames",
                    //     res.data.userEntities
                    // );
                    // this.$store.dispatch(
                    //     "transactions/payee",
                    //     res.data.payee
                    // );
                    // this.$store.dispatch("transactions/entityItems", res.data.entityItems);
                    // this.setTaxTypes(res.data.taxTypes)
                })
        }
    },
    mounted() {
        this.edit();
        this.getProducts();
        this.taxPercentage();
        this.create();
        this.date = this.dateNow();
        this.setPaymentMethods();
    },
    components: {
        inputPrice,
        negativePrice
    },
    watch: {
        payor: {
            handler: function(newValue){
                this.setPayor(newValue)
            },
            deep: true
        },
        "receiptTrans.payment_method_id"(val){
            this.setPaymentMethodId(val)
        },
        "payor.payable_id"(val) {
            this.$axios
                .get(
                    `transactions-get-sale-invoices?modelType=${this.payor.payable_type}&modelId=${val}`
                )
                .then(res => {
                    this.setReceiptEntity(res.data.entity);
                    this.setSaleInvoices(res.data.saleInvoices)
                });
           
        },
        "payor.payable_type"(val) {
            if (val !== "") {
                this.$axios.get(`/transactions-entities?modelType=${val}`).then(res => {
                    this.$store.dispatch(
                        "transactions/vendorableNames",
                        res.data.userEntities
                    );
                });
            }
            
        },
        "receiptTrans.deposit_date"(val) {
            this.setDepositDate(val)
        },
        "receiptTrans.created_at"(val) {
            this.setCreatedAt(val)
        },
        "receiptTrans.receipt_number"(val) {
            this.setReceiptNumber(val)
        },
        "receiptTrans.reference"(val) {
            this.setReference(val)
        },
        "receiptTrans.chart_account_id"(val) {
            this.setChartAccountId(val)
        },
        "receiptTrans.remarks"(val) {
            this.setRemarks(val)
        },
        additionalItems: {
            handler: function (after, before) {

                var vm = this;

                /***
                 * Get the product that change by comparing the additional items and oldAdditionalItems
                 */
                let changed = after.filter(function (p, idx) {
                    return Object.keys(p).some(function (prop) {
                        return p[prop] !== vm.$data.oldAdditionalItems[idx][prop];
                    });
                });

                if (changed.length > 0) {
                    let product = _.find(vm.products, {
                        value: _.head(changed).product_id
                    });

                    let headChange = _.head(changed);
                    if (headChange != null) {
                        Object.keys(vm.additionalItems).forEach(function (key) {
                            if (vm.additionalItems[key].id === headChange.id) {
                                if (vm.additionalItems[key].product_id === "") {
                                    vm.additionalItems[key].price = headChange.price;
                                    vm.additionalItems[key].discount_amt = headChange.discount_amt;
                                    vm.additionalItems[key].tax_type_id = headChange.tax_type_id;
                                } else {
                                    vm.additionalItems[key].price = product.price;
                                    vm.additionalItems[key].discount_amt = product.discount_amt;
                                    vm.additionalItems[key].desc = product.label;
                                    vm.additionalItems[key].chart_account_id = product.chart_account_id;
                                    vm.additionalItems[key].tax_type_id = product.tax_type_id;
                                }

                                if (parseInt(headChange.qty) > 0) {
                                    if (vm.additionalItems[key].product_id === "") {
                                        vm.additionalItems[key].amount = parseFloat(
                                            (parseInt(headChange.qty) * headChange.price) - headChange.discount_amt
                                        );
                                    } else {
                                        vm.additionalItems[key].amount = parseFloat(
                                            (parseInt(headChange.qty) * product.price) - product.discount_amt
                                        );
                                    }

                                } else {
                                    vm.additionalItems[key].amount = 0;
                                }
                            }
                        });
                    }

                }
                this.setValue()
                vm.overAllTotal();
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

                    /**
                     * Find to saleInvoices if sale_invoice_id is the same
                     */
                    let saleInvoice = _.find(vm.saleInvoices, {
                        value: _.head(changed).sale_invoice_id
                    });


                    let headChange = _.head(changed);

                    Object.keys(vm.invoices).forEach(function (key) {
                        if (vm.invoices[key].id === headChange.id) {
                            vm.invoices[key].date_due = saleInvoice.date_due;
                            vm.invoices[key].discount = saleInvoice.discount;
                            vm.invoices[key].amount_due = saleInvoice.grand_total;
                            vm.invoices[key].vatable_sales = saleInvoice.vatable_sales;
                            vm.invoices[key].vat_exempt_sales = saleInvoice.vat_exempt_sales;
                            vm.invoices[key].zero_rated_sales = saleInvoice.zero_rated_sales;
                            vm.invoices[key].vat_amount = saleInvoice.vat_amount;
                            if (headChange.amount_paid > 0) {
                                vm.invoices[key].amount_paid = headChange.amount_paid;
                            } else {
                                vm.invoices[key].amount_paid = saleInvoice.grand_total;
                            }
                        }
                    });
                }
                vm.overAllTotal();
            },
            deep: true
        }
    }
};
</script>
