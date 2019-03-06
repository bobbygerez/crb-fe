<template>
<div class="q-ma-sm">
    <div class="col-12">
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
            <q-step :name="1" title="Billing Information" caption="Required" icon="place" :done="step > 1">
                <div class="row">
                    <div class="col-4">
                        <q-input v-model="user.fullname" label="Fullname" class="q-ma-sm" outlined/>
                        <q-input v-model="user.mobile" label="Mobile Number" class="q-ma-sm" outlined/>
                        <q-input v-model="user.notes" label="Notes" type="textarea" class="q-ma-sm" outlined/>
                    </div>

                    <div class="col-8">
                        <q-select v-model="selectedProvince" :options="provinces" label="Province" class="q-ma-sm" emit-value outlined/>
                        <q-select v-model="selectedCity" :options="cities" label="Cities" class="q-ma-sm" emit-value outlined/>
                        <q-select v-model="selectedBrgy" :options="brgys" label="Barangay" class="q-ma-sm" emit-value outlined/>
                        <q-input type="textarea" v-model="user.address.street_lot_blk" label="Blk, Lot and Street No." class="q-ma-sm" outlined/>
                    </div>
                </div>
            </q-step>

            <q-step :name="2" title="Shipping Information" icon="place" caption="Required" :done="step > 2">
                <div class="row">
                    <div class="col-4">
                        <q-input v-model="delivery.fullname" label="Fullname" class="q-ma-sm" outlined/>
                        <q-input v-model="delivery.mobile" label="Mobile Number" class="q-ma-sm" outlined/>
                        <q-input v-model="delivery.notes" label="Notes" type="textarea" class="q-ma-sm" outlined/>
                    </div>

                    <div class="col-8">
                        <q-select v-model="selDelProv" :options="provinces" label="Province" class="q-ma-sm" emit-value outlined/>
                        <q-select v-model="selDelCity" :options="delCities" label="Cities" class="q-ma-sm" emit-value outlined/>
                        <q-select v-model="selDelBrgy" :options="delBrgys" label="Barangay" class="q-ma-sm" emit-value outlined/>
                        <q-input type="textarea" v-model="delivery.address.street_lot_blk" label="Blk, Lot and Street No." class="q-ma-sm" outlined/>
                    </div>
                </div>
            </q-step>
            <q-step :name="3" title="Payment" icon="place" caption="Required" :done="step > 3">
                <paypal :amount="totalCart" currency="PHP" :client="credentials" :button-style="buttonStyle" env="sandbox">
                </paypal>
            </q-step>

            <template v-slot:navigation>
                <q-stepper-navigation>
                    <q-btn @click="$refs.stepper.next()" color="negative" :label="step === 3 ? 'Finish' : 'Continue'" v-if="step < 3"/>
                    <q-btn v-if="step > 1" flat color="negative" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </template>
        </q-stepper>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import paypal from 'vue-paypal-checkout'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      step: 1,
      buttonStyle: { label: 'checkout', locale: 'fr_FR', size: 'large', shape: 'rect', color: 'gold' },
      credentials: {
        sandbox: 'Aaru4_ylvmbY5v2SzmWsc8_hwvKmtR5OMhpvgbwdTBY9w0RCaPU-A1x-tIM3pDS2O_zC39Ehv3lWSPza',
        production: 'Adr84wl39OyBFCBn1CgxFLob3vVVLWC6V6L7tg-AFXbIVanKAWHLuWZj580MzrmKjk_z9ypYyKvgdUj3'
      }
    }
  },
  components: {
    paypal
  },
  computed: {
    ...mapState('users', ['token', 'user', 'delivery']),
    totalCart () {
      return String(this.$store.getters['global/totalCart'])
    },
    selDelProv: {
      get () {
        return _.find(this.provinces, {
          value: this.delivery.address.province_id
        })
      },
      set (val) {
        this.setDelProvId(val)
        this.getDelCities(val)
      }
    },
    selectedProvince: {
      get () {
        return _.find(this.provinces, {
          value: this.user.address.province_id
        })
      },
      set (val) {
        this.setProvinceId(val)
        this.getCities(val)
      }
    },
    provinces () {
      return this.$store.getters['global/provinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    selDelCity: {
      get () {
        return _.find(this.delCities, {
          value: this.delivery.address.city_id
        })
      },
      set (val) {
        this.setDelCityId(val)
        this.getDelBrgys(val)
      }
    },
    selectedCity: {
      get () {
        return _.find(this.cities, {
          value: this.user.address.city_id
        })
      },
      set (val) {
        this.setCityId(val)
        this.getBrgys(val)
      }
    },
    delCities () {
      return this.$store.getters['global/delCities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      return this.$store.getters['global/cities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    selDelBrgy: {
      get () {
        return _.find(this.brgys, {
          value: this.delivery.address.brgy_id
        })
      },
      set (val) {
        this.setDelBrgyId(val)
      }
    },
    selectedBrgy: {
      get () {
        return _.find(this.brgys, {
          value: this.user.address.brgy_id
        })
      },
      set (val) {
        this.setBrgyId(val)
      }
    },
    delBrgys () {
      return this.$store.getters['global/brgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      return this.$store.getters['global/brgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    }
  },
  methods: {
    ...mapActions('global', ['setProvinces', 'setCities', 'setBrgys', 'setDelCities', 'setDelBrgys']),
    ...mapActions('users', ['setFullname', 'setMobile', 'setNotes', 'setProvinceId', 'setCityId', 'setBrgyId', 'setStreetLotBlk', 'setDelProvId', 'setDelCityId', 'setDelBrgyId', 'setDelStreetLotBlk']),
    getProvinces () {
      this.$axios.get('/provinces')
        .then(res => {
          this.setProvinces(res.data.provinces)
        })
    },
    getDelCities (provId) {
      this.$axios.get(`/cities/${provId}`)
        .then(res => {
          this.setDelCities(res.data.cities)
        })
    },
    getCities (provId) {
      this.$axios.get(`/cities/${provId}`)
        .then(res => {
          this.setCities(res.data.cities)
        })
    },
    getDelBrgys (cityId) {
      this.$axios.get(`/brgys/${cityId}`)
        .then(res => {
          this.setDelBrgys(res.data.brgys)
        })
    },
    getBrgys (cityId) {
      this.$axios.get(`/brgys/${cityId}`)
        .then(res => {
          this.setBrgys(res.data.brgys)
        })
    }
  },
  mounted () {
    if (this.token === '') {
      this.$router.push('/login')
    }
    this.getProvinces()
    this.getCities(this.user.address.province_id)
    this.getBrgys(this.user.address.city_id)
  },
  watch: {
    'user.fullname' (val) {
      this.setFullname(val)
    },
    'user.mobile' (val) {
      this.setMobile(val)
    },
    'user.notes' (val) {
      this.setNotes(val)
    },
    'user.address.street_lot_blk' (val) {
      this.setStreetLotBlk(val)
    },
    'delivery.address.street_lot_blk' (val) {
      this.setDelStreetLotBlk(val)
    }
  }
}
</script>
