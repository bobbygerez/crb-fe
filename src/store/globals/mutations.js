export {
  updateField
}
  from 'vuex-map-fields'

export const SET_BRGYS = (state, payload) => {
  state.brgys = payload
}

export const SET_CITIES = (state, payload) => {
  state.cities = payload
}

export const SET_PROVINCES = (state, payload) => {
  state.provinces = payload
}

export const SET_REGIONS = (state, payload) => {
  state.regions = payload
}

export const SET_COUNTRIES = (state, payload) => {
  state.countries = payload
}

export const SET_BUSINESS_TYPES = (state, payload) => {
  state.businessTypes = payload
}

export const SET_VAT_TYPES = (state, payload) => {
  state.vatTypes = payload
}

export const SET_MENUS = (state, payload) => {
  state.menus = payload
}

export const SET_PAGE_META = (state, payload) => {
  state.pageMeta = payload
}

export const SET_ADDRESS_INNER_LOADING = (state, payload) => { state.addressInnerLoading = payload }
