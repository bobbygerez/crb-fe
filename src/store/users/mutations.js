export {
  updateField
}
  from 'vuex-map-fields'

export const SET_USERS = (state, payload) => {
  state.users = payload
}

export const SET_USER = (state, payload) => {
  state.user = payload
}

export const SET_ROLES = (state, payload) => {
  state.roles = payload
}

export const SET_USER_ROLES = (state, payload) => {
  state.user.roles = payload
}

export const SET_USER_STATUS = (state, payload) => {
  state.user.status = payload
}

export const SET_CIVIL_STATUSES = (state, payload) => {
  state.civilStatuses = payload
}

export const SET_USER_CIVIL_STATUS = (state, payload) => {
  state.user.information.civil_status_id = payload
}

export const SET_GENDERS = (state, payload) => {
  state.genders = payload
}

export const SET_USER_USERNAME = (state, payload) => {
  state.user.name = payload
}

export const SET_USER_EMAIL = (state, payload) => {
  state.user.email = payload
}

export const SET_USER_PASSWORD = (state, payload) => {
  state.user.password = payload
}

export const SET_USER_FIRSTNAME = (state, payload) => {
  state.user.firstname = payload
}

export const SET_USER_MIDDLENAME = (state, payload) => {
  state.user.middlename = payload
}

export const SET_USER_LASTNAME = (state, payload) => {
  state.user.lastname = payload
}

export const SET_USER_BIRTHDATE = (state, payload) => {
  state.user.information.birthdate = payload
}

export const SET_USER_EMP_ID = (state, payload) => {
  state.user.information.employee_id = payload
}

export const SET_USER_MOBILE = (state, payload) => {
  state.user.information.mobile = payload
}

export const SET_USER_NATIONALITY = (state, payload) => {
  state.user.information.nationality = payload
}

export const SET_USER_GENDER = (state, payload) => {
  state.user.information.gender_id = payload
}

export const SET_USER_COUNTRY = (state, payload) => {
  state.user.address.country_id = payload
}

export const SET_USER_REGION = (state, payload) => {
  state.user.address.region_id = payload
}

export const SET_USER_PROVINCE = (state, payload) => {
  state.user.address.province_id = payload
}

export const SET_USER_CITY = (state, payload) => {
  state.user.address.city_id = payload
}

export const SET_USER_BRGY = (state, payload) => {
  state.user.address.brgy_id = payload
}

export const SET_NEW_USER_MODAL = (state, payload) => {
  state.newUserModal = payload
}
