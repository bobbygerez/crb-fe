<template>
<<<<<<< HEAD
<div>
    <q-table ref="table" color="primary" :title="`${purchaseRequest.name} order details`" :data="serverData" :columns="columns" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="item" :props="props">
                    {{ props.row.items[0].name }}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="myFunction(action, props.row)" v-close-overlay>
                                    <q-item-main :label="capitalize(action)" :disabled="props.row.items[0].purchases[0].pivot.approved_by != null" />
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>
                </q-td>
                <q-td key="company_name" :props="props">
                    {{ props.row.name}}
                </q-td>
                <q-td key="vendorable_type" :props="props">
                    {{ props.row.pivot.vendorable_type.substring(10) }}
                </q-td>
                <q-td key="price" :props="props">
                    {{ props.row.items[0].purchases[0].pivot.price |currency('₱ ') }}
                </q-td>
                <q-td key="qty" :props="props">
                    {{ props.row.items[0].purchases[0].pivot.qty }}
                </q-td>
                <q-td key="freight" :props="props">
                    {{ props.row.items[0].purchases[0].pivot.freight |currency('₱ ') }}
                </q-td>
                <q-td key="date_delivery" :props="props">
                    {{ props.row.items[0].pivot_date_delivery }}
                </q-td>
                <q-td key="package" :props="props">
                    {{ props.row.items[0].package.name }}
                </q-td>
                <q-td key="approved_by" :props="props">
                    {{ props.row.items[0].purchases[0].pivot.approved_by }} <br />
                    {{ props.row.items[0].pivot_date_approved }}
                </q-td>
=======
  <div>
    <q-table
      ref="table"
      color="primary"
      :title="'Purchase Items'"
      :data="serverData"
      :columns="columns"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr :props="props">
          <q-td
            key="name"
            :props="props"
          >
            {{ props.row.name}}
          </q-td>
          <q-td
            key="vendorable_type"
            :props="props"
          >
            {{ props.row.pivot.vendorable_type.substring(10) }}
          </q-td>
          <q-td
            key="item"
            :props="props"
          >
            {{ props.row.items[0].name }}
          </q-td>
          <q-td
            key="price"
            :props="props"
          >
            {{ props.row.items[0].purchases[0].pivot.price |currency('₱ ') }}
          </q-td>
          <q-td
            key="qty"
            :props="props"
          >
            {{ props.row.items[0].purchases[0].pivot.qty }}
          </q-td>
          <q-td
            key="package"
            :props="props"
          >
            {{ props.row.items[0].package.name }}
          </q-td>
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d

        </q-tr>

      </template>

    </q-table>
    <q-modal v-model="editPurchaseItemModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="q-display-1 q-mb-md">Order From {{ purchaseItem.name }} </div>

            <div class="row">
                <div class="col-xs-12 col-sm-4">
                    <q-input :value="`${purchaseItem.items[0].name}`" float-label="Item Name" disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input :value="purchaseItem.pivot.vendorable_type.substring(10)" float-label="Vendorable Type" disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input :value="purchaseItem.name" :float-label="`${purchaseItem.pivot.vendorable_type.substring(10)} Name`" disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <input-price label="Price" :value="pivotPrice" v-model="pivotPrice"></input-price>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="pivotQty" float-label="Quantity" />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <input-price label="Freight" :value="pivotFreight" v-model="pivotFreight"></input-price>
                </div>
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="update()" label="Update" class="q-ml-sm" />

        </div>
    </q-modal>
    <q-modal v-model="newPurchaseItemModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="row">
                
                <div class="col-xs-12 col-sm-4">
                    <q-search v-model="itemName" placeholder="Search Item..." float-label="Item Name">
                        <q-autocomplete :static-data="{field: 'label', list: itemLists }" @selected="selected" />
                    </q-search>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="newItemPivotQty" float-label="Quantity" />
                </div>
               
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm" />

        </div>
<<<<<<< HEAD
    </q-modal>
</div>
=======
    </q-modal> -->
  </div>
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d
</template>

