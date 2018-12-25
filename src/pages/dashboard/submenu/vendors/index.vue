<template>
  <div class="q-pa-sm">
    <vendors></vendors>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewBranchModal()"
      >
        <q-icon name="add"></q-icon>New Franchisee
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import vendors from 'components/data-table/vendors.vue'
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
    showNewBranchModal () {
      this.$store.dispatch('branches/newBranchModal', true)

      this.$store.dispatch('branches/branch', {
        address: {
          country_id: null,
          region_id: null,
          province_id: null,
          city_id: null,
          brgy_id: null,
          street_lot_blk: null
        },
        business_info: {
          business_type_id: null,
          vat_type_id: null
        },
        name: null,
        desc: null
      })
    }
  },
  components: {
    vendors
  }
}
</script>
