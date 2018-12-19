export const items = (state, payload) => {
  state.items = payload
}

export const item = (state, payload) => {
  state.item = payload
}

export const itemSKU = (state, payload) => {
  state.item.sku = payload
}

export const itemBarcode = (state, payload) => {
  state.item.barcode = payload
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

export const itemItemableType = (state, payload) => {
  state.item.itemable_type = payload
}

export const itemItemableId = (state, payload) => {
  state.item.itemable_id = payload
}

export const itemDesc = (state, payload) => {
  state.item.desc = payload
}

export const editItemModal = (state, payload) => {
  state.editItemModal = payload
}

export const newItemModal = (state, payload) => {
  state.newItemModal = payload
}

export const packages = (state, payload) => {
  state.packages = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}
