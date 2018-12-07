<template>
  <div style="padding: 30px">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <q-input
          v-model="holding.name"
          float-label="Holding name"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="holding.business_info.business_type_id"
          :options="bizTypeOptions"
          float-label="Business Type"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="holding.business_info.vat_type_id"
          :options="vatTypeOptions"
          float-label="Vat Type"
          clearable
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="holding.business_info.telephone"
          float-label="Telephone"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="holding.business_info.email"
          float-label="Email"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="holding.business_info.tin"
          float-label="TIN"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="holding.business_info.website"
          float-label="Website"
          clearable
        />
      </div>
    </div>

    <div class="col-xs-12 col-sm-12">
      <q-input
        v-model="holding.desc"
        type="textarea"
        float-label="Description"
        :max-height="100"
        rows="2"
      />
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="holding.address.country_id"
          :options="countryOptions"
          float-label="Country"
          clearable
          filter
          autofocus-filter
          radio
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="holding.address.region_id"
          :options="regionOptions"
          float-label="Region"
          clearable
          filter
          autofocus-filter
          radio
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="holding.address.province_id"
          :options="provinceOptions"
          float-label="Province"
          clearable
          filter
          autofocus-filter
          radio
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="holding.address.city_id"
          :options="cityOptions"
          float-label="City"
          clearable
          filter
          autofocus-filter
          radio
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
          v-model="holding.address.brgy_id"
          :options="brgyOptions"
          float-label="Barangay"
          clearable
          filter
          autofocus-filter
          radio
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
      <div class="col-xs-12 col-sm-12">
        <q-input
          v-model="holding.address.street_lot_blk"
          type="textarea"
          float-label="Block, Lot &amp; Street"
          :max-height="100"
          rows="2"
        />
      </div>
    </div>
    <br>
    <q-btn
      color="primary"
      @click="create()"
      label="Submit"
      class="q-ml-sm"
    />
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

import { mapHoldingFields } from '../../store/pattys'
import { mapGlobalFields } from '../../store/globals'
import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'
import LocationMixin from 'components/mixins/location-mixin'
import CommonsMixin from 'components/mixins/commons-mixin'

export default {
  mixins: [LocationMixin, CommonsMixin],
  components: {
    BarangayTable,
    CityTable
  },
  data () {
    return {
      addressType: 'home'
    }
  },
  computed: {
    ...mapHoldingFields(['holding']),
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys', 'countryList'])
  },
  methods: {
    locationSelected (loc, where) {
      console.log('locationSelected =>', loc)
      console.log('locationSelected where =>', where)
      console.log('address before', this.holding.address)
      if (loc) {
        // let address = {

        // this.countries = []

        // this.countries.push({ label: loc.region.country.description, value: loc.region.country.id })

        // console.log('address options', this.countries, this.regions, this.cities, this.brgys)
        // this.user.address. loc.description,
        // city: loc.city.description,
        // province: loc.province.description,
        // region: loc.region.description,
        // country: loc.region.country.description
        this.holding.address.country_id = loc.region.country.id
        this.holding.address.region_id = loc.region.id
        this.holding.address.province_id = loc.province.id
        this.holding.address.city_id = loc.city.id
        this.holding.address.brgy_id = loc.id
        this.holding.address.street_lot_blk = this.holding.address.street_lot_blk
        // this.user.address = createAddress({
        //   country_id: loc.region.country.id,
        //   region_id: loc.region.id,
        //   province_id: loc.province.id,
        //   city_id: loc.city.id,
        //   brgy_id: loc.id,
        //   street_lot_blk: this.user.address.street_lot_blk
        // })
        // }
        // set the address fields based on type
        // this.setAddressFields(where, address)
        // check address
        console.log('new setted address', this.holding.address)
      }
    }
  },
  mounted () {
    console.log('countryList', this.countryList) // this.$store.getters['globals/countryList'])
    console.log('localObj', this.localModule)
    this.localModule = this.holding
    console.log('localObj', this.localModule)
  }
}
</script>

<style>
</style>
