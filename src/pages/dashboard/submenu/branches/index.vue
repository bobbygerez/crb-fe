<template>
  <div class="q-pa-sm">
    <branches></branches>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewBranchModal()"
      >
        <q-icon name="add"></q-icon>New Branch
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import branches from 'components/data-table/branches.vue'
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
      this.$axios.get('/user-companies')
        .then(res => {
          this.$store.dispatch('branches/companies', res.data.userCompanies)
        })
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
    branches
  }
}
</script>
