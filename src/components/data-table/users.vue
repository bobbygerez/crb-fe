<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Users"
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
          <q-td key="name">
            {{props.row.firstname}} {{props.row.middlename}} {{props.row.lastname}}
          </q-td>
          <q-td key="roles">
            <q-chip
              color="orange"
              small
              v-for="(role, i) in props.row.roles"
              :key="i"
            >{{ role.name }}</q-chip>
          </q-td>
          <q-td key="created">
            {{ props.row.created_at }}
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

      <div
        slot="pagination"
        slot-scope="props"
        class="row flex-center q-py-sm"
      >
        <q-btn
          round
          dense
          size="sm"
          icon="undo"
          color="secondary"
          class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div
          class="q-mr-sm"
          style="font-size: small"
        >
          Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </div>
        <q-btn
          round
          dense
          size="sm"
          icon="redo"
          color="secondary"
          :disable="paginationLast(props.pagination.page)"
          @click="props.nextPage"
        />
      </div>

    </q-table>

    <q-modal
      v-model="editUserModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</div>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-checkbox
              v-model="user.status"
              label="Enable/Disable"
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.username"
              float-label="Username"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              multiple
              v-model="userRoles"
              :options="roleOptions"
              float-label="Roles"
              clearable
              chips
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.firstname"
              float-label="Firstname"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.middlename"
              float-label="Middlename"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.lastname"
              float-label="Lastname"
              clearable
            />
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
            <q-input
              v-model="user.information.employee_id"
              float-label="Employee ID"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.information.mobile"
              float-label="Mobile"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.information.nationality"
              float-label="Nationality"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="user.information.civil_status_id"
              :options="civilStatusOptions"
              float-label="Civil Status"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.information.gender_id"
              :options="genderOptions"
              float-label="Gender"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.country_id"
              :options="countryOptions"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.region_id"
              :options="regionOptions"
              float-label="Region"
              clearable
            />
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.province_id"
              :options="provinceOptions"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.city_id"
              :options="cityOptions"
              float-label="City"
              clearable
              :after="[
                  {
                    icon: 'mdi-magnify',
                    handler () {
                      addressType = 'present'
                      $refs.cityTable.show()
                      // do something
                    }
                  }
                ]"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.brgy_id"
              :options="brgyOptions"
              float-label="Brgy"
              clearable
              :after="[
                  {
                    icon: 'mdi-magnify',
                    handler () {
                      addressType = 'present'
                      $refs.barangayTable.show()
                      // openTableBarangay('present')
                      // do something
                    }
                  }
                ]"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="user.address.street_lot_blk"
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
    <q-modal
      v-model="newUserModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</div>
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-checkbox
              v-model="user.status"
              label="Enable/Disable"
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.username"
              float-label="Username"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              type="password"
              v-model="user.password"
              float-label="Password"
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-select
              multiple
              v-model="userRoles"
              :options="roleOptions"
              float-label="Roles"
              clearable
              chips
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.firstname"
              float-label="Firstname"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.middlename"
              float-label="Middlename"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.lastname"
              float-label="Lastname"
              clearable
            />
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
            <q-input
              v-model="user.information.employee_id"
              float-label="Employee ID"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.information.mobile"
              float-label="Mobile"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="user.information.nationality"
              float-label="Nationality"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="user.information.civil_status_id"
              :options="civilStatusOptions"
              float-label="Civil Status"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.information.gender_id"
              :options="genderOptions"
              float-label="Gender"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.country_id"
              :options="countryOptions"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.region_id"
              :options="regionOptions"
              float-label="Region"
              clearable
            />
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.province_id"
              :options="provinceOptions"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.city_id"
              :options="cityOptions"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="user.address.brgy_id"
              :options="brgyOptions"
              float-label="Brgy"
              clearable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="user.address.street_lot_blk"
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
          @click="store()"
          label="Submit"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
    <barangay-table
      ref="barangayTable"
      :params="addressType"
      @barangay-location-selected="locationSelected"
    />
    <city-table
      ref="cityTable"
      :params="addressType"
      @city-location-selected="locationSelected"
    />
  </div>
</template>

<script>
import { values } from 'lodash'
import { mapUserFields } from '../../store/users'
import { mapGlobalFields } from '../../store/globals'

import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'

// import { createAddress } from 'assets/models/Address'

export default {
  components: {
    BarangayTable,
    CityTable
  },
  data () {
    return {
      addressType: 'home',
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
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys']),
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
      },
      set (val) {
        this.selectedRoles = val
      }
    },
    countryOptions () {
      return this.countries.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    regionOptions () {
      return this.regions.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    provinceOptions () {
      // let provinces = this.$store.getters['globals/getProvinces']
      // if (provinces === undefined) return []
      return this.provinces.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cityOptions () {
      // let cities = this.$store.getters['globals/getCities']
      // if (cities === undefined) return []
      return this.cities.map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgyOptions () {
      // let brgys = this.$store.getters['globals/getBrgys']
      // if (brgys === undefined) return []
      return this.brgys.map(e => {
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
    },
    locationSelected (loc, where) {
      console.log('locationSelected =>', loc)
      console.log('locationSelected where =>', where)
      console.log('address before', this.user.address)
      if (loc) {
        // let address = {
        console.log('address options', this.countries, this.regions, this.cities, this.brgys)
        // this.countries = []
        this.regions = []
        this.cities = []
        this.brgys = []

        // this.countries.push({ label: loc.region.country.description, value: loc.region.country.id })
        this.regions.push({ label: loc.region.description, value: loc.region.id })
        this.provinces.push({ label: loc.province.description, value: loc.province.id })
        this.cities.push({ label: loc.city.description, value: loc.city.id })
        this.brgys.push({ label: loc.description, value: loc.id })
        console.log('address options', this.countries, this.regions, this.cities, this.brgys)
        // this.user.address. loc.description,
        // city: loc.city.description,
        // province: loc.province.description,
        // region: loc.region.description,
        // country: loc.region.country.description
        this.user.address.country_id = loc.region.country.id
        this.user.address.region_id = loc.region.id
        this.user.address.province_id = loc.province.id
        this.user.address.city_id = loc.city.id
        this.user.address.brgy_id = loc.id
        this.user.address.street_lot_blk = this.user.address.street_lot_blk
        // this.user.address = createAddress({
        //   country_id: loc.region.country.id,
        //   region_id: loc.region.id,
        //   province_id: loc.province.id,
        //   city_id: loc.city.id,
        //   brgy_id: loc.id,
        //   street_lot_blk: this.user.address.street_lot_blk
        // })
        // }
        // set the address fields based on type
        // this.setAddressFields(where, address)
        // check address
        console.log('new setted address', this.user.address)
      }
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
