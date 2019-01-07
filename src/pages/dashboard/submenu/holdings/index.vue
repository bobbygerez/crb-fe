<template>
  <div
    class="q-pa-md"
    ref="tableContainer"
  >
    <q-page>
      <q-scroll-observable @scroll="hasScrolled" />
      <holdings-table
      @edit-data="doEdit"
      />
      <rounded-action-fab
        @fab-click="$router.push(currentRoute + '/add')"
        label="New Holding"
        :show="showFab"
      />
    </q-page>
  </div>
</template>

<script>
import HoldingsTable from './tables/holdings.vue'
import IndexMixin from 'components/mixins/index-mixin'
import RoundedActionFab from 'components/actions-generic/rounded-action-fab'
import { mapHoldingFields } from '../../../../store/pattys'

export default {
  // see index mixin, includes the common functionalities of an index file
  mixins: [IndexMixin],
  data () {
    return {
      currentRoute: this.$route.path.replace('/dashboard', '.')
    }
  },
  components: {
    HoldingsTable,
    RoundedActionFab
  },
  computed: {
    ...mapHoldingFields(['editHolding'])
  },
  methods: {
    doEdit (data) {
      console.log('doEdit', data)
      this.editHolding = data.holding
      this.$router.push(`${this.$route.path}/${data.holding.id}/edit`)
    }
  }
}
</script>
