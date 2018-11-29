<template>
  <div class="q-pa-sm">
    <users></users>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewUser()"
      >
        <q-icon name="add"></q-icon>
        new user
      </q-btn>
    </q-page-sticky>
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
    this.getCivilStatuses()
    this.getGenders()
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
    ...mapActions('users', ['getCivilStatuses', 'getGenders']),
    ...mapActions('pattys', 'setNewHoldingModal'),
    showNewHoldingModal () {
      this.setNewHoldingModal(true)
    },
    showNewUser () {
      this.$store.dispatch('users/setNewUserModal', true)
    }
  },
  components: {
    users
  }
}
</script>
