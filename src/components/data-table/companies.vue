<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Companies"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
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
          <div class="col-xs-12 col-sm-6">
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
        <q-btn color="primary" @click="create()" label="Submit" class="q-ml-sm" />
      </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from "lodash";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      editCompanyModal: false,
      options: [5, 10, 15, 20],
      lastPage: "",
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: "Company", label: "Company", field: "company", align: "left" },
        {
          name: "Holding",
          required: true,
          label: "Holding",
          align: "left",
          field: "holding"
        },
        { name: "address", label: "Address", field: "address", align: "left" },
        { name: "created", label: "Created", field: "created", align: "left" },
        { name: "actions", label: "Actions", field: "actions", align: "left" }
      ],
      filter: "",
      loading: false
    };
  },
  computed: {
    ...mapState('companies', ['company']),
    countries () {
      return this.$store.getters['globals/countries'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    regions () {
      let regions = this.$store.getters['globals/regions']
      if (regions === null) return []
      return regions.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    provinces () {
      return this.$store.getters['globals/provinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      return this.$store.getters['globals/cities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      return this.$store.getters['globals/brgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    vatTypes () {
      return this.$store.getters['globals/vatTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    businessTypes () {
      return this.$store.getters['globals/businessTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    hideModal(){
      this.editCompanyModal = false
    },
    paginationLast(currentPage) {
      if (this.lastPage > currentPage) {
        return false;
      }
      return true;
    },
    request(props) {
      this.loading = true;
      this.$axios
        .get(
          `/companies?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination;
          this.serverData = _.values(res.data.companies.data);
          this.serverPagination.rowsNumber = res.data.companies.total;
          this.lastPage = res.data.companies.last_page;
          this.loading = false;

        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error);
          // we tell QTable to exit the "loading" state
          this.loading = false;
        });
      
    },
    edit(companyId){
      this.$axios.get(`companies/${companyId}/edit`)
      .then(res =>{
        this.editCompanyModal = true
        this.$store.dispatch('companies/company', res.data.company)
      })
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  },
  watch: {
    'company.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.$store.dispatch('globals/GET_REGIONS', val)
    },
    'company.address.region_id' (val) {
      this.$store.dispatch('globals/GET_PROVINCES', val)
      this.$store.dispatch('pattys/holdingRegion', val)
    },
    'company.address.province_id' (val) {
      this.$store.dispatch('pattys/holdingProvince', val)
      this.$store.dispatch('globals/GET_CITIES', val)
    },
    'company.address.city_id' (val) {
      this.$store.dispatch('pattys/holdingCity', val)
      this.$store.dispatch('globals/GET_BRGYS', val)
    },
    'company.address.brgy_id' (val) {
      this.$store.dispatch('pattys/holdingBrgy', val)
    },
  }
  
};
</script>
