export const menus = ({
  commit
}, payload) => {
  commit('menus', payload)
}

export const menu = ({
  commit
}, payload) => {
  commit('menu', payload)
}

export const menuName = ({
  commit
}, payload) => {
  commit('menuName', payload)
}

export const menuDescription = ({
  commit
}, payload) => {
  commit('menuDescription', payload)
}

export const menuParentId = ({
  commit
}, payload) => {
  commit('menuParentId', payload)
}

export const superiorMenus = ({
  commit
}, payload) => {
  commit('superiorMenus', payload)
}

export const submenus = ({
  commit
}, payload) => {
  commit('submenus', payload)
}

export const newMenuModal = ({
  commit
}, payload) => {
  commit('newMenuModal', payload)
}

export const userMenus = ({
  commit
}, payload) => {
  commit('userMenus', payload)
}
