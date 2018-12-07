import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('globals', ['businessTypes', 'vatTypes']),
    bizTypeOptions () {
      return this.businessTypes.map(v => {
        return { label: v.name, value: v.id }
      })
    },
    vatTypeOptions () {
      return this.vatTypes.map(v => {
        return { label: v.name, value: v.id }
      })
    }
  },
  methods: {
    ...mapActions('globals', ['getBusinessTypes', 'getVatTypes'])
  }
}
