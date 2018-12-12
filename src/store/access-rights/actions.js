export const accessRights = ({
  commit
}, payload) => {
  commit('accessRights', payload)
}

export const accessRight = ({
  commit
}, payload) => {
  commit('accessRight', payload)
}

export const accessRightName = ({
  commit
}, payload) => {
  commit('accessRightName', payload)
}

export const newAccessRightModal = ({
  commit
}, payload) => {
  commit('newAccessRightModal', payload)
}
