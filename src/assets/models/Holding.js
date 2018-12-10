import { createAddress } from './Address';
import { createBusinessInfo } from './BusinessInfo';
import { createSomeImage } from './SomeImage';

/* eslint-disable */
export class Holding {
  constructor({
    address = null,
    business_info = null,
    companies = [],
    desc = '',
    id = null,
    images = [],
    name = ''
  } = {}) {
    this.address = address
    this.business_info = business_info
    this.companies = companies
    this.desc = desc
    this.id = id
    this.images = images
    this.name = name
  }
}

export function createHolding(data) {
  const address = createAddress(data.address)
  const business_info = createBusinessInfo(data.business_info)
  const companies = data.companies.map(c => createCompanies(c))
  const images = data.images.map(i => createSomeImage(i))

  return Object.freeze(new Holding({
    address: address,
    business_info: business_info,
    companies: companies,
    desc: data.desc,
    id: data.id,
    images: images,
    name: data.name
  }))
}
