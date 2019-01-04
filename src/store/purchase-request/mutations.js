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

export const purchasableId = (state, payload) => {
  state.purchaseRequest.purchasable_id = payload
}

export const purchaseItem = (state, payload) => {
  state.purchaseItem = payload
}

export const pivotPrice = (state, payload) => {
  state.purchaseItem.items[0].purchases[0].pivot.price = payload
}

export const pivotQty = (state, payload) => {
  state.purchaseItem.items[0].purchases[0].pivot.qty = payload
}

export const pivotFreight = (state, payload) => {
  state.purchaseItem.items[0].purchases[0].pivot.freight = payload
}

export const item = (state, payload) => {
  state.item = payload
}

export const newPurchaseItemModal = (state, payload) => {
  state.newPurchaseItemModal = payload
}

export const itemLists = (state, payload) => {
  state.itemLists = payload
}

export const purchasableItems = (state, payload) => {
  state.purchasableItems = payload
}
