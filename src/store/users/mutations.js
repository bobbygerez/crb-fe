export const users = (state, payload) => {
  state.users = payload
}

export const user = (state, payload) => {
  state.user = payload
}

export const roles = (state, payload) => {
  state.roles = payload
}

export const userStatus = (state, payload) => {
  state.user.status = payload
}

export const civilStatus = (state, payload) => {
  state.civilStatus = payload
}

export const genders = (state, payload) => {
  state.genders = payload
}

export const userName = (state, payload) => {
  state.user.name = payload
}

export const email = (state, payload) => {
  state.user.email = payload
}

export const password = (state, payload) => {
  state.user.password = payload
}

export const firstname = (state, payload) => {
  state.user.firstname = payload
}

export const middlename = (state, payload) => {
  state.user.middlename = payload
}

export const lastname = (state, payload) => {
  state.user.lastname = payload
}

export const birthdate = (state, payload) => {
  state.user.information.birthdate = payload
}

export const employeeId = (state, payload) => {
  state.user.information.employee_id = payload
}

export const mobile = (state, payload) => {
  state.user.information.mobile = payload
}

export const nationality = (state, payload) => {
  state.user.information.nationality = payload
}

export const civilStatusId = (state, payload) => {
  state.user.information.nationality = payload
}

export const genderId = (state, payload) => {
  state.user.information.gender_id = payload
}

export const countryId = (state, payload) => {
  state.user.address.country_id = payload
}

export const regionId = (state, payload) => {
  state.user.address.region_id = payload
}

export const provinceId = (state, payload) => {
  state.user.address.province_id = payload
}

export const cityId = (state, payload) => {
  state.user.address.city_id = payload
}

export const brgyId = (state, payload) => {
  state.user.address.brgy_id = payload
}

export const newUserModal = (state, payload) => {
  state.newUserModal = payload
}
