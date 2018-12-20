<template>
  <q-page class="q-mx-lg row justify-center">
    <form>
      <div
        class="row gutter-md q-pt-lg justify-center"
        style="width:600px; max-width:90vw"
      >
        <!-- <div class="q-display-1 q-mb-md">Edit {{ holding.name }}</div> -->
        <div class="column col-12 col-lg-12">
          <!-- <q-card class="q-pa-lg"> -->
          <!-- <q-card-title> -->
          <p class="caption">Holding Info</p>
          <!-- </q-card-title> -->
          <q-card-separator />
          <div class="row">
            <div class="col-12">
              <f-v-field-validator :val="$v.editHolding.name">
                <q-input
                  @blur="$v.editHolding.name.$touch"
                  :error="$v.editHolding.name.$error"
                  v-model="editHolding.name"
                  float-label="Holding name *"
                  clearable
                />
              </f-v-field-validator>
            </div>
            <div class="col-12">
              <f-v-field-validator :val="$v.editHolding.business_info.business_type_id">
                <q-select
                  @blur="$v.editHolding.business_info.business_type_id.$touch"
                  :error="$v.editHolding.business_info.business_type_id.$error"
                  v-model="editHolding.business_info.business_type_id"
                  :options="bizTypeOptions"
                  float-label="Business Type *"
                  clearable
                />
              </f-v-field-validator>
            </div>
            <div class="col-12">
              <f-v-field-validator :val="$v.editHolding.business_info.vat_type_id">
                <q-select
                  @blur="$v.editHolding.business_info.vat_type_id.$touch"
                  :error="$v.editHolding.business_info.vat_type_id.$error"
                  v-model="editHolding.business_info.vat_type_id"
                  :options="vatTypeOptions"
                  float-label="Vat Type *"
                  clearable
                />
              </f-v-field-validator>
            </div>
            <div class="col-12">
              <f-v-field-validator :val="$v.editHolding.business_info.telephone">
                <q-input
                  @blur="$v.editHolding.business_info.telephone.$touch"
                  :error="$v.editHolding.business_info.telephone.$error"
                  v-model="editHolding.business_info.telephone"
                  float-label="Telephone *"
                  type="number"
                  clearable
                />
              </f-v-field-validator>
            </div>
            <div class="col-12">
              <f-v-field-validator :val="$v.editHolding.business_info.email">
                <q-input
                  @blur="$v.editHolding.business_info.email.$touch"
                  :error="$v.editHolding.business_info.email.$error"
                  v-model="editHolding.business_info.email"
                  float-label="Email"
                  type="email"
                  clearable
                />
              </f-v-field-validator>
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
              <q-input
                v-model="editHolding.desc"
                float-label="Description"
                :type="$q.screen.gt.md ? 'textarea' : 'text'"
                :max-height="$q.screen.gt.md ? 100 : 0"
                :rows="$q.screen.gt.md ? 2 : 1"
              />
            </div>
          </div>
          <!-- </q-card> -->
        </div>
        <div class="column col-12 col-lg-12">
          <!-- <q-card class="q-pa-lg"> -->
          <!-- <q-card-title> -->
          <p class="caption">Address Info</p>
          <!-- </q-card-title> -->
          <q-card-separator />
          <div class="relative-position row gutter-sm">
            <!-- <div class="row gutter-sm"> -->
            <div class="col-12">
              <q-select
                v-model="editHolding.address.country_id"
                :options="countryOptions"
                float-label="Country"
                clearable
                filter
                filter-placeholder="Select Country"
                autofocus-filter
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="editHolding.address.region_id"
                :options="regionOptions"
                float-label="Region"
                clearable
                filter
                filter-placeholder="Select Region"
                autofocus-filter
              />
            </div>
            <!-- </div> -->
            <!-- <div class="row gutter-sm"> -->
            <div class="col-12">
              <q-select
                v-model="editHolding.address.province_id"
                :options="provinceOptions"
                float-label="Province"
                clearable
                filter
                filter-placeholder="Select Province"
                autofocus-filter
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="editHolding.address.city_id"
                :options="cityOptions"
                float-label="City"
                clearable
                filter
                filter-placeholder="Select City"
                autofocus-filter
                :after="[
                  {
                    icon: 'mdi-magnify',
                    handler () {
                      addressType = 'present'
                      $refs.cityTable.show()
                      // do something
                    }
                  }
                ]"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="editHolding.address.brgy_id"
                :options="brgyOptions"
                float-label="Barangay"
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
              <q-input
                v-model="editHolding.address.street_lot_blk"
                float-label="Block, Lot &amp; Street"
                :type="$q.screen.gt.sm ? 'textarea' : 'text'"
                :max-height="$q.screen.gt.sm ? 100 : 0"
                :rows="$q.screen.gt.sm ? 2 : 1"
              />
            </div>
          </div>
          <!-- </q-card> -->
        </div>

        <div class="row col-12">
          <div class="row col-12 justify-center">
            <div class="column">
              <q-btn
                color="negative"
                flat
                v-close-overlay
                label="Cancel"
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
          <div class="col-12">
            <f-v-error-summary
              :valObj="$v"
              class="q-my-sm"
            />
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

export default {
  mixins: [LocationMixin, CommonsMixin],
  components: {
    BarangayTable,
    CityTable,
    FVErrorSummary,
    FVFieldValidator
  },
  data () {
    return {
      addressType: 'home'
    }
  },
  computed: {
    ...mapHoldingFields(['newHolding', 'editHolding', 'editHoldingView'])
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
          // this.minimizedModal = false
          this.$router.replace('/dashboard/holdings')
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.editHolding.name} update successfully`
          })
          // this.setHoldings()
          this.$emit('updated')
          this.editHoldingView = false
        })
        .catch()
    }
  },
  watch: {
    'editHolding.address.country_id' (val) {
      if (val === null || val === undefined) return
      console.log('getregions', this['editHolding'])
      this.getRegions(val)
      this.getProvinces(val)
      this.getCities(val)
      this.getBrgys(val)
    },
    'editHolding.address.region_id' (val) {
      console.log('getProvinces', this['editHolding'])
      this.getProvinces(val)
    },
    'editHolding.address.province_id' (val) {
      console.log('getCities', this['editHolding'])
      this.getCities(val)
    },
    'editHolding.address.city_id' (val) {
      console.log('getBrgys', this['editHolding'])
      this.getBrgys(val)
    }
  },
  mounted () {
    console.log('edit route', this.$route)
  }
}
</script>

<style>
</style>
