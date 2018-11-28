import {
  axios
} from 'plugins/axios'

export const getCivilStatuses = ({
  commit,
  state
}) => {
  if (state.civilStatuses.length > 0) {
    return
  }
  axios.get('/civil_status')
    .then(function (res) {
      commit('SET_CIVIL_STATUSES', res.data.civilStatus)
    })
}

export const getGenders = ({
  commit,
  state
}) => {
  if (state.genders.length > 0) {
    return
  }
  axios.get('/genders')
    .then(function (res) {
      commit('SET_GENDERS', res.data.genders)
    })
}

export const setUsers = (state, payload) => {
  state.commit('SET_USERS', payload)
}

export const setUser = (state, payload) => {
  state.commit('SET_USER', payload)
}

export const newUser = (state, payload) => {
  state.commit('newUser', {
    roles: [],
    address: {
      country_id: '',
      region_id: '',
      province_id: '',
      city_id: '',
      brgy_id: '',
      street_lot_blk: ''
    },
    information: {
      birthdate: '',
      employee_id: ''
    }
  })
}

export const setRoles = (state, payload) => {
  state.commit('SET_ROLES', payload)
}

export const setUserStatus = (state, payload) => {
  state.commit('SET_USER_STATUS', payload)
}

export const setUsername = (state, payload) => {
  state.commit('SET_USERNAME', payload)
}

export const setUserEmail = (state, payload) => {
  state.commit('SET_USER_EMAIL', payload)
}

export const setUserPassword = (state, payload) => {
  state.commit('SET_USER_PASSWORD', payload)
}

export const setUserFirstname = (state, payload) => {
  state.commit('SET_USER_FIRSTNAME', payload)
}

export const setUserMiddlename = (state, payload) => {
  state.commit('SET_USER_MIDDLENAME', payload)
}

export const setUserLastname = (state, payload) => {
  state.commit('SET_USER_LASTNAME', payload)
}

export const setUserBirthdate = (state, payload) => {
  state.commit('SET_USER_BIRTHDATE', payload)
}

export const setUserEmployeeId = (state, payload) => {
  state.commit('SET_USER_EMP_ID', payload)
}

export const setUserMobile = (state, payload) => {
  state.commit('SET_USER_MOBILE', payload)
}

export const setUserNationality = (state, payload) => {
  state.commit('SET_USER_NATIONALITY', payload)
}

export const setUserCivilStatus = (state, payload) => {
  state.commit('SET_USER_CIVIL_STATUS', payload)
}

export const setUserGender = (state, payload) => {
  state.commit('SET_USER_GENDER', payload)
}

export const setUserCountry = (state, payload) => {
  state.commit('SET_USER_COUNTRY', payload)
}

export const setUserRegion = (state, payload) => {
  state.commit('SET_USER_REGION', payload)
}

export const setUserProvince = (state, payload) => {
  state.commit('SET_USER_PROVINCE', payload)
}

export const setUserCity = (state, payload) => {
  state.commit('SET_USER_CITY', payload)
}

export const setUserBrgy = (state, payload) => {
  state.commit('SET_USER_BRGY', payload)
}

export const setNewUserModal = (state, payload) => {
  state.commit('SET_NEW_USER_MODAL', payload)
}
