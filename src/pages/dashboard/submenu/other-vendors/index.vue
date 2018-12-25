<template>
  <div class="q-pa-sm">
    <other-vendors></other-vendors>

    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewOtherModalModal()"
      >
        <q-icon name="add"></q-icon>New Other-Business
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">

import otherVendors from 'components/data-table/other-vendors.vue'
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
    showNewOtherModalModal () {
      this.$store.dispatch('otherVendors/otherVendor', {
        address: {
          country_id: '',
          region_id: '',
          province_id: '',
          city_id: '',
          brgy_id: '',
          street_lot_blk: ''
        },
        business_info: {
          business_type_id: null,
          vat_type_id: null,
          email: '',
          telephone: '',
          tin: '',
          website: ''
        },
        name: null,
        desc: null
      })
      this.$store.dispatch('otherVendors/newOtherVendorModal', true)
    }
  },
  components: {
    otherVendors
  }
}
</script>
