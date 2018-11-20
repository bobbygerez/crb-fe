<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New Company" class="q-mb-md" @click="showNewHoldingModal()" />
    <companies></companies>
  </div>
</template>

<script type="text/javascript">
import companies from 'components/data-table/companies.vue'
export default {

  created () {
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters['pattys/token']}`
    this.$store.dispatch('globals/GET_COUNTRIES')
    this.getCompanies()
    // this.$store.dispatch('GET_BUSINESS_TYPES')
    // this.$store.dispatch('GET_VAT_TYPES')
  },
  methods: {
    getCompanies () {
      // let data = this
    },
    showNewHoldingModal () {
      this.$store.dispatch('newHoldingModal', true)
    }
  },
  components: {
    companies
  }
}

</script>
