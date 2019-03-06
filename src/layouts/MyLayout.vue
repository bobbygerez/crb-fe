<template>
<q-layout view="hHh Lpr lFf">
    <q-page-container>
        <router-view />
    </q-page-container>
    <q-dialog v-model="dialog" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="power_settings_new" color="primary" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to log-out?</span>
            </q-card-section>

            <!-- Notice v-close-dialog -->
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-dialog />
                <q-btn flat label="Logout" color="primary" v-close-dialog @click="logout" />
            </q-card-actions>
        </q-card>
    </q-dialog>

</q-layout>
</template>

<script>
import _ from 'lodash'
import {
  openURL
} from 'quasar'
import {
  unSetAuthHeader
} from 'boot/axios'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      dialog: false,
      menu: false,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('users', ['token']),
    ...mapState('global', ['cart', 'cartLength']),
    leftDrawer: {
      get () {
        return this.$store.getters['global/leftDrawer']
      },
      set (val) {
        this.setLeftDrawer(val)
      }
    },
    cartLength () {
      let cartLength = _.sumBy(this.cart, (i) => {
        return i.qty
      })
      if (cartLength === 0) {
        return ''
      } else {
        return cartLength
      }
    }
  },
  methods: {
    openURL,
    ...mapActions('categories', ['setCategories']),
    ...mapActions('global', ['setLeftDrawer']),
    ...mapActions('users', ['setToken', 'setUser']),
    clickLeftDrawer () {
      if (this.leftDrawer === true) {
        this.setLeftDrawer(false)
      } else {
        this.setLeftDrawer(true)
      }
    },
    logout () {
      this.$axios.post('/logout').then(e => {
        unSetAuthHeader()
        this.setToken('')
        this.setUser({})
        this.$router.push('/')
      })
        .catch(e => {
          unSetAuthHeader()
          this.setToken('')
          this.setUser({})
        })
    }
  }
}
</script>

<style>
</style>
