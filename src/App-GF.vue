<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    axios.get(process.env.API + '/get-provinces')
      .then(function (res) {
        store.dispatch('provinces', res.data.provinces)
      })
    axios.get(process.env.API + '/categories')
      .then(function (res) {
        store.dispatch('categories', res.data.categories)
      })
    axios.get(process.env.API + '/items_info?page=' + store.getters.page + '&perPage=' + store.getters.perPage)
      .then(function (res) {
        store.dispatch('items', res.data.itemInfo)
      })
    axios.get(process.env.API + '/stores')
      .then(function (res) {
        store.dispatch('stores', res.data.stores)
      })
  },
  name: 'App'
}
</script>

<style>
</style>
