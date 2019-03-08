<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="edit" color="grey" /> {{ editUser.fullname }}</p>
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.username.$model" bottom-slots error-message="Username is required." :error="!$v.editUser.username.required" label="Username" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.email.$model" bottom-slots error-message="Email must be valid and required." label="Email" class="q-ma-sm" :error="!$v.editUser.email.required || !$v.editUser.email.email" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.mobile.$model" bottom-slots error-message="Mobile must be 11 digits and required." label="Mobile" class="q-ma-sm" :error="!$v.editUser.mobile.required || !$v.editUser.mobile.integer|| !$v.editUser.mobile.minLength" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.firstname.$model" bottom-slots error-message="Firstname is required." label="Firstname" class="q-ma-sm" :error="!$v.editUser.firstname.required" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.middlename.$model" bottom-slots error-message="Middlename is required." label="Middlename" class="q-ma-sm" :error="!$v.editUser.middlename.required" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.editUser.lastname.$model" bottom-slots error-message="Lastname is required." label="Lastname" class="q-ma-sm" :error="!$v.editUser.lastname.required" />
        </div>
        <div class="col-12">
            <q-select outlined v-model="$v.selectedRoles.$model" multiple :options="roles" label="Roles" class="q-ma-sm" use-chips :error="!$v.selectedRoles.role" bottom-slots error-message="Please add role/s." />
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedProvince.$model" :options="editProvinces" label="Province" class="q-ma-sm" use-chips emit-value :error="!$v.selectedProvince.places" bottom-slots error-message="Province is required." />
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedCity.$model" :options="editCities" label="City" class="q-ma-sm" use-chips emit-value :error="!$v.selectedCity.places" bottom-slots error-message="City is required." />
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedBrgy.$model" :options="editBrgys" label="Brgys" class="q-ma-sm" use-chips emit-value :error="!$v.selectedBrgy.places" bottom-slots error-message="Barangay is required." />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="$v.editUser.address.street_lot_blk.$model" label="Blk, Lot and Street No." class="q-ma-sm" :error="!$v.editUser.address.street_lot_blk.required" bottom-slots error-message="Street, lot and block is required." />
        </div>
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="update" color="primary" label="Update" class="q-ma-sm" />
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import {
  integer,
  email,
  required,
  minLength
} from 'vuelidate/lib/validators'
import {
  mapState,
  mapActions
} from 'vuex'
const role = (value) => value.length > 0
const places = (value) => typeof value === 'object'
export default {
  validations: {
    editUser: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      mobile: {
        required,
        integer,
        minLength: minLength(11)
      },
      firstname: {
        required
      },
      middlename: {
        required
      },
      lastname: {
        required
      },
      address: {
        street_lot_blk: {
          required
        }
      }
    },
    selectedRoles: {
      role
    },
    selectedProvince: {
      places
    },
    selectedCity: {
      places
    },
    selectedBrgy: {
      places
    }
  },
  methods: {
    ...mapActions('users', ['setRoles', 'setEditRoleIds', 'setEditProvinces', 'setEditProvinceId', 'setEditCities', 'setEditCityId', 'setEditBrgys', 'setEditBrgyId', 'setEditStreetLotBlk', 'setEditUser']),
    getRoles () {
      this.$axios.get('/roles')
        .then(res => {
          this.setRoles(res.data.roles)
        })
    },
    getProvinces () {
      this.$axios.get('/provinces')
        .then(res => {
          this.setEditProvinces(res.data.provinces)
        })
    },
    getCities (provId) {
      this.$axios.get(`/cities/${provId}`)
        .then(res => {
          this.setEditCities(res.data.cities)
        })
    },
    getBrgys (cityId) {
      this.$axios.get(`/brgys/${cityId}`)
        .then(res => {
          this.setEditBrgys(res.data.brgys)
        })
    },
    cancel () {
      this.$router.go(-1)
    },
    update () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please check the fields.`
        })
      } else {
        this.$axios.put(`/users/${this.editUser.optimus_id}?id=${this.editUser.optimus_id}`, this.editUser).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `User updated successfully.`
          })
        })
      }
    }
  },
  computed: {
    ...mapState('users', ['editUser', 'user']),
    roles () {
      return this.$store.getters['users/roles'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    editProvinces () {
      return this.$store.getters['users/editProvinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    editCities () {
      return this.$store.getters['users/editCities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    editBrgys () {
      return this.$store.getters['users/editBrgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    selectedRoles: {
      get () {
        return _.intersectionWith(this.roles, this.editUser.role_ids, (a, b) => a.value === b)
      },
      set (val) {
        this.setEditRoleIds(_.map(val, 'value'))
      }
    },
    selectedProvince: {
      get () {
        return _.find(this.editProvinces, {
          value: this.editUser.address.province_id
        })
      },
      set (val) {
        this.setEditProvinceId(val)
        this.getCities(val)
      }
    },
    selectedCity: {
      get () {
        return _.find(this.editCities, {
          value: this.editUser.address.city_id
        })
      },
      set (val) {
        this.setEditCityId(val)
        this.getBrgys(val)
      }
    },
    selectedBrgy: {
      get () {
        return _.find(this.editBrgys, {
          value: this.editUser.address.brgy_id
        })
      },
      set (val) {
        this.setEditBrgyId(val)
      }
    }
  },
  mounted () {
    this.getRoles()
    this.getProvinces()
  },
  watch: {
    editUser: {
      handler (val) {
        this.setEditUser(val)
      },
      deep: true
    }
  }
}
</script>
