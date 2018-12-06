export const categories = (state, payload) => {
  state.categories = payload
}

export const category = (state, payload) => {
  state.category = payload
}

export const categoryName = (state, payload) => {
  state.category.name = payload
}

export const categoryDesc = (state, payload) => {
  state.category.desc = payload
}
