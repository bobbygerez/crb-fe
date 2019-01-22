export const company = (state, payload) => {
  state.company = payload
}

export const entity = (state, payload) => {
  state.entity = payload
}

export const transaction = (state, payload) => {
  state.transaction = payload
}

export const transactionTypes = (state, payload) => {
  state.transactionTypes = payload
}

export const chartAccounts = (state, payload) => {
  state.chartAccounts = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}

export const titleTransaction = (state, payload) => {
  state.titleTransaction = payload
}

export const selectedUserEntity = (state, payload) => {
  state.selectedUserEntity = payload
}

export const selectedEntity = (state, payload) => {
  state.selectedEntity = payload
}

export const entities = (state, payload) => {
  state.entities = payload
}

export const payee = (state, payload) => {
  state.payee = payload
}

export const transactionTypeId = (state, payload) => {
  state.transaction.transaction_type_id = payload
}

export const transactionType = (state, payload) => {
  state.transactionType = payload
}

export const transactionTotalAmount = (state, payload) => {
  state.transaction.total_amount = payload
}




