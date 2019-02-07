<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      :title="`${purchaseRequest.name} order details`"
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
            key="item"
            :props="props"
          >
            {{ props.row.items[0].name }}
            <q-popover
              touch-position
              v-if="actions"
            >
              <q-list
                link
                style="min-width: 100px"
              >
                <template v-for="(action, idx) in actions">
                  <q-item
                    :key="idx"
                    @click.native="myFunction(action, props.row)"
                    v-close-overlay
                  >
                    <q-item-main
                      :label="capitalize(action)"
                      :disabled="disabled(props)"
                    />
                  </q-item>
                </template>
              </q-list>
            </q-popover>
          </q-td>
          <q-td
            key="company_name"
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
          <!-- <q-td
            key="price"
            :props="props"
          >
            {{ price(props) |currency('₱ ') }}
          </q-td>
          <q-td
            key="qty"
            :props="props"
          >
            {{ price(props) }}
          </q-td> -->
          <q-td
            key="freight"
            :props="props"
          >
            {{ props.row.items[0].purchases[0].pivot.freight |currency('₱ ') }}
          </q-td>
          <q-td
            key="date_delivery"
            :props="props"
          >
            {{ props.row.items[0].purchases[0].pivot.date_delivery }}
          </q-td>
          <q-td
            key="package"
            :props="props"
          >
            {{ props.row.items[0].package.name }}
          </q-td>
          <q-td
            key="approved_by"
            :props="props"
          >
            {{ props.row.items[0].purchases[0].pivot.approved_by }} <br />
            {{ props.row.items[0].purchases[0].pivot.date_approved }}
          </q-td>

        </q-tr>

      </template>

    </q-table>
    <!-- <q-modal
      v-model="editPurchaseItemModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Order From {{ purchaseItem.name }} </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              :value="`${purchaseItem.items[0].name}`"
              float-label="Item Name"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              :value="purchaseItem.pivot.vendorable_type.substring(10)"
              float-label="Vendorable Type"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              :value="purchaseItem.name"
              :float-label="`${purchaseItem.pivot.vendorable_type.substring(10)} Name`"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <input-price
              label="Price"
              :value="pivotPrice"
              v-model="pivotPrice"
            ></input-price>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="pivotQty"
              float-label="Quantity"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <input-price
              label="Freight"
              :value="pivotFreight"
              v-model="pivotFreight"
            ></input-price>
          </div>
        </div>
        <br />
        <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="update()"
          label="Update"
          class="q-ml-sm"
        />
      </div>
    </q-modal>
    <q-modal
      v-model="newPurchaseItemModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-search
              v-model="terms"
              placeholder="Search Item..."
              float-label="Item Name"
            >
              <q-autocomplete
                :static-data="{field: 'label', list: itemLists }"
                @selected="selected"
              />
            </q-search>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="newPivotQty"
              float-label="Quantity"
            />
          </div>
        </div>
        <br />
        <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="store()"
          label="Submit"
          class="q-ml-sm"
        />
      </div>
    </q-modal> -->
  </div>
</template>

<script>
import inputPrice from 'components/inputs/price'
import _ from 'lodash'
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      newPivotQty: 0,
      terms: '',
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
        label: 'Company Name',
        field: 'company_name',
        align: 'left'
      },
      {
        name: 'vendorable_type',
        label: 'Vendor Type',
        field: 'vendorable_type',
        align: 'left'
      },
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
        name: 'freight',
        label: 'Freight',
        field: 'freight',
        align: 'left'
      },
      {
        name: 'date_delivery',
        label: 'Delivery date',
        field: 'date_delivery',
        align: 'left'
      },
      {
        name: 'package',
        label: 'Package',
        field: 'package',
        align: 'left'
      },
      {
        name: 'approved_by',
        label: 'Approved by',
        field: 'approved_by',
        align: 'left'
      }
      ],
      filter: '',
      loading: false
    }
  },
  components: {
    inputPrice
  },
  computed: {

    ...mapState('purchaseRequests', ['purchaseRequest', 'purchaseItem', 'item']),
    itemLists () {
      return this.$store.getters['purchaseRequests/itemLists'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    newPurchaseItemModal: {
      get () {
        return this.$store.getters['purchaseRequests/newPurchaseItemModal']
      },
      set (val) {
        this.$store.dispatch('purchaseRequests/newPurchaseItemModal', val)
      }
    },
    pivotPrice: {
      get () {
        return parseFloat(this.purchaseItem.items[0].purchases[0].pivot.price)
      },
      set (val) {
        this.$store.dispatch('purchaseRequests/pivotPrice', parseFloat(val))
      }
    },
    pivotQty: {
      get () {
        return this.purchaseItem.items[0].purchases[0].pivot.qty
      },
      set (val) {
        this.$store.dispatch('purchaseRequests/pivotQty', val)
      }
    },
    pivotFreight: {
      get () {
        return parseFloat(this.purchaseItem.items[0].purchases[0].pivot.freight)
      },
      set (val) {
        this.$store.dispatch('purchaseRequests/pivotFreight', parseFloat(val))
      }
    }
  },
  methods: {
    disabled (props) {
      let items = props.row.items
      if (props.row.items.length > 0) {
        if (items[0].purchases.length > 0) {
          return items[0].purchases[0].pivot.approved_by != null
        }
      }
      return true
    },
    price (props) {
      let items = props.row
      if (props.row.items.length > 0) {
        return parseFloat(items[0].purchases[0].pivot.price)
      }
      return 0
    },
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
      this.$store.dispatch('purchaseRequests/item', item)
    },
    capitalize (string) {
      return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
    },
    myFunction (action, propsRow) {
      let status = propsRow.items[0].purchases[0].pivot.approved_by
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
    store () {
      this.$axios
        .post(`/purchase_items`, {
          item: this.item,
          purchaseId: this.$route.params.id,
          qty: this.newPivotQty
        })
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.item.label} created successfully`
          })
        })
    },
    deleteRow (propsRow) {
      let purchaseId = propsRow.items[0].purchases[0].id
      let pivotId = propsRow.items[0].purchases[0].pivot.id
      this.$store.dispatch('purchaseRequests/purchaseItem', propsRow)
      this.$q.notify({
        color: 'negative',
        icon: 'delete',
        message: `Cancel Order in ${propsRow.items[0].name}?`,
        actions: [{
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
        }]
      })
    },
    update () {
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
    hideModal () {
      this.editPurchaseItemModal = false
      this.$store.dispatch('purchaseRequests/newPurchaseItemModal', false)
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>
