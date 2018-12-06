export const packages = (state, payload) => {
  state.packages = payload
}

export const packagee = (state, payload) => {
  state.packagee = payload
}

export const packageeName = (state, payload) => {
  state.packagee.name = payload
}

export const packageeDesc = (state, payload) => {
  state.packagee.desc = payload
}

export const newPackageModal = (state, payload) => {
  state.newPackageModal = payload
}
