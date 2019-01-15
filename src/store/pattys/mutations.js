export {
  updateField
}
  from 'vuex-map-fields'
export const SET_BUSINESS_TYPES = (state, payload) => {
  state.businessTypes = payload
}

export const SET_VAT_TYPES = (state, payload) => {
  state.vatTypes = payload
}

export const SET_NEW_HOLDING_MODAL = (state, payload) => {
  state.newHoldingModal = payload
}

export const SET_PAGE = (state, payload) => {
  state.page = payload
}

export const SET_PER_PAGE = (state, payload) => {
  state.perPage = payload
}

export const SET_HOLDING_VAT_TYPE = (state, payload) => {
  state.holding.business_info.vat_type_id = payload
}

export const SET_HOLDING_TELEPHONE = (state, payload) => {
  state.holding.business_info.telephone = payload
}

export const SET_HOLDING_EMAIL = (state, payload) => {
  state.holding.business_info.email = payload
}

export const SET_HOLDING_TIN = (state, payload) => {
  state.holding.business_info.tin = payload
}

export const SET_HOLDING_WEBSITE = (state, payload) => {
  state.holding.business_info.website = payload
}

export const SET_HOLDING_BUSINESS_TYPE = (state, payload) => {
  state.holding.business_info.business_type_id = payload
}

export const SET_HOLDING_ADDRESS = (state, payload) => {
  state.holding.address.street_lot_blk = payload
}

export const SET_HOLDING_BRGY = (state, payload) => {
  state.holding.address.brgy_id = payload
}

export const SET_HOLDING_CITY = (state, payload) => {
  state.holding.address.city_id = payload
}

export const SET_HOLDING_PROVINCE = (state, payload) => {
  state.holding.address.province_id = payload
}

export const SET_HOLDING_REGION = (state, payload) => {
  state.holding.address.region_id = payload
}

export const SET_HOLDING_DESC = (state, payload) => {
  state.holding.desc = payload
}

export const SET_HOLDING_NAME = (state, payload) => {
  state.holdingName = payload
}

export const SET_HOLDING = (state, payload) => {
  state.holding = payload
}

export const SET_HOLDINGS = (state, payload) => {
  state.holdings = payload
}

export const SET_USER = (state, payload) => {
  state.user = payload
}

export const SET_USER_LOGIN = (state, payload) => {
  state.userLogin = payload
}

export const SET_STORES = (state, payload) => {
  state.stores = payload
}

export const SET_ITEMS = (state, payload) => {
  state.items = payload
}

export const SET_CATEGORIES = (state, payload) => {
  state.categories = payload
}

export const SET_SERVER_MESSAGE = (state, payload) => {
  state.serverResponseMessage = payload
}
