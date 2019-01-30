export {
  getField
}
  from 'vuex-map-fields'

export const getNewHoldingModal = (state) => state.newHoldingModal

export const getBusinessTypes = (state) => state.businessTypes

export const getVatTypes = (state) => state.vatTypes.map(e => {
  return {
    label: e.name,
    value: e.id
  }
})

export const getPage = (state) => state.page

export const getPerPage = (state) => state.perPage

export const getHolding = (state) => state.holding

export const getHoldingName = (state) => state.holdingName

export const getHoldings = (state) => state.holdings

export const getUser = (state) => state.user

export const getUserLogin = (state) => state.userLogin

export const getStores = (state) => state.stores

export const getItems = (state) => state.items

export const getCategories = (state) => state.categories
