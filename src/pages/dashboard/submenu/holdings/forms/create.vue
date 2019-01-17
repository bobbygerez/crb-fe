<template>
  <q-page class="q-mx-lg q-pb-lg">
    <form>
      <div class="row gutter-md q-pt-lg">
        <!-- <div class="q-display-1 q-mb-md">Edit {{ holding.name }}</div> -->
        <div class="column col-12 col-lg-6">
          <q-card class="q-pa-lg">
            <q-card-title>
              <!-- <p class="caption"> -->
              Holding Info
              <!-- </p> -->
            </q-card-title>
            <q-card-separator />
            <div class="row">
              <div class="col-12">
                <!-- <form-field-validator :validate="$v.newHolding.name"> -->
                <form-field-validator
                  :field-name="'Holding name'"
                  :async-error-message="serverErrorResponse ? serverErrorResponse.name.map(v=>v).join(' ') : ''"
                  :validate="$v.newHolding.name"
                >
                  <q-input
                    @input="$v.newHolding.name.$touch"
                    :error="$v.newHolding.name.$error"
                    v-model="newHolding.name"
                    float-label="Holding name *"
                    clearable
                  />
                </form-field-validator>
                <!-- </form-field-validator> -->
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.business_info.business_type_id">
                  <q-select
                    @input="$v.newHolding.business_info.business_type_id.$touch"
                    :error="$v.newHolding.business_info.business_type_id.$error"
                    v-model="newHolding.business_info.business_type_id"
                    :options="bizTypeOptions"
                    float-label="Business Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.business_info.vat_type_id">
                  <q-select
                    @input="$v.newHolding.business_info.vat_type_id.$touch"
                    :error="$v.newHolding.business_info.vat_type_id.$error"
                    v-model="newHolding.business_info.vat_type_id"
                    :options="vatTypeOptions"
                    float-label="Vat Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.business_info.telephone">
                  <q-input
                    @input="$v.newHolding.business_info.telephone.$touch"
                    :error="$v.newHolding.business_info.telephone.$error"
                    v-model="newHolding.business_info.telephone"
                    float-label="Telephone *"
                    type="number"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.business_info.email">
                  <q-input
                    @input="$v.newHolding.business_info.email.$touch"
                    :error="$v.newHolding.business_info.email.$error"
                    v-model="newHolding.business_info.email"
                    float-label="Email *"
                    type="email"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.business_info.tin">
                  <q-input
                    @input="$v.newHolding.business_info.tin.$touch"
                    :error="$v.newHolding.business_info.tin.$error"
                    v-model="newHolding.business_info.tin"
                    float-label="TIN *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <q-input
                  v-model="newHolding.business_info.website"
                  float-label="Website"
                  clearable
                />
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.desc">
                  <q-input
                    @input="$v.newHolding.desc.$touch"
                    :error="$v.newHolding.desc.$error"
                    v-model="newHolding.desc"
                    float-label="Description *"
                    :type="$q.screen.gt.md ? 'textarea' : 'text'"
                    :max-height="$q.screen.gt.md ? 100 : 0"
                    :rows="$q.screen.gt.md ? 2 : 1"
                  />
                </form-field-validator>
              </div>
            </div>
          </q-card>
        </div>
        <div class="column col-12 col-lg-6">
          <q-card class="q-pa-lg">
            <q-card-title>
              <!-- <p class="caption"> -->
              Address Info
              <!-- </p> -->
            </q-card-title>
            <q-card-separator />
            <div class="relative-position row gutter-sm">
              <!-- <div class="row gutter-sm"> -->
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.country_id">
                  <q-select
                    @input="$v.newHolding.address.country_id.$touch"
                    :error="$v.newHolding.address.country_id.$error"
                    v-model="newHolding.address.country_id"
                    :options="countryOptions"
                    float-label="Country *"
                    clearable
                    filter
                    filter-placeholder="Select Country"
                    autofocus-filter
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.region_id">
                  <q-select
                    @input="$v.newHolding.address.region_id.$touch"
                    :error="$v.newHolding.address.region_id.$error"
                    v-model="newHolding.address.region_id"
                    :options="regionOptions"
                    float-label="Region *"
                    clearable
                    filter
                    filter-placeholder="Select Region"
                    autofocus-filter
                  />
                </form-field-validator>
              </div>
              <!-- </div> -->
              <!-- <div class="row gutter-sm"> -->
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.province_id">
                  <q-select
                    @input="$v.newHolding.address.province_id.$touch"
                    :error="$v.newHolding.address.province_id.$error"
                    v-model="newHolding.address.province_id"
                    :options="provinceOptions"
                    float-label="Province *"
                    clearable
                    filter
                    filter-placeholder="Select Province"
                    autofocus-filter
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.city_id">
                  <q-select
                    @input="$v.newHolding.address.city_id.$touch"
                    :error="$v.newHolding.address.city_id.$error"
                    v-model="newHolding.address.city_id"
                    :options="cityOptions"
                    float-label="City *"
                    clearable
                    filter
                    filter-placeholder="Select City"
                    autofocus-filter
                    :after="[{
                        icon: 'mdi-magnify',
                        handler () {
                          addressType = 'present'
                          $refs.cityTable.show()
                          // do something
                        }
                      }
                    ]"
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.brgy_id">
                  <q-select
                    @input="$v.newHolding.address.brgy_id.$touch"
                    :error="$v.newHolding.address.brgy_id.$error"
                    v-model="newHolding.address.brgy_id"
                    :options="brgyOptions"
                    float-label="Barangay *"
                    clearable
                    filter
                    filter-placeholder="Select Barangay"
                    autofocus-filter
                    :after="[
                  {
                    icon: 'mdi-magnify',
                    handler () {
                      addressType = 'present'
                      $refs.barangayTable.show()
                      // do something
                    }
                  }
                ]"
                  />
                </form-field-validator>
              </div>
              <!-- </div> -->
              <q-inner-loading :visible="addressInnerLoading">
                <component
                  :is="`q-spinner-${$q.platform.is === 'ios' ? 'ios' : 'mat'}`"
                  size="30px"
                  color="secondary"
                />
              </q-inner-loading>
              <div class="col-12">
                <form-field-validator :validate="$v.newHolding.address.street_lot_blk">
                  <q-input
                    @input="$v.newHolding.address.street_lot_blk.$touch"
                    :error="$v.newHolding.address.street_lot_blk.$error"
                    v-model="newHolding.address.street_lot_blk"
                    float-label="Block, Lot &amp; Street"
                    :type="$q.screen.gt.sm ? 'textarea' : 'text'"
                    :max-height="$q.screen.gt.sm ? 100 : 0"
                    :rows="$q.screen.gt.sm ? 2 : 1"
                  />
                </form-field-validator>
              </div>
            </div>
          </q-card>
        </div>

        <div class="row col-12">
          <div class="row col-12 justify-center q-pb-md">
            <div class="col-12">
              <form-validation-summary
                :async-error-message="serverErrorResponse ? Object.keys(serverErrorResponse).map(v=> serverErrorResponse[v]).join(' ') : ''"
                :validations="$v"
                class="q-my-sm"
              />
            </div>
            <div class="column">
              <q-btn
                color="negative"
                flat
                v-close-overlay
                label="Cancel"
                @click="$router.replace('/dashboard/holdings')"
              />
            </div>
            <div class="column">
              <q-btn
                color="primary"
                @click="create"
                label="Submit"
                class="q-ml-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <barangay-table
      ref="barangayTable"
      :params="addressType"
      @barangay-location-selected="locationSelected"
    />
    <city-table
      ref="cityTable"
      :params="addressType"
      @city-location-selected="locationSelected"
    />
  </q-page>
