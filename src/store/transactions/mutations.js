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

export const payeePayableType = (state, payload) => {
  state.payee.payable_type = payload
}

export const payeePayableId = (state, payload) => {
  state.payee.payable_id = payload
}

export const transactionTypeId = (state, payload) => {
  state.transaction.transaction_type_id = payload
}

export const transactionType = (state, payload) => {
  state.transactionType = payload
}

export const chartAccountId = (state, payload) => {
  state.transaction.chart_account_id = payload
}

export const transactionVatableSales = (state, payload) => {
  state.transaction.vatable_sales = payload
}

export const setEditTransactionVatableSales = (state, payload) => {
  state.editTransaction.vatable_sales = payload
}

export const transactionVatExemptSales = (state, payload) => {
  state.transaction.vat_exempt_sales = payload
}

export const setEditTransactionVatExemptSales = (state, payload) => {
  state.editTransaction.vat_exempt_sales = payload
}

export const transactionZeroRatedSales = (state, payload) => {
  state.transaction.zero_rated_sales = payload
}

export const setEditTransactionZeroRatedSales = (state, payload) => {
  state.editTransaction.zero_rated_sales = payload
}

export const transactionVatAmount = (state, payload) => {
  state.transaction.vat_amount = payload
}

export const setEditTransactionVatAmount = (state, payload) => {
  state.editTransaction.vat_amount = payload
}


export const transactionTransactableType = (state, payload) => {
  state.transaction.transactable_type = payload
}

export const transactionTransactableId = (state, payload) => {
  state.transaction.transactable_id = payload
}

export const transactionDiscount = (state, payload) => {
  state.transaction.total_discount = payload
}

export const transactionTotalAmount = (state, payload) => {
  state.transaction.total_amount = payload
}

export const setEditTransactionTotalAmount = (state, payload) => {
  state.editTransaction.total_amount = payload
}
export const transactionCheckNumber = (state, payload) => {
  state.transaction.checknumber = payload
}

export const transactionRemarks = (state, payload) => {
  state.transaction.remarks = payload
}

export const createdBy = (state, payload) => {
  state.transaction.created_by = payload
}

export const vendorableNames = (state, payload) => {
  state.vendorableNames = payload
}

export const purchaseReceived = (state, payload) => {
  state.purchaseReceived = payload
}

export const entityItems = (state, payload) => {
  state.entityItems = payload
}

export const setTax = (state, payload) => {
  state.tax = payload
}

export const setEditTransaction = (state, payload) => {
  state.editTransaction = payload
}
