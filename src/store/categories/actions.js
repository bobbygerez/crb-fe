import {
  axios
} from 'boot/axios'

export const setCategories = ({
  commit
}) => {
  axios.get('categories')
    .then(res => {
      commit('setCategories', res.data.categories)
    })
}

export const setCategory = ({
  commit
}, payload) => {
  commit('setCategory', payload)
}
