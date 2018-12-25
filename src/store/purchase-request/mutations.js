export const purchaseRequests = (state, payload) => {
  state.purchaseRequests = payload
}

export const editPurchaseRequestModal = (state, payload) => {
  state.editPurchaseRequestModal = payload
}

export const purchaseRequest = (state, payload) => {
  state.purchaseRequest = payload
}

export const purchaseRequestName = (state, payload) => {
  state.purchaseRequest.name = payload
}

export const newPurchaseRequestModal = (state, payload) => {
  state.newPurchaseRequestModal = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}

export const purchasableType = (state, payload) => {
  state.purchaseRequest.purchasable_type = payload
}
