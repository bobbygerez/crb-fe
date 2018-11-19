
export const companies = (state, payload) => {
  state.commit('companies', payload)
}

export const page = (state, payload) => {
  state.commit('page', payload)
}

export const perPage = (state, payload) => {
  state.commit('perPage', payload)
}
