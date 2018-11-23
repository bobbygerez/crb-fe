<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New User" class="q-mb-md" @click="showNewHoldingModal()" />
    <users></users>
  </div>
</template>

<script type="text/javascript">
import users from 'components/data-table/users.vue'
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('pattys', ['page', 'perPage'])
  },
<<<<<<< HEAD
  created() {
    this.GET_COUNTRIES();
    this.civilStatus();
    this.genders();
  },
  methods: {
    ...mapActions("globals", [
      "GET_COUNTRIES",
      "GET_REGIONS",
      "GET_PROVINCES",
      "GET_CITIES",
      "GET_BRGYS"
    ]),
    ...mapActions('users', ['civilStatus', 'genders'])
=======
  created () {
    this.getCountries()
    this.getBusinessTypes()
    this.getVatTypes()
  },
  methods: {
    ...mapActions('globals', [
      'getBusinessTypes',
      'getVatTypes',
      'getCountries',
      'getRegions',
      'getProvinces',
      'getCities',
      'getBrgys'
    ]),
    ...mapActions('pattys', 'setNewHoldingModal'),
    showNewHoldingModal () {
      this.setNewHoldingModal(true)
    }
>>>>>>> ccf25cf5dff7c93b6e56b214e9c7d8a8e9e34437
  },
  components: {
    users
  }
}
</script>
