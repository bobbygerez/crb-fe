import axios from 'axios'

export const GET_BUSINESS_TYPES = ({
  commit, state
}) => {
  axios.get(process.env.API + '/business_types')
    .then(function (res) {
      commit('businessTypes', res.data.businessTypes)
    })
}

export const GET_VAT_TYPES = ({
  commit, state
}) => {
  axios.get(process.env.API + '/vat_types')
    .then(function (res) {
      commit('vatTypes', res.data.vatTypes)
    })
}

export const GET_COUNTRIES = ({
  commit,
  state
}) => {
  axios.get(process.env.API + '/countries')
    .then(function (res) {
      commit('countries', res.data.countries)
    })
}
export const GET_REGIONS = ({
  commit,
  state
}, countryId) => {
  axios.get(process.env.API + `/regions/${countryId}`)
    .then(function (res) {
      commit('regions', res.data.regions)
    })
}
export const GET_PROVINCES = ({
  commit,
  state
}, regionId) => {
  axios.get(process.env.API + `/provinces/${regionId}`)
    .then(function (res) {
      commit('provinces', res.data.provinces)
    })
}
export const GET_CITIES = ({
  commit,
  state
}, provinceId) => {
  axios.get(process.env.API + `/cities/${provinceId}`)
    .then(function (res) {
      commit('cities', res.data.cities)
    })
}
export const GET_BRGYS = ({
  commit,
  state
}, cityId) => {
  axios.get(process.env.API + `/brgys/${cityId}`)
    .then(function (res) {
      commit('brgys', res.data.brgys)
    })
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
