export default {

  created() {
    let data = this
    this.$axios.get(process.env.API + '/countries')
      .then(function (res) {
        data.$store.dispatch('countries', res.data.countries)
      })
  }

}
