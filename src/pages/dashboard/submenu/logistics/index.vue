<template>
  <div class="q-pa-sm">
    <logistics></logistics>

    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewLogisticModal()"
      >
        <q-icon name="add"></q-icon>New Logistic
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">

import logistics from 'components/data-table/logistics.vue'
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
    showNewLogisticModal () {
      this.$store.dispatch('logistics/logistic', {
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
      this.$store.dispatch('logistics/newLogisticModal', true)
    }
  },
  components: {
    logistics
  }
}
</script>
