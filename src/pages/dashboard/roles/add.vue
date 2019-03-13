<template>
<div class="q-ma-md">
    <generic-role :role="role" :selected-roles="selectedRoles" @change="change" icon="add_circle">
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
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
  head, find
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
  components: {
    genericRole
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
    add () {
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
          parent_id: this.selectedRoles.value
        })
        this.$axios.post(`/dashboard_role`, head(role)).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.role.name} updated successfully.`
          })
        }).catch(err => {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `${err.response.data.message}`
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
    selectedRoles: {
      get () {
        if (typeof this.role.parent_id === 'object') {
          var x = find(this.roles, {
            value: this.role.parent_id.value
          })

          if (typeof x === 'object') {
            return x
          } else {
            return {
              value: ''
            }
          }
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
