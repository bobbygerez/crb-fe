<template>
<div>
    Dashboard
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {

  methods: {
    ...mapActions('menus', ['setMenus']),
    getMenus () {
      this.$axios.get('/menus')
        .then(res => {
          this.setMenus(res.data.menus)
        })
    }
  },
  mounted () {
    this.getMenus()
  }
}
</script>
