<template>
<div class="q-pa-sm">
    <item-vendors></item-vendors>
    <q-page-sticky position="bottom-left" :offset="[16, 16]">
        <q-btn color="primary" @click="showVendorableModal()">
            <q-icon name="add"></q-icon>Add Vendor
        </q-btn>
    </q-page-sticky>
</div>
</template>

<script>
import itemVendors from 'components/data-table/item-vendors.vue'
export default {
    components: {
        itemVendors
    },
    methods: {
        showVendorableModal(){
            this.$store.dispatch('vendorables/vendorableModal', true);
        }
    }
}
</script>
