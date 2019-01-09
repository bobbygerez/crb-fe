export const accountingStandard = (state, payload) => {
  state.accountingStandard = payload
}

export const accountingStandardName = (state, payload) => {
  state.accountingStandard.name = payload
}

export const accountingStandardMask = (state, payload) => {
  state.accountingStandard.mask = payload
}

export const newAccountingStandard = (state, payload) => {
  state.newAccountingStandard = payload
}
