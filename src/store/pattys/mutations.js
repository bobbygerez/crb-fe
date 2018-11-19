
export const businessTypes = (state, payload) => { state.businessTypes = payload }

export const vatTypes = (state, payload) => { state.vatTypes = payload }

export const page = (state, payload) => { state.page = payload }

export const perPage = (state, payload) => { state.perPage = payload }

export const holdingVatType = (state, payload) => { state.holding.business_info.vat_type_id = payload }

export const holdingTelephone = (state, payload) => { state.holding.business_info.telephone = payload }

export const holdingEmail = (state, payload) => { state.holding.business_info.email = payload }

export const holdingTin = (state, payload) => { state.holding.business_info.tin = payload }

export const holdingWebsite = (state, payload) => { state.holding.business_info.website = payload }

export const holdingBusinessType = (state, payload) => { state.holding.business_info.business_type_id = payload }

export const holdingStreetLotBlk = (state, payload) => { state.holding.address.street_lot_blk = payload }

export const holdingBrgy = (state, payload) => { state.holding.address.brgy_id = payload }

export const holdingCity = (state, payload) => { state.holding.address.city_id = payload }

export const holdingProvince = (state, payload) => { state.holding.address.province_id = payload }

export const holdingRegion = (state, payload) => { state.holding.address.region_id = payload }

export const holdingDesc = (state, payload) => { state.holding.desc = payload }

export const holdingName = (state, payload) => { state.holdingName = payload }

export const holding = (state, payload) => { state.holding = payload }

export const holdings = (state, payload) => { state.holdings = payload }

export const token = (state, payload) => { state.token = payload }

export const user = (state, payload) => { state.user = payload }

export const userLogin = (state, payload) => { state.userLogin = payload }

export const stores = (state, payload) => { state.stores = payload }

export const items = (state, payload) => { state.items = payload }

export const categories = (state, payload) => { state.categories = payload }
