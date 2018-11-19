import Vue from 'vue'
import Vuex from 'vuex'
import pattys from './pattys'

import companies from './companies'

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
      companies
    }
  })

  return Store
}
