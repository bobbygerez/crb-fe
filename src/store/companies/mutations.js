export {
  updateField
}
  from 'vuex-map-fields'

export const SET_COMPANIES = (state, payload) => {
  state.companies = payload
}

export const SET_HOLDINGS = (state, payload) => {
  state.holdings = payload
}

export const SET_COMPANY = (state, payload) => {
  state.company = payload
}

export const SET_COMPANY_HOLDING = (state, payload) => {
  state.company.holding_id = payload
}

export const SET_COMPANY_NAME = (state, payload) => {
  state.company.name = payload
}

export const SET_COMPANY_DESC = (state, payload) => {
  state.company.desc = payload
}

export const SET_COMPANY_BUSINESS_TYPE = (state, payload) => {
  state.company.business_info.business_type_id = payload
}

export const SET_COMPANY_COUNTRY = (state, payload) => {
  state.company.address.country_id = payload
}

export const SET_COMPANY_REGION = (state, payload) => {
  state.company.address.region_id = payload
}

export const SET_COMPANY_PROVINCE = (state, payload) => {
  state.company.address.province_id = payload
}

export const SET_COMPANY_CITY = (state, payload) => {
  state.company.address.city_id = payload
}

export const SET_COMPANY_BRGY = (state, payload) => {
  state.company.address.brgy_id = payload
}

export const SET_COMPANY_ADDRESS = (state, payload) => {
  state.company.address.street_lot_blk = payload
}

export const SET_COMPANY_VAT_TYPE = (state, payload) => {
  state.company.business_info.vat_type_id = payload
}

export const SET_COMPANY_TELEPHONE = (state, payload) => {
  state.company.business_info.telephone = payload
}

export const SET_COMPANY_EMAIL = (state, payload) => {
  state.company.business_info.email = payload
}

export const SET_COMPANY_TIN = (state, payload) => {
  state.company.business_info.tin = payload
}

export const SET_COMPANY_WEBSITE = (state, payload) => {
  state.company.business_info.website = payload
}

export const SET_PAGE = (state, payload) => {
  state.page = payload
}

export const SET_PER_PAGE = (state, payload) => {
  state.perPage = payload
}
