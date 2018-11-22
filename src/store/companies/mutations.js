export const companies = (state, payload) => {
  state.companies = payload
}

export const company = (state, payload) => {
  state.company = payload
}

export const companyName = (state, payload) => {
  state.company.name = payload
}

export const companyDesc = (state, payload) => {
  state.company.desc = payload
}

export const businessType = (state, payload) => {
  state.company.business_info.business_type_id = payload
}

export const country = (state, payload) => {
  state.company.address.country_id = payload
}

export const region = (state, payload) => {
  state.company.address.region_id = payload
}

export const province = (state, payload) => {
  state.company.address.province_id = payload
}

export const city = (state, payload) => {
  state.company.address.city_id = payload
}

export const brgy = (state, payload) => {
  state.company.address.brgy_id = payload
}

export const streetLotBlk = (state, payload) => {
  state.company.address.street_lot_blk = payload
}

export const vatType = (state, payload) => {
  state.company.business_info.vat_type_id = payload
}

export const page = (state, payload) => {
  state.page = payload
}

export const perPage = (state, payload) => {
  state.perPage = payload
}
