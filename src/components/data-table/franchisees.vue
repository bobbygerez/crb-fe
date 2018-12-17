<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Franchisees"
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
          <q-td key="name">{{props.row.name }}</q-td>
          <q-td key="franchisee">{{props.row.franchisable.name }}</q-td>
          <q-td key="trademark">{{props.row.trademarks.name }}</q-td>
          <q-td key="franchisor">{{props.row.trademarks.company.name }}</q-td>
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

    </q-table>

    <q-modal
      v-model="editFranchiseeModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">Edit {{ franchisee.name }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.trademark_id"
              :options="userTrademarks"
              float-label="Trademarks"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="trademarkCompanyName"
              float-label="Franchisor"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.franchisable_type"
              :options="franchisableType"
              float-label="Franchisable Type"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.franchisable_id"
              :options="userEntities"
              float-label="Franchisee"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="businessInfo.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="businessInfo.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.telephone"
              float-label="Telephone"
              disable
            />
          </div>
        </div>
        <div class="row">

          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.email"
              float-label="Email"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.tin"
              float-label="TIN"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.website"
              float-label="Website"
              disable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="address.country_id"
              :options="countries"
              float-label="Country"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="address.region_id"
              :options="regions"
              float-label="Region"
              disable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.province_id"
              :options="provinces"
              float-label="Province"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.city_id"
              :options="cities"
              float-label="City"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
              disable
            />
          </div>
        </div>
        <br>
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
    <q-modal
      v-model="newFranchiseeModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Franchisee</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.trademark_id"
              :options="userTrademarks"
              float-label="Trademarks"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="trademarkCompanyName"
              float-label="Franchisor"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.franchisable_type"
              :options="franchisableType"
              float-label="Franchisable Type"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.franchisable_id"
              :options="userEntities"
              float-label="Franchisee"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="businessInfo.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="businessInfo.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.telephone"
              float-label="Telephone"
              disable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.email"
              float-label="Email"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.tin"
              float-label="TIN"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="businessInfo.website"
              float-label="Website"
              disable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="address.country_id"
              :options="countries"
              float-label="Country"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="address.region_id"
              :options="regions"
              float-label="Region"
              disable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.province_id"
              :options="provinces"
              float-label="Province"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.city_id"
              :options="cities"
              float-label="City"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
              disable
            />
          </div>
        </div>
        <br>
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
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from 'lodash'
import { mapState } from 'vuex'

function getObject (array, key, value) {
  var o
  array.some(function iter (a) {
    if (a[key] === value) {
      o = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  })
  return o
}

export default {
  data () {
    return {
      franchisableId: '',
      franchisableType: [
        { value: 'App\\Model\\Holding', label: 'Holding' },
        { value: 'App\\Model\\Company', label: 'Company' },
        { value: 'App\\Model\\Branch', label: 'Branch' }
      ],
      model: '2016-10-24T10:40:14.674Z',
      superior: '',
      selectedRoles: [],
      editFranchiseeModal: false,
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
        { name: 'franchisee', label: 'Franchisee', align: 'left', field: 'franchisee' },
        { name: 'trademark', label: 'Trademark', align: 'left', field: 'created' },
        { name: 'franchisor', label: 'Franchisor', align: 'left', field: 'franchisor' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('branches', ['branch']),
    ...mapState('franchisees', ['franchisee', 'trademarkCompanyName', 'address', 'businessInfo']),
    userEntities () {
      return this.$store.getters['franchisees/userEntities'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    franchisees () {
      return this.$store.getters['franchisees/franchisees'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    userCompanies () {
      return this.$store.getters['franchisees/userCompanies'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    userTrademarks () {
      return this.$store.getters['franchisees/userTrademarks'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    newFranchiseeModal: {
      get () {
        return this.$store.getters['franchisees/newFranchiseeModal']
      },
      set () {

      }
    },
    countries () {
      return this.$store.getters['globals/getCountries'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    regions () {
      let regions = this.$store.getters['globals/getRegions']
      if (regions === null) return []
      return regions.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    provinces () {
      return this.$store.getters['globals/getProvinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      return this.$store.getters['globals/getCities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      return this.$store.getters['globals/getBrgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    vatTypes () {
      return this.$store.getters['globals/getVatTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    businessTypes () {
      return this.$store.getters['globals/getBusinessTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    store () {
      this.$axios
        .post(`/franchisees`, this.franchisee)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.franchisee.name} created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
      this.loading = false
    },
    deleteRow (franchiseeId) {
      this.$axios.get(`/franchisees/${franchiseeId}?id=${franchiseeId}`).then(res => {
        this.$store.dispatch('franchisees/franchisee', res.data.franchisee)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.franchisee.name} ?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/franchisees/${this.franchisee.id}?id=${this.franchisee.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.franchisee.name} deleted successfully`
                    })
                    this.request({
                      pagination: this.serverPagination,
                      filter: this.filter
                    })
                    this.hideModal()
                  })
                  .catch(err => {
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
      this.$axios.put(`/franchisees/${this.franchisee.id}`, this.franchisee)
        .then((res) => {
          this.editFranchiseeModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.franchisee.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    hideModal () {
      this.$store.dispatch('franchisees/newFranchiseeModal', false)
      this.editFranchiseeModal = false
    },
    showModal () {
      this.editFranchiseeModal = true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/franchisees?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.franchisees.data)
          this.serverPagination.rowsNumber = res.data.franchisees.total
          this.lastPage = res.data.franchisees.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (franchiseeId) {
      this.$axios.get(`franchisees/${franchiseeId}/edit?id=${franchiseeId}`).then(res => {
        this.showModal()
        this.$store.dispatch('franchisees/franchisee', res.data.franchisee)
      })
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
    this.$axios.get('/user-trademarks')
      .then(res => {
        this.$store.dispatch('franchisees/userTrademarks', res.data.userTrademarks)
      })
  },
  watch: {
    'franchisee.trademark_id' (val) {
      let trademark = (getObject(this.$store.getters['franchisees/userTrademarks'], 'id', val))
      this.$store.dispatch('franchisees/trademarkCompanyName', trademark.company.name)
      this.$store.dispatch('franchisees/franchiseeTrademarkId', val)
    },
    'franchisee.trademarks.company_id' (val) {
      this.$store.dispatch('franchisees/franchiseeTrademarkCompanyId', val)
    },
    'franchisee.name' (val) {
      this.$store.dispatch('franchisees/franchiseeName', val)
    },
    'franchisee.franchisable_type' (val) {
      if (val === undefined || val === '') {
        return
      }
      this.$axios.get(`modelable-user-models?modelType=${val}`)
        .then(res => {
          this.$store.dispatch('franchisees/userEntities', res.data.userModels)
        })
    },
    'franchisee.franchisable_id' (val) {
      if (val === undefined || val === '') {
        return
      }
      let franchisableType = this.franchisee.franchisable_type
      this.$axios.get(`modelable-address-business-info?id=${val}&modelType=${franchisableType}`)
        .then(res => {
          this.$store.dispatch('franchisees/address', res.data.address)
          this.$store.dispatch('franchisees/businessInfo', res.data.businessInfo)
        })
      this.$store.dispatch('franchisees/franchiseeFranchisableId', val)
    }
  }
}
</script>
