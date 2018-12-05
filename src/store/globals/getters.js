export {
  getField
}
  from 'vuex-map-fields'

export const getBrgys = (state) => state.brgys

export const getCities = (state) => state.cities

export const getProvinces = (state) => state.provinces

export const getRegions = (state) => state.regions

export const getCountries = (state) => state.countries

export const getBusinessTypes = (state) => state.businessTypes

export const getVatTypes = (state) => state.vatTypes

export const getMenus = (state) => state.menus

export const countryList = (state) => state.countries.map(v => {
  return { label: v.description, value: v.id }
})
