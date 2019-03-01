import routeModules from 'assets/route-modules/modules'
import {
  capitalize,
  replaceAll,
  load
} from 'assets/utils/app-utils'

const routes = [{
  path: '/',
  component: () => import('pages/Login.vue')
}, {
  path: '/password/reset/:token',
  component: () => import('pages/password-reset.vue')
}, {
  path: '/dashboard/items/:id/vendors',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/items/item-vendors.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/purchase-request/:id/purchase-items',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/purchase-request/purchase-items.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/ingredients/:id/view-ingredients',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/ingredients/ingredients-view.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/chart-of-accounts/company/:id',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/chart-of-accounts/chart-of-accounts.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/transaction-types/company/:id',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/transaction-types/transaction-types.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/transactions/disbursement',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/transactions/disbursement.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/transactions/disbursement/edit',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/transactions/edit-disbursement.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/transactions/receipt',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/transactions/receipt.vue') },
    { path: '/' }
  ]
}, {
  path: '/dashboard/transactions/receipt/edit',
  meta: {
    title: name.endsWith('s') ? name : name.concat('s'),
    needAuth: true,
    section: 'index'
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '', component: () => import('pages/dashboard/submenu/transactions/edit-receipt.vue') },
    { path: '/' }
  ]
}]

const dashBoardModules = (appModules) => {
  let modules = []
  // dashboard landing page
  let dashboard = {
    path: '',
    meta: {
      title: 'Home',
      needAuth: true
    },
    component: () =>
      import('pages/dashboard/index')
  }
  // append dashboard first as this is the parent route
  modules.push(dashboard)
  // append the submenus under dashboard route
  appModules.forEach(mod => {
    let name = mod.name ? mod.name : capitalize(replaceAll(mod, '-', ' '))
    let path = mod.path ? mod.path : mod

    let indexModule = {
      path: path,
      components: {
        default: load(path + '/index')
        // actions: () => {
        //   return import('components/generic-action-bar-menu')
        // }
      },
      meta: {
        title: name.endsWith('s') ? name : name.concat('s'),
        needAuth: true,
        section: 'index'
      }
    }
    let createModule = {
      path: path + '/add',
      component: load(path + '/forms/create'),
      meta: {
        title: `Add ${name.endsWith('ies') ? name.replace('ies', 'y') : name.endsWith('s') ? name.replace(/.$/, '') : name}`,
        needAuth: true,
        section: 'create'
      }
    }
    let readModule = {
      path: path + '/:id/view',
      component: load(path + '/forms/read'),
      meta: {
        title: `View ${name.endsWith('ies') ? name.replace('ies', 'y') : name.endsWith('s') ? name.replace(/.$/, '') : name}`,
        needAuth: true,
        section: 'read'
      }
    }
    let updateModule = {
      path: path + '/:id/edit',
      component: load(path + '/forms/update'),
      meta: {
        title: `Edit ${name.endsWith('ies') ? name.replace('ies', 'y') : name.endsWith('s') ? name.replace(/.$/, '') : name}`,
        needAuth: true,
        section: 'update'
      }
    }
    // let deleteModule = {
    //   path: p + '/:id/delete',
    //   component: load(p + '/main'),
    //   meta: {
    //     title: 'Remove ' + n.replace('ies', 'y'),
    //     needAuth: true,
    //     section: 'remove'
    //   }
    // }
    modules.push(indexModule, createModule, readModule, updateModule)
    // temp.push(mainModule, viewModule, updateModule, deleteModule, createModule)
  })
  // return the module array
  return modules
}

// generate dashboard children routes
let dashboardChildren = dashBoardModules(routeModules)
console.log('children', dashboardChildren)
// create dashboard route
routes.push({
  path: '/dashboard',
  component: () =>
    import('layouts/MainLayout'),
  children: dashboardChildren // add all children
})

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
