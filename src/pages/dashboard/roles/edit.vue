<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="edit" color="grey" /> {{ role.name }}</p>
        </div>
        <div class="col-12">
            <q-input outlined v-model="$v.role.name.$model" label="Role Name" class="q-ma-sm" :error="$v.role.name.$dirty && !$v.role.name.required" bottom-slots error-message="Role name is required." />
        </div>
        <div class="col-12">
            <q-select outlined v-model="$v.selectedRoles.$model" :options="roles" label="Supervisor" class="q-ma-sm" :error="$v.selectedRoles.$dirty && !$v.selectedRoles.role" bottom-slots error-message="Supervisor role is required." />
        </div>
        <div class="col-12" v-if="subordinates.length > 0">
            <p class="title q-ml-sm">Subordinates: </p>
            <q-chip outline v-for="(sub, i) in subordinates" :key="i" color="grey-8">{{ sub }}</q-chip>
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="$v.role.description.$model" label="Description" class="q-ma-sm" :error="$v.role.description.$dirty &&!$v.role.description.required" bottom-slots error-message="Description is required." />
        </div>
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="update" color="primary" label="Update" class="q-ma-sm" />
        </div>
    </div>
</div>
</template>

<script>
const role = (value) => value.label !== undefined
import {
  required
} from 'vuelidate/lib/validators'
import {
  find,
  head
} from 'lodash'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  validations: {
    role: {
      name: {
        required
      },
      description: {
        required
      }
    },
    selectedRoles: {
      role
    }
  },
  methods: {
    ...mapActions('roles', ['setRoles', 'setRoleParentId']),
    cancel () {
      this.$router.go(-1)
    },
    create () {
      this.$axios.get('/dashboard_role/create')
        .then(res => {
          this.setRoles(res.data.roles)
        })
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
        let role = []
        role.push({
          name: this.role.name,
          description: this.role.description,
          parent_id: this.role.parent_id.value
        })
        this.$axios.put(`/dashboard_role/${this.role.optimus_id}?id=${this.role.optimus_id}`, head(role)).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.role.name} updated successfully.`
          })
        }).catch(err => {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: err.response.data.message
          })
        })
      }
    }
  },
  computed: {
    ...mapState('roles', ['role']),
    roles () {
      var res = []
      const cb = (e) => {
        res.push({
          value: e.id,
          label: e.name
        })
        e.all_children && e.all_children.forEach(cb)
      }
      this.$store.getters['roles/roles'].all_children.forEach(cb)
      return res
    },
    subordinates () {
      var res = []
      const cb = (e) => {
        res.push(e.name)
        e.all_children && e.all_children.forEach(cb)
      }
      this.role.all_children.forEach(cb)
      console.log(res)
      return res
    },
    selectedRoles: {
      get () {
        if (typeof this.role.parent_id === 'object') {
          return find(this.roles, {
            value: this.role.parent_id.value
          })
        } else {
          return find(this.roles, {
            value: this.role.parent_id
          })
        }
      },
      set (val) {
        this.setRoleParentId(val)
      }
    }
  },
  mounted () {
    this.create()
  }
}
</script>
