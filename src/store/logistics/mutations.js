export const logistics = (state, payload) => {
  state.logistics = payload
}

export const logistic = (state, payload) => {
  state.logistic = payload
}

export const logisticName = (state, payload) => {
  state.logistic.name = payload
}

export const logisticDesc = (state, payload) => {
  state.logistic.desc = payload
}

export const logisticCountry = (state, payload) => {
  state.logistic.address.country_id = payload
}

export const logisticRegion = (state, payload) => {
  state.logistic.address.region_id = payload
}

export const logisticProvince = (state, payload) => {
  state.logistic.address.province_id = payload
}

export const logisticCity = (state, payload) => {
  state.logistic.address.city_id = payload
}

export const logisticBrgy = (state, payload) => {
  state.logistic.address.brgy_id = payload
}

export const logisticStreetLotBlk = (state, payload) => {
  state.logistic.address.street_lot_blk = payload
}

export const logisticBusinessType = (state, payload) => {
  state.logistic.business_info.business_type_id = payload
}

export const logisticVatType = (state, payload) => {
  state.logistic.business_info.vat_type_id = payload
}

export const logisticTelephone = (state, payload) => {
  state.logistic.business_info.telephone = payload
}

export const logisticEmail = (state, payload) => {
  state.logistic.business_info.email = payload
}

export const logisticTin = (state, payload) => {
  state.logistic.business_info.tin = payload
}

export const logisticWebsite = (state, payload) => {
  state.logistic.business_info.website = payload
}

export const newLogisticModal = (state, payload) => {
  state.newLogisticModal = payload
}
