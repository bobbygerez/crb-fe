import routeModules from 'assets/route-modules/modules'
import {
  capitalize,
  replaceAll,
  load
} from 'assets/utils/app-utils'

const routes = [{
  path: '/',
  component: () => import('pages/Login.vue')
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
    // let viewModule = {
    //   path: p + '/:id/view',
    //   component: load(p + '/form'),
    //   meta: {
    //     title: 'View ' + n.replace('ies', 'y'),
    //     needAuth: true,
    //     section: 'view'
    //   }
    // }
    // let updateModule = {
    //   path: p + '/:id/edit',
    //   component: load(p + '/form'),
    //   meta: {
    //     title: 'Edit ' + n.replace('ies', 'y'),
    //     needAuth: true,
    //     section: 'edit'
    //   }
    // }
    // let deleteModule = {
    //   path: p + '/:id/delete',
    //   component: load(p + '/main'),
    //   meta: {
    //     title: 'Remove ' + n.replace('ies', 'y'),
    //     needAuth: true,
    //     section: 'remove'
    //   }
    // }
    // let createModule = {
    //   path: p + '/add',
    //   component: load(p + '/form'),
    //   meta: {
    //     title: 'Add ' + n.replace('ies', 'y'),
    //     needAuth: true,
    //     section: 'add'
    //   }
    // }
    modules.push(indexModule)
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
