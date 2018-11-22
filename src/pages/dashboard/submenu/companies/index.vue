<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New Company" class="q-mb-md" @click="showNewHoldingModal()" />
    <companies></companies>
  </div>
</template>

<script type="text/javascript">
import companies from "components/data-table/companies.vue";
import { mapActions, mapStates } from "vuex";
export default {
  computed: {
    page() {
      return this.$store.getters['pattys/page'];
    },
    perPage() {
      return this.$store.getters['pattys/perPage'];
    }
  },
  created() {
    this.GET_COUNTRIES();
    this.GET_BUSINESS_TYPES();
    this.GET_VAT_TYPES();
    this.getHoldings();
  },
  methods: {
    ...mapActions("globals", [
      "GET_BUSINESS_TYPES",
      "GET_VAT_TYPES",
      "GET_COUNTRIES",
      "GET_REGIONS",
      "GET_PROVINCES",
      "GET_CITIES",
      "GET_BRGYS"
    ]),
    showNewHoldingModal() {
      this.$store.dispatch("newHoldingModal", true);
    },
    getHoldings(){
      this.$axios.get('/holdings?page=' + this.page + '&perPage=' + this.perPage)
        .then(res => {
          this.$store.dispatch('pattys/holdings', res.data.holdings)
        })
    }
  },
  components: {
    companies
  }
};
</script>
