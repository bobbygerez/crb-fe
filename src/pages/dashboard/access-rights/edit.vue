<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="edit" color="grey" /> {{ role.name }}</p>
        </div>
        <div class="col-4">
            <q-input outlined v-model="role.name" label="Role Name" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="role.description" label="Description" class="q-ma-sm" />
        </div>
        <div class="col-12">
            <q-btn @click="cancel" color="secondary" label="Cancel" class="q-ma-sm" />
            <q-btn @click="update" color="primary" label="Update" class="q-ma-sm" />
        </div>
    </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    update () {
      this.$axios.put(`/dashboard_role/${this.role.optimus_id}?id=${this.role.optimus_id}`, {
        role: this.role
      }).then(res => {
        this.$q.notify({
          color: 'positive',
          icon: 'check',
          message: `${this.role.name} updated successfully.`
        })
      })
    }
  },
  computed: {
    ...mapState('roles', ['role'])
  }
}
</script>
