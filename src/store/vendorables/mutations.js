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
