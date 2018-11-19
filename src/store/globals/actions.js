import axios from 'axios'

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
