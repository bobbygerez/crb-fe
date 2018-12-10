import {
  createAddress
} from "./Address"
import {
  createBusinessInfo
} from "./BusinessInfo"

/* eslint-disable */
export class Holding {
  constructor({
    address = null,
    branches = [], // array of branches
    business_info = null,
    desc = '',
    holding = null,
    holding_id = null,
    id = null,
    name = ''
  } = {}) {
    this.address = address
    this.branches = branches
    this.business_info = business_info
    this.desc = desc
    this.holding = holding
    this.holding_id = holding_id
    this.id = id
    this.name = name
  }
}

export function createHolding(data) {
  const address = createAddress(data.address)
  const business_info = createBusinessInfo(data.business_info)
  const companies = createCompanies(data.province)
  const images = createCity(data.city)
  const brgy = createBarangay(data.brgy)

  return Object.freeze(new Holding({
    address: ,
    business_info: ,
    companies: ,
    desc: ,
    id: ,
    images: ,
    name: data.name
  }))
}
