import {
  QField
} from 'quasar'
import Vue from 'vue'
/**
 * Javascript Implementation of the FVFieldValidator component
 * It is specificaly for quasar
 * @author Aldrin Marquez
 */
const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
export default Vue.extend({
  name: 'FormFieldValidator',
  props: {
    val: Object,
    fieldName: String,
    localMessage: Object,
    errorMessages: {
      type: Object,
      default: () => {
        return {
          required: 'field is required.',
          minLength: 'field requires minimum length of',
          maxLength: 'field exceeds maximum length of',
          email: 'field is an invalid email.'
        }
      }
    }
  },
  inheritAttrs: false,
  computed: {
    hasErrors () {
      return this.val.$error
    },
    errMessage () {
      if (!this.val.$error) return ''

      const filteredVals = this.fieldName || Object.keys(this.val).filter(v => v.startsWith('_$'))
      if (filteredVals.length < 1) {
        return ''
      }
      const fieldname = this.fieldName || replaceAll(filteredVals[0].replace('_$', ''), '_', ' ')
      const message = this.localMessage || this.errorMessages
      if (this.val.hasOwnProperty('required') && !this.val.required) {
        return `${fieldname} ${message.required}`
      }
      if (this.val.hasOwnProperty('maxLength') && !this.val.maxLength) {
        return `${fieldname} ${message.maxLength} ${this.val.$params.maxLength.max}.`
      }
      if (this.val.hasOwnProperty('minLength') && !this.val.minLength) {
        return `${fieldname} ${message.minLength} ${this.val.$params.minLength.min}.`
      }
      if (this.val.hasOwnProperty('email') && !this.val.email) {
        return `${fieldname} ${message.email}`
      }
      return `${fieldname} has invalid value.`
    }
  },
  render (h) {
    return h(QField, {
      props: {
        error: this.hasErrors,
        errorLabel: this.errMessage
      },
      attrs: this.$attrs
    },
    this.$slots.default)
  }
})
