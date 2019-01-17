<template>
<div class="q-pa-sm">
    <entities-transactions ref="transType"></entities-transactions >
</div>
</template>

<script>
import entitiesTransactions from 'components/data-table/entities-transactions.vue'

export default {
    components: {
        entitiesTransactions
    }
}
</script>
