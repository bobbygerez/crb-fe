<template>
<div class="q-ma-md">
    <generic-branch :branch="branch">
        <q-btn @click="cancel" color="secondary" label="Back" class="q-ma-sm" />
        <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
    </generic-branch>

</div>
</template>

<script>
import genericBranch from 'pages/dashboard/branches/form/generic-branch'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  find
} from 'lodash'
export default {
  components: {
    genericBranch
  },
  computed: {
    ...mapState('branches', ['branch']),
    ...mapState('global', ['page', 'perPage', 'filter']),
    provinces () {
      return this.$store.getters['provinces/provinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      return this.$store.getters['cities/cities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      return this.$store.getters['brgys/brgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    selectedProvince: {
      get () {
        return find(this.provinces, {
          value: this.branch.address.province_id
        })
      },
      set (val) {
        this.setProvinceId(val)
        this.getCities(val)
      }
    },
    selectedCity: {
      get () {
        return find(this.cities, {
          value: this.branch.address.city_id
        })
      },
      set (val) {
        this.setCityId(val)
        this.getBrgys(val)
      }
    },
    selectedBrgy: {
      get () {
        return find(this.brgys, {
          value: this.branch.address.brgy_id
        })
      },
      set (val) {
        this.setBrgyId(val)
      }
    }

  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccount', 'setParentAccount', 'setChartAccounts']),
    ...mapActions('provinces', ['setProvinces']),
    ...mapActions('cities', ['setCities']),
    ...mapActions('brgys', ['setBrgys']),
    ...mapActions('branches', ['setProvinceId', 'setCityId', 'setBrgyId']),
    getProvinces () {
      this.$axios.get('/provinces').then(res => {
        this.setProvinces(res.data.provinces)
      })
    },
    getCities (provId) {
      this.$axios.get(`/cities/${provId}`).then(res => {
        this.setCities(res.data.cities)
      })
    },
    getBrgys (cityId) {
      this.$axios.get(`/brgys/${cityId}`).then(res => {
        this.setBrgys(res.data.brgys)
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    add () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please check the form fields.`
        })
      } else {
        this.$axios.post(`branches`, this.branch).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.branch.name} created successfully.`
          })
          // this.getChartAccounts()
          // this.setChartAccount({
          //   name: '',
          //   account_code: '',
          //   account_display: '',
          //   remarks: '',
          //   taccount_id: ''
          // })
        })
      }
    },
    getParentChartAccount () {
      this.$axios.get(`chart_accounts/create?account_code=${this.selectedChartAccount}`)
        .then(res => {
          this.setParentAccount(res.data.parentAccount)
          this.setTAccounts(res.data.tAccounts)
        })
    }
  },
  mounted () {
    this.getProvinces()
  },
  watch: {
    chartAccount: {
      handler (val) {
        this.setChartAccount(val)
      },
      deep: true
    }
  }
}
</script>
