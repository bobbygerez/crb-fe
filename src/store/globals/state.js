// import { VatType, BusinessType } from '../../assets/models/BusinessInfo'
// import { Barangay, City, Province, Region, Country } from '../../assets/models/Address'

export default {
  menus: [],
  vatTypes: [],
  businessTypes: [],
  brgys: [],
  cities: [],
  provinces: [],
  regions: [],
  countries: [],
  pageMeta: {},
  tableViewSettings: {
    mode: 'list',
    icon: 'mdi-view-grid',
    innerLoading: false
  },
  tableViewSettingsGlobal: {
    mode: 'list',
    iconGrid: 'mdi-view-grid',
    iconList: 'mdi-view-list',
    tooltipMsg: 'Grid View',
    icon: 'mdi-view-grid',
    innerLoading: false
  },
  locationData: {
    barangayView: false,
    cityView: false,
    location: null
  }, // for getting addresses
  addressInnerLoading: false,
  token: null,
  serverErrorResponse: null,
  handleAsyncValidation: false
}
