<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="add_circle" color="grey" /> {{ branch.name }}
            </p>
        </div>
        <div class="col-6">
            <q-input outlined v-model="branch.name" label="Name" class="q-ma-sm" />
        </div>
        <div class="col-6">
            <q-input outlined v-model="branch.initial" label="Initial" class="q-ma-sm" />
        </div>
        <div class="col-6">
            <q-input outlined v-model="branch.tel" label="Tel. #" class="q-ma-sm" />
        </div>
        <div class="col-6">
            <q-input outlined v-model="branch.code" label="Branch Code" class="q-ma-sm" />
        </div>
        <div class="col-4">
            <q-select outlined v-model="branch.address.province_id" :options="provinces" label="Province" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-4">
            <q-select outlined v-model="branch.address.city_id" :options="cities" label="City" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-4">
            <q-select outlined v-model="branch.address.brgy_id" :options="brgys" label="Brgys" class="q-ma-sm" use-chips emit-value />
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="branch.address.street_lot_blk" label="Blk, Lot and Street No." class="q-ma-sm"/>
        </div>
    </div>
</div>
</template>

<script>
import {
  required,
  numeric
} from 'vuelidate/lib/validators'
import {
  mapState,
  mapActions
} from 'vuex'
import { find } from 'lodash'
export default {
  validations: {
    chartAccount: {
      name: {
        required

      },
      account_code: {
        required,
        numeric
      },
      account_display: {
        required

      },
      taccount_id: {
        required
      }
    }
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
    selectedProvince: {
      get () {
        return find(this.editProvinces, {
          value: this.editUser.address.province_id
        })
      },
      set (val) {
        this.setEditProvinceId(val)
        this.getCities(val)
      }
    }

  },
  methods: {
    ...mapActions('chartAccounts', ['setChartAccount', 'setParentAccount', 'setChartAccounts']),
    ...mapActions('provinces', ['setProvinces']),
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
        this.$axios.post(`chart_accounts`, {
          taccount_id: this.chartAccount.taccount_id.value,
          parent_code: this.selectedChartAccount,
          name: this.chartAccount.name,
          account_code: this.chartAccount.account_code,
          account_display: this.chartAccount.account_display
        }).then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.chartAccount.name} created successfully.`
          })
          this.getChartAccounts()
          this.setChartAccount({
            name: '',
            account_code: '',
            account_display: '',
            remarks: '',
            taccount_id: ''
          })
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
