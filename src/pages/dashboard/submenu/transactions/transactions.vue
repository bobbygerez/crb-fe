<template>
<div class="q-pa-sm">
    <transactions ref="transType"></transactions>
    <q-page-sticky position="bottom" :offset="[16, 16]">
        <q-btn color="primary" rounded fab glossy icon="add" size="lg" @click="newTransactionType" />
    </q-page-sticky>

</div>
</template>

<script>
import transactions from 'components/data-table/transactions.vue'
import {
    mapState
} from 'vuex'

export default {

    methods: {

        newTransactionType() {

            this.$store.dispatch('transactionTypes/transactionType', {
                name: '',
                company_id: this.$route.params.id,
                desc: ''
            });
            this.$store.dispatch('transactionTypes/newTransactionType', true)

        }
    },
    components: {
        transactions
    }
}
</script>
