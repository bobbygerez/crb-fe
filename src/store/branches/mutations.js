export const branches = (state, payload) => {
  state.branches = payload
}

export const branch = (state, payload) => {
  state.branch = payload
}

export const branchId = (state, payload) => {
  state.branch.id = payload
}

export const branchName = (state, payload) => {
  state.branch.name = payload
}

export const branchCompanyId = (state, payload) => {
  state.branch.company_id = payload
}

export const branchCountryId = (state, payload) => {
  state.branch.address.country_id = payload
}

export const branchRegionId = (state, payload) => {
  state.branch.address.region_id = payload
}

export const branchProvinceId = (state, payload) => {
  state.branch.address.province_id = payload
}

export const branchCityId = (state, payload) => {
  state.branch.address.city_id = payload
}

export const branchBrgyId = (state, payload) => {
  state.branch.address.brgy_id = payload
}

export const branchStreetLotBlk = (state, payload) => {
  state.branch.address.stree_lot_blk = payload
}

export const branchBusinessTypeId = (state, payload) => {
  state.branch.business_info.business_type_id = payload
}

export const branchVatTypeId = (state, payload) => {
  state.branch.business_info.vat_type_id = payload
}

export const branchTelephone = (state, payload) => {
  state.branch.business_info.telephone = payload
}

export const branchEmail = (state, payload) => {
  state.branch.business_info.email = payload
}

export const branchTin = (state, payload) => {
  state.branch.business_info.tin = payload
}

export const branchWebsite = (state, payload) => {
  state.branch.business_info.website = payload
}

export const branchDesc = (state, payload) => {
  state.branch.desc = payload
}

export const companies = (state, payload) => {
  state.companies = payload
}

export const newBranchModal = (state, payload) => {
  state.newBranchModal = payload
}
