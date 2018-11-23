export const users = (state, payload) => {
  state.users = payload
}

export const user = (state, payload) => {
  state.user = payload
}

export const roles = (state, payload) => {
  state.roles = payload
}

export const userStatus = (state, payload) => {
  state.user.status = payload
}

export const civilStatus = (state, payload) => {
  state.civilStatus = payload
}

export const genders = (state, payload) => {
  state.genders = payload
}
