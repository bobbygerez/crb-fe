import {
  Holding
} from '../../assets/models/Holding'

export default {
  newHoldingModal: false,
  businessTypes: [],
  brgys: [],
  cities: [],
  provinces: [],
  regions: [],
  countries: [],
  page: 1,
  perPage: 30,
  holdingName: '',
  // holding: {
  //   address: new Address(),
  //   business_info: {
  //     business_type_id: null
  //   },
  //   name: null,
  //   desc: null
  // },
  holding: Holding(),
  // holdings: [],
  holdings: [Holding()],
  token: null,
  user: [],
  userLogin: false,
  stores: [],
  categories: [],
  items: [],
  vatTypes: []
}
