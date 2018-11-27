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
            <q-checkbox v-model="user.status" label="Enable/Disable" />
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
            <q-select multiple v-model="userRoles" :options="roleOptions" float-label="Roles" clearable chips />
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
            <q-select v-model="user.information.civil_status_id" :options="civilStatusOptions" float-label="Civil Status" clearable chips />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.information.gender_id" :options="genderOptions" float-label="Gender" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.region_id" :options="regions" float-label="Region" clearable chips />
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.province_id" :options="provinces" float-label="Province" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.city_id" :options="cities" float-label="City" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.brgy_id" :options="brgys" float-label="City" clearable chips />
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
            <q-checkbox v-model="user.status" label="Enable/Disable" />
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
            <q-input type="password" v-model="user.password" float-label="Password" />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-select multiple v-model="userRoles" :options="roleOptions" float-label="Roles" clearable chips />
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
            <q-select v-model="user.information.civil_status_id" :options="civilStatusOptions" float-label="Civil Status" clearable chips />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.information.gender_id" :options="genderOptions" float-label="Gender" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.country_id" :options="countries" float-label="Country" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.region_id" :options="regions" float-label="Region" clearable chips />
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.province_id" :options="provinces" float-label="Province" clearable chips />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select v-model="user.address.city_id" :options="cities" float-label="City" clearable chips />
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
    </q-modal>
  </div>
</template>

<script>
import { values } from 'lodash'
import { mapUserFields } from '../../store/users'

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
    ...mapUserFields(['user', 'roles', 'civilStatuses', 'newUserModal', 'genders']),
    roleOptions () {
      return this.roles.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    userRoles: {
      get () {
        return this.user.roles.map(e => {
          return e.id
        })
        // this.selectedRoles = roles
        // return roles
      },
      set (val) {
        this.selectedRoles = val
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
      return this.$store.getters['globals/getRegions'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    provinces () {
      let provinces = this.$store.getters['globals/getProvinces']
      if (provinces === undefined) return []
      return provinces.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      let cities = this.$store.getters['globals/getCities']
      if (cities === undefined) return []
      return cities.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      let brgys = this.$store.getters['globals/getBrgys']
      if (brgys === undefined) return []
      return brgys.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    civilStatusOptions () {
      return this.civilStatuses.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    genderOptions () {
      return this.genders.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
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
      this.$store.dispatch('users/setNewUserModal', false)
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
          this.serverData = values(res.data.users.data)
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
    edit (userId) {
      this.$axios.get(`users/${userId}/edit?id=${userId}`)
        .then(res => {
          this.editUserModal = true
          this.$store.dispatch('users/setUser', res.data.user)
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
  }
}
</script>
