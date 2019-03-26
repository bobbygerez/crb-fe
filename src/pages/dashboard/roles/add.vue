<template>
<div class="q-ma-md">
    <generic-role :role="role" @change="change" icon="add_circle" @selected="selected" ref="roleGen">
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Back" class="q-ma-sm" />
            <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
        </div>
    </generic-role>
</div>
</template>

<script>
import genericRole from 'pages/dashboard/roles/form/generic-role'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    genericRole
  },
  methods: {
    ...mapActions('roles', ['setRoles', 'setRole', 'setRoleParentId']),
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
    add () {
      this.$refs.roleGen.add()
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
    }
  },
  mounted () {
    this.create()
  }
}
</script>
