<template>
  <div class="q-pa-sm">
    <roles></roles>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewRole()"
      >
        <q-icon name="add"></q-icon>
        new role
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import roles from 'components/data-table/roles.vue'
export default {
  methods: {
    showNewRole () {
      this.$store.dispatch('roles/role', {
        name: '',
        parent_id: '',
        description: ''
      })
      this.$store.dispatch('roles/newRoleModal', true)
    }
  },
  components: {
    roles
  }
}
</script>
