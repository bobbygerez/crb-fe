<template>
  <div
    class="q-pa-md"
    ref="tableContainer"
  >
    <q-page>
      <q-scroll-observable @scroll="hasScrolled" />
      <items></items>
      <rounded-action-fab
        @fab-click="showItemModal()"
        label="New Item"
        :show="showFab"
      />
    </q-page>
  </div>
</template>

<script>
import items from 'components/data-table/items.vue'
import IndexMixin from 'components/mixins/index-mixin'
import RoundedActionFab from 'components/actions-generic/rounded-action-fab'
export default {
  mixins: [IndexMixin],
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
      console.log('called')
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
    }
  },
  components: {
    items,
    RoundedActionFab

  }
}
</script>
