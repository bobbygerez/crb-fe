<template>
  <div
    class="q-pa-md"
    ref="tableContainer"
  >
    <q-page>
      <q-scroll-observable @scroll="userHasScrolled" />
      <holdings-table></holdings-table>
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
        <new-holding-form></new-holding-form>
      </generic-modal>
      <generic-modal
        :title="'Edit Holding'"
        :model="editHoldingView"
        @hide="editHoldingView = false"
      >
        <edit-holding-form></edit-holding-form>
      </generic-modal>
    </q-page>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import HoldingApi from './scripts/api'
import { mapHoldingFields } from '../../../../store/pattys'
import GenericModal from 'components/modals/generic-modal'
import HoldingsTable from './tables/holdings.vue'
import NewHoldingForm from './forms/new'
import EditHoldingForm from './forms/edit'

export default {
  components: {
    GenericModal,
    NewHoldingForm,
    HoldingsTable,
    EditHoldingForm
  },
  data () {
    return {
      showFab: false,
      dark: true,
      minimizedModal: false
    }
  },
  computed: {
    ...mapHoldingFields(['newHoldingModal', 'editHoldingView']),
    ...mapState('globals', ['perPage', 'page'])
  },
  created () {
    HoldingApi.getHolds(this.page, this.perPage).then(res => {
      this.setHoldings(res.data.holdings)
    })
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('pattys', [
      'setHoldings',
      'setNewHoldingModal'
    ]),
    ...mapActions('globals', ['getCountries', 'getBusinessTypes', 'getVatTypes']),
    showNewHoldingModal () {
      this.setNewHoldingModal(true)
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

  }

}
</script>
