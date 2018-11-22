import {
  axios
} from 'plugins/axios'

export const GET_BUSINESS_TYPES = ({
  commit,
  state
}) => {
  if (state.businessTypes.length) {
    return
  }
  axios.get('/business_types')
    .then(function (res) {
      commit('businessTypes', res.data.businessTypes)
    })
}

export const GET_VAT_TYPES = ({
  commit,
  state
}) => {
  if (state.vatTypes.length) {
    return
  }
  axios.get('/vat_types')
    .then(function (res) {
      commit('vatTypes', res.data.vatTypes)
    })
}

export const GET_COUNTRIES = ({
  commit,
  state
}) => {
  if (state.countries.length) {
    return
  }
  axios.get('/countries')
    .then(function (res) {
      commit('countries', res.data.countries)
    })
}

export const GET_REGIONS = ({
  commit,
  state
}, countryId) => {
  if (state.regions.length) {
    return
  }
  axios.get(`/regions/${countryId}`)
    .then(function (res) {
      commit('regions', res.data.regions)
    })
}
export const GET_PROVINCES = ({
  commit,
  state
}, regionId) => {
  if (state.provinces.length) {
    return
  }
  axios.get(`/provinces/${regionId}`)
    .then(function (res) {
      commit('provinces', res.data.provinces)
    })
}
export const GET_CITIES = ({
  commit,
  state
}, provinceId) => {
  if (state.cities.length) {
    return
  }
  axios.get(`/cities/${provinceId}`)
    .then(function (res) {
      commit('cities', res.data.cities)
    })
}

export const GET_BRGYS = ({
  commit,
  state
}, cityId) => {
  if (state.brgys.length) {
    return
  }
  axios.get(`/brgys/${cityId}`)
    .then(function (res) {
      commit('brgys', res.data.brgys)
    })
}

export const menus = (state, payload) => {
  state.commit('menus', payload)
}
