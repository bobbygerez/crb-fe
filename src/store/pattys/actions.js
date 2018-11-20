import { axios } from 'plugins/axios'

export const GET_BUSINESS_TYPES = ({
  commit, state
}) => {
  axios.get('/business_types')
    .then(function (res) {
      commit('businessTypes', res.data.businessTypes)
    })
}

export const GET_VAT_TYPES = ({
  commit, state
}) => {
  axios.get('/vat_types')
    .then(function (res) {
      commit('vatTypes', res.data.vatTypes)
    })
}

export const newHoldingModal = (state, payload) => {
  state.commit('newHoldingModal', payload)
}

export const page = (state, payload) => {
  state.commit('page', payload)
}
export const perPage = (state, payload) => {
  state.commit('perPage', payload)
}

export const holdings = (state, payload) => {
  state.commit('holdings', payload)
}

export const holding = (state, payload) => {
  state.commit('holding', payload)
}

export const holdingTelephone = (state, payload) => {
  state.commit('holdingTelephone', payload)
}

export const holdingEmail = (state, payload) => {
  state.commit('holdingEmail', payload)
}

export const holdingWebsite = (state, payload) => {
  state.commit('holdingWebsite', payload)
}

export const holdingTin = (state, payload) => {
  state.commit('holdingTin', payload)
}

export const holdingBusinessType = (state, payload) => {
  state.commit('holdingBusinessType', payload)
}

export const holdingVatType = (state, payload) => {
  state.commit('holdingVatType', payload)
}

export const holdingStreetLotBlk = (state, payload) => {
  state.commit('holdingStreetLotBlk', payload)
}
export const holdingName = (state, payload) => {
  state.commit('holdingName', payload)
}
export const holdingDesc = (state, payload) => {
  state.commit('holdingDesc', payload)
}
export const holdingBrgy = (state, payload) => {
  state.commit('holdingBrgy', payload)
}
export const holdingCity = (state, payload) => {
  state.commit('holdingCity', payload)
}
export const holdingProvince = (state, payload) => {
  state.commit('holdingProvince', payload)
}
export const holdingRegion = (state, payload) => {
  state.commit('holdingRegion', payload)
}
export const token = (state, payload) => {
  state.commit('token', payload)
}
export const userLogin = (state, payload) => {
  state.commit('userLogin', payload)
}
export const user = (state, payload) => {
  state.commit('user', payload)
}
export const stores = (state, payload) => {
  state.commit('stores', payload)
}
export const items = (state, payload) => {
  state.commit('items', payload)
}
export const provinces = (state, payload) => {
  state.commit('provinces', payload)
}
export const categories = (state, payload) => {
  state.commit('categories', payload)
}
