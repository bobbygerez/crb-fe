import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import pattys from './pattys'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// import example from './module-example'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      pattys
      // pattys: {
      //   state: {
      //     vatTypes: [],
      //     businessTypes: [],
      //     brgys: [],
      //     cities: [],
      //     provinces: [],
      //     regions: [],
      //     countries: [],
      //     page: 1,
      //     perpage: 30,
      //     holdingName: '',
      //     newHoldingModal: false,
      //     holding: {
      //       address: {
      //         country_id: null,
      //         region_id: null,
      //         province_id: null,
      //         city_id: null,
      //         brgy_id: null,
      //         street_lot_blk: null
      //       },
      //       business_info: {
      //         business_type_id: null,
      //         vat_type_id: null,
      //         telephone: null,
      //         email: null,
      //         tin: null,
      //         website: null

      //       },
      //       name: null,
      //       desc: null
      //     },
      //     holdings: [],
      //     token: null,
      //     user: [],
      //     userLogin: false,
      //     stores: [],
      //     provinces: [],
      //     categories: [],
      //     items: [],
      //     page: 1,
      //     perPage: 28
      //   },
      //   mutations: {
      //     newHoldingModal (state, payload) {
      //       state.newHoldingModal = payload
      //     },
      //     vatTypes (state, payload) {
      //       state.vatTypes = payload
      //     },
      //     businessTypes (state, payload) {
      //       state.businessTypes = payload
      //     },
      //     brgys (state, payload) {
      //       state.brgys = payload
      //     },
      //     cities (state, payload) {
      //       state.cities = payload
      //     },
      //     provinces (state, payload) {
      //       state.provinces = payload
      //     },
      //     regions (state, payload) {
      //       state.regions = payload
      //     },
      //     countries (state, payload) {
      //       state.countries = payload
      //     },
      //     page (state, payload) {
      //       state.page = payload
      //     },
      //     perPage (state, payload) {
      //       state.perPage = payload
      //     },
      //     holdingWebsite (state, payload) {
      //       state.holding.business_info.website = payload
      //     },
      //     holdingTin (state, payload) {
      //       state.holding.business_info.tin = payload
      //     },
      //     holdingEmail (state, payload) {
      //       state.holding.business_info.email = payload
      //     },
      //     holdingTelephone (state, payload) {
      //       state.holding.business_info.telephone = payload
      //     },
      //     holdingVatType (state, payload) {
      //       state.holding.business_info.vat_type_id = payload
      //     },
      //     holdingBusinessType (state, payload) {
      //       state.holding.business_info.business_type_id = payload
      //     },
      //     holdingStreetLotBlk (state, payload) {
      //       state.holding.address.street_lot_blk = payload
      //     },
      //     holdingBrgy (state, payload) {
      //       state.holding.address.brgy_id = payload
      //     },
      //     holdingCity (state, payload) {
      //       state.holding.address.city_id = payload
      //     },
      //     holdingProvince (state, payload) {
      //       state.holding.address.province_id = payload
      //     },
      //     holdingRegion (state, payload) {
      //       state.holding.address.region_id = payload
      //     },
      //     holdingDesc (state, payload) {
      //       state.holding.desc = payload
      //     },
      //     holdingName (state, payload) {
      //       state.holdingName = payload
      //     },
      //     holding (state, payload) {
      //       state.holding = payload
      //     },
      //     holdings (state, payload) {
      //       state.holdings = payload
      //     },
      //     token (state, payload) {
      //       state.token = payload
      //     },
      //     user (state, payload) {
      //       state.user = payload
      //     },
      //     userLogin (state, payload) {
      //       state.userLogin = payload
      //     },
      //     stores (state, payload) {
      //       state.stores = payload
      //     },
      //     page (state, payload) {
      //       state.page = payload
      //     },
      //     perPage (state, payload) {
      //       state.perPage = payload
      //     },
      //     items (state, payload) {
      //       state.items = payload
      //     },
      //     categories (state, payload) {
      //       state.categories = payload
      //     }
      //   },
      //   actions: {
      //     GET_VAT_TYPES ({
      //       commit,
      //       state
      //     }) {
      //       axios.get(process.env.API + '/vat_types')
      //         .then(function (res) {
      //           commit('vatTypes', res.data.vatTypes)
      //         })
      //     },
      //     GET_BUSINESS_TYPES ({
      //       commit,
      //       state
      //     }) {
      //       axios.get(process.env.API + '/business_types')
      //         .then(function (res) {
      //           commit('businessTypes', res.data.businessTypes)
      //         })
      //     },
      //     GET_COUNTRIES ({
      //       commit,
      //       state
      //     }) {
      //       axios.get(process.env.API + '/countries')
      //         .then(function (res) {
      //           commit('countries', res.data.countries)
      //         })
      //     },
      //     GET_REGIONS ({
      //       commit,
      //       state
      //     }, countryId) {
      //       axios.get(process.env.API + `/regions/${countryId}`)
      //         .then(function (res) {
      //           commit('regions', res.data.regions)
      //         })
      //     },
      //     GET_PROVINCES ({
      //       commit,
      //       state
      //     }, regionId) {
      //       axios.get(process.env.API + `/provinces/${regionId}`)
      //         .then(function (res) {
      //           commit('provinces', res.data.provinces)
      //         })
      //     },
      //     GET_CITIES ({
      //       commit,
      //       state
      //     }, provinceId) {
      //       axios.get(process.env.API + `/cities/${provinceId}`)
      //         .then(function (res) {
      //           commit('cities', res.data.cities)
      //         })
      //     },
      //     GET_BRGYS ({
      //       commit,
      //       state
      //     }, cityId) {
      //       axios.get(process.env.API + `/brgys/${cityId}`)
      //         .then(function (res) {
      //           commit('brgys', res.data.brgys)
      //         })
      //     },
      //     newHoldingModal (state, payload) {
      //       state.commit('newHoldingModal', payload)
      //     },
      //     page (state, payload) {
      //       state.commit('page', payload)
      //     },
      //     perPage (state, payload) {
      //       state.commit('perPage', payload)
      //     },
      //     holding (state, payload) {
      //       state.commit('holding', payload)
      //     },
      //     holdings (state, payload) {
      //       state.commit('holdings', payload)
      //     },
      //     holdingWebsite (state, payload) {
      //       state.commit('holdingWebsite', payload)
      //     },
      //     holdingTin (state, payload) {
      //       state.commit('holdingTin', payload)
      //     },
      //     holdingEmail (state, payload) {
      //       state.commit('holdingEmail', payload)
      //     },
      //     holdingTelephone (state, payload) {
      //       state.commit('holdingTelephone', payload)
      //     },
      //     holdingVatType (state, payload) {
      //       state.commit('holdingVatType', payload)
      //     },
      //     holdingBusinessType (state, payload) {
      //       state.commit('holdingBusinessType', payload)
      //     },
      //     holdingStreetLotBlk (state, payload) {
      //       state.commit('holdingStreetLotBlk', payload)
      //     },
      //     holdingName (state, payload) {
      //       state.commit('holdingName', payload)
      //     },
      //     holdingDesc (state, payload) {
      //       state.commit('holdingDesc', payload)
      //     },
      //     holdingBrgy (state, payload) {
      //       state.commit('holdingBrgy', payload)
      //     },
      //     holdingCity (state, payload) {
      //       state.commit('holdingCity', payload)
      //     },
      //     holdingProvince (state, payload) {
      //       state.commit('holdingProvince', payload)
      //     },
      //     holdingRegion (state, payload) {
      //       state.commit('holdingRegion', payload)
      //     },
      //     token (state, payload) {
      //       state.commit('token', payload)
      //     },
      //     userLogin (state, payload) {
      //       state.commit('userLogin', payload)
      //     },
      //     user (state, payload) {
      //       state.commit('user', payload)
      //     },
      //     stores (state, payload) {
      //       state.commit('stores', payload)
      //     },
      //     page (state, payload) {
      //       state.commit('page', payload)
      //     },
      //     perPage (state, payload) {
      //       state.commit('perPage', payload)
      //     },
      //     items (state, payload) {
      //       state.commit('items', payload)
      //     },
      //     provinces (state, payload) {
      //       state.commit('provinces', payload)
      //     },
      //     categories (state, payload) {
      //       state.commit('categories', payload)
      //     }
      //   },
      //   getters: {
      //     newHoldingModal (state) {
      //       return state.newHoldingModal
      //     },
      //     vatTypes (state) {
      //       return state.vatTypes
      //     },
      //     businessTypes (state) {
      //       return state.businessTypes
      //     },
      //     brgys (state) {
      //       return state.brgys
      //     },
      //     cities (state) {
      //       return state.cities
      //     },
      //     provinces (state) {
      //       return state.provinces
      //     },
      //     regions (state) {
      //       return state.regions
      //     },
      //     countries (state) {
      //       return state.countries
      //     },
      //     page (state) {
      //       return state.page
      //     },
      //     perPage (state) {
      //       return state.perPage
      //     },
      //     holding (state) {
      //       return state.holding
      //     },
      //     holdingName (state) {
      //       return state.holdingName
      //     },
      //     holdings (state) {
      //       return state.holdings
      //     },
      //     user (state) {
      //       return state.user
      //     },
      //     userLogin (state) {
      //       return state.userLogin
      //     },
      //     token (state) {
      //       return state.token
      //     },
      //     stores (state) {
      //       return state.stores
      //     },
      //     page (state) {
      //       return state.page
      //     },
      //     perPage (state) {
      //       return state.perPage
      //     },
      //     items (state) {
      //       return state.items
      //     },

      //     categories (state) {
      //       return state.categories
      //     }

      //   }
      // }
    }
  })

  return Store
}
