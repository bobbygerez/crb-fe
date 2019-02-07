import {
  Address
} from '../../assets/models/Address'

export default {
  logistics: [],
  logistic: {
    address: new Address(),
    business_info: {
      business_type_id: null,
      vat_type_id: null
    },
    name: null,
    desc: null
  },
  newLogisticModal: false
}
