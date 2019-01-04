import {
  createAddress,
  Address
} from 'assets/models/Address'
import {
  createBusinessInfo,
  BusinessInfo
} from 'assets/models/BusinessInfo'
import {
  createHolding
} from '../../holdings/model/Holding'
import {
  createBranch,
  Branch
} from '../../branches/model/Branch'

import {
  required,
  email,
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

/* eslint-disable */
export const Company = ({
  address = Address(),
  branches = [Branch()], // array of branches
  business_info = BusinessInfo(),
  desc = '',
  holding = {},
  holding_id = null,
  id = null,
  name = ''
} = {}) => ({
  address,
  branches,
  business_info,
  desc,
  holding,
  holding_id,
  id,
  name
})

export const createCompany = (data) => {
  const address = createAddress(data.address)
  const business_info = createBusinessInfo(data.business_info)
  const branches = data.branches.map(b => createBranch(data.branches))
  const holding = createHolding(data.holding)

  return Object.freeze(Company({
    address: address,
    business_info: business_info,
    branches: branches,
    holding: holding,
    holding_id: data.holding_id,
    desc: data.desc,
    id: data.id,
    name: data.name
  }))
}

// validation rules
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
    _$Company_description: anon
  },
  holding_id: {
    _$Holding: anon
  },
  name: {
    required,
    _$Company_name: anon
  }
}
export const newCompanyValidationRules = () => {
  return { ...commons
  }
}

export const editCompanyValidationRules = () => {
  return {
    ...commons,
    id: {
      _$Company_id: anon
    }
  }
}
