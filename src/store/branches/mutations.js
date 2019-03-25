export const setBranch = (state, payload) => {
  state.branch = payload
}

export const setProvinceId = (state, payload) => {
  state.branch.address.province_id = payload
}

export const setCityId = (state, payload) => {
  state.branch.address.city_id = payload
}

export const setBrgyId = (state, payload) => {
  state.branch.address.brgy_id = payload
}
