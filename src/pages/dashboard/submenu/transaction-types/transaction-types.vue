<template>
  <div class="q-pa-sm">
    <transaction-types ref="transType"></transaction-types>
    <q-page-sticky
      position="bottom"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        rounded
        fab
        glossy
        icon="add"
        size="lg"
        @click="newTransactionType"
      />
    </q-page-sticky>

  </div>
</template>

<script>
import transactionTypes from 'components/data-table/transaction-types.vue'
export default {
  methods: {
    newTransactionType () {
      this.$store.dispatch('transactionTypes/transactionType', {
        chart_account_id: '',
        name: '',
        company_id: this.$route.params.id,
        desc: ''
      })
      this.$store.dispatch('transactionTypes/newTransactionType', true)
    }
  },
  components: {
    transactionTypes
  }
}
</script>
