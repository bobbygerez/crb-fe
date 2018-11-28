<template>
  <div>
    <q-table ref="table" color="primary" title="All Roles" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="name">
            {{props.row.name }}
          </q-td>
          <q-td key="subordinates">
            <span v-for="(subordinate, i) in props.row.children" :key="i">
              {{ subordinate.name }}
            </span>
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

    <q-modal v-model="editRoleModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ role.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input v-model="role.name" float-label="Name" clearable />
          </div>
          <div class="col-xs-12 col-sm-6">
             <q-select multiple v-model="subordinatesIds" :options="availRoles" float-label="Subordinates" clearable chips/>
          </div>
        </div>

        <br />
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()" />
        <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm" />

      </div>
    </q-modal>
    <!-- <q-modal v-model="newUserModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}">
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
            <q-select  v-model="user.address.brgy_id" :options="brgys" float-label="Brgy" clearable chips/>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input v-model="user.address.street_lot_blk" type="textarea" float-label="Block, Lot &amp; Street" :max-height="100" rows="2" />
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
// import tableData from 'assets/table-data'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      model: '2016-10-24T10:40:14.674Z',
      selectedRoles: [],
      editRoleModal: false,
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
        { name: 'subordinates', label: 'Subordinates', align: 'left', field: 'subordinates' },
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
    ...mapState('roles', ['roles', 'role']),
    availRoles () {
      return this.$store.getters['roles/getAvailRoles'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    subordinatesIds: {

      get () {
        return this.$store.getters['roles/getAvailRoles'].map(e => {
          return e.id
        })
      },
      set (val) {
        this.selectedRoles = val
      }

    }

  },
  methods: {
    store () {
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
        .then((res) => {
          this.hideModal()
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (userId) {
      this.$axios.get(`/users/${userId}?id=${userId}`)
        .then((res) => {
          this.$store.dispatch('users/user', res.data.user)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.user.firstname}  ${res.data.user.lastname}?`,
            actions: [
              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/users/${this.user.id}?id=${this.user.id}`)
                    .then((res) => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.user.firstname} ${this.user.lastname}deleted successfully`
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
          })
          this.hideModal()
        })
        .catch()
    },
    hideModal () {
      this.editRoleModal = false
    },
    showModal () {
      this.editRoleModal = true
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
          `/roles?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.roles.data)
          this.serverPagination.rowsNumber = res.data.roles.total
          this.lastPage = res.data.roles.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (roleId) {
      this.$axios.get(`roles/${roleId}/edit?id=${roleId}`)
        .then(res => {
          this.editRoleModal = true
          this.$store.dispatch('roles/setRole', res.data.role)
          this.$store.dispatch('roles/setAvailRoles', res.data.availRoles)
        })
    },
    subordinateRoles () {
      this.$axios.get(`/user-subordinate-roles`)
        .then(res => {
          this.$store.dispatch('users/setRoles', res.data.roles)
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
    'role.name' (val) {
      this.$store.dispatch('roles/name', val)
    }
  }

}
</script>
