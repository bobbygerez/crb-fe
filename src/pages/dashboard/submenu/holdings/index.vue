<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label=" New Holding" class="q-mb-md" @click="showNewHoldingModal()" />
    <holdings></holdings>
  </div>
</template>

<script type="text/javascript">
import holdings from 'components/data-table/holdings.vue'
import { mapActions, mapState } from 'vuex'
import { axios } from 'plugins/axios'
import Hold from 'assets/services/holdings/api'
export default {
  computed: {
    ...mapState('globals', ['perPage', 'page'])
  },
  created () {
    Hold.getHolds(this.page, this.perPage).then(res => {
      this.setHoldings(res.data.holdings)
    })
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('pattys', ['setHoldings', 'getBusinessTypes', 'getVatTypes', 'setNewHoldingModal']),
    ...mapActions('globals', ['getCountries']),
    showNewHoldingModal () {
      this.setNewHoldingModal(true)
    },
    getStart () {
      axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.setHoldings(res.data.holdings)
        })
    }
  },
  components: {
    holdings
  }
}

</script>
