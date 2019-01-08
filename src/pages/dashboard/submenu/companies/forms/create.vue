<template>
  <q-page class="q-mx-lg q-pb-lg">
    <form>
      <div class="row gutter-md q-pt-lg">
        <div class="column col-12 col-lg-6">
          <q-card class="q-pa-lg">
            <q-card-title>
              Company Info
            </q-card-title>
            <q-card-separator />
            <div class="row">
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.name">
                  <q-input
                    @input="$v.newCompany.name.$touch"
                    :error="$v.newCompany.name.$error"
                    v-model="newCompany.name"
                    float-label="Company name *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <!-- <q-search v-model="terms" placeholder="Start typing a country name">
                  <q-autocomplete @search="searchHoldings" @selected="selected" />
                </q-search> -->
                <form-field-validator :validate="$v.newCompany.holding_id">
                  <!-- <q-select
                    @input="$v.newCompany.holding_id.$touch"
                    :error="$v.newCompany.holding_id.$error"
                    v-model="newCompany.holding_id"
                    :options="holdingOptions"
                    float-label="Holdings"
                    clearable
                  /> -->
                  <q-search
                    @input="$v.newCompany.holding_id.$touch"
                    :error="$v.newCompany.holding_id.$error"
                    v-model="newCompany.holding_id"
                    float-label="Holding"
                    clearable
                    placeholder="Start typing a holding name"
                  >
                    <q-autocomplete
                      @search="searchHoldings"
                    />
                  </q-search>
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.business_info.business_type_id">
                  <q-select
                    @input="$v.newCompany.business_info.business_type_id.$touch"
                    :error="$v.newCompany.business_info.business_type_id.$error"
                    v-model="newCompany.business_info.business_type_id"
                    :options="bizTypeOptions"
                    float-label="Business Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.business_info.vat_type_id">
                  <q-select
                    @input="$v.newCompany.business_info.vat_type_id.$touch"
                    :error="$v.newCompany.business_info.vat_type_id.$error"
                    v-model="newCompany.business_info.vat_type_id"
                    :options="vatTypeOptions"
                    float-label="Vat Type *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.business_info.telephone">
                  <q-input
                    @input="$v.newCompany.business_info.telephone.$touch"
                    :error="$v.newCompany.business_info.telephone.$error"
                    v-model="newCompany.business_info.telephone"
                    float-label="Telephone *"
                    type="number"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.business_info.email">
                  <q-input
                    @input="$v.newCompany.business_info.email.$touch"
                    :error="$v.newCompany.business_info.email.$error"
                    v-model="newCompany.business_info.email"
                    float-label="Email *"
                    type="email"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.business_info.tin">
                  <q-input
                    @input="$v.newCompany.business_info.tin.$touch"
                    :error="$v.newCompany.business_info.tin.$error"
                    v-model="newCompany.business_info.tin"
                    float-label="TIN *"
                    clearable
                  />
                </form-field-validator>
              </div>
              <div class="col-12">
                <q-input
                  v-model="newCompany.business_info.website"
                  float-label="Website"
                  clearable
                />
              </div>
              <div class="col-12">
                <form-field-validator :validate="$v.newCompany.desc">
                  <q-input
                    @input="$v.newCompany.desc.$touch"
                    :error="$v.newCompany.desc.$error"
                    v-model="newCompany.desc"
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
                <form-field-validator :validate="$v.newCompany.address.country_id">
                  <q-select
                    @input="$v.newCompany.address.country_id.$touch"
                    :error="$v.newCompany.address.country_id.$error"
                    v-model="newCompany.address.country_id"
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
                <form-field-validator :validate="$v.newCompany.address.region_id">
                  <q-select
                    @input="$v.newCompany.address.region_id.$touch"
                    :error="$v.newCompany.address.region_id.$error"
                    v-model="newCompany.address.region_id"
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
                <form-field-validator :validate="$v.newCompany.address.province_id">
                  <q-select
                    @input="$v.newCompany.address.province_id.$touch"
                    :error="$v.newCompany.address.province_id.$error"
                    v-model="newCompany.address.province_id"
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
                <form-field-validator :validate="$v.newCompany.address.city_id">
                  <q-select
                    @input="$v.newCompany.address.city_id.$touch"
                    :error="$v.newCompany.address.city_id.$error"
                    v-model="newCompany.address.city_id"
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
                <form-field-validator :validate="$v.newCompany.address.brgy_id">
                  <q-select
                    @input="$v.newCompany.address.brgy_id.$touch"
                    :error="$v.newCompany.address.brgy_id.$error"
                    v-model="newCompany.address.brgy_id"
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
                <form-field-validator :validate="$v.newCompany.address.street_lot_blk">
                  <q-input
                    @input="$v.newCompany.address.street_lot_blk.$touch"
                    :error="$v.newCompany.address.street_lot_blk.$error"
                    v-model="newCompany.address.street_lot_blk"
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
              <!-- <form-validation-summary
                :validations="$v"
                class="q-my-sm"
              /> -->
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
import { mapCompanyFields } from '../../../../../store/companies'
import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'
import LocationMixin from 'components/mixins/location-mixin'
import CommonsMixin from 'components/mixins/commons-mixin'
import { mapActions } from 'vuex'
import { Company, newCompanyValidationRules } from '../model/Company'
import FormFieldValidator from 'components/form-validations/FormFieldValidator'
import FormValidationSummary from 'components/form-validations/FormValidationSummary'

