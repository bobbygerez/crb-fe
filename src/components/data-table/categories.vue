<template>
  <div>
    <q-btn round outline color="positive" icon="edit" class="q-ma-sm" @click="create()"/>
    <q-btn round outline color="negative" icon="delete" class="q-ma-sm" @click="deleteSelected()"/>
    <div class="q-mb-sm row no-wrap items-center">
      <q-select
        v-model="tickStrategy"
        color="secondary"
        stack-label="Tick Strategy"
        :options="[
            {label: 'None', value: 'none'},
            {label: 'Leaf', value: 'leaf'},
            {label: 'Leaf Filtered', value: 'leaf-filtered'},
            {label: 'Strict', value: 'strict'}
          ]"
        class="q-ma-none q-mr-sm"
        style="width: 150px"
      />
      <q-input
        v-if="tickStrategy === 'leaf-filtered'"
        color="secondary"
        stack-label="Filter"
        v-model="tickFilter"
        class="q-ma-none"
        clearable
      />
    </div>
    <q-tree
      :nodes="categories"
      color="secondary"
      default-expand-all
      :ticked.sync="ticked"
      :tick-strategy="tickStrategy"
      :filter="tickFilter"
      node-key="id"
      label-key="label"
    />
    <q-modal
      v-model="newCategoryModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Category</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12" v-if="ticked.length > 0">
            <q-input
              v-model="name"
              float-label="Parent Category"
              clearable
              disable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="name"
              float-label="Desc"
              type="textarea"
              :max-height="100"
              rows="2"
              clearable
            />
          </div>
          
        
      </div>
      <br />
      <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="closeModal()"
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
import _ from "lodash";
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: '',
      ticked: [],
      tickFilter: null,
      tickStrategy: "strict",
      model: "2016-10-24T10:40:14.674Z",
      superior: "",
      selectedRoles: [],
      newCategoryModal: false,
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
        { name: "desc", label: "Description", align: "left", field: "desc" },
        { name: "created", label: "Created", align: "left", field: "created" },
        { name: "actions", label: "Actions", align: "left", field: "actions" }
      ],
      filter: "",
      loading: false
    };
  },
  computed: {
    categories() {
      let categories = this.$store.getters["categories/categories"];
      const map = e => ({
          id: e.id,
          label: e.name,
          children: e.all_children.map(map) // recursive call
        }),
        tree = categories.map(map);
      return tree;
    }
  },
  methods: {
    create() {
      console.log(this.ticked.length <= 1)
      console.log(this.tickStrategy === "strict")
      if ( this.ticked.length <= 1 && this.tickStrategy === "strict") {
        this.newCategoryModal = true
      }else{
         this.$q.notify({
          color: "negative",
          icon: "warning",
          message: `'strict' strategy  and selected must be less than 2. (${this.ticked.length} selected)`
        });
      }
    },
    deleteSelected() {
      console.log(this.ticked);
    },
    onLazyLoad({ node, key, done, fail }) {
      // call fail() if any error occurs
      setTimeout(() => {
        // simulate loading and setting an empty node
        if (key.indexOf("Lazy load empty") > -1) {
          done([]);
          return;
        }
        const label = node.label;
        done([
          { label: `${label}.1` },
          { label: `${label}.2`, lazy: true },
          {
            label: `${label}.3`,
            children: [
              { label: `${label}.3.1`, lazy: true },
              { label: `${label}.3.2`, lazy: true }
            ]
          }
        ]);
      }, 1000);
    },
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
      this.$axios
        .put(`/branches/${this.branch.id}`, {
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
        .then(res => {
          this.editBranchModal = false;
          this.$q.notify({
            color: "positive",
            icon: "check",
            message: `${res.data.branch.name} update successfully`
          });
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          });
        })
        .catch();
    },
    closeModal() {
      this.newCategoryModal = false;
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
        .get(`/categories?filter=${this.filter}`)
        .then(res => {
          this.$store.dispatch("categories/categories", res.data.categories);
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
    "branch.name"(val) {
      this.$store.dispatch("branches/branchName", val);
    },
    "branch.company_id"(val) {
      this.$store.dispatch("branches/branchId", val);
    },
    "branch.desc"(val) {
      this.$store.dispatch("branches/branchDesc", val);
    },
    "branch.address.country_id"(val) {
      if (val === null || val === undefined) return;
      this.$store.dispatch("globals/getRegions", val);
      this.$store.dispatch("branches/branchCountryId", val);
    },
    "branch.address.region_id"(val) {
      this.$store.dispatch("globals/getProvinces", val);
      this.$store.dispatch("branches/branchRegionId", val);
    },
    "branch.address.province_id"(val) {
      this.$store.dispatch("globals/getCities", val);
      this.$store.dispatch("branches/branchProvinceId", val);
    },
    "branch.address.city_id"(val) {
      this.$store.dispatch("globals/getBrgys", val);
      this.$store.dispatch("branches/branchCityId", val);
    },
    "branch.address.brgy_id"(val) {
      this.$store.dispatch("branches/branchBrgyId", val);
    },
    "branch.address.street_lot_blk"(val) {
      this.$store.dispatch("branches/branchStreetLotBlk", val);
    },
    "branch.business_info.business_type_id"(val) {
      this.$store.dispatch("branches/branchBusinessTypeId", val);
    },
    "branch.business_info.vat_type_id"(val) {
      this.$store.dispatch("branches/branchVatTypeId", val);
    },
    "branch.business_info.telephone"(val) {
      this.$store.dispatch("branches/branchTelephone", val);
    },
    "branch.business_info.email"(val) {
      this.$store.dispatch("branches/branchEmail", val);
    },
    "branch.business_info.tin"(val) {
      this.$store.dispatch("branches/branchTin", val);
    },
    "branch.business_info.website"(val) {
      this.$store.dispatch("branches/branchWebsite", val);
    }
  }
};
</script>
