<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Items"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template
        slot="top-right"
        slot-scope="props"
      >
        <q-search
          hide-underline
          v-model="filter"
        />
      </template>

      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr :props="props">
          <q-td key="name">
            {{props.row.name}}
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
                    @click.native="myFunction(action, props.row.id)"
                    v-close-overlay
                  >
                    <q-item-main :label="capitalize(action)" />
                  </q-item>
                </template>
              </q-list>
            </q-popover>
          </q-td>
          <q-td
            key="price"
            :props="props"
          >
            {{ props.row.price|currency('₱ ') }}
          </q-td>
          <q-td
            key="qty"
            :props="props"
          >
            {{ props.row.qty }}
          </q-td>
          <q-td
            key="package"
            :props="props"
          >
            {{ props.row.package.name }}
          </q-td>
          <q-td
            key="minimum"
            :props="props"
          >
            {{ props.row.minimum }}
          </q-td>
          <q-td
            key="maximum"
            :props="props"
          >
            {{ props.row.maximum }}
          </q-td>
          <q-td
            key="reorder_level"
            :props="props"
          >
            {{ props.row.reorder_level }}
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              round
              outline
              color="positive"
              icon="edit"
              class="q-ma-sm"
              @click="edit(props.row.id)"
            />
            <q-btn
              round
              outline
              color="negative"
              icon="delete"
              class="q-ma-sm"
              @click="deleteRow(props.row.id)"
            />
          </q-td>
        </q-tr>

      </template>

      <div
        slot="pagination"
        slot-scope="props"
        class="row flex-center q-py-sm"
      >
        <q-btn
          round
          dense
          size="sm"
          icon="undo"
          color="secondary"
          class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div
          class="q-mr-sm"
          style="font-size: small"
        >
          Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </div>
        <q-btn
          round
          dense
          size="sm"
          icon="redo"
          color="secondary"
          :disable="paginationLast(props.pagination.page)"
          @click="props.nextPage"
        />
      </div>

    </q-table>

    <q-modal
      v-model="editItemModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ item.name }}</div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.name"
              float-label="Name"
              clearable
            />
          </div>

          <div class="col-xs-12 col-sm-4">
            <input-price
              label="Price"
              :value="item.price"
              v-model="item.price"
            ></input-price>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.qty"
              float-label="In stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="item.package_id"
              :options="packages"
              float-label="Package"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="item.minimum"
              float-label="Minimum Stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="item.maximum"
              float-label="Maximum Stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="item.reorder_level"
              float-label="Reorder Level"
              suffix="%"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="item.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
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
          @click="update()"
          label="Submit"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
    <!-- <q-modal
      v-model="newOtherVendorModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">New Other-Vendor </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="otherVendor.name"
              float-label="Other Vendor's name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="otherVendor.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="otherVendor.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="otherVendor.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="otherVendor.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="otherVendor.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="otherVendor.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="otherVendor.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="otherVendor.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="otherVendor.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="otherVendor.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="otherVendor.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="otherVendor.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="otherVendor.address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      actions: ['edit', 'delete', 'add vendor'],
      editotherVendorsModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'price', label: 'Price', field: 'price', align: 'left' },
        { name: 'qty', label: 'In stock', field: 'qty', align: 'left' },
        { name: 'package', label: 'Package', field: 'package', align: 'left' },
        { name: 'minimum', label: 'Minimum', field: 'minimum', align: 'left' },
        { name: 'maximum', label: 'Maximum', field: 'maximum', align: 'left' },
        { name: 'reorder_level', label: 'Re-order Level', field: 'reorder_level', align: 'left' }
      ],
      filter: '',
      loading: false
    }
  },
  components: {
    inputPrice
  },
  computed: {
    ...mapState('otherVendors', ['otherVendor', 'newOtherVendorModal']),
    ...mapState('items', ['item', 'editItemModal']),

    packages () {
      return this.$store.getters['items/packages'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    capitalize (string) {
      return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
    },
    myFunction (action, itemId) {
      if (action === 'edit') {
        this.edit(itemId)
      } else if (action === 'delete') {
        this.deleteRow(itemId)
      } else if (action === 'add vendor') {
        console.log('asdf')
      }
    },
    store () {
      this.$axios
        .post(`/other_vendors`, this.otherVendor)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.otherVendor.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (otherVendorId) {
      this.$axios.get(`/other_vendors/${otherVendorId}?id=${otherVendorId}`)
        .then((res) => {
          this.$store.dispatch('otherVendors/otherVendor', res.data.otherVendor)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.otherVendor.name}?`,
            actions: [

              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/other_vendors/${this.otherVendor.id}?id=${this.otherVendor.id}`)
                    .then((res) => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.otherVendor.name} deleted successfully`
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
        })
      // .catch()
    },
    update () {
      this.$axios.put(`/items/${this.item.id}`, this.item)
        .then((res) => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.otherVendor.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },

    paginationLast (currentPage) {
      if (this.lastPage > currentPage) {
        return false
      }
      return true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/items?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.items.data)
          this.serverPagination.rowsNumber = res.data.items.total
          this.lastPage = res.data.items.last_page
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
    }
  }

}
</script>
