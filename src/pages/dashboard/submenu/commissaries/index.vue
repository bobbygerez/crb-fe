<template>
  <div class="q-pa-sm">
    <commissaries></commissaries>

    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewCommissaryModal()"
      >
        <q-icon name="add"></q-icon>New Commissary
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">

import commissaries from 'components/data-table/commissaries.vue'
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
    showNewCommissaryModal () {
      this.$store.dispatch('commissaries/commissary', {
            address: {
                country_id : '',
                region_id : '',
                province_id : '',
                city_id : '',
                brgy_id : '',
                street_lot_blk : ''
            },
            business_info: {
                business_type_id: null,
                vat_type_id: null,
                email: '',
                telephone: '',
                tin: '',
                vat_type_id: '',
                website: ''
            },
            name: null,
            desc: null
        });
      this.$store.dispatch('commissaries/newCommissaryModal', true)
    }
  },
  components: {
    commissaries
  }
}
</script>
