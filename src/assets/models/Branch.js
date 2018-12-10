import {
  createAddress,
  Address
} from './Address'
import {
  createBusinessInfo,
  BusinessInfo
  // BusinessInfo
} from './BusinessInfo'
import {
  createCompany
} from './Company'

/* eslint-disable */
export const Branch = ({
  address = Address(),
  business_info = BusinessInfo(),
  desc = '',
  company = {},
  company_id = null,
  id = null,
  name = ''
} = {}) => ({
  address,
  business_info,
  company,
  company_id,
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
    company_id: data.company_id,
    desc: data.desc,
    id: data.id,
    name: data.name
  }))
}
