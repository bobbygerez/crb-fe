export const items = ({
  commit
}, payload) => {
  commit('items', payload)
}

export const ingredients = ({
  commit
}, payload) => {
  commit('ingredients', payload)
}

export const ingredient = ({
  commit
}, payload) => {
  commit('ingredient', payload)
}

export const ingredientName = ({
  commit
}, payload) => {
  commit('ingredientName', payload)
}

export const ingredientPcs = ({
  commit
}, payload) => {
  commit('ingredientPcs', payload)
}

export const ingredientMethods = ({
  commit
}, payload) => {
  commit('ingredientMethods', payload)
}

export const ingredientCompanyName = ({
  commit
}, payload) => {
  commit('ingredientCompanyName', payload)
}

export const ingredientCompanyId = ({
  commit
}, payload) => {
  commit('ingredientCompanyId', payload)
}

export const userEntities = ({
  commit
}, payload) => {
  commit('userEntities', payload)
}

export const selectedCompany = ({
  commit
}, payload) => {
  commit('selectedCompany', payload)
}

export const newIngredientModal = ({
  commit
}, payload) => {
  commit('newIngredientModal', payload)
}
