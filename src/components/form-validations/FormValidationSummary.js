import BaseValidationMixin from 'components/form-validations/BaseValidationMixin'
import QAlert from 'quasar'
const removeDupe = (names) => names.filter((v, i) => names.indexOf(v) === i)
export default {
  name: 'FVErrorSummary',
  mixins: [BaseValidationMixin],
  props: {
    valObj: Object
  },
  data () {
    return {
      errors: []
    }
  },
  computed: {
    hasErrors () {
      return this.testForErrors().length > 0
    }
  },
  methods: {
    testForErrors () {
      let arr = []
      arr = removeDupe(this.getAllErrors(this.valObj, arr))
      this.errors = arr
      return arr
    },
    getAllErrors (obj, arr) {
      if (typeof obj !== 'object' && obj !== null) {
        return arr
      }

      let keys = Object.keys(obj.$params)

      if (obj.$params[keys[0]] !== null) {
        if (obj.$error) {
          arr.push(this.getErrMessage(obj))
        }
        return
      }
      keys.forEach(v => {
        this.getAllErrors(obj[v], arr)
      })

      return arr
    },

    traverse (jsonObj) {
      console.log('jsonObj', jsonObj)
      if (typeof jsonObj === 'object' && jsonObj !== null) {
        Object.entries(jsonObj).forEach(([key, value]) => {
          // key is either an array index or object key
          console.log('key=' + key + ',' + 'val=', value)
          this.traverse(value)
        })
      } else {
        // jsonObj is a number or string
        console.log(' else jsonObj', jsonObj)
      }
    }

  },
  render (h) {
    return h('div')
  }
}
