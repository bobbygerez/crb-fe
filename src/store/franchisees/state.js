import {
  Address
} from '../../assets/models/Address'

export default {
  franchisees: [],
  franchisee: {
    address: new Address(),
    business_info: {
      business_type_id: null,
      vat_type_id: null
    },
    trademarks: {
      company_id: null
    },
    trademark_id: null,
    name: null,
    desc: null
  },
  userTrademarks: [],
  newFranchiseeModal: false,
  userEntities: [],
  trademarkCompanyName: '',
  address: {},
  businessInfo: {}
}
