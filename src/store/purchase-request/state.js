export default {
  purchaseRequests: [],
  editPurchaseRequestModal: false,
  purchaseRequest: {
    name: '',
    purchasable_id: '',
    purchasable_type: '',
    created_at: '',
    purchasable: {
      name: ''
    },
    prepared_by: {
      firstname: '',
      middlename: '',
      lastname: ''
    },
    noted_by: {
      firstname: '',
      middlename: '',
      lastname: ''
    },
    noted_date: '',
    approved_by: {
      firstname: '',
      middlename: '',
      lastname: ''
    },
    approved_date: ''

  },
  newPurchaseRequestModal: false,
  userEntities: [],
  purchaseItem: {
    name: '',
    pivot: {
      vendorable_type: ''
    },
    items: [{
      purchases: [{
        pivot: {
          price: 0,
          qty: 0,
          freight: 0,
          date_delivery: ''
        }
      }],
      package: {
        name: ''
      },
      name: ''
    }]
  },
  itemLists: [],
  newPurchaseItemModal: false,
  item: {},
  purchasableItems: []
}
