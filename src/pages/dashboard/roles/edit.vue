<template>
<div class="q-ma-md">
    <generic-role :role="role" :selected-roles="selectedRoles" @change="change">
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="update" color="primary" label="Update" class="q-ma-sm" />
        </div>
    </generic-role>
</div>
</template>

<script>
const role = (value) => value.label !== undefined

import genericRole from 'pages/dashboard/roles/form/generic-role'
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
  components: {
    genericRole
  },
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
    change (val) {
      this.setRoleParentId(val)
    },
    create () {
      this.$axios.get('/dashboard_role/create')
        .then(res => {
          this.setRoles(res.data.roles)
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
        let role = []
        let parentId = ''
        if (typeof this.role.parent_id === 'object') {
          parentId = this.role.parent_id.value
        } else {
          parentId = this.role.parent_id
        }
        role.push({
          name: this.role.name,
          description: this.role.description,
          parent_id: parentId
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
