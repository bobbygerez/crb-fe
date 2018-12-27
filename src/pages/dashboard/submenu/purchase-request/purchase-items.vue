<template>
  <div class="q-pa-sm">
    <items></items>

    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
      v-if="purchaseRequest.approved_by == null"
    >
      <q-btn
        color="primary"
        @click="showNewPurchaseItemModal()"
      >
        <q-icon name="add"></q-icon>New Item
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import items from 'components/data-table/purchase-items.vue'
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState('purchaseRequests', ['purchaseRequest'])
  },
  methods: {
    showNewPurchaseItemModal () {
      this.$store.dispatch('purchaseRequests/purchaseItem', {
        name: '',
        purchasable_id: '',
        purchasable_type: '',
        created_at: '',
        purchasable: {
          name: ''
        },
        prepared_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        noted_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        noted_date: '',
        approved_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        approved_date: ''

      })
      this.$store.dispatch('purchaseRequests/newPurchaseItemModal', true)
    }
  },
  components: {
    items
  }
}
</script>
