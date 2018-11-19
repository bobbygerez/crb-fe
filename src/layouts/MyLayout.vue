<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Pattys Bakeshop
          <div slot="subtitle">Trading Inc.</div>
        </q-toolbar-title>

        <q-btn-dropdown flat round icon="shopping_cart" split>
          <q-list link>
            <q-item v-for="n in 2" :key="`1.${n}`" v-close-overlay @click.native="handlerFunction">
              <q-item-side icon="folder" inverted color="primary" />
              <q-item-main>
                <q-item-tile label>Photos</q-item-tile>
                <q-item-tile sublabel>February 22, 2016</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber" />
            </q-item>
            <q-item-separator inset />
            <q-list-header inset>Files</q-list-header>
            <q-item v-close-overlay @click.native="handlerFunction">
              <q-item-side icon="assignment" inverted color="secondary" />
              <q-item-main>
                <q-item-tile label>Vacation</q-item-tile>
                <q-item-tile sublabel>February 22, 2016</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn flat round dense icon="lock_outline" />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>{{ user.firstname }} {{ user.lastname }}</q-list-header>

        <q-collapsible :label="menu.name" v-for="(menu, i) in user.menus " :key="i">
          <q-collapsible :label="subMenu.name" v-for="(subMenu, x) in menu.sub_menus" :key="x" :to="slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}`)">
            <q-item link v-for="(subMenuChild,y) in subMenu.sub_menus_child" :key="y" :to="slug(`/dashboard/submenu/${subMenu.id}/${subMenu.name}/${subMenu.id}/${subMenuChild.description}`)">
              <q-item-main :label="subMenuChild.description" />
            </q-item>
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
import { openURL } from 'quasar'
import slug from 'components/mixins/slug'

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
    user () {
      return this.$store.getters['pattys/user']
    }
  },
  methods: {
    openURL

  }
}
</script>

<style>
</style>
