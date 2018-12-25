import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  LocalStorage,
  Notify
} from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
// ,ssrContext
export default function ({
  store
}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      y: 0
    }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needAuth)) {
      console.log('route from =>', from)
      console.log('route to =>', to)
      console.log('route next =>', next)
      if (!store.getters['pattys/getToken']) {
        Notify.create({
          type: 'negative',
          message: 'You need to login.'
        })
        LocalStorage.clear()
        next('/')
      } else {
        console.log('to', to)
        store.dispatch('globals/setPageMeta', to.meta)
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
    // if (to.matched.some(record => record.meta.needAuth)) {
    //   // check if
    //   if (!LocalStorage.has('user')) {
    //     Notify.create({
    //       type: 'negative',
    //       message: 'You need to login.'
    //     })
    //     LocalStorage.clear()
    //     next('/')
    //   } else if (LocalStorage.has('menus')) {
    //     let
    //       menuRights = LocalStorage.get.item('menus'),
    //       toPath = to.path,
    //       toPathArr = toPath.split('/'),
    //       pathLookup = '',
    //       isAllowed = false,
    //       isModuleFound = false

    //     // check if route section is not main
    //     if (to.meta.section !== 'main') {
    //       // assign root path as the path lookup
    //       pathLookup = '/' + toPathArr[1] + '/' + toPathArr[2]
    //     } else {
    //       // if it's main, continue with the same path
    //       pathLookup = toPath
    //     }

    //     // find the module trying to access
    //     Object.keys(menuRights).some(modules => {
    //       let mod = menuRights[modules].find(mod => mod.uri === pathLookup)
    //       if (mod) {
    //         isModuleFound = true
    //         // check if has access
    //         if (mod.pivot.is_access === 0) {
    //           Notify.create({
    //             type: 'negative',
    //             message: 'You currently have no access to this module.'
    //           })
    //           return true
    //         }
    //         // check what section is user trying to access
    //         if (to.meta.section === 'add' && mod.pivot.create === 0) {
    //           // if not allowed the rights to add
    //           // display an error message and break loop
    //           Notify.create({
    //             type: 'negative',
    //             message: 'You are not allowed to add new record.'
    //           })
    //           return true
    //         } else if (to.meta.section === 'edit' && mod.pivot.update === 0) {
    //           // if not allowed the rights to edit
    //           // display an error message and break loop
    //           Notify.create({
    //             type: 'negative',
    //             message: 'You are not allowed to edit a record.'
    //           })
    //           return true
    //         } else if (to.meta.section === 'view' && mod.pivot.view === 0) {
    //           // if not allowed the rights to view
    //           // display an error message and break loop
    //           Notify.create({
    //             type: 'negative',
    //             message: 'You are not allowed to view a record.'
    //           })
    //           return true
    //         } else if (to.meta.section === 'delete' && mod.pivot.delete === 0) {
    //           // if not allowed the rights to delete
    //           // display an error message and break loop
    //           Notify.create({
    //             type: 'negative',
    //             message: 'You are not allowed to add a record.'
    //           })
    //           return true
    //         } else {
    //           // all checks didn't fail
    //           // user is allowed
    //           isAllowed = true
    //         }
    //         // break the some loop
    //         return true
    //       }
    //     })

    //     // finalize router checks
    //     if (isModuleFound) {
    //       // if allowed
    //       if (isAllowed) {
    //         // update route meta
    //         store.dispatch('commons/setPageMeta', to.meta)
    //       }
    //       // continue routing or disallow
    //       next(isAllowed)
    //     } else {
    //       // if just routing to home path
    //       if (toPath === '/dashboard/home') {
    //         // update route meta
    //         store.dispatch('commons/setPageMeta', to.meta)
    //         // continue routing to home
    //         next()
    //       } else {
    //         // else user don't have rights
    //         // display an error message
    //         Notify.create({
    //           type: 'negative',
    //           message: 'Module not found or you do not have access to resource.'
    //         })
    //         // disallow routing isModuleFound = false
    //         // means module is not found in user's menu rights
    //         next(isModuleFound)
    //       }
    //     }
    //   } else {
    //     next()
    //   }
    // } else {
    //   next()
    // }
  })

  return Router
}
