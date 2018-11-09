<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <q-btn>Login</q-btn>
  </q-page>
</template>
<style>
</style>

<script>
export default {
  name: 'Login',
  computed: {
	provinces(){
		return this.$store.getters.provinces
	}
}
}
</script>
