import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import { createHelpers } from 'vuex-map-fields'

// `fooModule` is the name of the Vuex module.
export const { mapFields: mapUserFields } = createHelpers({
  getterType: 'users/getField',
  mutationType: 'users/updateField'
})

// import { getField } from 'vuex-map-fields'

// import { make } from 'vuex-pathify'
// import { cloneDeep } from 'lodash'

// const mutations = make.mutations(state)

export default {
  namespaced: true,
  // state: cloneDeep(state),
  state,
  // getters: { getField },
  getters,
  mutations,
  actions
}
