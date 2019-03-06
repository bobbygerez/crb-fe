<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="edit" color="grey" /> {{ editUser.fullname }}</p>
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.username" label="Username" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.email" label="Email" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.mobile" label="Mobile" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.firstname" label="Firstname" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.middlename" label="Middlename" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-input outlined v-model="editUser.lastname" label="Lastname" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-select outlined v-model="selectedRoles" multiple :options="roles" label="Roles" class="q-ma-sm" use-chips />
        </div>
        <div class="col-4">
            <q-select outlined v-model="selectedProvince" :options="editProvinces" label="Province" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-4">
            <q-select outlined v-model="selectedCity" :options="editCities" label="City" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-4">
            <q-select outlined v-model="selectedBrgy" :options="editBrgys" label="Brgys" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="editUser.address.street_lot_blk" label="Blk, Lot and Street No." class="q-ma-sm" />
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
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
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
      this.$axios.put(`/users/${this.editUser.optimus_id}?id=${this.editUser.optimus_id}`, {
        user: this.editUser
      }).then(res => {
        this.$q.notify({
          color: 'positive',
          icon: 'check',
          message: `User updated successfully.`
        })
      })
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
