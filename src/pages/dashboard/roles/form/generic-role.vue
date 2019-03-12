<template>
<div class="q-ma-md">
    <form @submit.prevent="$emit('add')">
        <div class="row">
            <div class="col-12">
                <p class="text-h5 q-ma-sm">
                    <q-icon name="edit" color="grey" /> {{ role.name }}
                </p>
            </div>
            <div class="col-12">

                <q-input outlined v-model="$v.role.name.$model" label="Role Name" class="q-ma-sm" :error="$v.role.name.$dirty && !$v.role.name.required" bottom-slots error-message="Role name is required." />
            </div>
            <div class="col-12">
                <q-select outlined v-model="$v.childSelectedRoles.$model" :options="roles" label="Supervisor" class="q-ma-sm" :error="$v.childSelectedRoles.$dirty && !$v.childSelectedRoles.valRole" bottom-slots error-message="Supervisor role is required." />
            </div>
            <div class="col-12">
                <q-input type="textarea" outlined v-model="$v.role.description.$model" label="Description" class="q-ma-sm" :error="$v.role.description.$dirty &&!$v.role.description.required" bottom-slots error-message="Description is required." />
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

export default {
  props: {
    role: {
      type: [Array, Object],
      default: null
    },
    selectedRoles: {
      type: [Array, Object],
      default: null
    }
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
    childSelectedRoles: {
      valRole
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
        return this.selectedRoles
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>
