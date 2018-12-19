export const vendorables = (state, payload) => {
  state.vendorables = payload
}

export const vendorable = (state, payload) => {
  state.vendorable = payload
}

export const vendorablePivotRank = (state, payload) => {
  state.vendorable.rank = payload
}

export const vendorablePivotDisPercentage = (state, payload) => {
  state.vendorable.dis_percentage = payload
}

export const vendorablePivotPrice = (state, payload) => {
  state.vendorable.price = payload
}

export const vendorablePivotStartDate = (state, payload) => {
  state.vendorable.start_date = payload
}

export const vendorablePivotEndDate = (state, payload) => {
  state.vendorable.end_date = payload
}

export const vendorablePivotVolume = (state, payload) => {
  state.vendorable.volume = payload
}

export const vendorablePivotRemarks = (state, payload) => {
  state.vendorable.remarks = payload
}

export const vendorablePivotType = (state, payload) => {
  state.vendorable.vendorable_type = payload
}

export const vendorablePivotId = (state, payload) => {
  state.vendorable.vendorable_id = payload
}

export const vendorableModal = (state, payload) => {
  state.vendorableModal = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}
