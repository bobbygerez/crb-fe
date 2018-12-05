import routeModules from 'assets/route-modules/modules'

// return capitalize string
const capitalize = (str) => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
// return replaced string
const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
// load component path
const load = (component) => () => import(`pages/dashboard/submenu/${component}`)

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
  modules.push(dashboard)
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
  children: dashboardChildren
})

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
