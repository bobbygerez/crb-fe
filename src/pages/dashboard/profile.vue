<template>
    <edit-user></edit-user>
</template>

<script>
import editUser from 'pages/dashboard/users/edit'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    editUser
  },
  computed: {
    ...mapState('users', ['user'])
  },
  methods: {
    ...mapActions('users', ['setEditUser'])
  },
  mounted () {
    this.$axios.get(`/users/${this.user.optimus_id}/edit?id=${this.user.optimus_id}`)
      .then(res => {
        this.setEditUser(res.data.user)
      })
  }
}
</script>
