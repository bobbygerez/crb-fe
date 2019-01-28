export default {
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
    entity: '',
    name: ''
  },
  transaction: {
    transaction_type_id: '',
    chart_account_id: 0,
    total_amount: 0,
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
    name: ''
  },
  vendorableNames: [],
  purchases: [],
  entityItems:[]
}
