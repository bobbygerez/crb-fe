<template>
<div class="q-ma-md">
    <form @submit.prevent="$emit('add')">
        <div class="row">
            <div class="col-12">
                <p class="text-h5 q-ma-sm">
                    <q-icon :name="icon" color="grey" /> {{ locRole.name }}
                </p>
            </div>
            <div class="col-12">
                <q-input outlined debounced="500" v-model="$v.locRole.name.$model" label="Role Name" class="q-ma-sm" :error="$v.locRole.name.$dirty && !$v.locRole.name.required" bottom-slots error-message="Role name is required." />
            </div>
            <div class="col-12">
                <q-select outlined v-model="$v.childSelectedRoles.$model" :options="roles" label="Supervisor" class="q-ma-sm" :error="$v.childSelectedRoles.$dirty && !$v.childSelectedRoles.valRole" bottom-slots error-message="Supervisor role is required." />
            </div>
            <div class="col-12">
                <q-input type="textarea" debounced="500" outlined v-model="$v.locRole.description.$model" label="Description" class="q-ma-sm" :error="$v.locRole.description.$dirty &&!$v.locRole.description.required" bottom-slots error-message="Description is required." />
            </div>
            <slot></slot>
        </div>
    </form>
</div>
</template>

<script>
const valRole = (value) => value.label !== undefined
import {
  required
} from 'vuelidate/lib/validators'
import {
  find, head
} from 'lodash'

export default {
  props: {
    role: {
      type: [Array, Object],
      default: null
    },
    icon: {
      type: [String],
      default: null
    }
  },
  data () {
    return {
      locRole: this.role
    }
  },
  validations: {
    locRole: {
      name: {
        required
      },
      description: {
        required
      }
    },
    childSelectedRoles: {
      valRole
    }
  },
  methods: {
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
          parent_id: this.childSelectedRoles.value
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
    childSelectedRoles: {
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
        this.$emit('selected', val)
      }

    }
  },
  watch: {
    locRole: {
      handler (val) {
        this.$emit('change', val)
      },
      deep: true
    }
  }
}
</script>
