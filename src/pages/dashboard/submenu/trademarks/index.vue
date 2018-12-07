<template>
  <div class="q-pa-sm">
    <trademarks></trademarks>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewTrademarkModal()"
      >
        <q-icon name="add"></q-icon>New trademark
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import trademarks from 'components/data-table/trademarks.vue'
export default {
  
  methods: {
    showNewTrademarkModal () {
      this.$axios.get('user-companies')
        .then( res =>{
          this.$store.dispatch('trademarks/userCompanies', res.data.userCompanies)
          this.$store.dispatch('trademarks/newTrademarkModal', true)
          this.$store.dispatch('trademarks/trademark', {
            company: { id: null },
            name: '',
            desc: ''
          })
        })
      
    }
  },
  components: {
    trademarks
  }
}
</script>
