export default {
  data () {
    return {
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
  // beforeMount () {
  //   // #1: Call parent setter
  //   // item setter is called so proxifying is propaged
  //   this.$data.item = {
  //     count: 0
  //   };

  //   // OR #2: explicitly ask for watching
  //   // item.count got its getter and setter proxyfied
  //   this.$set(this.module.item, 'count', 0);

  //   // "Short-hand" for:
  //   Vue.set(this.$data.item, 'count', 0);
  // }
}
