<template>
<div class="q-ma-md">
    <div class="row">
        <div class="col-12">
            <p class="text-h5 q-ma-sm">
                <q-icon name="add_circle" color="grey" /> {{ branch.name }}
            </p>
        </div>
        <div class="col-6">
            <q-input outlined v-model="$v.branch.name.$model" label="Name" class="q-ma-sm" :error="$v.branch.name.$dirty&& !$v.branch.name.required" bottom-slots error-message="Branch name is required." />
        </div>
        <div class="col-6">
            <q-input outlined v-model="$v.branch.initial.$model" label="Initial" class="q-ma-sm" :error="$v.branch.initial.$dirty&& !$v.branch.initial.required" bottom-slots error-message="Initial is required." />
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.branch.tel.$model" label="Tel. #" class="q-ma-sm" :error="$v.branch.tel.$dirty&& !$v.branch.tel.required" bottom-slots error-message="Tel. # is required."/>
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.branch.code.$model" label="Branch Code" class="q-ma-sm" :error="$v.branch.code.$dirty&& !$v.branch.code.required" bottom-slots error-message="Branch code is required."/>
        </div>
        <div class="col-4">
            <q-input outlined v-model="$v.branch.bir.$model" label="BIR #" class="q-ma-sm" :error="$v.branch.bir.$dirty&& !$v.branch.bir.required" bottom-slots error-message="BIR is required."/>
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedProvince.$model" :options="provinces" label="Province" class="q-ma-sm" use-chips emit-value :error="$v.selectedProvince.$dirty&& !$v.selectedProvince.required" bottom-slots error-message="Province is required."/>
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedCity.$model" :options="cities" label="City" class="q-ma-sm" use-chips emit-value :error="$v.selectedCity.$dirty&& !$v.selectedCity.required" bottom-slots error-message="City is required."/>
        </div>
        <div class="col-4">
            <q-select outlined v-model="$v.selectedBrgy.$model" :options="brgys" label="Brgys" class="q-ma-sm" use-chips emit-value :error="$v.selectedBrgy.$dirty&& !$v.selectedBrgy.required" bottom-slots error-message="Brgy is required."/>
        </div>
        <div class="col-12">
            <q-input type="textarea" outlined v-model="$v.branch.address.street_lot_blk.$model" label="Blk, Lot and Street No." class="q-ma-sm" :error="$v.branch.address.street_lot_blk.$dirty&& !$v.branch.address.street_lot_blk.required" bottom-slots error-message="Brgy is required."/>
        </div>
    </div>
    <div class="col-12">
        <q-btn @click="cancel" color="secondary" label="Back" class="q-ma-sm" />
        <q-btn @click="add" color="primary" label="Submit" class="q-ma-sm" />
    </div>
</div>
</template>

<script>
import {
  required
} from 'vuelidate/lib/validators'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  find
} from 'lodash'
export default {
  validations: {
    branch: {
      name: {
        required

      },
      initial: {
        required

      },
      tel: {
        required
      },
      code: {
        required
      },
      bir: {
        required
      },
      address: {
        street_lot_blk: {
          required
        }
      }
    },
    selectedProvince: {
      required
    },
    selectedCity: {
      required
    },
    selectedBrgy: {
      required
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
