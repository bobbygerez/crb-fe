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
          <q-td key="company">{{props.row.trademarks.name }}</q-td>
          <q-td key="company">{{props.row.trademarks.company.name }}</q-td>
          <q-td
            key="address"
            :props="props"
          >
            {{props.row.address.street_lot_blk}}
            <br />
            {{props.row.address.brgy.description}}
            <br />
            {{props.row.address.city.description }},
            <br />
            {{props.row.address.region.description }}

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
            <q-select
              v-model="franchisee.trademarks.company_id"
              :options="userCompanies"
              float-label="Company"
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
            <q-select
              v-model="franchisee.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
        </div>
        <div class="row">
          
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="franchisee.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="franchisee.address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
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
        <!-- <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Franchisee</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="franchisee.company_id"
              :options="companies"
              float-label="Company"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="franchisee.name"
              float-label="Branch name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="franchisee.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="franchisee.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="franchisee.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="franchisee.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="franchisee.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="franchisee.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="franchisee.desc"
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
              v-model="franchisee.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="franchisee.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="franchisee.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="franchisee.address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
            />
          </div>
        </div> -->
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
export default {
  data () {
    return {
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
        { name: 'trademark', label: 'Trademark', align: 'left', field: 'created' },
        { name: 'company', label: 'Company', align: 'left', field: 'company' },
        { name: 'address', label: 'Address', align: 'left', field: 'address' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('branches', ['branch']),
    ...mapState('franchisees', ['franchisee']),
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
        .post(`/franchisees`, {
          franchisee: this.franchisee,
          address: this.franchisee.address,
          businessInfo: this.franchisee.business_info
        })
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.franchisee.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (branchId) {
      this.$axios.get(`/branches/${branchId}?id=${branchId}`).then(res => {
        this.$store.dispatch('branches/branch', res.data.branch)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.branch.name} ?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/branches/${this.branch.id}?id=${this.branch.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.branch.name} deleted successfully`
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
          // this.editBranchModal = false
          // this.$q.notify({
          //   color: 'positive',
          //   icon: 'check',
          //   message: `${res.data.branch.name} update successfully`
          // })
          // this.request({
          //   pagination: this.serverPagination,
          //   filter: this.filter
          // })
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
      this.$axios.get('/user-trademarks')
        .then(res => {
          this.$store.dispatch('franchisees/userTrademarks', res.data.userTrademarks)
        })

      this.$axios.get('/user-companies')
        .then(res => {
          this.$store.dispatch('franchisees/userCompanies', res.data.userCompanies)
        })

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
  },
  watch: {
    'franchisee.trademark_id'(val){
      this.$store.dispatch('franchisees/franchiseeTrademarkId', val)
    },
    'franchisee.trademarks.company_id'(val){
      this.$store.dispatch('franchisees/franchiseeTrademarkCompanyId', val)
    },
    'franchisee.name' (val) {
      this.$store.dispatch('franchisees/franchiseeName', val)
    },
    'franchisee.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('franchisees/franchiseeCountryId', val)
    },
    'franchisee.address.region_id' (val) {
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('franchisees/franchiseeRegionId', val)
    },
    'franchisee.address.province_id' (val) {
      this.$store.dispatch('globals/getCities', val)
      this.$store.dispatch('franchisees/franchiseeProvinceId', val)
    },
    'franchisee.address.city_id' (val) {
      this.$store.dispatch('globals/getBrgys', val)
      this.$store.dispatch('franchisees/franchiseeCityId', val)
    },
    'franchisee.address.brgy_id' (val) {
      this.$store.dispatch('franchisees/franchiseeBrgyId', val)
    },
    'franchisee.address.street_lot_blk' (val) {
      this.$store.dispatch('franchisees/franchiseeStreetLotBlk', val)
    },
    'franchisee.business_info.business_type_id' (val) {
      this.$store.dispatch('franchisees/franchiseeBusinessTypeId', val)
    },
    'franchisee.business_info.vat_type_id' (val) {
      this.$store.dispatch('franchisees/franchiseeVatTypeId', val)
    },
    'franchisee.business_info.telephone' (val) {
      this.$store.dispatch('franchisees/franchiseeTelephone', val)
    },
    'franchisee.business_info.email' (val) {
      this.$store.dispatch('franchisees/franchiseeEmail', val)
    },
    'franchisee.business_info.tin' (val) {
      this.$store.dispatch('franchisees/franchiseeTin', val)
    },
    'franchisee.business_info.website' (val) {
      this.$store.dispatch('franchisees/franchiseeWebsite', val)
    }
  }
}
</script>
