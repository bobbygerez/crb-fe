
export const companies = (state, payload) => {
  state.commit('companies', payload)
}

export const company = (state, payload) => {
  state.commit('company', payload)
}

export const companyName = (state, payload) => {
  state.commit('companyName', payload)
}

export const companyDesc = (state, payload) => {
  state.commit('companyDesc', payload)
}

export const country = (state, payload) => {
  state.commit('country', payload)
}

export const region = (state, payload) => {
  state.commit('region', payload)
}

export const province = (state, payload) => {
  state.commit('province', payload)
}

export const city = (state, payload) => {
  state.commit('city', payload)
}

export const brgy = (state, payload) => {
  state.commit('brgy', payload)
}

export const streetLotBlk = (state, payload) => {
  state.commit('streetLotBlk', payload)
}
export const businessType = (state, payload) => {
  state.commit('businessType', payload)
}

export const vatType = (state, payload) => {
  state.commit('vatType', payload)
}

export const page = (state, payload) => {
  state.commit('page', payload)
}

export const perPage = (state, payload) => {
  state.commit('perPage', payload)
}
