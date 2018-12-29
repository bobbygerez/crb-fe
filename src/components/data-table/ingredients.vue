<template>
<div>
    <q-table ref="table" color="primary" title="All Ingredients" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
        <template slot="top-right" slot-scope="props">
            <q-search hide-underline v-model="filter" />
        </template>

        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="company" :props="props">
                    {{ props.row.company.name }}
                </q-td>
                <q-td key="name" :props="props">
                    {{ props.row.name }}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="myFunction(action, props.row.id)" v-close-overlay>
                                    <q-item-main :label="capitalize(action)"/>
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>
                </q-td>
                <q-td key="pcs" :props="props">
                    {{ props.row.pcs }}
                </q-td>
                <q-td key="created_at" :props="props">
                    {{ props.row.created_at }}
                </q-td>
                
                <!-- <q-td key="name">
                    {{props.row.name}}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="myFunction(action, props.row.id, props.row.approved_by != null)" v-close-overlay>
                                    <q-item-main :label="capitalize(action)" :disabled="props.row.approved_by != null" v-if="action === 'cancel request'"/>
                                    <q-item-main :label="capitalize(action)" v-else/>
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>
                </q-td>
                <q-td key="order_date" :props="props">
                    {{ props.row.order_date }}
                </q-td>
                <q-td key="prepared_by" :props="props">
                    {{ props.row.prepared_by.firstname }} 
                    {{ props.row.prepared_by.middlename }} 
                    {{ props.row.prepared_by.lastname }} <br />
                    {{ props.row.created_at }}
                </q-td>
                <q-td key="noted_by" :props="props">
                    <span v-if="props.row.noted_by === null" >
                        <q-btn flat color="negative" icon="playlist_add_check" @click="notedBy(props.row.id)">
                            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]" >
                                Click to noted by
                            </q-tooltip>
                        </q-btn>
                    </span>
                    <span v-else>
                        {{ props.row.noted_by.firstname }}
                        {{ props.row.noted_by.middlename }}
                        {{ props.row.noted_by.lastname }}<br />
                        {{ props.row.noted_date }}
                    </span>
                </q-td>
                <q-td key="approved_by" :props="props">
                    <span v-if="props.row.approved_by === null">
                        <q-btn flat color="negative" icon="playlist_add_check"  @click="approvedBy(props.row.id)" >
                            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]" >
                                Click to approved by
                            </q-tooltip>
                        </q-btn>
                    </span>
                    <span v-else>
                        {{ props.row.approved_by.firstname }}
                        {{ props.row.approved_by.middlename }}
                        {{ props.row.approved_by.lastname }}<br />
                        {{ props.row.approved_date }}
                    </span>
                </q-td>
                <q-td key="purchase_by" :props="props">
                    {{ props.row.purchasable.name }}
                </q-td>
                <q-td key="purchasable_type" :props="props">
                    {{ props.row.purchasable_type.substring(10) }}
                </q-td> -->

            </q-tr>

        </template>

    </q-table>
    <!-- <q-modal v-model="editPurchaseRequestModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="q-display-1 q-mb-md">Edit {{ purchaseRequest.name }}</div>

            <div class="row">
                
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="purchaseRequest.name" float-label="Name" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="purchasableType" float-label="Purchase type" disable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="purchaseRequest.purchasable.name" float-label="Purchase by" disable />
                </div>
                
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="purchaseRequest.created_at" float-label="Prepared date" disable />
                </div>
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="preparedBy" float-label="Prepared by" disable />
                </div>
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="purchaseRequest.noted_date" float-label="Noted date" disable />
                </div>
                <div class="col-xs-12 col-sm-3">
                    <q-input v-model="nnotedBy" float-label="Noted by" disable />
                </div>
                <div class="col-xs-12 col-sm-6">
                    <q-input v-model="purchaseRequest.approved_date" float-label="Approved date" disable />
                </div>
                <div class="col-xs-12 col-sm-6">
                    <q-input v-model="aapprovedBy" float-label="Approved by" disable />
                </div>

            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm" />

        </div>
    </q-modal> -->
    <!-- <q-modal v-model="newPurchaseRequestModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="q-display-1 q-mb-md">New Purchase Request</div>

            <div class="row">
                
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="purchaseRequest.name" float-label="Name" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-select v-model="purchaseRequest.purchasable_type" :options="purchasableTypeSelect" float-label="Purchasable Type" />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-search v-model="terms" :placeholder="placeholderPurchasableType" float-label="Purchase Owner">
                        <q-autocomplete :static-data="{field: 'label', list: userEntities }" @selected="selected" />
                    </q-search>
                </div>
            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm" />

        </div>
    </q-modal> -->
</div>
</template>

