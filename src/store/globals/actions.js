import {
  axios
} from 'plugins/axios'

export const getBusinessTypes = ({
  commit,
  state
}) => {
  if (state.businessTypes.length) {
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
  if (state.vatTypes.length) {
    return
  }
  axios.get('/vat_types')
    .then(function (res) {
      commit('SET_VAT_TYPES', res.data.vatTypes)
    })
}

export const getCountries = ({
  commit,
  state
}) => {
  if (state.countries.length) {
    return
  }
  axios.get('/countries')
    .then(function (res) {
      commit('SET_COUNTRIES', res.data.countries)
    })
}

export const getRegions = ({
  commit,
  state
}, countryId) => {
  if (state.regions.length) {
    return
  }
  axios.get(`/regions/${countryId}`)
    .then(function (res) {
      commit('SET_REGIONS', res.data.regions)
    })
}
export const getProvinces = ({
  commit,
  state
}, regionId) => {
  axios.get(`/provinces/${regionId}`)
    .then(function (res) {
      commit('SET_PROVINCES', res.data.provinces)
    })
}
export const getCities = ({
  commit,
  state
}, provinceId) => {
  axios.get(`/cities/${provinceId}`)
    .then(function (res) {
      commit('SET_CITIES', res.data.cities)
    })
}

export const getBrgys = ({
  commit,
  state
}, cityId) => {
  axios.get(`/brgys/${cityId}`)
    .then(function (res) {
      commit('SET_BRGYS', res.data.brgys)
    })
}

export const setMenus = ({commit}, payload) => {
  commit('SET_MENUS', payload)
}
