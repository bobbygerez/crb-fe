export const chartAccounts = (state, payload) => {
  state.chartAccounts = payload
}

export const chartAccount = (state, payload) => {
  state.chartAccount = payload
}

export const chartAccountName = (state, payload) => {
  state.chartAccount.name = payload
}

export const chartAccountCompanyId = (state, payload) => {
  state.chartAccount.company_id = payload
}

export const chartAccountDisplay = (state, payload) => {
  state.chartAccount.account_display = payload
}

export const chartAccountRemarks = (state, payload) => {
  state.chartAccount.remarks = payload
}

export const companies = (state, payload) => {
  state.companies = payload
}

export const company = (state, payload) => {
  state.company = payload
}

export const newChartAccount = (state, payload) => {
  state.newChartAccount = payload
}

export const parentAccount = (state, payload) => {
  state.parentAccount = payload
}

export const editChartAccount = (state, payload) => {
  state.editChartAccount = payload
}

export const parentAccountName = (state, payload) => {
  state.parentAccount.name = payload
}

export const parentAccountDisplay = (state, payload) => {
  state.parentAccount.account_display = payload
}

export const parentAccountRemarks = (state, payload) => {
  state.parentAccount.remarks = payload
}
