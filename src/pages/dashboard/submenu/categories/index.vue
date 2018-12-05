<template>
  <div class="q-pa-sm">
    <categories></categories>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <!-- <q-btn
        color="primary"
        @click="showNewBranchModal()"
      >
        <q-icon name="add"></q-icon>New Class
      </q-btn> -->
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import categories from 'components/data-table/categories.vue'
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
    categories
  }
}
</script>
