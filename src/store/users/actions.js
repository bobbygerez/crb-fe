import {
  axios
} from 'plugins/axios'

export const civilStatus = ({
  commit,
  state
}) => {
  axios.get('/civil_status')
    .then(function (res) {
      commit('civilStatus', res.data.civilStatus)
    })
}

export const genders = ({
  commit,
  state
}) => {
  axios.get('/genders')
    .then(function (res) {
      commit('genders', res.data.genders)
    })
}

export const users = (state, payload) => {
  state.commit('users', payload)
}

export const user = (state, payload) => {
  state.commit('user', payload)
}

export const roles = (state, payload) => {
  state.commit('roles', payload)
}

export const userStatus = (state, payload) => {
  state.commit('userStatus', payload)
}

export const userName = (state, payload) => {
  state.commit('userName', payload)
}

export const email = (state, payload) => {
  state.commit('email', payload)
}

export const password = (state, payload) => {
  state.commit('password', payload)
}

export const firstname = (state, payload) => {
  state.commit('firstname', payload)
}

export const middlename = (state, payload) => {
  state.commit('middlename', payload)
}

export const lastname = (state, payload) => {
  state.commit('lastname', payload)
}

export const birthdate = (state, payload) => {
  state.commit('birthdate', payload)
}

export const employeeId = (state, payload) => {
  state.commit('employeeId', payload)
}

export const mobile = (state, payload) => {
  state.commit('mobile', payload)
}

export const nationality = (state, payload) => {
  state.commit('nationality', payload)
}

export const civilStatusId = (state, payload) => {
  state.commit('civilStatusId', payload)
}

export const genderId = (state, payload) => {
  state.commit('genderId', payload)
}

export const countryId = (state, payload) => {
  state.commit('countryId', payload)
}

export const regionId = (state, payload) => {
  state.commit('regionId', payload)
}

export const provinceId = (state, payload) => {
  state.commit('provinceId', payload)
}

export const cityId = (state, payload) => {
  state.commit('cityId', payload)
}

export const brgyId = (state, payload) => {
  state.commit('brgyId', payload)
}

export const newUserModal = (state, payload) => {
  state.commit('newUserModal', payload)
}
