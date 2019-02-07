export const company = (state, payload) => {
  state.company = payload
}

export const editTransactionType = (state, payload) => {
  state.editTransactionType = payload
}

export const newTransactionType = (state, payload) => {
  state.newTransactionType = payload
}

export const transactionType = (state, payload) => {
  state.transactionType = payload
}

export const transactionTypeName = (state, payload) => {
  state.transactionType.name = payload
}

export const transactionTypeDesc = (state, payload) => {
  state.transactionType.desc = payload
}

export const chartAccounts = (state, payload) => {
  state.chartAccounts = payload
}
