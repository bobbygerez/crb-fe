export const otherVendors = (state, payload) => {
  state.otherVendors = payload
}

export const otherVendor = (state, payload) => {
  state.otherVendor = payload
}

export const otherVendorName = (state, payload) => {
  state.otherVendor.name = payload
}

export const otherVendorDesc = (state, payload) => {
  state.otherVendor.desc = payload
}

export const otherVendorCountry = (state, payload) => {
  state.otherVendor.address.country_id = payload
}

export const otherVendorRegion = (state, payload) => {
  state.otherVendor.address.region_id = payload
}

export const otherVendorProvince = (state, payload) => {
  state.otherVendor.address.province_id = payload
}

export const otherVendorCity = (state, payload) => {
  state.otherVendor.address.city_id = payload
}

export const otherVendorBrgy = (state, payload) => {
  state.otherVendor.address.brgy_id = payload
}

export const otherVendorStreetLotBlk = (state, payload) => {
  state.otherVendor.address.street_lot_blk = payload
}

export const otherVendorBusinessType = (state, payload) => {
  state.otherVendor.business_info.business_type_id = payload
}

export const otherVendorVatType = (state, payload) => {
  state.otherVendor.business_info.vat_type_id = payload
}

export const otherVendorTelephone = (state, payload) => {
  state.otherVendor.business_info.telephone = payload
}

export const otherVendorEmail = (state, payload) => {
  state.otherVendor.business_info.email = payload
}

export const otherVendorTin = (state, payload) => {
  state.otherVendor.business_info.tin = payload
}

export const otherVendorWebsite = (state, payload) => {
  state.otherVendor.business_info.website = payload
}

export const newOtherVendorModal = (state, payload) => {
  state.newOtherVendorModal = payload
}
