import {
  mapGlobalFields
} from '../../store/globals'
import {
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      /**
       * @note
       * Set this at mounted of the extending component
       * of this mixin in order to watch for changes
       * in the address dropdowns
       * @example
       * mounted () {
       *  this.localModel = this.myModel
       * }
       */
      localModel: null
    }
  },
  methods: {
    /**
     * @note
     * globals store actions of getting address fields
     */
    ...mapActions('globals', ['getRegions', 'getProvinces', 'getCities', 'getBrgys'])
  },
  computed: {
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys', 'countryList', 'addressInnerLoading']),
    /**
     * @start
     * @note
     * Address select/dropdown options
     * @usage
     * Use it in the options prop of a dropdown
     * @example
     * <q-select :options="countryOptions" />
     */
    countryOptions () {
      return this.countries.map(v => {
        return {
          label: v.description,
          value: v.id
        }
      })
    },
    regionOptions () {
      if (!this.regions) return []
      return this.regions.map(v => {
        return {
          label: v.description,
          value: v.id
        }
      })
    },
    provinceOptions () {
      if (!this.provinces) return []
      return this.provinces.map(v => {
        return {
          label: v.description,
          value: v.id
        }
      })
    },
    cityOptions () {
      if (!this.cities) return []
      return this.cities.map(v => {
        return {
          label: v.description,
          value: v.id
        }
      })
    },
    brgyOptions () {
      if (!this.brgys) return []
      return this.brgys.map(v => {
        return {
          label: v.description,
          value: v.id
        }
      })
    }
    /** @end */
  },
  watch: {
    /**
     * @start
     * @usage
     * Address field watchers
     */
    'localModel.address.country_id' (val) {
      if (val === null || val === undefined) {
        this.localModel.address.region_id = null
        this.regions = []
        return
      }
      this.getRegions(val)
        .then(result => {
          if (!result.length) {
            this.localModel.address.region_id = null
          }
        })
    },
    'localModel.address.region_id' (val) {
      if (val === null || val === undefined) {
        this.localModel.address.province_id = null
        this.provinces = []
        return
      }
      this.getProvinces(val)
        .then(result => {
          if (!result.length ||
            !this.provinceOptions.filter(p => p.value === this.localModel.address.province_id).length) {
            this.localModel.address.province_id = null
          }
        })
    },
    'localModel.address.province_id' (val) {
      if (val === null || val === undefined) {
        this.localModel.address.city_id = null
        this.cities = []
        return
      }
      this.getCities(val)
        .then(result => {
          if (!result.length ||
            !this.cityOptions.filter(p => p.value === this.localModel.address.city_id).length) {
            this.localModel.address.city_id = null
          }
        })
    },
    'localModel.address.city_id' (val) {
      if (val === null || val === undefined) {
        this.localModel.address.brgy_id = null
        this.brgys = []
        return
      }
      this.getBrgys(val)
        .then(result => {
          if (!result.length ||
            !this.brgyOptions.filter(p => p.value === this.localModel.address.brgy_id).length) {
            this.localModel.address.brgy_id = null
          }
        })
    }
    /** @end */
  }
}
