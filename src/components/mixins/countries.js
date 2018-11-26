export default {
  created () {
    let data = this
    this.$axios.get('/countries').then(function (res) {
      data.$store.dispatch('countries', res.data.countries)
    })
  }
}