export default {
  mixins: [LocationMixin, CommonsMixin],
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
    ...mapCompanyFields(['company', 'holdings', 'newCompany']),
    holdingOptions () {
      if (!this.holdings) return []
      return this.holdings.map(e => {
        if (!e) {
          return {
            label: '',
            value: ''
          }
        }
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  validations () {
    return {
      newCompany: newCompanyValidationRules()
    }
  },
  methods: {
    searchHoldings (terms, done) {
      done([])
      // make an AJAX call
      // then call done(Array results)

      // DO NOT forget to call done! When no results or an error occurred,
      // just call with empty array as param. Example: done([])
    },
    ...mapActions('pattys', ['setHoldings']),
    locationSelected (loc, where) {
      if (loc) {
        this.newCompany.address.country_id = loc.region.country.id
        this.newCompany.address.region_id = loc.region.id
        this.newCompany.address.province_id = loc.province.id
        this.newCompany.address.city_id = loc.city.id
        this.newCompany.address.brgy_id = loc.id
        this.newCompany.address.street_lot_blk = this.newCompany.address.street_lot_blk
      }
    },
    create () {
      this.$v.newCompany.$touch()
      if (this.$v.newCompany.$error) {
        return
      }
      console.log('validations', this.$v)
      this.$axios
        .post(`/companies`, {
          holding_id: this.newCompany.holding_id,
          name: this.newCompany.name,
          desc: this.newCompany.desc,
          country_id: this.newCompany.address.country_id,
          region_id: this.newCompany.address.region_id,
          province_id: this.newCompany.address.province_id,
          city_id: this.newCompany.address.city_id,
          brgy_id: this.newCompany.address.brgy_id,
          street_lot_blk: this.newCompany.address.street_lot_blk,
          business_type_id: this.newCompany.business_info.business_type_id,
          vat_type_id: this.newCompany.business_info.vat_type_id,
          telephone: this.newCompany.business_info.telephone,
          tin: this.newCompany.business_info.tin,
          email: this.newCompany.business_info.email,
          website: this.newCompany.business_info.website
        })
        .then(res => {
          this.$q.notify({
            type: 'positive',
            message: `${this.newCompany.name} Successfully added.`
          })
          this.$router.replace('/dashboard/companies')
        })
        .catch(e => {
          this.$q.notify({
            type: 'negative',
            message: 'Some error occured.'
          })
        })
    }
  },
  mounted () {
    this.newCompany = Company()
    this.localModel = this.newCompany
  }
}
</script>

<style>
</style>
