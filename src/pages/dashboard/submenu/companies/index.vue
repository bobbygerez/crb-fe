<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New Company" class="q-mb-md" @click="showNewHoldingModal()" />
    <companies></companies>
  </div>
</template>

<script type="text/javascript">
import companies from 'components/data-table/companies.vue'
export default {
  computed: {
    page () {
      return this.$store.getters.page
    },
    perPage () {
      return this.$store.getters.perPage
    }
  },
  created () {
    this.$store.dispatch('companies/GET_COMPANIES')
    this.$store.dispatch('GET_COUNTRIES')
    this.$store.dispatch('GET_BUSINESS_TYPES')
    this.$store.dispatch('GET_VAT_TYPES')
  },
  methods: {
    showNewHoldingModal () {
      this.$store.dispatch('newHoldingModal', true)
    }
  },
  components: {
    companies
  }
}

</script>
