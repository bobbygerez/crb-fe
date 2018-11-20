// import createPersistedState from 'vuex-persistedstate'

// // leave the export, even if you don't use it
// export default ({
//   app,
//   router,
//   Vue,
//   store
// }) => {
//   createPersistedState({
//     reducer: (persistedState) => {
//       const stateFilter = Object.assign({}, persistedState)
//       const blackList = ['holdings', 'holding']

//       blackList.forEach((item) => {
//         delete stateFilter[item]
//       })

//       return stateFilter
//     }

//   })(store)
// }
