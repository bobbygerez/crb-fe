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
