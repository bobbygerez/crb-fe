<template>
  <div class="q-pa-sm">
    <item-vendors></item-vendors>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showVendorableModal()"
      >
        <q-icon name="add"></q-icon>Add Vendor
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import itemVendors from 'components/data-table/item-vendors.vue'
import { mapState } from 'vuex'
export default {
  components: {
    itemVendors
  },
  computed: {
    ...mapState('items', ['item'])
  },
  methods: {
    showVendorableModal () {
      this.$store.dispatch('vendorables/vendorableModal', true)
      this.$store.dispatch('vendorables/vendorable', {
        item_id: this.item.id,
        dis_percentage: '',
        end_date: '',
        price: 0,
        rank: '',
        remarks: '',
        start_date: '',
        vendorable_id: '',
        vendorable_type: '',
        volume: ''
      })
    }
  }
}
</script>
