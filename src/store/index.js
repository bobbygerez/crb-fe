import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import categories from './categories'
import products from './products'
import global from './global'
import menus from './menus'
import roles from './roles'
import chartAccounts from './chart-accounts'
import companies from './companies'
import tAccounts from './t-accounts'
import accessRights from './access-rights'
import branches from './branches'
import provinces from './provinces'
import cities from './cities'
import brgys from './brgys'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      categories,
      users,
      products,
      global,
      menus,
      roles,
      chartAccounts,
      companies,
      tAccounts,
      accessRights,
      branches,
      provinces,
      cities,
      brgys
    },
    plugins: [createPersistedState()]
  })

  return Store
}
