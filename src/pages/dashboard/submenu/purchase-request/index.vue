<template>
<div class="q-pa-sm">
    <items></items>

    <q-page-sticky position="bottom-left" :offset="[16, 16]">
        <q-btn color="primary" @click="showNewPurchasRequestModal()">
            <q-icon name="add"></q-icon>New Purchase Request
        </q-btn>
    </q-page-sticky>
</div>
</template>

<script>
import items from 'components/data-table/purchase-request.vue'
export default {
    created() {
        this.packages()
    },
    methods: {
        packages() {
            this.$axios.get('packages-all')
                .then(res => {
                    this.$store.dispatch('items/packages', res.data.packages)
                });
        },
        showNewPurchasRequestModal() {
            this.$store.dispatch('purchaseRequests/purchaseRequest', {
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
            this.$store.dispatch('purchaseRequests/newPurchaseRequestModal', true)
        }
    },
    components: {
        items
    }
}
</script>
