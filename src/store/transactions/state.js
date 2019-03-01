export default {
  products: [],
  payor: {
    payable_id: '',
    payable_type: ''
  },
  saleInvoices: [],
  receiptEntity: {
    name: '',
    address: {
      brgy: {
        description: ''
      },
      city: {
        description: ''
      },
      province: {
        description: ''
      }
    }
  },
  receiptTrans: {
    transaction_type_id: '',
    reference: '',
    receipt_number: '',
    created_at: '',
    deposit_date: '',
    transactable_type: '',
    transactable_id: '',
    receipt_amount: 0,
    payment_method_id: '',
    zero_rated_sales: 0,
    vatable_sales: 0,
    vat_exempt_sales: 0,
    vat_amount: 0,
    chart_account_id: '',
    total_discount: 0,
    total_amount: 0,
    remarks: ''
  },
  jobs: [],
  paymentMethods: [],
  taxTypes: [],
  editTransaction: {
    payee : {
      payable_type: '',
      payable_id: ''
    }
  },
  tax:{
    percentage: 0
  },
  titleTransaction: {
    name: ''
  },
  selectedUserEntity: '',
  selectedEntity: '',
  entities: [{
    value: 'App\\Model\\User',
    label: 'User'
  },
  {
    value: 'App\\Model\\Branch',
    label: 'Branch'
  },
  {
    value: 'App\\Model\\Commissary',
    label: 'Commissary'
  },
  {
    value: 'App\\Model\\Logistic',
    label: 'Logistic'
  }
  ],
  company: {
    id: '',
    companyName: ''
  },
  entity: {
    name: '',
    address: {
      brgy: {
        description: ''
      },
      city: {
        description: ''
      },
      province: {
        description: ''
      }
    }
  },

  transaction: {
    transactable_type: '',
    transactable_id: '',
    transaction_type_id: '',
    chart_account_id: 0,
    total_amount: 0,
    total_discount: 0,
    vatable_sales: 0,
    vat_exempt_sales: 0,
    zero_rated_sales: 0,
    vat_amount: 0,
    remarks: '',
    created_by: {
      firstname: '',
      lastname: ''
    }
  },
  transactionTypes: [],
  transactionType: {
    taccount_id: 0
  },
  chartAccounts: [],
  userEntities: [],
  payee: {
    payable_id: '',
    payable_type: ''
  },
  vendorableNames: [],
  purchaseReceived: [],
  entityItems: []
}
