<template>
  <div class="q-pa-sm">
    <items></items>

<<<<<<< HEAD
    <q-page-sticky position="bottom-left" :offset="[16, 16]" v-if="purchaseRequest.approved_by == null">
        <q-btn color="primary" @click="showNewPurchaseItemModal()">
            <q-icon name="add"></q-icon>New Item
        </q-btn>
=======
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showItemModal()"
      >
        <q-icon name="add"></q-icon>New Item
      </q-btn>
>>>>>>> develop-ren
    </q-page-sticky>
  </div>
</template>

<script>
import items from 'components/data-table/purchase-items.vue'
import {
    mapState
} from 'vuex'
export default {
<<<<<<< HEAD
    computed: {
        ...mapState('purchaseRequests', ['purchaseRequest'])
    },
    methods: {
        showNewPurchaseItemModal() {
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

            });
            this.$store.dispatch('purchaseRequests/newPurchaseItemModal', true)
        }
    },
    components: {
        items
=======
  created () {
    this.packages()
  },
  methods: {
    packages () {
      this.$axios.get('packages-all')
        .then(res => {
          this.$store.dispatch('items/packages', res.data.packages)
        })
    },
    showItemModal () {
      this.$store.dispatch('items/item', {
        name: '',
        sku: '',
        barcode: '',
        desc: '',
        price: 0,
        qty: '',
        package_id: null,
        minimum: '',
        maximum: '',
        reorder_level: ''
      })
      this.$store.dispatch('items/newItemModal', true)
>>>>>>> develop-ren
    }
  },
  components: {
    items
  }
}
</script>
