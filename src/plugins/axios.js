import { Platform } from 'quasar'
import axios from 'axios'
// import store from '../store/index'

/**
 * Axios plugin declaration
 * @author renren@ixbase.net
 */

/**
 * Used for intercepting axios requests and responses
 * and logging it in the console, useful when testing
 * @param {*} isIntercept boolean pass true to intercept
 * requests otherwise pass false
 */
const intercept = (isIntercept) => {
  if (!isIntercept) {
    return
  }
  // register a standard request interceptor
  axios.interceptors.request.use(config => {
    // Do something before request is sent
    console.log('%c[REQUEST] sent -> ' + config.url, 'color: blue; font-weight: bold;', config)
    return config
  }, error => {
    // Do something with request error
    console.log('%c[REQUEST] error -> ' + error.config.url, 'color: red; font-weight: bold;', error)
    return Promise.reject(error)
  })
  // Add a response interceptor
  axios.interceptors.response.use(response => {
    // Do something with response data
    console.log('%c[RESPONSE] received -> ' + response.config.url, 'color: green; font-weight: bold;', response)
    return response
  }, error => {
    // Do something with response error
    console.log('%c[RESPONSE] error ->' + error.config.url, 'color: red; font-weight: bold;', error)
    return Promise.reject(error)
  })
}

/**
 * Convenience function for getting the baseUrl
 * that will be used in the axios requests
 * @param {*} type String object literal
 * @returns String used for axios baseUrl
 */
const appMode = (type) => ({
  'live': 'http://18.221.83.197:40/api',
  'test': 'http://localhost:8099/api',
  'local': 'http://192.168.254.2:90/api',
  get mobile () { return Platform.is.cordova ? this.local : this.test }
})[type]

/**
 * Default exported object
 */
export default ({ Vue, store }) => {
  // set base url appMode params: 'live', 'test', 'local', 'mobile'
  axios.defaults.baseURL = appMode('test')
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  // set to false if not debugging the api requests
  intercept(true)
  // prevent removing token on server refresh
  const token = store.getters['pattys/token']
  if (token) {
    setAuthHeader(token)
  }
  // prototype that you can use in your vue files
  // this.$axios in js or $axios in template part of your .vue file
  Vue.prototype.$axios = axios
}

/**
 * Call this to add the auth header at later time
 * or after a successful login
 * to use in your component:
 * import { setAuthHeader } from 'plugins/axios'
 * then call setAuthHeader('yourtoken')
 * @param {*} token String token from your API
 * that will be added to axios header for authorized requests
 * appends Bearer + your token
 */
export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * unset the header part of your axios instance
 * in loggint out or token expiry etc..
 */
export const unSetAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = null
}

/**
 * import this instance for your axios requests on other .js files
 * to get the same instance that is declared in this file
 * ie. service-example.js file import axios from 'plugins/axios'
 * otherwise in .vue files use the prototype $axios
 */
export { axios }
