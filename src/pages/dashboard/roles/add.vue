<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="edit" color="grey" /> {{ role.name }}</p>
        </div>
        <div class="col-12">
            <q-input outlined v-model="role.name" label="Role Name" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-select outlined v-model="selectedRoles" :options="roles" label="Supervisor" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="role.description" label="Description" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
        </div>
    </div>
</div>
</template>

<script>
import {
  head
} from 'lodash'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      selectedRoles: {
        value: 0
      }
    }
  },
  methods: {
    ...mapActions('roles', ['setRoles']),
    cancel () {
      this.$router.go(-1)
    },
    create () {
      this.$axios.get('/dashboard_role/create')
        .then(res => {
          this.setRoles(res.data.roles)
        })
    },
    add () {
      if (this.selectedRoles.value === 0) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please select a supervisor role.`
        })
        return
      }
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
      })
    }
  },
  computed: {
    ...mapState('roles', ['role']),
    roles () {
      return this.$store.getters['roles/roles'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  mounted () {
    this.create()
  }
}
</script>
