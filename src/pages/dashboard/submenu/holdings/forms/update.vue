<template>
  <q-page class="q-mx-lg">
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
                <form-field-validator :validate="$v.editHolding.name">
                  <q-input
                    @input="$v.editHolding.name.$touch"
                    :error="$v.editHolding.name.$error"
                    v-model="editHolding.name"
                    float-label="Holding name *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.editHolding.business_info.business_type_id">
                  <q-select
                    @input="$v.editHolding.business_info.business_type_id.$touch"
                    :error="$v.editHolding.business_info.business_type_id.$error"
                    v-model="editHolding.business_info.business_type_id"
                    :options="bizTypeOptions"
                    float-label="Business Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.editHolding.business_info.vat_type_id">
                  <q-select
                    @input="$v.editHolding.business_info.vat_type_id.$touch"
                    :error="$v.editHolding.business_info.vat_type_id.$error"
                    v-model="editHolding.business_info.vat_type_id"
                    :options="vatTypeOptions"
                    float-label="Vat Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.editHolding.business_info.telephone">
                  <q-input
                    @input="$v.editHolding.business_info.telephone.$touch"
                    :error="$v.editHolding.business_info.telephone.$error"
                    v-model="editHolding.business_info.telephone"
                    float-label="Telephone *"
                    type="number"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.editHolding.business_info.email">
                  <q-input
                    @input="$v.editHolding.business_info.email.$touch"
                    :error="$v.editHolding.business_info.email.$error"
                    v-model="editHolding.business_info.email"
                    float-label="Email"
                    type="email"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <q-input
                  v-model="editHolding.business_info.tin"
                  float-label="TIN"
                  clearable
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="editHolding.business_info.website"
                  float-label="Website"
                  clearable
                />
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.editHolding.desc">
                  <q-input
                    @input="$v.editHolding.desc.$touch"
                    :error="$v.editHolding.desc.$error"
                    v-model="editHolding.desc"
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
                <form-field-validator :validate="$v.editHolding.address.country_id">
                  <q-select
                    @input="$v.editHolding.address.country_id.$touch"
                    :error="$v.editHolding.address.country_id.$error"
                    v-model="editHolding.address.country_id"
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
                <form-field-validator :validate="$v.editHolding.address.region_id">
                  <q-select
                    @input="$v.editHolding.address.region_id.$touch"
                    :error="$v.editHolding.address.region_id.$error"
                    v-model="editHolding.address.region_id"
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
                <form-field-validator :validate="$v.editHolding.address.province_id">
                  <q-select
                    @input="$v.editHolding.address.province_id.$touch"
                    :error="$v.editHolding.address.province_id.$error"
                    v-model="editHolding.address.province_id"
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
                <form-field-validator :validate="$v.editHolding.address.city_id">
                  <q-select
                    @input="$v.editHolding.address.city_id.$touch"
                    :error="$v.editHolding.address.city_id.$error"
                    v-model="editHolding.address.city_id"
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
                <form-field-validator :validate="$v.editHolding.address.brgy_id">
                  <q-select
                    @input="$v.editHolding.address.brgy_id.$touch"
                    :error="$v.editHolding.address.brgy_id.$error"
                    v-model="editHolding.address.brgy_id"
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
                <form-field-validator :validate="$v.editHolding.address.street_lot_blk">
                  <q-input
                    @input="$v.editHolding.address.street_lot_blk.$touch"
                    :error="$v.editHolding.address.street_lot_blk.$error"
                    v-model="editHolding.address.street_lot_blk"
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
          <div class="row col-12 justify-center">
            <div class="col-12">
              <f-v-error-summary
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
                @click="update(editHolding.id)"
                label="Update"
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
import { required, email, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import FVErrorSummary from 'components/form-validations/FVErrorSummary'
import FVFieldValidator from 'components/form-validations/FVFieldValidator'
import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'
import LocationMixin from 'components/mixins/location-mixin'
import CommonsMixin from 'components/mixins/commons-mixin'
import { mapActions } from 'vuex'
import { editHoldingFormValidationRule } from 'assets/models/Holding'
import FormFieldValidator from 'components/form-validations/FormFieldValidator'

export default {
  mixins: [LocationMixin, CommonsMixin],
  components: {
    BarangayTable,
    CityTable,
    FVErrorSummary,
    FVFieldValidator,
    FormFieldValidator
  },
  data () {
    return {
      addressType: 'home'
    }
  },
  computed: {
    ...mapHoldingFields(['editHolding', 'editHoldingView'])
  },
  validations () {
    // editHolding: {
    //   name: { required }
    // }
    // some condition or whatever
    return {
      editHolding: editHoldingFormValidationRule(required, email, numeric, minLength, maxLength, () => true)
    }
  },
  methods: {
    ...mapActions('pattys', ['setHoldings']),
    locationSelected (loc, where) {
      if (loc) {
        this.editHolding.address.country_id = loc.region.country.id
        this.editHolding.address.region_id = loc.region.id
        this.editHolding.address.province_id = loc.province.id
        this.editHolding.address.city_id = loc.city.id
        this.editHolding.address.brgy_id = loc.id
        this.editHolding.address.street_lot_blk = this.editHolding.address.street_lot_blk
      }
    },
    update (id) {
      this.$v.editHolding.$touch()
      if (this.$v.editHolding.$error) {
        console.log('validations => ', this.$v)
        return
      }
      this.$axios
        .put(`/holdings/${this.editHolding.id}`, {
          id: this.editHolding.id,
          name: this.editHolding.name,
          desc: this.editHolding.desc,
          country_id: this.editHolding.address.country_id,
          region_id: this.editHolding.address.region_id,
          province_id: this.editHolding.address.province_id,
          city_id: this.editHolding.address.city_id,
          brgy_id: this.editHolding.address.brgy_id,
          street_lot_blk: this.editHolding.address.street_lot_blk,
          business_type_id: this.editHolding.business_info.business_type_id,
          vat_type_id: this.editHolding.business_info.vat_type_id,
          telephone: this.editHolding.business_info.telephone,
          tin: this.editHolding.business_info.tin,
          email: this.editHolding.business_info.email,
          website: this.editHolding.business_info.website
        })
        .then(res => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.editHolding.name} update successfully`
          })
          this.$router.replace('/dashboard/holdings')
        })
        .catch()
    }
  },
  mounted () {
    console.log('edit route', this.$route)
    console.log('localModel => ', this.localModel)
    // important to set localmodel for the address watchers
    this.localModel = this.editHolding
    console.log('localModel set => ', this.localModel)
  }
}
</script>

<style>
</style>
