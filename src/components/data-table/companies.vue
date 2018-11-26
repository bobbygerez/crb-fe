<template>
  <div>
    <q-table ref="table" color="primary" title="All Companies" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="company">
            {{props.row.name}}
          </q-td>
          <q-td key="holding">
            {{props.row.holding.name}}
          </q-td>
          <q-td key="address" :props="props">
            {{props.row.address.street_lot_blk}}
            <br />
            {{props.row.address.brgy.description}}
            <br />
            {{props.row.address.city.description }},
            <br />
            {{props.row.address.region.description }}

          </q-td>
          <q-td key="created" :props="props">
            {{props.row.created_at}}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn round outline color="positive" icon="edit" class="q-ma-sm" @click="edit(props.row.id)" />
            <q-btn round outline color="negative" icon="delete" class="q-ma-sm" @click="deleteRow(props.row.id)" />
          </q-td>
        </q-tr>

      </template>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn round dense size="sm" icon="undo" color="secondary" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
        <div class="q-mr-sm" style="font-size: small">
          Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </div>
        <q-btn round dense size="sm" icon="redo" color="secondary" :disable="paginationLast(props.pagination.page)" @click="props.nextPage" />
      </div>

    </q-table>

    <q-modal v-model="editCompanyModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ company.name }}</div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="company.holding_id" :options="holdings" float-label="Holdings" />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="company.name" float-label="Company name" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="company.business_info.business_type_id" :options="businessTypes" float-label="Business Type" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="company.business_info.vat_type_id" :options="vatTypes" float-label="Vat Type" clearable />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="company.business_info.telephone" float-label="Telephone" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="company.business_info.email" float-label="Email" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="company.business_info.tin" float-label="TIN" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="company.business_info.website" float-label="Website" clearable />
          </div>
        </div>

        <div class="col-xs-12 col-sm-12">
          <q-input v-model="company.desc" type="textarea" float-label="Description" :max-height="100" rows="2" />
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select v-model="company.address.country_id" :options="countries" float-label="Country" clearable />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select v-model="company.address.region_id" :options="regions" float-label="Region" clearable />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="company.address.province_id" :options="provinces" float-label="Province" clearable />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="company.address.city_id" :options="cities" float-label="City" clearable />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="company.address.brgy_id" :options="brgys" float-label="Barangay" clearable />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input v-model="company.address.street_lot_blk" type="textarea" float-label="Block, Lot &amp; Street" :max-height="100" rows="2" />
          </div>
        </div>
        <br />
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
        <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm" />

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
      editCompanyModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: 'Company', label: 'Company', field: 'company', align: 'left' },
        {
          name: 'Holding',
          required: true,
          label: 'Holding',
          align: 'left',
          field: 'holding'
        },
        { name: 'address', label: 'Address', field: 'address', align: 'left' },
        { name: 'created', label: 'Created', field: 'created', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'left' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('companies', ['company']),
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
      this.$axios
        .get(
          `/companies?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.companies.data)
          this.serverPagination.rowsNumber = res.data.companies.total
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
