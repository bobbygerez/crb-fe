<template>
  <div>
    <serverside-dynamic-table
      :data="serverData"
      :columns="columns"
      :actions="['edit', 'delete']"
      :search-field="filter"
      :pagination="serverPagination"
      :inner-loading="loading"
      theme="secondary"
      @edit="edit"
      @delete="deleteRow"
      @serverside-request="request"
      @search-change="filter = $event"
    />
  </div>
</template>

<script>
import ServersideDynamicTable from 'components/data-table/serverside-dynamic-table'
import TableMixin from 'components/mixins/serverside-table-mixin.js'
import AddressColumnMixin from 'components/mixins/table-address-columns-mixin.js'
export default {
  mixins: [TableMixin, AddressColumnMixin],
  components: {
    ServersideDynamicTable
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: row => row.name,
          align: 'left',
          sortable: true,
          required: true
        },
        {
          name: 'holding',
          required: true,
          label: 'Holding',
          align: 'left',
          field: row => { return row.holding === null ? '' : row.holding.name }
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
      options: [5, 10, 15, 20]
    }
  },
  computed: {
    holdings () {
      return this.$store.getters['companies/getHoldings'].map(e => {
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
  created () {
    // merge array of table columns if you want to show the address fields also which is defined in the table-mixin
    const cols = this.columns.slice(0, 2).concat(this.addressColumns.concat(this.columns.slice(2)))
    this.columns = cols
    // set the module name for api calls in the actions
    this.moduleName = 'companies'
  }
}
</script>
