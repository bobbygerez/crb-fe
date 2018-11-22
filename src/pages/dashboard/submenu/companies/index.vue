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
<<<<<<< HEAD
  created() {
    this.GET_COUNTRIES();
    this.GET_BUSINESS_TYPES();
    this.GET_VAT_TYPES();
=======
  created () {
    this.GET_COUNTRIES()
    this.GET_BUSINESS_TYPES()
    this.GET_VAT_TYPES()
    this.getHoldings()
>>>>>>> 07fc0b55f2cafc831ec870e80b9ce7a8541ea0d9
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
<<<<<<< HEAD
    showNewHoldingModal() {
      this.$store.dispatch("newHoldingModal", true);
=======
    ...mapActions('pattys', ['holdings', 'newHoldingModal']),
    showNewHoldingModal () {
      this.newHoldingModal(true)
    },
    getHoldings () {
      this.$axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.holdings(res.data.holdings)
        })
>>>>>>> 07fc0b55f2cafc831ec870e80b9ce7a8541ea0d9
    }
  },
  components: {
    companies
  }
}
</script>
