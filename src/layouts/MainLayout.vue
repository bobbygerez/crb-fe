<template>
  <q-layout view="hHh Lpr lFf">
    <!-- <q-layout view="Lhh lpr lFf"> -->
    <q-layout-header
      :inverted="$q.platform.mobile"
      :reveal="pageMeta.hasTabs ? false : true"
    >
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <!-- <div slot="subtitle">Trading Inc.</div> -->
          {{ pageMeta.title ? pageMeta.title : 'Pattys Bakeshop' }}
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="mdi-logout-variant"
          name="logout"
          @click="logout()"
        >
          <q-tooltip :delay="200">
            Logout
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <div
        class="row bg-white"
        style="height: 115px"
      >
        <div class="col-12 offset-sm-3 col-sm-6 offset-md-3 col-md-6">
          <center>
            <img
              @click.native="alert('hi')"
              alt="Company Logo"
              src="statics/favicon.ico"
              style="height: 40px; width: 40px;margin-top: 10px"
            >
          </center>
        </div>
        <!-- current user logged info -->
        <div class="col-12">
          <q-item class="bg-white">
            <!-- :to="'/dashboard/user/' + user.id +'/view'" exact -->
            <!-- <q-item-side avatar="statics/favicon.ico" /> ::TODO change image avatar to profile picture of user later-->
            <q-item-main>
              <center>
                <q-item-tile label>{{ user.firstname + ' ' + user.lastname }}</q-item-tile>
              </center>
            </q-item-main>
          </q-item>
          <br>
        </div>
      </div>
      <q-item
        to="/dashboard"
        exact
        replace
      >
        <q-item-side icon="mdi-home-circle" />
        <q-item-main label="Home" />
      </q-item>
      <q-item-separator />
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-collapsible
          :label="menu.name"
          v-for="(menu, i) in menus "
          :key="i"
          group="main"
        >
          <div
            v-for="(subMenu, x) in menu.all_children"
            :key="x"
          >
            <template v-if="subMenu.all_children.length">
              <q-collapsible
                :label="subMenu.name"
                :to="`/dashboard/${subMenu.name}`"
                group="sub"
              >
                <!-- "slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}`)" -->
                <!-- <q-item link v-for="(subMenuChild,y) in subMenu.sub_menus_child" :key="y" :to="slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}/${subMenu.id}/${subMenuChild.description}`)">
                    <q-item-main :label="subMenuChild.description" />
                  </q-item> -->
              </q-collapsible>
            </template>
            <template v-else>
              <q-item
                link
                :to="`/dashboard/${replaceAll(subMenu.name,' ', '-')}`"
              >
                <q-item-side icon="mdi-chevron-right" />
                <q-item-main :label="subMenu.name" />
              </q-item>
            </template>
          </div>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <!-- mode="out-in" appear-->
      <!-- <q-breadcrumbs class="q-ma-sm">
      <q-icon name="keyboard_arrow_right" slot="separator" slot-scope="props" />
      <q-breadcrumbs-el :to="`/${path}`" v-for="(path, i) in pathArray" :key="i" v-if="i != 0">{{path}}</q-breadcrumbs-el>
    </q-breadcrumbs> -->
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="300"
        @leave="resetScroll"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import { unSetAuthHeader } from 'plugins/axios'
import { replaceAll } from 'assets/utils/app-utils'

export default {
  name: 'MainLayout',
  data () {
    return {
      pathArray: [],
      leftDrawerOpen: this.$q.platform.is.desktop,
      customDialogModel: true
    }
  },
  computed: {
    ...mapState('pattys', ['user']),
    ...mapState('globals', ['menus', 'pageMeta'])
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    },
    replaceAll,
    logout () {
      this.$q.dialog({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        ok: 'Yes',
        cancel: 'Cancel'
      }).then(() => {
        console.log('yes')
        this.$axios.post('logout')
        this.$q.sessionStorage.clear()
        this.$q.localStorage.clear()
        unSetAuthHeader()
        this.$router.push('/')
      }).catch(e => {
        console.log('Logout cancelled', e.message)
      })
    }
  },
  watch: {
    $route (to, from) {
      this.pathArray = this.$route.path.split('/')

      console.log(this.pathArray)
    }
  }
}
</script>

<style>
</style>
