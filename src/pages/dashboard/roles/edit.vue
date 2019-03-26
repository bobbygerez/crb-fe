<template>
<div class="q-ma-md">
    <generic-role :role="role" :selected-roles="selectedRoles" @change="change" icon="edit"  ref="roleGen">
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Back" class="q-ma-sm" />
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
    ...mapActions('roles', ['setRoles', 'setRoleParentId', 'setRole']),
    selected (val) {
      this.setRoleParentId(val)
    },
    change (val) {
      this.setRole(val)
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
      this.$refs.roleGen.update()
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
