<template>
  <div
    class="q-pa-md"
    ref="tableContainer"
  >
    <q-page>
      <!-- scroll aware for hiding showing fab -->
      <q-scroll-observable @scroll="hasScrolled" />
      <!-- the main table that will be displayed -->
      <holdings-table
        ref="holdingTable"
        @edit-data="doEdit"
      />
      <!-- @edit-data="editHolding = $event.holding; $refs.editModalForm.show()" -->
      <!-- add fab action found at bottom of table -->
      <add-action-fab
        color="primary"
        :show="showFab"
        @fab-click="$router.push(currentRoute + '/add')"
      />
      <!-- @fab-click="$refs.addModalForm.show()" -->
      <!-- new form modal displayed on fab click -->
      <!-- <generic-modal
        :title="'New Holding'"
        ref="addModalForm"
      >
        <new-holding-form />
      </generic-modal>

      <generic-modal
        :title="'Edit Holding'"
        ref="editModalForm"
      >
        <edit-holding-form @updated="$refs.editModalForm.hide();$refs.holdingTable.refreshData();" />
      </generic-modal> -->
    </q-page>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'
// import HoldingApi from './scripts/api'
import HoldingsTable from './tables/holdings.vue'
import NewHoldingForm from './forms/create'
import EditHoldingForm from './forms/update'
import IndexMixin from 'components/mixins/index-mixin'
import AddActionFab from 'components/actions-generic/add-action-fab'
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
    NewHoldingForm,
    HoldingsTable,
    EditHoldingForm,
    AddActionFab
  },
  computed: {
    ...mapHoldingFields(['editHolding'])
  },
  methods: {
    ...mapActions('pattys', ['setHoldings']),
    doEdit (data) {
      console.log('doEdit', data)
      this.editHolding = data.holding
      this.$router.push(`${this.currentRoute}/${data.holding.id}/edit`)
    }
  }
}
</script>
