import {
  Address
} from '../../assets/models/Address'

export default {
  commissaries: [],
  commissary: {
    address: new Address(),
    business_info: {
      business_type_id: null,
      vat_type_id: null
    },
    name: null,
    desc: null
  },
  newCommissaryModal: false
}
