<template>
  <q-list no-border link inset-delimiter>
    <template v-for="(item, index) in megaMenus">
      <!-- for parent menu if have sub menu -->
      <!-- parent {{ item }} -->
      <q-collapsible :key="index" v-if="item.child" indent :icon="item.icon" :label="item.name" group="g">
        <!-- for child menu have sub menu -->
        <q-collapsible group="g" v-if="child.child" indent v-for="child in item.child" icon="mdi-settings" :label="child.name" :key="child">
          <!-- for child in child no sub menu -->
          <div v-for="childs in child.child" :key="childs">
            <q-item link :to="childs.link">
              <q-item-side icon="mdi-settings" />
              <q-item-main :label="childs.name" />
            </q-item>
          </div>
        </q-collapsible>

        <!-- for child menu no sub menu-->
        <q-item link :to="child.link" v-else>
          <q-item-side icon="mdi-chevron-right" />
          <q-item-main :label="child.name" />
        </q-item>
      </q-collapsible>
      <!-- for parent menu no sub menu -->
      <div v-else :key="index">
        <q-item link :to="item.link">
          <q-item-side :icon="item.icon" />
          <q-item-main :label="item.name" />
        </q-item>
      </div>
    </template>
  </q-list>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Helper from 'assets/services/helper'

export default {
  name: 'main-menu-list',
  data () {
    return {
      something: '',
      megaMenus: []
    }
  },
  method: {
    ...mapActions('commons', ['toggleDrawer', 'setPageTitle'])
  },
  computed: {
    ...mapState('commons', ['drawerState', 'pageMeta'])
  },
  mounted () {
    console.log('drawer mounted')
    let currentnode = ''
    let menus = this.$q.localStorage.get.item('menus')
    let user = this.$q.localStorage.get.item('user')
    Object.keys(menus).forEach((i) => {
      let draw = {
        name: i,
        icon: 'mdi-file-document',
        link: '',
        child: []
      }
      if (i === 'System Settings') {
        draw.icon = 'settings'
      } else if (i === 'Productions') {
        draw.icon = 'assignment'
      } else if (i === 'Purchases Modules') {
        draw.icon = 'assessment'
      } else if (i === 'Sales') {
        draw.icon = 'attach_money'
      } else if (i === 'Inventories') {
        draw.icon = 'storage'
      } else if (i === 'General Ledgers') {
        draw.icon = 'content_paste'
      } else if (i === 'Payroll') {
        draw.icon = 'money'
      } else if (i === 'CRM') {
        draw.icon = 'people'
      } else if (i === 'HRIS') {
        draw.icon = 'book'
      } else if (i === 'Logistics and Distribution') {
        draw.icon = 'truck'
      } else if (i === 'eCommerce') {
        draw.icon = 'desktop_mac'
      }
      currentnode = draw
      let existProduct = false
      menus[i].forEach((res, index) => {
        let child = {
          name: res.name,
          icon: '',
          link: res.uri // + '/main'
        }
        if (user.user_access.user_type_id !== 1) {
          if (user.entity.entity_type_id === 1) {
            if (res.name === 'Production') {
              child.link = '/dashboard/production'
            }
          } else if (user.entity.entity_type_id === 6) {
            if (res.name === 'Production Board') {
              child.link = '/dashboard/production_board'
            } else if (res.name === 'Purchase Orders') {
              child.link = '/dashboard/purchase_orders'
            }
          }
        }

        currentnode.child.push(child)
        // for supervisor access should be fix on menu
        // if (menus[i] === 'Inventories' && parseInt(user.user_type_id) === 10 && !existProduct) { // supervisor
        if (menus[i] === 'Inventories' && parseInt(user.types[0].id) === 10 && !existProduct) { // supervisor
          currentnode.child.push({
            name: 'Products',
            icon: '',
            link: '/dashboard/product'
          })
          existProduct = true
        }
      })

      this.megaMenus.push(currentnode)
    })
    // change the megaMenus for demo only - todo change how security and menu works
    if (user.user_access.user_type_id !== 1) {
      if (user.entity.entity_type_id === 6) {

      } else if (Helper.checkSlug('supervisor') === 1) {
        console.log('slug =>', Helper.checkSlug('supervisor'))

        this.title = function (val) {
          console.log('from title', val)
          this.setPageTitle(val)
        }
      }

      let { routes } = this.$router.options
      let routeData = routes.find(r => r.path === this.$route.path)
      console.log(this.$route)
      console.log('route data', routes)
      console.log('route options', routeData)
    }
  }
}
</script>

<style>
</style>
