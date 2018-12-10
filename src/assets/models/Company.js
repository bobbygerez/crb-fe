import {
  createAddress,
  Address
} from './Address'
import {
  createBusinessInfo
} from './BusinessInfo'
import {
  createHolding,
  Holding
} from './Holding'
import {
  createBranch,
  Branch
} from './Branch'

/* eslint-disable */
export const Company = ({
  address = Address(),
  branches = [Branch()], // array of branches
  business_info = null,
  desc = '',
  holding = Holding(),
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
