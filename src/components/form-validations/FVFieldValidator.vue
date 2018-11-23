<template>
  <q-field
    :error="hasErrors"
    :error-label="errMessage"
    v-bind="$attrs"
  >
    <slot/>
  </q-field>
</template>
<script>
const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
export default {
  name: 'FVFieldValidator',
  props: {
    val: Object
  },
  inheritAttrs: false,
  computed: {
    hasErrors () {
      return this.val.$error
    },
    errMessage () {
      if (!this.val.$error) return ''
      // check if a prefixed field name exist in the validation object
      let filteredVals = Object.keys(this.val).filter(v => v.startsWith('_$'))
      if (filteredVals.length < 1) {
        // let x = (names) => names.filter((v, i) => names.indexOf(v) === i)
        return this.errors.includes(`Check required fields for error.`) ? '' : `Check required fields for error.`
      }

      let fieldName = replaceAll(filteredVals[0].replace('_$', ''), '_', ' ')
      if (this.val.hasOwnProperty('required') && !this.val.required) {
        return `${fieldName} field is required.`
      }
      if (this.val.hasOwnProperty('maxLength') && !this.val.maxLength) {
        return `${fieldName} field exceeds max length of ${this.val.$params.maxLength.max}.`
      }
      if (this.val.hasOwnProperty('minLength') && !this.val.minLength) {
        return `${fieldName} field requires min length of ${this.val.$params.minLength.min}.`
      }
      if (this.val.hasOwnProperty('email') && !this.val.email) {
        return `Field ${fieldName} is invalid email address.`
      }
      // add other checks with same condition signature as above
      // see vuelidate docs
      return `${fieldName} has invalid value.`
    }
  }
}
</script>
