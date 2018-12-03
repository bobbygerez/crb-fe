import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import {
  createHelpers
} from 'vuex-map-fields'

export const {
  mapFields: mapHoldingFields
} = createHelpers({
  getterType: 'pattys/getField',
  mutationType: 'pattys/updateField'
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
