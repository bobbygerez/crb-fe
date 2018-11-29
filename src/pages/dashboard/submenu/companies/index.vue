<template>
  <div class="q-pa-sm">
    <q-btn
      color="positive"
      label="New Company"
      class="q-mb-md"
      @click="showNewHoldingModal()"
    />
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
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('globals', [
      'getBusinessTypes',
      'getVatTypes',
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities',
      'getBrgys'
    ]),
    showNewHoldingModal () {
      this.$store.dispatch('setNewHoldingModal', true)
    }
  },
  components: {
    companies
  }
}
</script>
