<template>
  <div>
    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
      appear
    >
      <q-alert
        v-if="hasErrors"
        type="negative"
      >
        <div
          v-for="(error, index) in errors"
          :key="index"
        >{{ error }}</div>
      </q-alert>
    </transition>
  </div>
</template>
<script>
import BaseValidationMixin from 'components/form-validations/BaseValidationMixin'
// const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
const removeDupe = (names) => names.filter((v, i) => names.indexOf(v) === i)
export default {
  name: 'FVErrorSummary',
  mixins: [BaseValidationMixin],
  props: {
    validations: Object
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
      arr = removeDupe(this.getAllErrors(this.validations, arr))
      this.errors = arr
      return arr
    },
    getAllErrors (obj, arr) {
      // terminate if obj is not of object type or if it is null
      if (typeof obj !== 'object' && obj !== null) {
        return arr
      }
      // get keys from $params
      let keys = Object.keys(obj.$params)
      // last $params will contain your validation rules
      // if it isn't null you've reach deepest nested object
      if (obj.$params[keys[0]] !== null) {
        if (obj.$error) {
          // if object has error then push it to error array
          // this will be displayed in the error summary
          // this.errors.push(this.getErrMessage(obj))
          arr.push(this.getErrMessage(obj))
          // this.getErrMessage(obj) !== '' && arr.push()
          // console.log('if error populate ar =>', arr)
        }
        // console.log('pass deep nest obj =>', obj)
        // console.log('pass deep nest arr =>', arr)
        return
      }
      // continue recursion inside other object
      keys.forEach(v => {
        // console.log('at recursion =>', v)
        this.getAllErrors(obj[v], arr)
      })

      // console.log('end recursion normally arr=>', arr)
      return arr
    },
    // getErrMessage (val) {
    //   if (!val.$error) return ''
    //   // check if a prefixed field name exist in the validation object
    //   let filteredVals = Object.keys(val).filter(v => v.startsWith('_$'))
    //   if (filteredVals.length < 1) {
    //     // let x = (names) => names.filter((v, i) => names.indexOf(v) === i)
    //     return `Other required fields has error.`
    //   }

    //   let fieldName = replaceAll(filteredVals[0].replace('_$', ''), '_', ' ')

    //   // validator checks, add other validators whether custom or from vuelidate
    //   if (val.hasOwnProperty('required') && !val.required) {
    //     return `${fieldName} field is required.`
    //   }
    //   if (val.hasOwnProperty('maxLength') && !val.maxLength) {
    //     return `${fieldName} field exceeds max length of ${val.$params.maxLength.max}.`
    //   }
    //   if (val.hasOwnProperty('minLength') && !val.minLength) {
    //     return `${fieldName} field requires min length of ${val.$params.minLength.min}.`
    //   }
    //   if (val.hasOwnProperty('email') && !val.email) {
    //     return `${fieldName} field is invalid email address.`
    //   }

    //   // default error string if you didn't include validator among the checks
    //   return `${fieldName} has invalid value.`
    // },
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
    },
    getAllErrors2 (obj) { // old version
      // let arr = []
      console.log('current checking obj =>', obj)
      // terminate if obj is not of object type or if it is null
      if (typeof obj !== 'object' && obj !== null) {
        return
      }
      // get keys from $params
      let keys = Object.keys(obj.$params)
      // last $params will contain your validation rules
      // if it isn't null you've reach deepest nested object
      if (obj.$params[keys[0]] !== null) {
        if (obj.$error) {
          // if object has error then push it to error array
          // this will be displayed in the error summary
          this.errors.push(this.getErrMessage(obj))
          // arr.push(this.getErrMessage(obj))
        }
        console.log('pass deep nest obj =>', obj)
        return
      }
      // continue recursion inside other object
      keys.forEach(v => {
        console.log('at recursion =>', v)
        this.getAllErrors(obj[v])
      })
    }
  }
}
</script>
