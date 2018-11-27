export const setRoles = ({commit}, payload) => {
  commit('SET_ROLES', payload)
}

export const setRole = ({commit}, payload) => {
  commit('SET_ROLE', payload)
}

export const setAvailRoles = ({commit}, payload) => {
  commit('SET_AVAIL_ROLES', payload)
}

export const setNewRoleModal = ({commit}, payload) => {
  commit('SET_NEW_ROLE_MODAL', payload)
}
