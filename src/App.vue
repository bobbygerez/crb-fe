<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created(){

     		this.$axios.defaults.headers.common['Authorization']  = `Bearer ${this.$store.getters.token}`

		}
}
</script>

<style>
</style>
