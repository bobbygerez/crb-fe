<template>
  <div class="q-pa-sm">
    <q-btn color="positive" label="New User" class="q-mb-md" @click="showNewHoldingModal()" />
    <users></users>
  </div>
</template>

<script type="text/javascript">
import users from "components/data-table/users.vue";
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
  },
  components: {
    users
  }
};
</script>
