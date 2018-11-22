import Vue from 'vue'
import Vuex from 'vuex'
import pattys from './pattys'
import globals from './globals'
import companies from './companies'
import users from './users'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// import example from './module-example'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      pattys,
      globals,
      companies,
      users
    },
    plugins: [createPersistedState()]
  })

  return Store
}
