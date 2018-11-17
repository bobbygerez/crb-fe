<template>
  <span>dashboard</span>
</template>

<script type="text/javascript">

export default {

  created () {
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.token}`
  }
}
</script>
