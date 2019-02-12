export default {
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
    value: 'App\\Model\\Logistic',
    label: 'Logistic'
  },
  {
    value: 'App\\Model\\Branch',
    label: 'Branch'
  },
  {
    value: 'App\\Model\\Commissary',
    label: 'Commissary'
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
