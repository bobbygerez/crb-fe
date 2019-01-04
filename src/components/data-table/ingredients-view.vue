<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      :title="`${ingredient.name} ingredients`"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >

        <template slot="body" slot-scope="props">

            <q-tr :props="props">
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
                 <q-td key="qty" :props="props">
                    {{ props.row.qty }} / {{ props.row.package.name}}
                </q-td>
            </q-tr>

        <q-tr :props="props">
          <q-td
            key="name"
            :props="props"
          >
            {{ props.row.name }}
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
            key="qty"
            :props="props"
          >
            {{ props.row.qty }} / {{ props.row.package.name}}
          </q-td>
        </q-tr>

      </template>

    </q-table>
    <!-- <q-modal v-model="editIngredientModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div style="padding: 30px">
            <div class="q-display-1 q-mb-md">Edit {{ ingredient.name }}</div>

            <div class="row">
                 <div class="col-xs-12 col-sm-4">
                    <q-search
                    v-model="ingredient.company.name"
                    placeholder="Search company..."
                    float-label="Company Name"
                    >
                    <q-autocomplete
                        :static-data="{field: 'label', list: userEntities }"
                        @selected="selected"
                    />
                    </q-search>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="ingredient.name" float-label="Name" clearable />
                </div>
                <div class="col-xs-12 col-sm-4">
                    <q-input v-model="ingredient.pcs" float-label="Pcs" clearable />
                </div>

            </div>
            <br />
            <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
            <q-btn color="primary" @click="update()" label="Update" class="q-ml-sm" />

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
import _ from 'lodash'
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      editIngredientModal: false,
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
      actions: ['edit', 'delete'],
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
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left'
        },

        {
          name: 'qty',
          label: 'Qty',
          field: 'qty',
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
    ...mapState('ingredients', ['ingredient']),
    newPurchaseRequestModal: {
      get () {
        return this.$store.getters['purchaseRequests/newPurchaseRequestModal']
      },
      set (val) {
        this.$store.dispatch('purchaseRequests/newPurchaseRequestModal', val)
      }
    },
    purchasableType () {
      return this.purchaseRequest.purchasable_type.substring(10)
    },
    aapprovedBy () {
      let n = this.purchaseRequest.approved_by
      if (n === null) return null
      return `${n.firstname} ${n.middlename} ${n.lastname}`
    },
    nnotedBy () {
      let n = this.purchaseRequest.noted_by
      if (n === null) return null
      return `${n.firstname} ${n.middlename} ${n.lastname}`
    },
    preparedBy () {
      let n = this.purchaseRequest.prepared_by
      return `${n.firstname} ${n.middlename} ${n.lastname}`
    },
    userEntities () {
      return this.$store.getters['ingredients/userEntities'].map(e => {
        return {
          label: e.name,
          value: e.id
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
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `${err.response.data.message}`
          })
        })
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
      this.$store.dispatch('ingredients/selectedCompany', item)
      this.$store.dispatch('ingredients/ingredientCompanyName', item.label)
      this.$store.dispatch('ingredients/ingredientCompanyId', item.value)
    },
    capitalize (string) {
      return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase())
    },
    myFunction (action, ingredientId) {
      if (action === 'edit') {
        this.edit(ingredientId)
      } else if (action === 'delete') {
        this.deleteRow(ingredientId)
      } else if (action === 'view ingredients') {
        this.$router.push(`ingredients/${ingredientId}/view-ingredients`)
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
    deleteRow (ingredientId) {
      this.$axios.get(`/ingredients/${ingredientId}?id=${ingredientId}`)
        .then((res) => {
          this.$store.dispatch('ingredients/ingredient', res.data.ingredient)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.ingredient.name} ingredient?`,
            actions: [

              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/ingredients/${this.ingredient.id}?id=${this.ingredient.id}`)
                    .then((res) => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.ingredient.name} deleted successfully`
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
      this.$axios.put(`/ingredients/${this.ingredient.id}`, this.ingredient)
        .then((res) => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.ingredient.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },

    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/ingredient_items?id=${this.$route.params.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.ingredientItems.data)
          this.serverPagination.rowsNumber = res.data.ingredientItems.total
          this.lastPage = res.data.ingredientItems.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (ingredientId) {
      this.$axios.get(`ingredients/${ingredientId}/edit?id=${ingredientId}`)
        .then(res => {
          this.showModal()
          this.$store.dispatch('ingredients/ingredient', res.data.ingredient)
        })
    },
    hideModal () {
      this.editIngredientModal = false
      this.$store.dispatch('ingredients/newIngredientModal', false)
    },
    showModal () {
      this.editIngredientModal = true
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'ingredient.name' (val) {
      this.$store.dispatch('ingredients/ingredientName', val)
    }

  }

}
</script>
