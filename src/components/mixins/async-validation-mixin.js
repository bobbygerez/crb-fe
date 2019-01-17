import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('globals', ['serverErrorResponse', 'handleAsyncValidation'])
  },
  methods: {
    ...mapActions('globals', ['setServerErrorResponse', 'setHandleAsyncValidation'])
  },
  created () {
    this.setServerErrorResponse(null)
    this.setHandleAsyncValidation(true)
    console.log('created hook: asyncValidationHandle =>', this.handleAsyncValidation)
  },
  beforeDestroy () {
    this.setServerErrorResponse(null)
    this.setHandleAsyncValidation(false)
    console.log('beforeDestroy hook: asyncValidationHandle =>', this.handleAsyncValidation)
  }
}
