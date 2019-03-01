import {axios} from 'plugins/axios'

export const company = ({
  commit
}, payload) => {
  commit('company', payload)
}

export const entity = ({
  commit
}, payload) => {
  commit('entity', payload)
}

export const transaction = ({
  commit
}, payload) => {
  commit('transaction', payload)
}

export const transactionTypes = ({
  commit
}, payload) => {
  commit('transactionTypes', payload)
}

export const chartAccounts = ({
  commit
}, payload) => {
  commit('chartAccounts', payload)
}

export const userEntities = ({
  commit
}, payload) => {
  commit('userEntities', payload)
}

export const titleTransaction = ({
  commit
}, payload) => {
  commit('titleTransaction', payload)
}

export const selectedUserEntity = ({
  commit
}, payload) => {
  commit('selectedUserEntity', payload)
}

export const selectedEntity = ({
  commit
}, payload) => {
  commit('selectedEntity', payload)
}

export const entities = ({
  commit
}, payload) => {
  commit('entities', payload)
}

export const payee = ({
  commit
}, payload) => {
  commit('payee', payload)
}

export const transactionTypeId = ({
  commit
}, payload) => {
  commit('transactionTypeId', payload)
}

export const transactionType = ({
  commit
}, payload) => {
  commit('transactionType', payload)
}


export const chartAccountId = ({
  commit
}, payload) => {
  commit('chartAccountId', payload)
}

export const transactionVatableSales = ({
  commit
}, payload) => {
  commit('transactionVatableSales', payload)
}

export const setEditTransactionVatableSales = ({
  commit
}, payload) => {
  commit('setEditTransactionVatableSales', payload)
}

export const transactionVatExemptSales = ({
  commit
}, payload) => {
  commit('transactionVatExemptSales', payload)
}

export const setEditTransactionVatExemptSales = ({
  commit
}, payload) => {
  commit('setEditTransactionVatExemptSales', payload)
}

export const transactionZeroRatedSales = ({
  commit
}, payload) => {
  commit('transactionZeroRatedSales', payload)
}

export const setEditTransactionZeroRatedSales = ({
  commit
}, payload) => {
  commit('setEditTransactionZeroRatedSales', payload)
}

export const transactionVatAmount = ({
  commit
}, payload) => {
  commit('transactionVatAmount', payload)
}

export const payeePayableId = ({
  commit
}, payload) => {
  commit('payeePayableId', payload)
}

export const payeePayableType = ({
  commit
}, payload) => {
  commit('payeePayableType', payload)
}

export const setEditTransactionVatAmount = ({
  commit
}, payload) => {
  commit('setEditTransactionVatAmount', payload)
}
export const transactionTransactableType = ({
  commit
}, payload) => {
  commit('transactionTransactableType', payload)
}

export const transactionTransactableId = ({
  commit
}, payload) => {
  commit('transactionTransactableId', payload)
}

export const transactionDiscount = ({
  commit
}, payload) => {
  commit('transactionDiscount', payload)
}

export const transactionTotalAmount = ({
  commit
}, payload) => {
  commit('transactionTotalAmount', payload)
}

export const setEditTransactionTotalAmount = ({
  commit
}, payload) => {
  commit('setEditTransactionTotalAmount', payload)
}

export const transactionCheckNumber = ({
  commit
}, payload) => {
  commit('transactionCheckNumber', payload)
}

export const transactionRemarks = ({
  commit
}, payload) => {
  commit('transactionRemarks', payload)
}

export const createdBy = ({
  commit
}, payload) => {
  commit('createdBy', payload)
}

export const vendorableNames = ({
  commit
}, payload) => {
  commit('vendorableNames', payload)
}

export const purchaseReceived = ({
  commit
}, payload) => {
  commit('purchaseReceived', payload)
}  

export const entityItems = ({
  commit
}, payload) => {
  commit('entityItems', payload)
} 

export const setTax = ({
  commit
}, payload) => {
  commit('setTax', payload)
}

export const setEditTransaction = ({
  commit
}, payload) => {
  commit('setEditTransaction', payload)
}

export const setTaxTypes = ({
  commit
}, payload) => {
  commit('setTaxTypes', payload)
}

export const setPaymentMethods = ({
  commit
}) => {
  axios.get('/payment_methods').then(res =>{
    commit('setPaymentMethods', res.data.paymentMethods)
  })
  
}

export const setJobs = ({
  commit
}, payload) => {
  commit('setJobs', payload)
}
export const setChartAccountId = ({
  commit
}, payload) => {
  commit('setChartAccountId', payload)
}

export const setRemarks = ({
  commit
}, payload) => {
  commit('setRemarks', payload)
}

export const setTransactionTypeId = ({
  commit
}, payload) => {
  commit('setTransactionTypeId', payload)
}


/***
 * RECEIPT TRANSACTION
 */
export const setReference = ({
  commit
}, payload) => {
  commit('setReference', payload)
}

export const setReceiptNumber = ({
  commit
}, payload) => {
  commit('setReceiptNumber', payload)
}

export const setCreatedAt = ({
  commit
}, payload) => {
  commit('setCreatedAt', payload)
}

export const setDepositDate = ({
  commit
}, payload) => {
  commit('setDepositDate', payload)
}

export const setPayableType = ({
  commit
}, payload) => {
  commit('setPayableType', payload)
}

export const setPayableId = ({
  commit
}, payload) => {
  commit('setPayableId', payload)
}

export const setPaymentMethodId = ({
  commit
}, payload) => {
  commit('setPaymentMethodId', payload)
}

export const setReceiptEntity = ({
  commit
}, payload) => {
  commit('setReceiptEntity', payload)
}

export const setSaleInvoices = ({
  commit
}, payload) => {
  commit('setSaleInvoices', payload)
}

export const setVatableSales = ({
  commit
}, payload) => {
  commit('setVatableSales', payload)
}

export const setVatExemptSales = ({
  commit
}, payload) => {
  commit('setVatExemptSales', payload)
}

export const setZeroRatedSales = ({
  commit
}, payload) => {
  commit('setZeroRatedSales', payload)
}

export const setVatAmount = ({
  commit
}, payload) => {
  commit('setVatAmount', payload)
}

export const setTotalDiscount = ({
  commit
}, payload) => {
  commit('setTotalDiscount', payload)
}

export const setReceiptAmount = ({
  commit
}, payload) => {
  commit('setReceiptAmount', payload)
}

export const setProducts = ({
  commit
}, payload) => {
  commit('setProducts', payload)
}

export const setReceiptTransactableType = ({
  commit
}, payload) => {
  commit('setReceiptTransactableType', payload)
}

export const setReceiptTransactableId = ({
  commit
}, payload) => {
  commit('setReceiptTransactableId', payload)
}

export const setReceiptTrans = ({
  commit
}, payload) => {
  commit('setReceiptTrans', payload)
}

export const setPayor = ({
  commit
}, payload) => {
  commit('setPayor', payload)
}

export const setReceiptTotalAmount = ({
  commit
}, payload) => {
  commit('setReceiptTotalAmount', payload)
}




