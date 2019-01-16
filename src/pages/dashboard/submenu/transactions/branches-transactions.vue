<template>
<div class="q-pa-sm">
    <branches-transactions ref="transType"></branches-transactions >
</div>
</template>

<script>
import branchesTransactions from 'components/data-table/branches-transactions.vue'

export default {
    components: {
        branchesTransactions
    }
}
</script>
