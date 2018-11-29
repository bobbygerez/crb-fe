export const accessRights = (state, payload) => {
  state.accessRights = payload
}

export const accessRight = (state, payload) => {
  state.accessRight = payload
}

export const accessRightName = (state, payload) => {
  state.accessRight.name = payload
}

export const newAccessRightModal = (state, payload) => {
  state.newAccessRightModal = payload
}
