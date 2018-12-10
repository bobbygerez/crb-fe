export const franchisees = (state, payload) => {
  state.franchisees = payload
}

export const franchisee = (state, payload) => {
  state.franchisee = payload
}

export const franchiseeTrademarkId = (state, payload) => {
  state.franchisee.trademark_id = payload
}

export const franchiseeTrademarkCompanyId = (state, payload) => {
  state.franchisee.trademarks.company_id = payload
}

export const franchiseeName = (state, payload) => {
  state.franchisee.name = payload
}

export const franchiseeCountryId = (state, payload) => {
  state.franchisee.address.country_id = payload
}

export const franchiseeRegionId = (state, payload) => {
  state.franchisee.address.region_id = payload
}

export const franchiseeProvinceId = (state, payload) => {
  state.franchisee.address.province_id = payload
}

export const franchiseeCityId = (state, payload) => {
  state.franchisee.address.city_id = payload
}

export const franchiseeBrgyId = (state, payload) => {
  state.franchisee.address.brgy_id = payload
}

export const franchiseeStreetLotBlk = (state, payload) => {
  state.franchisee.address.street_lot_blk = payload
}

export const franchiseeBusinessTypeId = (state, payload) => {
  state.franchisee.business_info.business_type_id = payload
}

export const franchiseeVatTypeId = (state, payload) => {
  state.franchisee.business_info.vat_type_id = payload
}

export const franchiseeTelephone = (state, payload) => {
  state.franchisee.business_info.telephone = payload
}

export const franchiseeEmail = (state, payload) => {
  state.franchisee.business_info.email = payload
}

export const franchiseeTin = (state, payload) => {
  state.franchisee.business_info.tin = payload
}

export const franchiseeWebsite = (state, payload) => {
  state.franchisee.business_info.website = payload
}

export const userCompanies = (state, payload) => {
  state.userCompanies = payload
}

export const userTrademarks = (state, payload) => {
  state.userTrademarks = payload
}

export const newFranchiseeModal = (state, payload) => {
  state.newFranchiseeModal = payload
}
