/**
 * Some utility functions you can import separately and use it
 * wholethru the app
 */

// return capitalize string
export const capitalize = (str) => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
// return replaced string
export const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)
// load component path
export const load = (component) => () => import(`pages/dashboard/submenu/${component}`)
