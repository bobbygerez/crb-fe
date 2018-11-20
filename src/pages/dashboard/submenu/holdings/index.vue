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
    // console.log('')
    // let data = this
    // this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters['pattys/token']}`
    // axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
    //   .then(res => {
    //     this.holdings(res.data.holdings)
    //   })
    // this.getStart()
    Hold.getHolds(this.page, this.perPage).then(res => {
      this.holdings(res.data.holdings)
    })
    this.GET_COUNTRIES()
    this.GET_BUSINESS_TYPES()
    this.GET_VAT_TYPES()
  },
  methods: {
    ...mapActions('pattys', ['holdings', 'GET_BUSINESS_TYPES', 'GET_VAT_TYPES']),
    ...mapActions('globals', ['GET_COUNTRIES']),
    showNewHoldingModal () {
      this.$store.dispatch('newHoldingModal', true)
    },
    getStart () {
      axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.holdings(res.data.holdings)
        })
    }
  },
  components: {
    holdings
  }
}

</script>
