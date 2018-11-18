export default {
  businessTypes:[],
  brgys: [],
  cities: [],
  provinces: [],
  regions: [],
  countries: [],
  page: 1,
  perpage: 30,
  holdingName: '',
  holding: {
    address: {
      country_id: null,
      region_id: null,
      province_id: null,
      city_id: null,
      brgy_id: null,
      street_lot_blk: null
    },
    business_info: {
      business_type_id: null
    },
    name: null,
    desc: null
  },
  holdings: [],
  token: null,
  user: [],
  userLogin: false,
  stores: [],
  categories: [],
  items: []
}
