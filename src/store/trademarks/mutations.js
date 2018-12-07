export const trademarks = (state, payload) => {
  state.trademarks = payload
}

export const trademark = (state, payload) => {
  state.trademark = payload
}

export const trademarkName = (state, payload) => {
  state.trademark.name = payload
}

export const trademarkDesc = (state, payload) => {
  state.trademark.desc = payload
}

export const trademarkCompanyId = (state, payload) => {
  state.trademark.company_id = payload
}

export const newTrademarkModal = (state, payload) => {
  state.newTrademarkModal = payload
}

export const userCompanies = (state, payload) => {
  state.userCompanies = payload
}
