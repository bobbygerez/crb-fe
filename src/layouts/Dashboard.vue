<template>
<q-layout view="hHh Lpr lFf">
    <q-header elevated class="glossy" color="negative">
        <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
            <q-btn flat dense round @click="clickLeftDrawer" aria-label="Menu">
                <q-icon name="menu" />
            </q-btn>

            <q-toolbar-title>
                {{ user.firstname }} {{ user.lastname }}
            </q-toolbar-title>
            <q-btn flat v-if="token != ''" @click="dialog = true">
                <q-icon name="power_settings_new" />
            </q-btn>
            <q-btn flat to="/dashboard" v-if="token != ''">
                <q-icon name="account_circle" />
            </q-btn>
            <q-btn flat to="/login" v-else>
                <q-icon name="lock" />
            </q-btn>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawer" bordered content-class="bg-grey-2">

        <q-list bordered class="q-mt-md">
            <template v-for="(menu, i) in menus">
                <q-expansion-item  expand-separator :label="menu.name" :key="i" v-if="menu.all_children.length > 0" >
                    <template v-for="(submenu, a) in menu.all_children">
                        <q-expansion-item  :header-inset-level=".5" expand-separator :label="submenu.name" :key="a" v-if="submenu.all_children.length > 0" :to="`/dashboard/${submenu.slug_name}`" exact>
                            <template v-for="(furtherMenu, b) in submenu.all_children">
                                <q-expansion-item  switch-toggle-side dense-toggle :label="furtherMenu.name" :header-inset-level="1" :content-inset-level="2" :key="b" v-if="furtherMenu.all_children.length > 0">
                                </q-expansion-item>
                                <q-item  clickable v-ripple v-else :key="b" side :inset-level="1" :to="`/dashboard/${furtherMenu.path}`" exact>
                                    <q-item-section>{{ furtherMenu.name }}</q-item-section>
                                </q-item>
                            </template>
                        </q-expansion-item>
                        <q-item  clickable v-ripple v-else :key="a" side :inset-level=".5" :to="`/dashboard/${submenu.slug_name}`" exact>
                            <q-item-section>{{ submenu.name }}</q-item-section>
                        </q-item>
                    </template>

                </q-expansion-item>
                <q-item  clickable v-ripple v-else :key="i" >
                    <q-item-section>{{ menu.name }}</q-item-section>
                </q-item>
            </template>

        </q-list>
    </q-drawer>

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

    <q-dialog v-model="dialogChangePassword" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="lock" color="primary" text-color="white" />
                <span class="q-ml-sm text-subtitle1">Change Your Password</span>
                <div class="row">
                    <div class="col-12">
                        <q-input outlined v-model="currentPassword" label="Current Password" class="q-ma-sm" />
                    </div>
                    <div class="col-12">
                        <q-input outlined v-model="newPassword" label="New Password" class="q-ma-sm" />
                    </div>
                    <div class="col-12">
                        <q-input outlined v-model="confirmPassword" label="Confirm Password" class="q-ma-sm" />
                    </div>
                </div>
            </q-card-section>

            <!-- Notice v-close-dialog -->
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-dialog />
                <q-btn flat label="Update" color="primary" v-close-dialog @click="logout" />
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
  name: 'Dashboard',
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      dialog: false,
      menu: false,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('menus', ['menus']),
    ...mapState('users', ['token', 'user', 'dialogChangePassword']),
    ...mapState('global', ['cart', 'cartLength']),
    leftDrawer: {
      get () {
        return this.$store.getters['global/leftDrawer']
      },
      set (val) {
        this.setLeftDrawer(val)
      }
    },
    dialogChangePassword: {
      get () {
        return this.$store.getters['users/dialogChangePassword']
      },
      set (val) {
        this.setDialogChangePassword(val)
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
    ...mapActions('global', ['setLeftDrawer']),
    ...mapActions('users', ['setToken', 'setUser', 'setDialogChangePassword']),
    showPasswordModal () {
      this.setDialogChangePassword(true)
    },
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