<script>
import inputPrice from 'components/inputs/price'
import {
    uid,
    filter
} from 'quasar'
import _ from 'lodash'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            terms: '',
            purchasableId: '',
            placeholderPurchasableType: '',
            purchasableTypeSelect: [{
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
            actions: ['edit', 'delete', 'view items'],
            options: [5, 10, 15, 20],
            lastPage: '',
            serverData: [],
            serverPagination: {
                page: 1,
                rowsNumber: 10,
                rowsPerPage: 10 // specifying this determines pagination is server-side
            },
            columns: [
                {
                    name: 'company',
                    label: 'Company',
                    field: 'company',
                    align: 'left'
                },
                {
                    name: 'name',
                    label: 'Name',
                    field: 'name',
                    align: 'left'
                },
                
                {
                    name: 'pcs',
                    label: 'Pcs',
                    field: 'pcs',
                    align: 'left'
                },
                {
                    name: 'created_at',
                    label: 'Created At',
                    field: 'created_at',
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
        ...mapState('purchaseRequests', ['editPurchaseRequestModal', 'purchaseRequest']),
        newPurchaseRequestModal: {
            get(){
                return this.$store.getters['purchaseRequests/newPurchaseRequestModal'];
            },
            set(val){
                this.$store.dispatch('purchaseRequests/newPurchaseRequestModal', val)
            }
        },
        purchasableType(){
            return this.purchaseRequest.purchasable_type.substring(10)
        },
        aapprovedBy(){
            let n = this.purchaseRequest.approved_by
            if(n === null ) return null
            return `${n.firstname} ${n.middlename} ${n.lastname}`
        },
        nnotedBy(){
            let n = this.purchaseRequest.noted_by
            if(n === null ) return null
            return `${n.firstname} ${n.middlename} ${n.lastname}`
        },
        preparedBy(){
            let n = this.purchaseRequest.prepared_by
            return `${n.firstname} ${n.middlename} ${n.lastname}`
        },
        userEntities() {
            return this.$store.getters['purchaseRequests/userEntities'].map(e => {
                return {
                    label: e.name,
                    value: e.id
                }
            })
        }
    },
    methods: {
        notedBy(purchaseRequestId){
            this.$axios.get(`purchases-noted-by?id=${purchaseRequestId}`)
            .then( res =>{
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
        approvedBy(purchaseRequestId){
            this.$axios.get(`purchases-approved-by?id=${purchaseRequestId}`)
            .then( res =>{
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
            .catch(err => {
                 this.$q.notify({
                        color: 'negative',
                        icon: 'warning',
                        message: `${err.response.data.message}`
                    })
            })
                

        },
        selected(item) {
            this.$q.notify(`Selected suggestion "${item.label}"`)
            this.$store.dispatch('items/itemItemableId', item.value)
        },
        capitalize(string) {
            return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
        },
        myFunction(action, ingredientId) {
            if (action === 'edit') {
                this.edit(ingredientId)
            } else if (action === 'delete') {
                if(status === false){
                     this.deleteRow(ingredientId)
                }
            } else if (action === 'view items') {
                
                // this.$router.push(`purchase-request/${ingredientId}/purchase-items`)
                
            }
        },
        store() {
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
        deleteRow(purchaseId) {
            this.$axios.get(`/purchases/${purchaseId}?id=${purchaseId}`)
                .then((res) => {
                    this.$store.dispatch('purchaseRequests/purchaseRequest', res.data.purchase)
                    this.$q.notify({
                        color: 'negative',
                        icon: 'delete',
                        message: `Cancel request in ${res.data.purchase.name}?`,
                        actions: [

                            {
                                label: 'OK',
                                handler: () => {
                                    this.$axios.delete(`/purchases/${this.purchaseRequest.id}?id=${this.purchaseRequest.id}`)
                                        .then((res) => {
                                            this.$q.notify({
                                                color: 'positive',
                                                icon: 'check',
                                                message: `${this.purchaseRequest.name} deleted successfully`
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
            this.$axios.put(`/purchases/${this.purchaseRequest.id}`, this.purchaseRequest)
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
                .catch()
        },

        request(props) {
            this.loading = true
            this.$axios
                .get(
                    `/ingredients?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
                )
                .then(res => {
                    this.serverPagination = props.pagination
                    this.serverData = _.values(res.data.ingredients.data)
                    this.serverPagination.rowsNumber = res.data.ingredients.total
                    this.lastPage = res.data.ingredients.last_page
                    this.loading = false
                })
                .catch(error => {
                    // there's an error... do SOMETHING
                    console.log(error)
                    // we tell QTable to exit the "loading" state
                    this.loading = false
                })
        },
        edit(ingredientId) {
            this.$axios.get(`ingredients/${ingredientId}/edit?id=${ingredientId}`)
                .then(res => {
                    // this.showModal()
                    // this.$store.dispatch('purchaseRequests/purchaseRequest', res.data.purchase)
                })
        },
        hideModal() {
            this.$store.dispatch('purchaseRequests/editPurchaseRequestModal', false)
            this.$store.dispatch('purchaseRequests/newPurchaseRequestModal', false)
        },
        showModal() {
            this.$store.dispatch('purchaseRequests/editPurchaseRequestModal', true)
        }
    },
    mounted() {
        this.request({
            pagination: this.serverPagination,
            filter: this.filter
        })
    },
    watch: {
        'purchaseRequest.name'(val) {
            this.$store.dispatch('purchaseRequests/purchaseRequestName', val)
        },
        'purchaseRequest.purchasable_type'(val) {
            if (val === undefined || val === '') {
                return
            }
            this.terms = ''
            this.placeholderPurchasableType = 'Search ' +  val.substring(10) + '...'
            this.$axios.get(`modelable-user-models?modelType=${val}`)
                .then(res => {
                    this.$store.dispatch('purchaseRequests/purchasableType', val)
                    this.$store.dispatch('purchaseRequests/userEntities', res.data.userModels)
                })
        }

    }

}
</script>
