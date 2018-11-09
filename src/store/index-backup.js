import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// import example from './module-example'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
		grandflex:{
			state:{
				token: null,
				user: [],
				userLogin: false,
				stores: [],
			    provinces: [],
				categories: [],
				items: [],
				page: 1,
				perPage: 28,
				example: 'asdf'
			  },
			mutations:{
				updateValueMut: (state, payload) => {
			        state.example = payload;
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
				updateValueAct({ commit }, payload) {
			        commit('updateValueMut', payload);
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
