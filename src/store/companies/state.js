import {
  Address
} from '../../assets/models/Address'

export default {
  holdings: [],
  company: {
    address: new Address(),
    business_info: {
      business_type_id: null,
      vat_type_id: null
    },
    name: null,
    desc: null
  },
  companies: [],
  page: 1,
  perPage: 20
}
