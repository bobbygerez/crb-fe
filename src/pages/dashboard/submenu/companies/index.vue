<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New Company" class="q-mb-md" @click="showNewHoldingModal()" />
    <companies></companies>
  </div>
</template>

<script type="text/javascript">
import companies from 'components/data-table/companies.vue'
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('pattys', ['page', 'perPage'])
  },
  created () {
    this.GET_COUNTRIES()
    this.GET_BUSINESS_TYPES()
    this.GET_VAT_TYPES()
    this.getHoldings()
  },
  methods: {
    ...mapActions('globals', [
      'GET_BUSINESS_TYPES',
      'GET_VAT_TYPES',
      'GET_COUNTRIES',
      'GET_REGIONS',
      'GET_PROVINCES',
      'GET_CITIES',
      'GET_BRGYS'
    ]),
    ...mapActions('pattys', ['holdings', 'newHoldingModal']),
    showNewHoldingModal () {
      this.newHoldingModal(true)
    },
    getHoldings () {
      this.$axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.holdings(res.data.holdings)
        })
    }
  },
  components: {
    companies
  }
}
</script>
