export const menus = (state, payload) => {
  state.menus = payload
}

export const menu = (state, payload) => {
  state.menu = payload
}

export const menuName = (state, payload) => {
  state.menu.name = payload
}

export const menuDescription = (state, payload) => {
  state.menu.description = payload
}

export const menuParentId = (state, payload) => {
  state.menu.parent_id = payload
}

export const superiorMenus = (state, payload) => {
  state.superiorMenus = payload
}

export const submenus = (state, payload) => {
  state.submenus = payload
}

export const newMenuModal = (state, payload) => {
  state.newMenuModal = payload
}

export const userMenus = (state, payload) => {
  state.userMenus = payload
}
