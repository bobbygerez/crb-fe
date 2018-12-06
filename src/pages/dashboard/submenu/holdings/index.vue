<template>
  <div
    class="q-pa-sm"
    ref="tableContainer"
  >
    <q-page>
      <q-scroll-observable @scroll="userHasScrolled" />
      <holdings></holdings>
      <q-page-sticky
        position="bottom"
        :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]"
      >
        <transition
          appear
          enter-active-class="animated fadeInUpBig"
          leave-active-class="animated fadeOutDownBig"
        >
          <q-btn
            v-if="showFab"
            fab
            color="primary"
            icon="mdi-plus"
            @click="newHoldingModal = true"
          />
        </transition>
      </q-page-sticky>
      <generic-modal
      :title="'New Holding'"
      :model="newHoldingModal"
      @hide="newHoldingModal = false"
    >
      <holding-form></holding-form>
    </generic-modal>
    </q-page>
  </div>
</template>

<script type="text/javascript">
import Holdings from 'components/data-table/holdings.vue'
import { mapActions, mapState } from 'vuex'
import { axios } from 'plugins/axios'
import Hold from 'assets/services/holdings/api'
import { mapHoldingFields } from '../../../../store/pattys'
import GenericModal from 'components/modals/generic-modal'
import HoldingForm from 'components/forms/holding'

export default {
  data () {
    return {
      showFab: false,
      currentRoute: this.$route.path.replace('/dashboard', '.'),
      dark: true
    }
  },
  computed: {
    ...mapHoldingFields(['newHoldingModal']),
    ...mapState('globals', ['perPage', 'page'])
  },
  created () {
    Hold.getHolds(this.page, this.perPage).then(res => {
      this.setHoldings(res.data.holdings)
    })
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('pattys', [
      'setHoldings',
      'getBusinessTypes',
      'getVatTypes',
      'setNewHoldingModal'
    ]),
    ...mapActions('globals', ['getCountries']),
    showNewHoldingModal () {
      this.setNewHoldingModal(true)
    },
    getStart () {
      axios
        .get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.setHoldings(res.data.holdings)
        })
    },
    userHasScrolled (scroll) {
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
  },
  components: {
    GenericModal,
    HoldingForm,
    Holdings
  }
}
</script>
