import {
  QField
} from 'quasar'
import Vue from 'vue'
/**
 * Javascript Implementation of the FVFieldValidator component
 * It is specificaly for quasar
 * @author Aldrin Marquez
 */
// const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
import BaseValidationMixin from 'components/form-validations/BaseValidationMixin'
export default Vue.extend({
  name: 'FormFieldValidator',
  props: {
    validate: Object
  },
  mixins: [BaseValidationMixin],
  inheritAttrs: false,
  computed: {
    hasErrors () {
      return this.validate.$error
    },
    errMessage () {
      return this.getErrMessage(this.validate)
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
