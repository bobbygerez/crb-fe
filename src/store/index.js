import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// import example from './module-example'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
		pattys:{
			state:{
				regions:[],
				countries:[],
				page: 1,
				perpage: 30,
				holdingName: '',
				holdingCountryId: null,
				holding: {
					address:{
						country_id: null,
						region_id: null
					}
				},
				holdings: [],
				token: null,
				user: [],
				userLogin: false,
				stores: [],
			    provinces: [],
				categories: [],
				items: [],
				page: 1,
				perPage: 28
			  },
			mutations:{
				regions(state, payload){
					state.regions = payload
				},
				countries(state, payload){
					state.countries = payload
				},
				page(state, payload){
					state.page = payload
				},
				perPage(state, payload){
					state.perPage = payload
				},
				holding(state, payload){
					state.holding = payload
				},
				holdingName(state, payload){
					state.holdingName = payload
				},
				holdings(state, payload){
					state.holdings = payload
				},
				holdingsField(state, payload){
					state.holdings[payload['field']] = payload['value']
				},
				token(state, payload){
					state.token = payload
				},
				user(state, payload){
					state.user = payload
				},
				userLogin(state, payload){
					state.userLogin = payload
				},
				stores(state, payload){
					state.stores = payload
				},
				page(state, payload){
					state.page = payload
				},
				perPage(state, payload){
					state.perPage = payload
				},
				items(state, payload){
					state.items = payload
				},
				provinces(state, payload){
					state.provinces = payload
				},
				categories(state, payload){
					state.categories = payload
				}
			},
			actions:{
				GET_HOLDINGS(state){
					axios.get(process.env.API + '/holdings?page='+state.getters.page+'&perPage='+state.getters.perPage)
					.then(function(res){
				       state.commit('holdings', res.data.holdings);
				    })
				},
				HOLDING_EDIT(state, holdingId){
				      axios.get(process.env.API + `/holdings/${holdingId}/edit`)
				      .then(function(res){
				      	state.commit('holding', res.data.holding);
				      })
				      .catch()
				},
				GET_COUNTRIES(state){
					axios.get(process.env.API + '/countries')
						.then(function(res){
							state.commit('countries', res.data.countries);
					    })
				},
				GET_REGIONS(state, countryId){
					axios.get(process.env.API + `/regions/${countryId}`)
					.then(function(res){
							state.commit('regions', res.data.regions);
					    })
				},
				GET_PROVINCES(state, regionId){
					axios.get(process.env.API + `/provinces/${regionId}`)
					.then(function(res){
							
					    })
				},
				page(state, payload){
					state.commit('page', payload)
				},
				perPage(state, payload){
					state.commit('perPage', payload)
				},
				holding(state, payload){
					state.commit('holding', payload)
				},
				holdingName(state, payload){
					state.commit('holdingName', payload)
				},
				holdings(state, payload){
					state.commit('holdings', payload)
				},
				holdingsField(state, payload){
					state.commit('holdingsField', payload)
				},
				token(state, payload){
					state.commit('token', payload)
				},
				userLogin(state, payload){
					state.commit('userLogin', payload)
				},
				user(state, payload){
					state.commit('user', payload)
				},
				stores(state, payload){
					state.commit('stores', payload)
				},
				page(state, payload){
					state.commit('page', payload)
				},
				perPage(state, payload){
					state.commit('perPage', payload)
				},
				items(state, payload){
					state.commit('items', payload)
				},
				provinces(state, payload){
					state.commit('provinces', payload)
				},
				categories(state, payload){
					state.commit('categories', payload)
				}
			},
			getters:{
				regions(state){
					return state.regions.map(e => {
				        return {
				          label: e.description,
				          value: e.id
				        }
				      })
				},
				countries(state){
					return state.countries.map(e => {
				        return {
				          label: e.description,
				          value: e.id
				        }
				      })
				},
				page(state){
					return state.page
				},
				perPage(state){
					return state.perPage
				},
				holding(state){
					return state.holding
				},
				holdingCountryId(state){
					return state.holdingCountryId
				},
				holdingName(state){
					return state.holdingName
				},
				holdings(state){
					return state.holdings
				},
				user(state){
					return state.user
				},
				userLogin(state){
					return state.userLogin
				},
				token(state){
					return state.token
				},
				stores(state){
					return state.stores
				},
				page(state){
					return state.page
				},
				perPage(state){
					return state.perPage
				},
				items(state){
					return state.items
				},
				provinces(state){
					return state.provinces
				},
				categories(state){
					return state.categories
				}
				
			}
		}
    }
  })

  return Store
}
