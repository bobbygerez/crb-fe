/* eslint-disable */
export class BusinessInfo {
  constructor({
    business_type = null, // object
    business_type_id = null,
    businessable_id = null,
    businessable_type = '',
    email = '',
    id = null,
    telephone = '',
    tin = '',
    vat_type = null, // object
    vat_type_id = null,
    website = ''
  } = {}) {
    this.business_type = business_type
    this.business_type_id = business_type_id
    this.businessable_id = businessable_id
    this.businessable_type = businessable_type
    this.email = email
    this.id = id
    this.telephone = telephone
    this.tin = tin
    this.vat_type = vat_type
    this.vat_type_id = vat_type_id
    this.website = website
  }
}

export function createBusinessInfo(data) {
  const business_type = createBusinessType(data.business_type)
  const vat_type = createVatType(data.vat_type)
  return Object.freeze(new BusinessInfo({
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

export class VatType {
  constructor({
    id = null,
    name = ''
  } = {}) {
    this.id = id
    this.name = name
  }
}

export function createVatType(data) {
  return Object.freeze(new VatType(data))
}

export class BusinessType {
  constructor({
    id = null,
    name = ''
  } = {}) {
    this.id = id
    this.name = name
  }
}

export function createBusinessType(data) {
  return Object.freeze(new BusinessType(data))
}
