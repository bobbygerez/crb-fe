import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import {
  createHelpers
} from 'vuex-map-fields'

export const {
  mapFields: mapRoleFields
} = createHelpers({
  getterType: 'roles/getField',
  mutationType: 'roles/updateField'
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
