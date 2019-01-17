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
import franchisees from './franchisees'
import logistics from './logistics'
import commissaries from './commissaries'
import otherVendors from './other-vendors'
import items from './items'
import vendorables from './vendorables'
import purchaseRequests from './purchase-request'
import ingredients from './ingredients'
import accountingStandards from './accounting-standards'
import chartAccounts from './chart-accounts'
import transactionTypes from './transaction-types'
import transactions from './transactions'
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
      trademarks,
      franchisees,
      logistics,
      commissaries,
      otherVendors,
      items,
      vendorables,
      purchaseRequests,
      ingredients,
      accountingStandards,
      chartAccounts,
      transactionTypes,
      transactions
    },
    plugins: [createPersistedState()]
  })

  return Store
}
