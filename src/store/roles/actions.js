export const roles = ({
  commit
}, payload) => {
  commit('roles', payload)
}

export const role = ({
  commit
}, payload) => {
  commit('role', payload)
}

export const roleName = ({
  commit
}, payload) => {
  commit('roleName', payload)
}

export const roleDescription = ({
  commit
}, payload) => {
  commit('roleDescription', payload)
}

export const subordinateRoles = ({
  commit
}, payload) => {
  commit('subordinateRoles', payload)
}

export const superiorRoles = ({
  commit
}, payload) => {
  commit('superiorRoles', payload)
}

export const newRoleModal = ({
  commit
}, payload) => {
  commit('newRoleModal', payload)
}
