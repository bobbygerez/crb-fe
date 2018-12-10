import { mapGlobalFields } from '../../store/globals'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('globals', ['getRegions', 'getProvinces', 'getCities', 'getBrgys'])
  },
  computed: {
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys', 'countryList']),
    countryOptions () {
      return this.countries.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    regionOptions () {
      return this.regions.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    provinceOptions () {
      return this.provinces.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    cityOptions () {
      return this.cities.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    brgyOptions () {
      return this.brgys.map(v => {
        return { label: v.description, value: v.id }
      })
    }
  },
  data () {
    return {
      // set this in component create or mounted hook for which that component's module is
      localModule: null
    }
  },
  watch: {
    'localModule.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.getRegions(val)
    },
    'localModule.address.region_id' (val) {
      this.getProvinces(val)
    },
    'localModule.address.province_id' (val) {
      this.getCities(val)
    },
    'localModule.address.city_id' (val) {
      this.getBrgys(val)
    }
  }
}
