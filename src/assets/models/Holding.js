import {
  createAddress,
  Address
} from './Address'
import {
  createBusinessInfo,
  BusinessInfo
} from './BusinessInfo'
import {
  createSomeImage,
  SomeImage
} from './SomeImage'
import {
  Company,
  createCompany
} from './Company'

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

// TODO: refine validation rules
export const newHoldingFormValidationRule = (required, email, numeric, minLength, maxLength, anon) => {
  return {
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
      required
    },
    //id = null,
    // images = [SomeImage()],
    name: {
      required,
      _$Holding_name: anon
    }
  }
}

// TODO: refine validation rule
export const editHoldingFormValidationRule = (required, email, numeric, minLength, maxLength, anon) => {
  return {
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
      required
    },
    //id = null,
    // images = [SomeImage()],
    name: {
      required,
      _$Holding_name: anon
    }
  }
}
