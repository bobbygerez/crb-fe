<template>
  <q-layout view="Lhh lpr lFf">
    <q-layout-header :reveal="pageMeta.hasTabs ? false : true">
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <!-- <div slot="subtitle">Trading Inc.</div> -->
          {{ pageMeta.title ? pageMeta.title : 'Pattys Bakeshop' }}
        </q-toolbar-title>
        <q-btn flat round dense icon="mdi-logout-variant" name="logout" @click="logout()">
          <q-tooltip :delay="200">
            Logout
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <div class="row bg-white" style="height: 115px">
        <div class="col-12 offset-sm-3 col-sm-6 offset-md-3 col-md-6">
          <center>
            <img @click.native="alert('hi')" alt="Company Logo" src="statics/favicon.ico" style="height: 40px; width: 40px;margin-top: 10px">
          </center>
        </div>
        <!-- current user logged info -->
        <div class="col-12">
          <q-item class="bg-white" >
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
      <q-item to="/dashboard" exact replace>
        <q-item-side icon="mdi-home-circle" />
        <q-item-main label="Home" />
      </q-item>
      <q-item-separator />
      <q-list no-border link inset-delimiter>
        <q-collapsible :label="menu.name" v-for="(menu, i) in menus " :key="i" group="g">
          <q-collapsible :label="subMenu.name" v-for="(subMenu, x) in menu.all_children" :key="x" :to="slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}`)" group="g">
            <!-- <q-item link v-for="(subMenuChild,y) in subMenu.sub_menus_child" :key="y" :to="slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}/${subMenu.id}/${subMenuChild.description}`)">
              <q-item-main :label="subMenuChild.description" />
            </q-item> -->
          </q-collapsible>
        </q-collapsible>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import slug from 'components/mixins/slug'
import { mapState } from 'vuex'
import { unSetAuthHeader } from 'plugins/axios'

export default {
  mixins: [slug],
  name: 'MyLayout',
  data () {
    return {
      text2: '',
      leftDrawerOpen: this.$q.platform.is.desktop,
      customDialogModel: true
    }
  },
  computed: {
    ...mapState('pattys', ['user']),
    ...mapState('globals', ['menus', 'pageMeta'])
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        ok: 'Yes',
        cancel: 'Cancel'
      }).then(() => {
        this.$q.sessionStorage.clear()
        this.$q.localStorage.clear()
        unSetAuthHeader()
        this.$router.push('/')
      }).catch(e => {
        console.log('Logout cancelled', e.message)
      })
    }
  }
}
</script>

<style>
</style>
