import {
  Holding
} from '../../pages/dashboard/submenu/holdings/model/Holding'

export default {
  newHoldingModal: false,
  editHoldingView: false,
  // editHolding: Holding(),
  // businessTypes: [],
  // brgys: [],
  // cities: [],
  // provinces: [],
  // regions: [],
  // countries: [],
  // page: 1,
  // perPage: 30,
  holdingName: '',
  newHolding: Holding(),
  holding: null,
  holdings: [Holding()],
  user: [],
  userLogin: false,
  stores: [],
  categories: [],
  items: [],
  vatTypes: [],
  serverResponseMessage: null
}
