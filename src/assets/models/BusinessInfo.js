/* eslint-disable */
export const BusinessInfo = ({
  business_type = BusinessType(), // object
  business_type_id = null,
  businessable_id = null,
  businessable_type = '',
  email = '',
  id = null,
  telephone = null,
  tin = '',
  vat_type = VatType(), // object
  vat_type_id = null,
  website = ''
} = {}) => ({
  business_type,
  business_type_id,
  businessable_id,
  businessable_type,
  email,
  id,
  telephone,
  tin,
  vat_type,
  vat_type_id,
  website
})

export const createBusinessInfo = (data) => {
  const business_type = createBusinessType(data.business_type)
  const vat_type = createVatType(data.vat_type)
  return Object.freeze(BusinessInfo({
    business_type: business_type,
    business_type_id: data.business_type_id,
    businessable_id: data.businessable_id,
    businessable_type: data.businessable_type,
    email: data.email,
    id: data.id,
    telephone: data.telephone,
    tin: data.tin,
    vat_type: vat_type,
    vat_type_id: data.vat_type_id,
    website: data.website
  }))
}

export const VatType = ({
  id = null,
  name = ''
} = {}) => ({
  id,
  name
})

export const createVatType = (data) => Object.freeze(VatType(data))

export const BusinessType = ({
  id = null,
  name = ''
} = {}) => ({
  id,
  name
})

export const createBusinessType = (data) => Object.freeze(BusinessType(data))
