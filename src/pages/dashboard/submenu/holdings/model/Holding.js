import {
  createAddress,
  Address
} from 'assets/models/Address'
import {
  createBusinessInfo,
  BusinessInfo
} from 'assets/models/BusinessInfo'
import {
  createSomeImage,
  SomeImage
} from 'assets/models/SomeImage'
import {
  Company,
  createCompany
} from '../../companies/model/Company'

import {
  required,
  email,
  numeric,
  minLength,
  maxLength,
  helpers
} from 'vuelidate/lib/validators'

import {
  axios
} from 'plugins/axios'
import {
  debounceAsyncValidator
} from 'assets/utils/app-utils'

/* eslint-disable */
export const Holding = ({
  address = Address(),
  business_info = BusinessInfo(),
  companies = [Company()],
  desc = '',
  id = null,
  images = [SomeImage()],
  name = ''
} = {}) => ({
  address,
  business_info,
  companies,
  desc,
  id,
  images,
  name
})

export const createHolding = (data) => {
  const address = createAddress(data.address)
  const business_info = createBusinessInfo(data.business_info)
  const companies = data.companies.map(c => createCompany(c))
  const images = data.images.map(i => createSomeImage(i))

  return Object.freeze(Holding({
    address: address,
    business_info: business_info,
    companies: companies,
    desc: data.desc,
    id: data.id,
    images: images,
    name: data.name
  }))
}

const asyncValidator = (param, api) =>
  helpers.withParams({
      type: 'asyncValidator'
    },
    debounceAsyncValidator(function (value, debounce) {
      if (value === '') return true
      const comp = this
      if (param.hasOwnProperty('id')) {
        const data = Object.keys(comp.$v.$params).reduce(v => comp.$v[v])
        param.id = comp[data].id
      }
      return debounce()
        .then(() => api(param, value))
        .then(result => result.data.success === 1)
        .catch(error => {
          if (error.response) {
            console.log('error =>', error.response.data.message)
          }
          return false
        })
    }, 500)
  )

const asyncValidationApi = (param, value) => axios.get(`/async-holding-form-validation`, {
  params: {
    ...param,
    value
  }
})

// TODO: refine validation rules
const anon = () => true

const commons = {
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
    },
    // website = ''
  },
  desc: {
    required,
    _$Holding_description: anon
  },
  //id = null,
  // images = [SomeImage()],

}
export const newHoldingFormValidationRule = () => {
  return {
    ...commons,
    name: {
      required,
      _$Holding_name: anon,
      asyncValidate: asyncValidator({
        field: 'name',
        type: 'create'
      }, asyncValidationApi)
    }
  }
}

// TODO: refine validation rule
export const editHoldingFormValidationRule = () => {
  return {
    ...commons,
    id: {
      required,
      _$Holding_id: anon
    },
    name: {
      required,
      _$Holding_name: anon,
      asyncValidate: asyncValidator({
        field: 'name',
        id: null,
        type: 'update'
      }, asyncValidationApi)
    }
  }
}