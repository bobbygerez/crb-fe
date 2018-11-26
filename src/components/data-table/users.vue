<template>
  <div>
    <q-table ref="table" color="primary" title="All Users" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="name">
            {{props.row.firstname}} {{props.row.middlename}} {{props.row.lastname}}
          </q-td>
          <q-td key="roles">
            <q-chip color="orange" small v-for="(role, i) in props.row.roles" :key="i">{{ role.name }}</q-chip>
          </q-td>
          <q-td key="created">
            {{ props.row.created_at }}
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

    <q-modal v-model="editUserModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</div>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-checkbox v-model="userStatus" label="Enable/Disable" />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.username" float-label="Username" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.email" float-label="Email" clearable />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select multiple v-model="userRoles" :options="roles" float-label="Roles" clearable chips />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.firstname" float-label="Firstname" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.middlename" float-label="Middlename" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.lastname" float-label="Lastname" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-datetime type="date" v-model="user.information.birthdate" color="amber" float-label="Birthdate" clearable />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.information.employee_id" float-label="Employee ID" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.information.mobile" float-label="Mobile" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.information.nationality" float-label="Nationality" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="user.information.civil_status_id" :options="civilStatus" float-label="Civil Status" clearable chips />
          </div>
        </div>
        <div class="row">
<<<<<<< HEAD
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.information.gender_id" :options="genders" float-label="Gender" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.region_id" :options="regions" float-label="Region" clearable chips/>
=======
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="user.information.gender_id" :options="genders" float-label="Gender" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips />
>>>>>>> 3bc7542e255adf61732e030e14d1d4641c3fc1cf
          </div>
          
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.province_id" :options="provinces" float-label="Province" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select  v-model="user.address.city_id" :options="cities" float-label="City" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select  v-model="user.address.brgy_id" :options="brgys" float-label="City" clearable chips/>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input v-model="user.address.street_lot_blk" type="textarea" float-label="Block, Lot &amp; Street" :max-height="100" rows="2" />
          </div>
        </div>

        <br />
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
        <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm" />

      </div>
    </q-modal>
    <q-modal v-model="newUserModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
             <div class="q-display-1 q-mb-md">Edit {{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</div>
          </div>
          <div class="col-xs-12 col-sm-3">
             <q-checkbox v-model="userStatus" label="Enable/Disable" />
          </div>
         
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
             <q-input v-model="user.username" float-label="Username" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
             <q-input v-model="user.email" float-label="Email" clearable />
          </div>
          <div class="col-xs-12 col-sm-6">
             <q-input type="password" v-model="user.password" float-label="Password"  />
          </div>
         
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-select multiple v-model="userRoles" :options="roles" float-label="Roles" clearable chips/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
             <q-input v-model="user.firstname" float-label="Firstname" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.middlename" float-label="Middlename" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.lastname" float-label="Lastname" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
              <q-datetime
                type="date"
                v-model="user.information.birthdate"
                color="amber"
                float-label="Birthdate"
                clearable
              />
          </div>
        </div>
         <div class="row">
          <div class="col-xs-12 col-sm-3">
             <q-input v-model="user.information.employee_id" float-label="Employee ID" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.information.mobile" float-label="Mobile" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input v-model="user.information.nationality" float-label="Nationality" clearable />
          </div>
          <div class="col-xs-12 col-sm-3">
              <q-select  v-model="user.information.civil_status_id" :options="civilStatus" float-label="Civil Status" clearable chips/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.information.gender_id" :options="genders" float-label="Gender" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.region_id" :options="regions" float-label="Region" clearable chips/>
          </div>
          
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
              <q-select  v-model="user.address.province_id" :options="provinces" float-label="Province" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select  v-model="user.address.city_id" :options="cities" float-label="City" clearable chips/>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select  v-model="user.address.brgy_id" :options="brgys" float-label="City" clearable chips/>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input v-model="user.address.street_lot_blk" type="textarea" float-label="Block, Lot &amp; Street" :max-height="100" rows="2" />
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
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      model: '2016-10-24T10:40:14.674Z',
      selectedRoles: [],
      editUserModal: false,
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
        { name: 'roles', label: 'Roles', align: 'left', field: 'roles' },
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
        // { name: "address", label: "Address", field: "address", align: "left" },
        // { name: "created", label: "Created", field: "created", align: "left" },
        // { name: "actions", label: "Actions", field: "actions", align: "left" }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('users', ['user']),
    newUserModal:{
      get(){
        return this.$store.getters['users/newUserModal']
      },
      set(val){

      }
    },
    userStatus: {
      get () {
        if (this.$store.getters['users/user'].status === 1) { return true } else { return false }
      },
      set (val) {
        if (val === false) { this.$store.dispatch('users/userStatus', 0) } else { this.$store.dispatch('users/userStatus', 1) }
      }

    },
    roles () {
      return this.$store.getters['users/roles'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    userRoles: {
<<<<<<< HEAD
      get(){
        return []
        let roles = this.$store.getters['users/user'].roles.map(e => {
=======
      get () {
        return this.$store.getters['users/user'].roles.map(e => {
>>>>>>> 3bc7542e255adf61732e030e14d1d4641c3fc1cf
          return e.id
        })
        this.selectedRoles = roles
        return roles
      },
      set (val) {
        this.selectedRoles = val
      }

    },
    countries () {
      let countries = this.$store.getters['globals/getCountries']
      return countries.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    regions () {
      let regions = this.$store.getters['globals/getRegions']
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
    civilStatus () {
      return this.$store.getters['users/civilStatus'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    genders () {
      return this.$store.getters['users/genders'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    create(){
       this.$axios.post(`/users`, {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        firstname: this.user.firstname,
        middlename: this.user.middlename,
        lastname: this.user.lastname,
        status: this.user.status,
        roles: this.selectedRoles,
        address: this.user.address,
        informations: this.user.information
      })
    },
    deleteRow (companyId) {
      this.$axios.get(`/companies/${companyId}?id=${companyId}`)
        .then((res) => {
          this.$store.dispatch('companies/company', res.data.company)
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
<<<<<<< HEAD
    update(){
      
      this.$axios.put(`/users/${this.user.id}`, {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        firstname: this.user.firstname,
        middlename: this.user.middlename,
        lastname: this.user.lastname,
        status: this.user.status,
        roles: this.selectedRoles,
        address: this.user.address,
        informations: this.user.information
      })
        .then((res) => {
          this.editCompanyModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${res.data.user.firstname} ${res.data.user.middlename} ${res.data.user.lastname} updated successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          });
          this.hideModal()
        })
        .catch()

    },
    hideModal(){
      this.$store.dispatch('users/newUserModal', false)
=======
    update () {

      // this.$axios.put(`/companies/${this.company.id}`, {
      //   id: this.company.id,
      //   name: this.company.name,
      //   desc: this.company.desc,
      //   country_id: this.company.address.country_id,
      //   region_id: this.company.address.region_id,
      //   province_id: this.company.address.province_id,
      //   city_id: this.company.address.city_id,
      //   brgy_id: this.company.address.brgy_id,
      //   street_lot_blk: this.company.address.street_lot_blk,
      //   business_type_id: this.company.business_info.business_type_id,
      //   vat_type_id: this.company.business_info.vat_type_id,
      //   telephone: this.company.business_info.telephone,
      //   tin: this.company.business_info.tin,
      //   email: this.company.business_info.email,
      //   website: this.company.business_info.website
      // })
      //   .then((res) => {
      //     this.editCompanyModal = false
      //     this.$q.notify({
      //       color: 'positive',
      //       icon: 'check',
      //       message: `${res.data.company.name} update successfully`
      //     })
      //     this.request({
      //       pagination: this.serverPagination,
      //       filter: this.filter
      //     });
      //   })
      //   .catch()

    },
    hideModal () {
>>>>>>> 3bc7542e255adf61732e030e14d1d4641c3fc1cf
      this.editUserModal = false
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
          `/users?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.users.data)
          this.serverPagination.rowsNumber = res.data.users.total
          this.lastPage = res.data.users.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
<<<<<<< HEAD
    edit(userId){
      this.$axios.get(`users/${userId}/edit?id=${userId}`)
      .then(res =>{
        this.editUserModal = true
        this.$store.dispatch('users/user', res.data.user)
      })
    },
    subordinateRoles(){
      this.$axios.get(`/user-subordinate-roles`)
        .then(res => {
          this.$store.dispatch('users/roles', res.data.roles)
=======
    edit (userId) {
      this.$axios.get(`/user-subordinate-roles`)
        .then(res => {
          this.$store.dispatch('users/roles', res.data.roles)
        })
      this.$axios.get(`users/${userId}/edit?id=${userId}`)
        .then(res => {
          this.editUserModal = true
          this.$store.dispatch('users/user', res.data.user)
>>>>>>> 3bc7542e255adf61732e030e14d1d4641c3fc1cf
        })
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
    this.subordinateRoles()
  },
  watch: {
    'user.username' (val) {
      this.$store.dispatch('users/userName', val)
    },
    'user.email' (val) {
      this.$store.dispatch('users/email', val)
    },
    'user.passowrd' (val) {
      this.$store.dispatch('users/password', val)
    },
     'user.firstname' (val) {
      this.$store.dispatch('users/firstname', val)
    },
     'user.middlename' (val) {
      this.$store.dispatch('users/middlename', val)
    },
     'user.lastname' (val) {
      this.$store.dispatch('users/lastname', val)
    },
    'user.information.birthdate' (val){
      this.$store.dispatch('users/birthdate', val)
    },
     'user.information.employee_id' (val){
      this.$store.dispatch('users/employeeId', val)
    },
    'user.information.mobile'(val){
      this.$store.dispatch('users/mobile', val)
    },
    'user.information.civil_status_id'(val){
      this.$store.dispatch('users/civilStatusId', val)
    },
    'user.information.gender_id'(val){
      this.$store.dispatch('users/genderId', val)
    },
    'user.information.nationality'(val){
      this.$store.dispatch('users/nationality', val)
    },
<<<<<<< HEAD
    'user.address.country_id' (val) {
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('users/countryId', val)
    },
    'user.address.region_id' (val) {
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('users/regionId', val)
    },
    'user.address.province_id' (val) {
      this.$store.dispatch('globals/getCities', val)
      this.$store.dispatch('users/provinceId', val)
    },
    'user.address.city_id' (val) {
      this.$store.dispatch('globals/getBrgys', val)
      this.$store.dispatch('users/cityId', val)
=======
    'company.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('companies/country', val)
    },
    'company.address.region_id' (val) {
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('companies/region', val)
    },
    'company.address.province_id' (val) {
      this.$store.dispatch('companies/province', val)
      this.$store.dispatch('globals/getCities', val)
    },
    'company.address.city_id' (val) {
      this.$store.dispatch('companies/city', val)
      this.$store.dispatch('globals/getBrgysS', val)
>>>>>>> 3bc7542e255adf61732e030e14d1d4641c3fc1cf
    },
    'user.address.brgy_id' (val) {
      this.$store.dispatch('users/brgyId', val)
    },
    'company.business_info.business_type_id' (val) {
      this.$store.dispatch('companies/businessType', val)
    },
    'company.business_info.vat_type_id' (val) {
      this.$store.dispatch('companies/vatType', val)
    },
    'company.address.street_lot_blk' (val) {
      this.$store.dispatch('companies/streetLotBlk', val)
    },
    'company.business_info.telephone' (val) {
      this.$store.dispatch('companies/telephone', val)
    },
    'company.business_info.email' (val) {
      this.$store.dispatch('companies/email', val)
    },
    'company.business_info.tin' (val) {
      this.$store.dispatch('companies/tin', val)
    },
    'company.business_info.website' (val) {
      this.$store.dispatch('companies/website', val)
    }
  }

}
</script>
