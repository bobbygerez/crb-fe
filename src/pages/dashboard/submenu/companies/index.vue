<template>
  <div class="q-pa-md" ref="tableContainer">
    <q-page>
      <q-scroll-observable @scroll="hasScrolled" />
      <company-table
        ref="holdingTable"
        @edit-data="doEdit"
      />
      <rounded-action-fab
        @fab-click="$router.push(currentRoute + '/add')"
        label="New Company"
        :show="showFab"
      />
    </q-page>
  </div>
</template>

<script>
// import companies from 'components/data-table/companies.vue'
import CompanyTable from './tables/companies'
import IndexMixin from 'components/mixins/index-mixin'
import RoundedActionFab from 'components/actions-generic/rounded-action-fab'

export default {
  mixins: [IndexMixin],
  data () {
    return {
      currentRoute: this.$route.path.replace('/dashboard', '.')
    }
  },
  created () {
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    doEdit () {
    }
  },
  components: {
    CompanyTable,
    RoundedActionFab
  }
}
</script>
