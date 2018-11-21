<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New Company" class="q-mb-md" @click="showNewHoldingModal()" />
    <companies></companies>
  </div>
</template>

<script type="text/javascript">
<<<<<<< HEAD
import companies from "components/data-table/companies.vue";
import { mapActions, mapStates } from "vuex";
export default {
  computed: {
    page() {
      return this.$store.getters.page;
    },
    perPage() {
      return this.$store.getters.perPage;
    }
  },
  created() {
    this.GET_COUNTRIES();
    this.GET_BUSINESS_TYPES();
    this.GET_VAT_TYPES();
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
=======
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
>>>>>>> 959f634c645e080bfdb707d9d3ccbc327b7fb181
    }
  },
  components: {
    companies
  }
<<<<<<< HEAD
};
=======
}

>>>>>>> 959f634c645e080bfdb707d9d3ccbc327b7fb181
</script>
