<template>
  <q-field
    :error="hasErrors"
    :error-label="errMessage"
    v-bind="$attrs"
  >
    <slot />
  </q-field>
</template>
<script>
const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
export default {
  name: 'FVFieldValidator',
  props: {
    validate: Object
  },
  inheritAttrs: false,
  computed: {
    hasErrors () {
      return this.validate.$error
    },
    errMessage () {
      if (!this.validate.$error) return ''
      // check if a prefixed field name exist in the validation object
      let filteredVals = Object.keys(this.validate).filter(v => v.startsWith('_$'))
      if (filteredVals.length < 1) {
        // let x = (names) => names.filter((v, i) => names.indexOf(v) === i)
        // return this.errors.includes(`Check required fields for error.`) ? '' : `Check required fields for error.`
        return ''
      }

      let fieldName = replaceAll(filteredVals[0].replace('_$', ''), '_', ' ')
      if (this.validate.hasOwnProperty('required') && !this.validate.required) {
        return `${fieldName} field is required.`
      }
      if (this.validate.hasOwnProperty('maxLength') && !this.validate.maxLength) {
        return `${fieldName} field exceeds max length of ${this.validate.$params.maxLength.max}.`
      }
      if (this.validate.hasOwnProperty('minLength') && !this.validate.minLength) {
        return `${fieldName} field requires min length of ${this.validate.$params.minLength.min}.`
      }
      if (this.validate.hasOwnProperty('email') && !this.validate.email) {
        return `Field ${fieldName} is invalid email address.`
      }
      // add other checks with same condition signature as above
      // see vuelidate docs
      return `${fieldName} has invalid value.`
    }
  }
}
</script>
