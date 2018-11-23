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
