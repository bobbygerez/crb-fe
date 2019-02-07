<template>
  <div class="q-pa-sm">
    <accounting-standards></accounting-standards>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="newAccountingStandard()"
      >
        <q-icon name="add"></q-icon>New Accounting Standard
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import accountingStandards from 'components/data-table/accounting-standards.vue'
export default {

  methods: {

    newAccountingStandard () {
      this.$store.dispatch('accountingStandards/newAccountingStandard', true)
      this.$store.dispatch('accountingStandards/accountingStandard', {
        name: '',
        mask: ''
      })
    }
  },
  components: {
    accountingStandards
  }
}
</script>
