<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label=" New Holding" class="q-mb-md" @click="showNewHoldingModal()" />
    <holdings></holdings>
  </div>
</template>

<script type="text/javascript">
import holdings from 'components/data-table/holdings.vue'
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
    let data = this
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters['pattys/token']}`
    this.$axios.get(process.env.API + '/holdings?page=' + this.page + '&perPage=' + this.perPage)
      .then(function (res) {
        data.$store.dispatch('pattys/holdings', res.data.holdings)
      })
    this.$store.dispatch('pattys/GET_COUNTRIES')
    this.$store.dispatch('pattys/GET_BUSINESS_TYPES')
    this.$store.dispatch('pattys/GET_VAT_TYPES')
  },
  methods: {
    showNewHoldingModal () {
      this.$store.dispatch('newHoldingModal', true)
    }
  },
  components: {
    holdings
  }
}

</script>
