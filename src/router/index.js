import Vue from 'vue'
import VueRouter from 'vue-router'

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
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        console.log('to', to)
        store.dispatch('globals/setPageMeta', to.meta)
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })

  return Router
}
