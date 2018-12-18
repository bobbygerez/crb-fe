import { mapGlobalFields } from '../../store/globals'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('globals', ['getRegions', 'getProvinces', 'getCities', 'getBrgys'])
  },
  computed: {
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys', 'countryList', 'addressInnerLoading']),
    countryOptions () {
      return this.countries.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    regionOptions () {
      if (!this.regions) return []
      return this.regions.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    provinceOptions () {
      if (!this.provinces) return []
      return this.provinces.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    cityOptions () {
      if (!this.cities) return []
      return this.cities.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    brgyOptions () {
      if (!this.brgys) return []
      return this.brgys.map(v => {
        return { label: v.description, value: v.id }
      })
    }
  }
}
