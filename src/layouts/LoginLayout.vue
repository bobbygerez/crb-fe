<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >

        <q-toolbar-title>
          Pattys Bakeshop
          <div slot="subtitle">Trading Inc.</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
     
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import slug from 'components/mixins/slug'

export default {
  mixins:[slug],
  name: 'LoginLayout',
  data () {
    return {
      text2: '',
      leftDrawerOpen: this.$q.platform.is.desktop,
      customDialogModel: true
    }
  },
  computed: {
    categories(){
      return this.$store.getters.categories
    }
  },
  methods: {
    openURL,
    
  }
}
</script>

<style>
</style>
