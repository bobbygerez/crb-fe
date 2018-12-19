<template>
  <div class="q-ma-lg">
    <!-- <div class="q-display-1 q-mb-md">Edit {{ holding.name }}</div> -->

    <div class="row gutter-sm">
      <div class="col-xs-12 col-sm-6">
        <!-- <q-input
          v-model="editHolding.name"
          float-label="Holding name"
          clearable
        /> -->
        <f-v-field-validator :val="$v.editHolding.name">
          <q-input
            @blur="$v.editHolding.name.$touch"
            :error="$v.editHolding.name.$error"
            v-model="editHolding.name"
            float-label="Holding name"
            clearable
          />
        </f-v-field-validator>
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="editHolding.business_info.business_type_id"
          :options="bizTypeOptions"
          float-label="Business Type"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="editHolding.business_info.vat_type_id"
          :options="vatTypeOptions"
          float-label="Vat Type"
          clearable
        />
      </div>
    </div>

    <div class="row gutter-sm">
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="editHolding.business_info.telephone"
          float-label="Telephone"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="editHolding.business_info.email"
          float-label="Email"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="editHolding.business_info.tin"
          float-label="TIN"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="editHolding.business_info.website"
          float-label="Website"
          clearable
        />
      </div>
    </div>

    <div class="col-xs-12 col-sm-12">
      <q-input
        v-model="editHolding.desc"
        type="textarea"
        float-label="Description"
        :max-height="100"
        rows="2"
      />
    </div>

    <div class="relative-position">
      <div class="row gutter-sm">
        <div class="col-xs-12 col-sm-6">
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
        <div class="col-xs-12 col-sm-6">
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
      </div>
      <div class="row gutter-sm">
        <div class="col-xs-12 col-sm-4">
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
        <div class="col-xs-12 col-sm-4">
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
        <div class="col-xs-12 col-sm-4">
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
      </div>
      <q-inner-loading :visible="addressInnerLoading">
        <component
          :is="`q-spinner-${$q.platform.is === 'ios' ? 'ios' : 'mat'}`"
          size="30px"
          color="secondary"
        />
      </q-inner-loading>

    </div>
    <div class="col-xs-12 col-sm-12">
      <q-input
        v-model="editHolding.address.street_lot_blk"
        type="textarea"
        float-label="Block, Lot &amp; Street"
        :max-height="100"
        rows="2"
      />
    </div>
    <div>
      <f-v-error-summary
        :valObj="$v"
        class="q-my-sm"
      />
    </div>
    <br>
    <div class="row justify-end">
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
  </div>
</template>

<script>
import { mapHoldingFields } from '../../../../../store/pattys'
import { required, email } from 'vuelidate/lib/validators'
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
      editHolding: editHoldingFormValidationRule(required, email, () => true)
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
          this.minimizedModal = false
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
  }
}
</script>

<style>
</style>