</template>

<script>
import { mapHoldingFields } from '../../../../../store/pattys'
import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'
import LocationMixin from 'components/mixins/location-mixin'
import CommonsMixin from 'components/mixins/commons-mixin'
import { newHoldingFormValidationRule } from '../model/Holding'
import FormFieldValidator from 'components/form-validations/FormFieldValidator'
import FormValidationSummary from 'components/form-validations/FormValidationSummary'
import AsyncValidationMixin from 'components/mixins/async-validation-mixin'
import { debounce } from 'quasar'

export default {
  mixins: [LocationMixin, CommonsMixin, AsyncValidationMixin],
  components: {
    BarangayTable,
    CityTable,
    FormFieldValidator,
    FormValidationSummary
  },
  data () {
    return {
      addressType: 'home'
    }
  },
  computed: {
    ...mapHoldingFields(['newHolding', 'newHoldingModal', 'serverResponseMessage'])
  },
  validations () {
    return {
      newHolding: newHoldingFormValidationRule()
    }
  },
  methods: {
    debouncedFunction: debounce(function (value) {
      console.log('debounce', value)
      this.$v.newHolding.name.$model = value
    }, 500),
    locationSelected (loc, where) {
      if (loc) {
        this.newHolding.address.country_id = loc.region.country.id
        this.newHolding.address.region_id = loc.region.id
        this.newHolding.address.province_id = loc.province.id
        this.newHolding.address.city_id = loc.city.id
        this.newHolding.address.brgy_id = loc.id
        this.newHolding.address.street_lot_blk = this.newHolding.address.street_lot_blk
      }
    },
    create () {
      this.$v.newHolding.$touch()
      if (this.$v.newHolding.$error) {
        return
      }
      console.log('validations =>', this.$v.newHolding)
      this.$axios
        .post(`/holdings`, {
          // id: this.newHolding.id,
          name: this.newHolding.name,
          desc: this.newHolding.desc,
          country_id: this.newHolding.address.country_id,
          region_id: this.newHolding.address.region_id,
          province_id: this.newHolding.address.province_id,
          city_id: this.newHolding.address.city_id,
          brgy_id: this.newHolding.address.brgy_id,
          street_lot_blk: this.newHolding.address.street_lot_blk,
          business_type_id: this.newHolding.business_info.business_type_id,
          vat_type_id: this.newHolding.business_info.vat_type_id,
          telephone: this.newHolding.business_info.telephone,
          tin: this.newHolding.business_info.tin,
          email: this.newHolding.business_info.email,
          website: this.newHolding.business_info.website
        })
        .then(res => {
          this.$q.notify({
            type: 'positive',
            message: res.data.message // `${this.newHolding.name} Successfully added.`
          })
          this.$router.replace('/dashboard/holdings')
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: err.response
              ? Object.keys(err.response.data.message).map(v => err.response.data.message[v]).join(' ')
              : err.message
          })
        })
    }
  },
  mounted () {
    console.log('validations rules', this.$holdingRule)
    console.log('validations rules', this.newHolding)
    // set localmodel that will be used by mixins
    this.localModel = this.newHolding
  }
}
</script>

<style>
</style>
