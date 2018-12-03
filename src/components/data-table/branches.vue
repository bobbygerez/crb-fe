<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Branches"
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
        <q-search hide-underline v-model="filter"/>
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="name">{{props.row.name }}</q-td>
          <q-td key="company">{{props.row.company.name }}</q-td>
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
          <q-td key="created">{{ props.row.created_at }}</q-td>
          <q-td key="actions" :props="props">
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
      v-model="editBranchModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">Edit {{ branch.name }}</div>
          </div>
        </div>
         <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.company_id"
              :options="companies"
              float-label="Company"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.name"
              float-label="Branch name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>
         <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="branch.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="branch.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="branch.address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>
        <br>
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()"/>
        <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm"/>
      </div>
    </q-modal>
    <q-modal
      v-model="newBranchModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
       <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Branch</div>
          </div>
        </div>
         <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.company_id"
              :options="companies"
              float-label="Company"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.name"
              float-label="Branch name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="branch.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="branch.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
          <q-input
            v-model="branch.desc"
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
              v-model="branch.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="branch.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="branch.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="branch.address.street_lot_blk"
              type="textarea"
              float-label="Block, Lot &amp; Street"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>
        <br>
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()"/>
        <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm"/>
       </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from "lodash";
import { mapState } from "vuex";
export default {
  data() {
    return {
      model: "2016-10-24T10:40:14.674Z",
      superior: "",
      selectedRoles: [],
      editBranchModal: false,
      options: [5, 10, 15, 20],
      lastPage: "",
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: "name", label: "Name", field: "name", align: "left" },
        { name: "company", label: "Company", align: "left", field: "company"},
        { name: "address", label: "Address", align: "left", field: "address"},
        { name: "created", label: "Created", align: "left", field: "created" },
        { name: "actions", label: "Actions", align: "left", field: "actions" }
      ],
      filter: "",
      loading: false
    };
  },
  computed: {
    ...mapState("branches", ["branch"]),
    companies () {
      return this.$store.getters['branches/companies'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    newBranchModal:{
      get(){
        return this.$store.getters['branches/newBranchModal']
      },
      set(){

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
    store() {
      this.$axios
        .post(`/branches`, {
          branch: this.branch,
          address: this.branch.address,
          businessInfo: this.branch.business_info
        })
        .then(res => {
          this.hideModal();
          this.$q.notify({
            color: "positive",
            icon: "check",
            message: `${this.branch.name}created successfully`
          });
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          });
        });
    },
    deleteRow(branchId) {
      this.$axios.get(`/branches/${branchId}?id=${branchId}`).then(res => {
        this.$store.dispatch("branches/branch", res.data.branch);
        this.$q.notify({
          color: "negative",
          icon: "delete",
          message: `Delete ${res.data.branch.name} ?`,
          actions: [
            {
              label: "OK",
              handler: () => {
                this.$axios
                  .delete(`/branches/${this.branch.id}?id=${this.branch.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: "positive",
                      icon: "check",
                      message: `${this.branch.name} deleted successfully`
                    });
                    this.request({
                      pagination: this.serverPagination,
                      filter: this.filter
                    });
                     this.hideModal();
                  })
                  .catch(err => {
                    this.$q.notify({
                      color: "negative",
                      icon: "warning",
                      message: `${err.response.data.message}`
                    });
                  });
              }
            }
          ]
        });
      });
      // .catch()
    },
    update() {
       this.$axios.put(`/branches/${this.branch.id}`, {
        id: this.branch.id,
        name: this.branch.name,
        desc: this.branch.desc,
        country_id: this.branch.address.country_id,
        region_id: this.branch.address.region_id,
        province_id: this.branch.address.province_id,
        city_id: this.branch.address.city_id,
        brgy_id: this.branch.address.brgy_id,
        street_lot_blk: this.branch.address.street_lot_blk,
        business_type_id: this.branch.business_info.business_type_id,
        vat_type_id: this.branch.business_info.vat_type_id,
        telephone: this.branch.business_info.telephone,
        tin: this.branch.business_info.tin,
        email: this.branch.business_info.email,
        website: this.branch.business_info.website
      })
        .then((res) => {
          this.editBranchModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${res.data.branch.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    hideModal() {
      this.$store.dispatch('branches/newBranchModal', false);
      this.editBranchModal = false;
    },
    showModal() {
      this.editBranchModal = true;
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
          `/branches?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination;
          this.serverData = _.values(res.data.branches.data);
          this.serverPagination.rowsNumber = res.data.branches.total;
          this.lastPage = res.data.branches.last_page;
          this.loading = false;
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error);
          // we tell QTable to exit the "loading" state
          this.loading = false;
        });
    },
    edit(branchId) {
      this.$axios.get(`branches/${branchId}/edit?id=${branchId}`).then(res => {
        this.showModal();
        this.$store.dispatch("branches/branch", res.data.branch);
        this.$store.dispatch("branches/companies", [res.data.branch.company]);
      });
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  },
  watch: {
    'branch.name' (val) {
      this.$store.dispatch('branches/branchName', val)
    },
    'branch.company_id' (val) {
      this.$store.dispatch('branches/branchId', val)
    },
    'branch.desc' (val) {
      this.$store.dispatch('branches/branchDesc', val)
    },
    'branch.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('branches/branchCountryId', val)
    },
    'branch.address.region_id' (val) {
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('branches/branchRegionId', val)
    },
    'branch.address.province_id' (val) {
      this.$store.dispatch('globals/getCities', val)
      this.$store.dispatch('branches/branchProvinceId', val)
    },
    'branch.address.city_id' (val) {
      this.$store.dispatch('globals/getBrgys', val)
      this.$store.dispatch('branches/branchCityId', val)
    },
    'branch.address.brgy_id' (val) {
      this.$store.dispatch('branches/branchBrgyId', val)
    },
    'branch.address.street_lot_blk' (val) {
      this.$store.dispatch('branches/branchStreetLotBlk', val)
    },
    'branch.business_info.business_type_id' (val) {
      this.$store.dispatch('branches/branchBusinessTypeId', val)
    },
    'branch.business_info.vat_type_id' (val) {
      this.$store.dispatch('branches/branchVatTypeId', val)
    },
    'branch.business_info.telephone' (val) {
      this.$store.dispatch('branches/branchTelephone', val)
    },
    'branch.business_info.email' (val) {
      this.$store.dispatch('branches/branchEmail', val)
    },
    'branch.business_info.tin' (val) {
      this.$store.dispatch('branches/branchTin', val)
    },
    'branch.business_info.website' (val) {
      this.$store.dispatch('branches/branchWebsite', val)
    }
  }
};
</script>
