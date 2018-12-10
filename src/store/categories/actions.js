export const categories = ({
  commit
}, payload) => {
  commit('categories', payload)
}

export const category = ({
  commit
}, payload) => {
  commit('category', payload)
}

export const categoryName = ({
  commit
}, payload) => {
  commit('categoryName', payload)
}

export const categoryDesc = ({
  commit
}, payload) => {
  commit('categoryDesc', payload)
}
