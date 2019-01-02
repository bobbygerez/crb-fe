export const ingredients = (state, payload) => {
  state.ingredients = payload
}

export const ingredient = (state, payload) => {
  state.ingredient = payload
}

export const newIngredientModal = (state, payload) => {
  state.newIngredientModal = payload
}

export const userEntities = (state, payload) => {
  state.userEntities = payload
}

export const ingredientName = (state, payload) => {
  state.ingredient.name = payload
}

export const ingredientPcs = (state, payload) => {
  state.ingredient.pcs = payload
}

export const ingredientMethods = (state, payload) => {
  state.ingredient.methods = payload
}

export const selectedCompany = (state, payload) => {
  state.selectedCompany = payload
}

export const ingredientCompanyName = (state, payload) => {
  state.ingredient.company.name = payload
}

export const ingredientCompanyId = (state, payload) => {
  state.ingredient.company_id = payload
}
