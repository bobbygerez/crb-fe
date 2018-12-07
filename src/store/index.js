import Vue from 'vue'
import Vuex from 'vuex'
import pattys from './pattys'
import globals from './globals'
import companies from './companies'
import users from './users'
import roles from './roles'
import menus from './menus'
import accessRights from './access-rights'
import branches from './branches'
import categories from './categories'
import packages from './packages'
import trademarks from './trademarks'
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
      users,
      roles,
      menus,
      accessRights,
      branches,
      categories,
      packages,
      trademarks
    },
    plugins: [createPersistedState()]
  })

  return Store
}
