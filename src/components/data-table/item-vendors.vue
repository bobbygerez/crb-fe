<template>
<div>
    <q-table ref="table" color="primary" :title="`${item.name} vendors`" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="name">
                    {{props.row.name}}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="myFunction(action, props.row.id, props.row.pivot.vendorable_id, props.row.pivot.vendorable_type)" v-close-overlay>
                                    <q-item-main :label="capitalize(action)" />
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>
                </q-td>
                <q-td key="type" :props="props">
                    {{ reduceString(props.row.pivot.vendorable_type) }}
                </q-td>
                <q-td key="rank" :props="props">
                    {{ props.row.pivot.rank }}
                </q-td>
                <q-td key="dis_percentage" :props="props">
                    {{ `${props.row.pivot.dis_percentage}%`  }}
                </q-td>
            </q-tr>

        </template>


    </q-table>
    <q-modal v-model="editVendorableModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">

            <div class="row">
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="vendorName" float-label="Name" disable />
                </div>
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="vendorType" float-label="Type" disable />
                </div>

                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="vendorable.pivot.rank " float-label="Prospect level" clearable />
                </div>
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="vendorable.pivot.dis_percentage " float-label="Distribution Percentage" suffix="%" clearable/>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-datetime v-model="vendorable.pivot.start_date" type="date" float-label="Start Date"/>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-datetime v-model="vendorable.pivot.end_date" type="date" float-label="End Date"/>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <input-price label="Price" :value="vendorablPrice" v-model="vendorablePrice"></input-price>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="vendorable.pivot.volume" float-label="Volume" clearable/>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="createdBy" float-label="Created By" clearable disable/>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="approvedBy" float-label="Approved By" clearable disable/>
                </div>
                <div class="col-xs-12 col-sm-12">
                    <q-input v-model="vendorable.pivot.remarks" type="textarea" float-label="Remarks" :max-height="100" rows="2" />
                </div>
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm" />

        </div>
    </q-modal>
    <!-- <q-modal
      v-model="vendorableModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">{{ item.name }}'s vendor</div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.sku"
              float-label="SKU"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.barcode"
              float-label="Barcode"
              clearable
            />
          </div>

          <div class="col-xs-12 col-sm-4">
            <input-price label="Price" :value="item.price" v-model="item.price"></input-price>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.qty"
              float-label="In stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="item.package_id"
              :options="packages"
              float-label="Package"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.minimum"
              float-label="Minimum Stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="item.maximum"
              float-label="Maximum Stock"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
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
    data() {

        return {
            createdBy: '',
            approvedBy: '',
            vendorType: '',
            vendorName: '',
            actions: ['edit', 'delete'],
            editVendorableModal: false,
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
                    name: 'type',
                    label: 'Type',
                    field: 'type',
                    align: 'left'
                },
                {
                    name: 'rank',
                    label: 'Rank',
                    field: 'rank',
                    align: 'left'
                },
                {
                    name: 'dis_percentage',
                    label: 'Distribution Percentage',
                    field: 'dis_percentage',
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
        ...mapState('items', ['item']),
         ...mapState('vendorables', ['vendorable', 'vendorableModal']),
        packages() {
            return this.$store.getters['items/packages'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        },
        vendorablePrice: {
            get(){
                let price = this.vendorable.pivot.price;
                return parseFloat(price);
            },
            set(val){
                 this.$store.dispatch('vendorables/vendorablePivotPrice', val)
            }

        }
    },
    methods: {
        reduceString(string) {
            return string.substring(10, 20);
        },
        vendorables() {
            this.$axios.get(`vendorables?id=${this.$route.params}`)
                .then(res => {

                })
        },
        capitalize(string) {
            return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
        },
        myFunction(action, itemId, vendorableId, vendorableType) {
            if (action === 'edit') {
                this.edit(itemId, vendorableId, vendorableType)
            } else if (action === 'delete') {
                this.deleteRow(itemId, vendorableId, vendorableType)
            }
        },
        store() {
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
        deleteRow(itemId, vendorableId, vendorableType) {
            this.$axios.get(`vendorables/${itemId}?id=${itemId}&vendorable_id=${vendorableId}&vendorable_type=${vendorableType}`)
                .then((res) => {
                    this.$store.dispatch('vendorables/vendorable', res.data.vendorable)
                    this.$q.notify({
                        color: 'negative',
                        icon: 'delete',
                        message: `Delete ${res.data.vendorName} vendor?`,
                        actions: [

                            {
                                label: 'OK',
                                handler: () => {
                                    this.$axios.delete(`/items/${this.item.id}?id=${this.item.id}`)
                                        .then((res) => {
                                            this.$q.notify({
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
        update() {
            this.$axios.put(`/vendorables/${this.item.id}`, this.vendorable)
                .then((res) => {
                    this.hideModal()
                    this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.item.name}'s vendor update successfully`
                    })
                    this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                    })
                })
                .catch()
        },

        paginationLast(currentPage) {
            if (this.lastPage > currentPage) {
                return false
            }
            return true
        },
        request(props) {
            this.loading = true
            this.$axios
                .get(
                    `/vendorables?id=${this.$route.params.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
                )
                .then(res => {
                    this.serverPagination = props.pagination
                    this.serverData = _.values(res.data.vendors.data)
                    this.serverPagination.rowsNumber = res.data.vendors.total
                    this.lastPage = res.data.vendors.last_page
                    this.loading = false
                })
                .catch(error => {
                    // there's an error... do SOMETHING
                    console.log(error)
                    // we tell QTable to exit the "loading" state
                    this.loading = false
                })
        },
        edit(itemId, vendorableId, vendorableType) {

            this.$axios.get(`vendorables/${itemId}/edit?id=${itemId}&vendorable_id=${vendorableId}&vendorable_type=${vendorableType}`)
                .then(res => {
                    this.showModal()
                    this.vendorName = res.data.vendorName
                    this.createdBy = res.data.createdBy
                    this.approvedBy = res.data.approvedBy
                    this.vendorType = this.reduceString(vendorableType)
                    this.$store.dispatch('vendorables/vendorable', res.data.vendorable)
                })
        },
        hideModal() {
            this.editVendorableModal = false
            this.$store.dispatch('vendorables/vendorableModal', false)
        },
        showModal() {
            this.editVendorableModal = true
        }
    },
    mounted() {
        this.request({
            pagination: this.serverPagination,
            filter: this.filter
        })
    },
    watch: {
        'vendorable.pivot.rank'(val) {
            this.$store.dispatch('vendorables/vendorablePivotRank', val)
        },
        'vendorable.pivot.dis_percentage'(val) {
            this.$store.dispatch('vendorables/vendorablePivotDisPercentage', val)
        },
        'vendorable.pivot.start_date'(val){
            this.$store.dispatch('vendorables/vendorablePivotStartDate', val)
        },
        'vendorable.pivot.end_date'(val){
            this.$store.dispatch('vendorables/vendorablePivotEndDate', val)
        },
       'vendorable.pivot.volume'(val){
           this.$store.dispatch('vendorables/vendorablePivotVolume', val)
        },
        'vendorable.pivot.remarks'(val){
            this.$store.dispatch('vendorables/vendorablePivotRemarks', val)
        }
    }

}
</script>
