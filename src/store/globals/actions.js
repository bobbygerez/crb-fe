import {
  axios
} from 'plugins/axios'

export const setToken = ({
  commit
}, payload) => {
  commit('SET_TOKEN', payload)
}

export const getBusinessTypes = ({
  commit,
  state
}) => {
  if (state.businessTypes.length > 1) {
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
  if (state.vatTypes.length > 1) {
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
  if (state.countries.length > 1) {
    return
  }
  commit('SET_ADDRESS_INNER_LOADING', true)
  axios.get('/countries')
    .then(function (res) {
      commit('SET_COUNTRIES', res.data.countries)
      commit('SET_ADDRESS_INNER_LOADING', false)
    })
}

export const getRegions = ({
  commit
}, countryId) => {
  commit('SET_ADDRESS_INNER_LOADING', true)
  return new Promise((resolve, reject) => {
    axios.get(`/regions/${countryId}`)
      .then(function (res) {
        commit('SET_REGIONS', res.data.regions)
        commit('SET_ADDRESS_INNER_LOADING', false)
        resolve(res.data.regions)
      })
  })
}
export const getProvinces = ({
  commit
}, regionId) => {
  commit('SET_ADDRESS_INNER_LOADING', true)
  return new Promise((resolve, reject) => {
    axios.get(`/provinces/${regionId}`)
      .then(function (res) {
        commit('SET_PROVINCES', res.data.provinces)
        commit('SET_ADDRESS_INNER_LOADING', false)
        resolve(res.data.provinces)
      })
  })
}
export const getCities = ({
  commit
}, provinceId) => {
  commit('SET_ADDRESS_INNER_LOADING', true)
  return new Promise((resolve, reject) => {
    axios.get(`/cities/${provinceId}`)
      .then(function (res) {
        commit('SET_CITIES', res.data.cities)
        commit('SET_ADDRESS_INNER_LOADING', false)
        resolve(res.data.cities)
      })
  })
}

export const getBrgys = ({
  commit
}, cityId) => {
  commit('SET_ADDRESS_INNER_LOADING', true)
  return new Promise((resolve, reject) => {
    axios.get(`/brgys/${cityId}`)
      .then(function (res) {
        commit('SET_BRGYS', res.data.brgys)
        commit('SET_ADDRESS_INNER_LOADING', false)
        resolve(res.data.brgys)
      })
  })
}

export const setMenus = ({
  commit
}, payload) => {
  commit('SET_MENUS', payload)
}

export const setPageMeta = ({
  commit
}, payload) => {
  commit('SET_PAGE_META', payload)
}

export const setServerErrorResponse = ({
  commit
}, payload) => {
  commit('SET_SERVER__ERROR_RESPONSE', payload)
}

export const setHandleAsyncValidation = ({
  commit
}, payload) => {
  commit('SET_HANDLE_ASYNC_VALIDATION', payload)
}
