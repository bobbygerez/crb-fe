export const commissaries = (state, payload) => {
  state.commissaries = payload
}

export const commissary = (state, payload) => {
  state.commissary = payload
}

export const commissaryName = (state, payload) => {
  state.commissary.name = payload
}

export const commissaryDesc = (state, payload) => {
  state.commissary.desc = payload
}

export const commissaryCountry = (state, payload) => {
  state.commissary.address.country_id = payload
}

export const commissaryRegion = (state, payload) => {
  state.commissary.address.region_id = payload
}

export const commissaryProvince = (state, payload) => {
  state.commissary.address.province_id = payload
}

export const commissaryCity = (state, payload) => {
  state.commissary.address.city_id = payload
}

export const commissaryBrgy = (state, payload) => {
  state.commissary.address.brgy_id = payload
}

export const commissaryStreetLotBlk = (state, payload) => {
  state.commissary.address.street_lot_blk = payload
}

export const commissaryBusinessType = (state, payload) => {
  state.commissary.business_info.business_type_id = payload
}

export const commissaryVatType = (state, payload) => {
  state.commissary.business_info.vat_type_id = payload
}

export const commissaryTelephone = (state, payload) => {
  state.commissary.business_info.telephone = payload
}

export const commissaryEmail = (state, payload) => {
  state.commissary.business_info.email = payload
}

export const commissaryTin = (state, payload) => {
  state.commissary.business_info.tin = payload
}

export const commissaryWebsite = (state, payload) => {
  state.commissary.business_info.website = payload
}

export const newCommissaryModal = (state, payload) => {
  state.newCommissaryModal = payload
}
