// import {
// Address
// } from '../../assets/models/Address'
import {
  Company
} from '../../assets/models/Company'

export default {
  holdings: [],
  // company: {
  //   address: new Address(),
  //   business_info: {
  //     business_type_id: null,
  //     vat_type_id: null
  //   },
  //   name: null,
  //   desc: null
  // },
  company: Company(),
  companies: [],
  page: 1,
  perPage: 20
}
