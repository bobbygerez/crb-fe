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
  // data () {
  //   return {
  //     // set this in component create or mounted hook for which that component's module is
  //     localModule: null
  //   }
  // }
  // watch: {
  //   'localModule.address.country_id' (val) {
  //     if (val === null || val === undefined) return
  //     console.log('getregions', this['localModule'])
  //     this.getRegions(val)
  //   },
  //   'localModule.address.region_id' (val) {
  //     console.log('getProvinces', this['localModule'])
  //     this.getProvinces(val)
  //   },
  //   'localModule.address.province_id' (val) {
  //     console.log('getCities', this['localModule'])
  //     this.getCities(val)
  //   },
  //   'localModule.address.city_id' (val) {
  //     console.log('getBrgys', this['localModule'])
  //     this.getBrgys(val)
  //   }
  // }
}
