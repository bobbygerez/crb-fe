export const vendorables = (state, payload) => {
  state.vendorables = payload
}

export const vendorable = (state, payload) => {
  state.vendorable = payload
}

export const vendorablePivotRank = (state, payload) => {
  state.vendorable.pivot.rank = payload
}

export const vendorablePivotDisPercentage = (state, payload) => {
  state.vendorable.pivot.dis_percentage = payload
}

export const vendorablePivotPrice = (state, payload) => {
  state.vendorable.pivot.price = payload
}

export const vendorablePivotStartDate = (state, payload) => {
  state.vendorable.pivot.start_date = payload
}

export const vendorablePivotEndDate = (state, payload) => {
  state.vendorable.pivot.end_date = payload
}

export const vendorablePivotVolume = (state, payload) => {
  state.vendorable.pivot.volume = payload
}

export const vendorablePivotRemarks = (state, payload) => {
  state.vendorable.pivot.remarks = payload
}

export const vendorableModal = (state, payload) => {
  state.vendorableModal = payload
}
