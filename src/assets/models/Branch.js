import {
  createAddress
} from './Address'
import {
  createBusinessInfo
  // BusinessInfo
} from './BusinessInfo'
import {
  createCompany
} from './Company'

/* eslint-disable */
export const Branch = ({
  address = null,
  business_info = null,
  desc = '',
  company = null,
  id = null,
  name = ''
} = {}) => ({
  address,
  business_info,
  company,
  desc,
  id,
  name
})

export const createBranch = (data) => {
  const address = createAddress(data.address)
  const business_info = createBusinessInfo(data.business_info)
  const company = createCompany(data.company)

  return Object.freeze(Branch({
    address: address,
    business_info: business_info,
    company: company,
    desc: data.desc,
    id: data.id,
    name: data.name
  }))
}
