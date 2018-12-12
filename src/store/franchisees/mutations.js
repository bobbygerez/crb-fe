export const franchisees = (state, payload) => {
  state.franchisees = payload
}

export const franchisee = (state, payload) => {
  state.franchisee = payload
}

export const franchiseeTrademarkId = (state, payload) => {
  state.franchisee.trademark_id = payload
}

export const franchiseeTrademarkCompanyId = (state, payload) => {
  state.franchisee.trademarks.company_id = payload
}

export const franchiseeName = (state, payload) => {
  state.franchisee.name = payload
}

export const franchiseeFranchisableId = (state, payload) => {
  state.franchisee.franchisable_id = payload
}

export const userTrademarks = (state, payload) => {
  state.userTrademarks = payload
}

export const newFranchiseeModal = (state, payload) => {
  state.newFranchiseeModal = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}

export const trademarkCompanyName = (state, payload) => {
  state.trademarkCompanyName = payload
}

export const address = (state, payload) => {
  state.address = payload
}

export const businessInfo = (state, payload) => {
  state.businessInfo = payload
}
