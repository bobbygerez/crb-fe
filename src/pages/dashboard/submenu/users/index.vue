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
  },
  components: {
    users
  }
}
</script>
