import { axios } from 'plugins/axios'

export default {
  getHolds (page, perPage) {
    return axios.request({
      url: '/holdings?page=' + page + '&perPage=' + perPage,
      methods: 'get'
    })
  }
}
