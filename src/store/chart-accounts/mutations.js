
export const setChartAccounts = (state, payload) => {
  state.chartAccounts = payload
}

export const setSelectedChartAccount = (state, payload) => {
  state.selectedChartAccount = payload
}

export const setChartAccount = (state, payload) => {
  state.chartAccount = payload
}

export const setTAccountId = (state, payload) => {
  state.chartAccount.taccount_id = payload
}

export const setParentAccount = (state, payload) => {
  state.parentAccount = payload
}

export const setSearchChartAccount = (state, payload) => {
  state.searchChartAccount = payload
}
