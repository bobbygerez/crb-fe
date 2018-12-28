<template>
<div class="q-pa-sm">
    <items></items>

    <q-page-sticky position="bottom-left" :offset="[16, 16]" v-if="purchaseRequest.approved_by == null">
        <q-btn color="primary" @click="showNewPurchaseItemModal()">
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
        showNewPurchaseItemModal() {
            this.$store.dispatch('purchaseRequests/purchaseItem', {
                name: '',
                pivot: {
                    vendorable_type: ''
                },
                items: [{
                    purchases: [{
                        pivot: {
                            price: 0,
                            qty: 0,
                            freight: 0,
                            date_delivery: ''
                        }
                    }],
                    package: {
                        name: ''
                    },
                    name: ''
                }]
            });
            this.$store.dispatch('purchaseRequests/newPurchaseItemModal', true)
        }
    },
    components: {
        items
    },
    created(){
        this.$axios.get(`modelable-user-models?modelType=App\\Model\\Item`)
                .then(res => {
                    this.$store.dispatch('purchaseRequests/itemLists', res.data.userModels)
                })
    }
}
</script>
