import {
  axios
} from 'plugins/axios'

export const getBusinessTypes = ({
  commit,
  state
}) => {
  if (state.businessTypes) {
    return
  }
  axios.get('/business_types')
    .then(function (res) {
      commit('SET_BUSINESS_TYPES', res.data.businessTypes)
    })
}

export const getVatTypes = ({
  commit,
  state
}) => {
  if (state.vatTypes) {
    return
  }
  axios.get('/vat_types')
    .then(function (res) {
      commit('SET_VAT_TYPES', res.data.vatTypes)
    })
}

export const setNewHoldingModal = ({commit}, payload) => {
  commit('SET_NEW_HOLDING_MODAL', payload)
}

export const setPage = ({commit}, payload) => {
  commit('SET_PAGE', payload)
}
export const setPerPage = ({commit}, payload) => {
  commit('SET_PER_PAGE', payload)
}

export const setHoldings = ({commit}, payload) => {
  commit('SET_HOLDINGS', payload)
}

export const setHolding = ({commit}, payload) => {
  commit('SET_HOLDING', payload)
}

export const setHoldingTelephone = ({commit}, payload) => {
  commit('SET_HOLDING_TELEPHONE', payload)
}

export const setHoldingEmail = ({commit}, payload) => {
  commit('SET_HOLDING_EMAIL', payload)
}

export const setHoldingWebsite = ({commit}, payload) => {
  commit('SET_HOLDING_WEBSITE', payload)
}

export const setHoldingTin = ({commit}, payload) => {
  commit('SET_HOLDING_TIN', payload)
}

export const setHoldingBusinessType = ({commit}, payload) => {
  commit('SET_HOLDING_BUSINESS_TYPE', payload)
}

export const setHoldingVatType = ({commit}, payload) => {
  commit('SET_HOLDING_VAT_TYPE', payload)
}

export const setHoldingStreetLotBlk = ({commit}, payload) => {
  commit('SET_HOLDING_ADDRESS', payload)
}
export const setHoldingName = ({commit}, payload) => {
  commit('SET_HOLDING_NAME', payload)
}
export const setHoldingDesc = ({commit}, payload) => {
  commit('SET_HOLDING_DESC', payload)
}
export const setHoldingBrgy = ({commit}, payload) => {
  commit('SET_HOLDING_BRGY', payload)
}
export const setHoldingCity = ({commit}, payload) => {
  commit('SET_HOLDING_CITY', payload)
}
export const setHoldingProvince = ({commit}, payload) => {
  commit('SET_HOLDING_PROVINCE', payload)
}
export const setGoldingRegion = ({commit}, payload) => {
  commit('SET_HOLDING_REGION', payload)
}
export const setToken = ({commit}, payload) => {
  commit('SET_TOKEN', payload)
}
export const setUserLogin = ({commit}, payload) => {
  commit('SET_USER_LOGIN', payload)
}
export const setUser = ({commit}, payload) => {
  commit('SET_USER', payload)
}
export const setStores = ({commit}, payload) => {
  commit('SET_STORES', payload)
}
export const setItems = ({commit}, payload) => {
  commit('SET_ITEMS', payload)
}
export const setProvinces = ({commit}, payload) => {
  commit('SET_PROVINCES', payload)
}
export const setCategories = ({commit}, payload) => {
  commit('SET_CATEGORIES', payload)
}
