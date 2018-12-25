<template>
<div class="q-pa-sm">
    <items></items>

    <q-page-sticky position="bottom-left" :offset="[16, 16]" v-if="purchaseRequest.approved_by == null">
        <q-btn color="primary" @click="showItemModal()" >
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
    created() {
        this.packages()
    },
    computed: {
        ...mapState('purchaseRequests',['purchaseRequest'])
    },
    methods: {
        packages() {
            this.$axios.get('packages-all')
                .then(res => {
                    this.$store.dispatch('items/packages', res.data.packages)
                });
        },
        showItemModal() {
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
            });
            this.$store.dispatch('items/newItemModal', true)
        }
    },
    components: {
        items
    }
}
</script>
