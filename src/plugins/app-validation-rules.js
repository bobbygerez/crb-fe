// import something here
import {
  required,
  email,
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  axios
} from 'axios'

import {
  debounceAsyncValidator
} from 'assets/utils/app-utils'

// TODO: refine validation rules
const anon = () => true
// check for uniqueness of input
let vuex
// leave the export, even if you don't use it
export default ({
  Vue,
  store
}) => {
  // something to do
  Vue.prototype.$holdingRule = {
    //   val: {
    address: {
      country_id: {
        required,
        _$Country: anon
      },
      region_id: {
        required,
        _$Region: anon
      },
      province_id: {
        required,
        _$Province: anon
      },
      city_id: {
        required,
        _$City: anon
      },
      brgy_id: {
        required,
        _$Barangay: anon
      },
      street_lot_blk: {
        required,
        _$Address: anon
      }
    },
    business_info: {
      business_type_id: {
        required,
        _$Business_type: anon
      },
      email: {
        required,
        email,
        _$Email: anon
      },
      telephone: {
        required,
        numeric,
        minLength: minLength(7),
        maxLength: maxLength(12),
        _$Telephone: anon
      },
      tin: {
        required,
        _$TIN: anon
      },
      vat_type_id: {
        required,
        _$Vat_type: anon
      }
      // website = ''
    },
    desc: {
      required,
      _$Holding_description: anon
    },
    // id = null,
    // images = [SomeImage()],
    name: {
      required,
      _$Holding_name: anon,
      isUnique: debounceAsyncValidator((value, debounce) => {
        console.log('deb store=>', store)
        if (value === '') return true
        return debounce()
          .then(() => axios.get(`/async-holding-validation/name/${value}`))
          .then(result => {
            console.log('debounce res=>', result)
            return result.data.success === 1
          })
          .catch(error => {
            console.log('error =>', error)
            if (error.response) {
              // console.log('store=>', store)
              console.log('error =>', error.response.data.message)
              // errMessage = error.response.data.message
              // console.log('err', getMessage())
              store.dispatch('pattys/setServerResponseMessage', error.response.data.message)
            }
            return false
          })
      }, 500)
    }
  }
}

export const store = () => vuex
// // export const store = () => vuex

// export const newHoldingFormValidationRule = (store) => {
//   return { ...commons
//   }
// }
