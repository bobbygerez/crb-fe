
import { mapActions } from 'vuex'
import GenericModal from 'components/modals/generic-modal'
export default {
  components: {
    GenericModal
  },
  data () {
    return {
      showFab: false
    }
  },
  computed: {
  },
  created () {
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('globals', ['getCountries', 'getBusinessTypes', 'getVatTypes']),
    hasScrolled (scroll) {
      // {
      //   position: 56, // pixels from top
      //   direction: 'down', // 'down' or 'up'
      //   directionChanged: false, // has direction changed since this handler was called?
      //   inflexionPosition: 56 // last scroll position where user changed scroll direction
      // }
      let diff =
        scroll.direction === 'down'
          ? scroll.inflexionPosition + scroll.position
          : scroll.inflexionPosition - scroll.position
      if (diff >= 300 && scroll.direction === 'up') {
        this.showFab = false
      } else {
        this.showFab = true
      }
    }

  }

}
