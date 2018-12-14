export const items = (state, payload) => {
  state.items = payload
}

export const item = (state, payload) => {
  state.item = payload
}

export const itemName = (state, payload) => {
  state.item.name = payload
}

export const itemPrice = (state, payload) => {
  state.item.price = payload
}

export const itemQty = (state, payload) => {
  state.item.qty = payload
}

export const itemPackageId = (state, payload) => {
  state.item.package_id = payload
}

export const itemMinimum = (state, payload) => {
  state.item.minimum = payload
}

export const itemMaximum = (state, payload) => {
  state.item.maximum = payload
}

export const itemReorderLevel = (state, payload) => {
  state.item.reorder_level = payload
}

export const itemDesc = (state, payload) => {
  state.item.desc = payload
}

export const editItemModal = (state, payload) => {
  state.editItemModal = payload
}

export const packages = (state, payload) => {
  state.packages = payload
}