<script>
import inputPrice from 'components/inputs/price'
import _ from 'lodash'
import {
  mapState
} from 'vuex'
export default {
<<<<<<< HEAD
    data() {
        return {
            newItemPivotQty: 0,
            floatLabel: 'Entity Name',
            placeholderItemableType: '',
            itemableTypeSelect: [{
                    value: 'App\\Model\\Logistic',
                    label: 'Logistic'
                },
                {
                    value: 'App\\Model\\Branch',
                    label: 'Branch'
                },
                {
                    value: 'App\\Model\\Commissary',
                    label: 'Commissary'
                }
            ],
            entityTerms: '',
            itemName: '',
            pivotPricee: 0,
            actions: ['edit', 'cancel order'],
            editPurchaseItemModal: false,
            options: [5, 10, 15, 20],
            lastPage: '',
            serverData: [],
            serverPagination: {
                page: 1,
                rowsNumber: 10,
                rowsPerPage: 10 // specifying this determines pagination is server-side
            },
            columns: [{
                    name: 'item',
                    label: 'Item Name',
                    field: 'item',
                    align: 'left'
                },
                {
                    name: 'company_name',
                    label: 'Vendor Name',
                    field: 'company_name',
                    align: 'left'
                },
                {
                    name: 'vendorable_type',
                    label: 'Vendor Type',
                    field: 'vendorable_type',
                    align: 'left'
                },
=======
  data () {
    return {
      terms: '',
      itemableId: '',
      placeholderItemableType: '',
      itemableType: [{
        value: 'App\\Model\\Logistic',
        label: 'Logistic'
      },
      {
        value: 'App\\Model\\Branch',
        label: 'Branch'
      },
      {
        value: 'App\\Model\\Commissary',
        label: 'Commissary'
      },
      {
        value: 'App\\Model\\OtherVendor',
        label: 'Other Vendor'
      }
      ],
      actions: ['edit', 'delete', 'purchase items'],
      editotherVendorsModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [{
        name: 'name',
        label: 'Company Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'vendorable_type',
        label: 'Vendor Type',
        field: 'vendorable_type',
        align: 'left'
      },
      {
        name: 'item',
        label: 'Item Name',
        field: 'item',
        align: 'left'
      },
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d

      {
        name: 'price',
        label: 'Price',
        field: 'price',
        align: 'left'
      },
      {
        name: 'qty',
        label: 'Quantity',
        field: 'qty',
        align: 'left'
      },
      {
        name: 'package',
        label: 'Package',
        field: 'package',
        align: 'left'
      }

        // {
        //     name: 'order_date',
        //     label: 'Order Date',
        //     field: 'order_date',
        //     align: 'left'
        // },
        // {
        //     name: 'prepared_by',
        //     label: 'Prepared By',
        //     field: 'prepared_by',
        //     align: 'left'
        // },
        // {
        //     name: 'noted_by',
        //     label: 'Noted By',
        //     field: 'noted_by',
        //     align: 'left'
        // },
        // {
        //     name: 'approved_by',
        //     label: 'Approved By',
        //     field: 'approved_by',
        //     align: 'left'
        // },
        // {
        //     name: 'purchase_by',
        //     label: 'Purchase By',
        //     field: 'purchase_by',
        //     align: 'left'
        // },
        // {
        //     name: 'purchasable_type',
        //     label: 'Purchase Type',
        //     field: 'purchasable_type',
        //     align: 'left'
        // }

      ],
      filter: '',
      loading: false
    }
  },
  components: {
    inputPrice
  },
  computed: {
    ...mapState('items', ['item', 'editItemModal', 'newItemModal']),

    packages () {
      return this.$store.getters['items/packages'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
<<<<<<< HEAD
    components: {
        inputPrice
    },
    computed: {
        ...mapState('purchaseRequests', ['purchaseRequest', 'purchaseItem', 'item']),
        packages() {
            return this.$store.getters['items/packages'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        vendors() {
            return this.$store.getters['purchaseRequests/vendors'].map(e => {
                return {
                    label: `${e.pivot.rank}.) ${e.name}(${e.pivot.volume})(${e.pivot.dis_percentage}%)`,
                    value: e.pivot.id
                }
            })
        },
        itemLists() {
            return this.$store.getters['purchaseRequests/itemLists'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        newPurchaseItemModal: {
            get() {
                return this.$store.getters['purchaseRequests/newPurchaseItemModal']
            },
            set(val) {
                this.$store.dispatch('purchaseRequests/newPurchaseItemModal', val);
            }
        },
        pivotPrice: {
            get() {

                return parseFloat(this.purchaseItem.items[0].purchases[0].pivot.price)
            },
            set(val) {
                this.$store.dispatch('purchaseRequests/pivotPrice', parseFloat(val))
            }
        },
        pivotQty: {
            get() {
                return this.purchaseItem.items[0].purchases[0].pivot.qty
            },
            set(val) {
                this.$store.dispatch('purchaseRequests/pivotQty', val)
            }
        },
        pivotFreight: {
            get() {
                return parseFloat(this.purchaseItem.items[0].purchases[0].pivot.freight)
            },
            set(val) {
                this.$store.dispatch('purchaseRequests/pivotFreight', parseFloat(val))
            }
=======
    userEntities () {
      return this.$store.getters['items/userEntities'].map(e => {
        return {
          label: e.name,
          value: e.id
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d
        }
      })
    }
  },
  methods: {
    notedBy (purchaseRequestId) {
      this.$axios.get(`purchases-noted-by?id=${purchaseRequestId}`)
        .then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `Noted by was successfully updated.`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
<<<<<<< HEAD
    methods: {
        notedBy(purchaseRequestId) {
            this.$axios.get(`purchases-noted-by?id=${purchaseRequestId}`)
                .then(res => {
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `Noted by was successfully updated.`
                    })
                    this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                    })
                })

        },
        approvedBy(purchaseRequestId) {
            this.$axios.get(`purchases-approved-by?id=${purchaseRequestId}`)
                .then(res => {
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `Approved by was successfully updated.`
                    })
                    this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                    })
                })

        },
        selected(item) {
            this.$store.dispatch('purchaseRequests/item', item)
            this.$q.notify(`Selected suggestion "${item.label}"`)
        },
        capitalize(string) {
            return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
        },
        myFunction(action, propsRow) {
            let status = propsRow.items[0].purchases[0].pivot.approved_by;
            if (action === 'edit') {
                if (status === null) {
                    this.$store.dispatch('purchaseRequests/purchaseItem', propsRow)
                    this.editPurchaseItemModal = true

                }
            } else if (action === 'cancel order') {
                if (status === null) {
                    this.deleteRow(propsRow)
                }
            }
        },
        store() {
            this.$axios
                .post(`/purchase_items`, {
                    item: this.item,
                    qty: this.newItemPivotQty,
                    purchaseId: this.$route.params.id
                })
                .then(res => {
                    this.hideModal()
                    this.$q.notify({
=======
    approvedBy (purchaseRequestId) {
      this.$axios.get(`purchases-approved-by?id=${purchaseRequestId}`)
        .then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `Approved by was successfully updated.`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
      this.$store.dispatch('items/itemItemableId', item.value)
    },
    capitalize (string) {
      return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
    },
    myFunction (action, purchaseId) {
      if (action === 'edit') {
        this.edit(purchaseId)
      } else if (action === 'delete') {
        this.deleteRow(purchaseId)
      } else if (action === 'items') {
        this.$router.push(`purchase-request/${purchaseId}/purchase-items`)
      }
    },
    store () {
      this.$axios
        .post(`/items`, this.item)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.item.name} created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (itemId) {
      this.$axios.get(`/items/${itemId}?id=${itemId}`)
        .then((res) => {
          this.$store.dispatch('items/item', res.data.item)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.item.name}?`,
            actions: [

              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/items/${this.item.id}?id=${this.item.id}`)
                    .then((res) => {
                      this.$q.notify({
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d
                        color: 'positive',
                        icon: 'check',
                        message: `${this.item.name} deleted successfully`
                      })
                      this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                      })
                      this.loading = false
                    })
<<<<<<< HEAD
                })
        },
        deleteRow(propsRow) {
            let purchaseId = propsRow.items[0].purchases[0].id
            let pivotId = propsRow.items[0].purchases[0].pivot.id
            this.$store.dispatch('purchaseRequests/purchaseItem', propsRow)
            this.$q.notify({
                color: 'negative',
                icon: 'delete',
                message: `Cancel Order in ${propsRow.items[0].name}?`,
                actions: [

                    {
                        label: 'OK',
                        handler: () => {
                            this.$axios.delete(`/purchase_items/${purchaseId}?id=${purchaseId}&pivotId=${pivotId}`)
                                .then((res) => {
                                    this.$q.notify({
                                        color: 'positive',
                                        icon: 'check',
                                        message: `${propsRow.items[0].name} deleted successfully`
                                    })
                                    this.request({
                                        pagination: this.serverPagination,
                                        filter: this.filter
                                    })
                                    this.loading = false
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
        },
        update() {
            this.$axios.put(`/purchase_items/${this.purchaseItem.id}`, this.purchaseItem)
                .then((res) => {
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.purchaseItem.items[0].name} updated successfully`
                    })
                    this.hideModal()
                })
                .catch()
        },

        request(props) {
            this.loading = true
            this.$axios
                .get(
                    `/purchase_items?id=${this.$route.params.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
                )
                .then(res => {
                    this.serverPagination = props.pagination
                    this.serverData = _.values(res.data.purchaseItems.data)
                    this.serverPagination.rowsNumber = res.data.purchaseItems.total
                    this.lastPage = res.data.purchaseItems.last_page
                    this.$store.dispatch('purchaseRequests/purchaseRequest', res.data.purchase)
                    this.loading = false
                })
                .catch(error => {
                    // there's an error... do SOMETHING
                    console.log(error)
                    // we tell QTable to exit the "loading" state
                    this.loading = false
                })
        },
        hideModal() {
            this.editPurchaseItemModal = false
            this.$store.dispatch('purchaseRequests/newPurchaseItemModal', false)
            this.request({
                pagination: this.serverPagination,
                filter: this.filter
            })
        },
        showModal() {
            this.$store.dispatch('purchaseRequests/editPurchaseItemModal', true)
        }
=======
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
        })
      // .catch()
>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d
    },
    update () {
      this.$axios.put(`/items/${this.item.id}`, this.item)
        .then((res) => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.item.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
<<<<<<< HEAD
        this.getItemLists()
    }
=======
        .catch()
    },

    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/purchase_items?id=${this.$route.params.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.purchaseItems.data)
          this.serverPagination.rowsNumber = res.data.purchaseItems.total
          this.lastPage = res.data.purchaseItems.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (itemId) {
      this.$axios.get(`items/${itemId}/edit?id=${itemId}`)
        .then(res => {
          this.showModal()
          this.$store.dispatch('items/item', res.data.item)
        })
    },
    hideModal () {
      this.$store.dispatch('items/editItemModal', false)
      this.$store.dispatch('items/newItemModal', false)
    },
    showModal () {
      this.$store.dispatch('items/editItemModal', true)
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'item.sku' (val) {
      this.$store.dispatch('items/itemSKU', val)
    },
    'item.barcode' (val) {
      this.$store.dispatch('items/itemBarcode', val)
    },
    'item.name' (val) {
      this.$store.dispatch('items/itemName', val)
    },
    'item.price' (val) {
      this.$store.dispatch('items/itemPrice', val)
    },
    'item.qty' (val) {
      this.$store.dispatch('items/itemQty', val)
    },
    'item.package_id' (val) {
      this.$store.dispatch('items/itemPackageId', val)
    },
    'item.minimum' (val) {
      this.$store.dispatch('items/itemMinimum', val)
    },
    'item.maximum' (val) {
      this.$store.dispatch('items/itemMaximum', val)
    },
    'item.reorder_level' (val) {
      this.$store.dispatch('items/itemReorderLevel', val)
    },
    'item.desc' (val) {
      this.$store.dispatch('items/itemDesc', val)
    },
    'item.itemable_type' (val) {
      if (val === undefined || val === '') {
        return
      }
      this.terms = ''
      this.placeholderItemableType = 'Search ' + val.substring(10) + '...'
      this.$axios.get(`modelable-user-models?modelType=${val}`)
        .then(res => {
          this.$store.dispatch('items/itemItemableType', val)
          this.$store.dispatch('items/userEntities', res.data.userModels)
        })
    }

  }

>>>>>>> 14e47c2b5be66e21829e43c9737681c9d4ca698d
}
</script>
