<template>
  <div>
    <serverside-list-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      :pagination="serverPagination"
      :innerLoading="loading"
      theme="secondary"
      @serverside-request="request"
      @search-change="filter = $event"
      :searchField="filter"
      v-show="tableViewSettingsGlobal.mode === 'list'"
    />
    <serverside-grid-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      :pagination="serverPagination"
      :innerLoading="loading"
      theme="secondary"
      @serverside-request="request"
      @search-change="filter = $event"
      :searchField="filter"
      v-show="tableViewSettingsGlobal.mode === 'grid'"
    />

    <q-modal
      v-model="editCompanyModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ company.name }}</div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="company.holding_id"
              :options="holdings"
              float-label="Holdings"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="company.name"
              float-label="Company name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="company.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="company.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="company.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="company.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="company.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="company.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>

        <div class="col-xs-12 col-sm-12">
          <q-input
            v-model="company.desc"
            type="textarea"
            float-label="Description"
            :max-height="100"
            rows="2"
          />
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="company.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="company.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="company.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="company.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="company.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="company.address.street_lot_blk"
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
          @click="update()"
          label="Submit"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import { values } from 'lodash'
import { mapState } from 'vuex'
// import { mapHoldingFields } from '../../../../../store/pattys'
// import GenericListDataTable from 'components/data-table/generic-list-data-table'
// import GenericGridDataTable from 'components/data-table/generic-grid-data-table'
import ServersideListTable from 'components/data-table/serverside-list-table'
import ServersideGridTable from 'components/data-table/serverside-grid-table'
import { mapGlobalFields } from '../../../../../store/globals'
export default {
  components: {
    ServersideListTable,
    ServersideGridTable
  },
  data () {
    return {
      editCompanyModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10, // specifying this determines pagination is server-side
        totalPages: null
      },
      columns: [
        { name: 'name', label: 'Company', field: row => row.name, align: 'left', sortable: true, required: true },
        {
          name: 'holding',
          required: true,
          label: 'Holding',
          align: 'left',
          field: row => { return row.holding.name === null ? '' : row.holding.name }
        },
        { name: 'address', label: 'Address', field: row => row.address.street_lot_blk, align: 'left' },
        {
          name: 'brgy',
          label: 'Barangay',
          field: row => row.address.brgy.description,
          align: 'left',
          sortable: true,
          hideonload: true
        },
        {
          name: 'city',
          label: 'City',
          field: row => row.address.city.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'province',
          label: 'Province',
          field: row => row.address.province.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'region',
          label: 'Region',
          field: row => row.address.region.description,
          align: 'left',
          sortable: true,
          hideonload: true
        },
        {
          name: 'created_at',
          label: 'Created At',
          field: 'created_at',
          align: 'left',
          sortable: true,
          hideonload: true
        }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('companies', ['company']),
    ...mapGlobalFields(['tableViewSettingsGlobal']),
    holdings () {
      return this.$store.getters['companies/getHoldings'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
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
    deleteRow (companyId) {
      this.$axios.get(`/companies/${companyId}?id=${companyId}`)
        .then((res) => {
          this.$store.dispatch('companies/setCompany', res.data.company)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.company.name}?`,
            actions: [

              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/companies/${this.company.id}?id=${this.company.id}`)
                    .then((res) => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${res.data.company.name} deleted successfully`
                      })
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
      this.$axios.put(`/companies/${this.company.id}`, {
        id: this.company.id,
        name: this.company.name,
        desc: this.company.desc,
        country_id: this.company.address.country_id,
        region_id: this.company.address.region_id,
        province_id: this.company.address.province_id,
        city_id: this.company.address.city_id,
        brgy_id: this.company.address.brgy_id,
        street_lot_blk: this.company.address.street_lot_blk,
        business_type_id: this.company.business_info.business_type_id,
        vat_type_id: this.company.business_info.vat_type_id,
        telephone: this.company.business_info.telephone,
        tin: this.company.business_info.tin,
        email: this.company.business_info.email,
        website: this.company.business_info.website
      })
        .then((res) => {
          this.editCompanyModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${res.data.company.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    hideModal () {
      this.editCompanyModal = false
    },
    paginationLast (currentPage) {
      if (this.lastPage > currentPage) {
        return false
      }
      return true
    },
    request (props) {
      this.loading = true
      console.log('request', props)

      this.$axios
        .get(
          `/companies?filter=${props.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }&sortBy=${props.pagination.sortBy}&descending=${props.pagination.descending}`
        )
        .then(res => {
          this.serverPagination = props.pagination
          // this.serverData = _.values(res.data.companies.data)
          this.serverData = values(res.data.companies.data)
          this.serverPagination.rowsNumber = res.data.companies.total
          // this.serverPagination.totalPages = res.data.companies.last_page
          this.lastPage = res.data.companies.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (companyId) {
      this.$axios.get(`company-holdings?id=${companyId}`)
        .then(res => {
          this.$store.dispatch('companies/setHoldings', [res.data.holdings])
        })

      this.$axios.get(`companies/${companyId}/edit?id=${companyId}`)
        .then(res => {
          this.editCompanyModal = true
          this.$store.dispatch('companies/setCompany', res.data.company)
        })
    }
  },
  mounted () {
    // console.log('mounted', {
    //   pagination: this.serverPagination,
    //   filter: this.filter
    // })
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'company.name' (val) {
      this.$store.dispatch('companies/setCompanyName', val)
    },
    'company.holding_id' (val) {
      this.$store.dispatch('companies/setCompanyHolding', val)
    },
    'company.desc' (val) {
      this.$store.dispatch('companies/setCompanyDesc', val)
    },
    'company.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('companies/setCompanyCountry', val)
    },
    'company.address.region_id' (val) {
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('companies/setCompanyRegion', val)
    },
    'company.address.province_id' (val) {
      this.$store.dispatch('companies/setCompanyProvince', val)
      this.$store.dispatch('globals/getCities', val)
    },
    'company.address.city_id' (val) {
      this.$store.dispatch('companies/setCompanyCity', val)
      this.$store.dispatch('globals/getBrgys', val)
    },
    'company.address.brgy_id' (val) {
      this.$store.dispatch('companies/setCompanyBrgy', val)
    },
    'company.business_info.business_type_id' (val) {
      this.$store.dispatch('companies/setCompanyBusinessType', val)
    },
    'company.business_info.vat_type_id' (val) {
      this.$store.dispatch('companies/setCompanyVatType', val)
    },
    'company.address.street_lot_blk' (val) {
      this.$store.dispatch('companies/setCompanyAddress', val)
    },
    'company.business_info.telephone' (val) {
      this.$store.dispatch('companies/setCompanyTelephone', val)
    },
    'company.business_info.email' (val) {
      this.$store.dispatch('companies/setCompanyEmail', val)
    },
    'company.business_info.tin' (val) {
      this.$store.dispatch('companies/setCompanyTin', val)
    },
    'company.business_info.website' (val) {
      this.$store.dispatch('companies/setCompanyWebsite', val)
    }
  }

}
</script>
