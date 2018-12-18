import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import {
  createHelpers
} from 'vuex-map-fields'

export const {
  mapFields: mapCompanyFields
} = createHelpers({
  getterType: 'companies/getField',
  mutationType: 'companies/updateField'
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
