<template>
  <div class="q-pa-sm">
    <franchisees></franchisees>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewFranchiseechModal()"
      >
        <q-icon name="add"></q-icon>New Franchisee
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import franchisees from 'components/data-table/franchisees.vue'
import { mapActions } from 'vuex'
export default {
  created () {
    this.getRegions()
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('globals', [
      'getBusinessTypes',
      'getVatTypes',
      'getCountries',
      'getRegions'
    ]),
    showNewFranchiseechModal () {
      this.$store.dispatch('franchisees/newFranchiseeModal', true)
      
      // this.$store.dispatch('franchisees/franchisee', {
      //   address: {
      //     country_id: null,
      //     region_id: null,
      //     province_id: null,
      //     city_id: null,
      //     brgy_id: null,
      //     street_lot_blk: null
      //   },
      //   business_info: {
      //     business_type_id: null,
      //     vat_type_id: null
      //   },
      //   name: null
      // })
    }
  },
  components: {
    franchisees
  }
}
</script>
