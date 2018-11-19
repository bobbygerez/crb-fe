import axios from 'axios'

export const GET_COMPANIES = ({
  commit, state
}) => {
  axios.get(process.env.API + `/companies?page=${state.page}&perPage=${state.perPage}`)
    .then(function (res) {
      commit('companies', res.data.companies)
    })
}
