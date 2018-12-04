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
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="holding.address.region_id"
          :options="regionOptions"
          float-label="Region"
          clearable
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
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="holding.address.city_id"
          :options="cityOptions"
          float-label="City"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="holding.address.brgy_id"
          :options="brgyOptions"
          float-label="Barangay"
          clearable
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
  </div>
</template>

<script>

import { mapHoldingFields } from '../../store/pattys'
import { mapGlobalFields } from '../../store/globals'

export default {
  computed: {
    ...mapHoldingFields(['holding', 'businessTypes', 'vatTypes']),
    ...mapGlobalFields(['countries', 'regions', 'provinces', 'cities', 'brgys', 'countryList']),
    bizTypeOptions () {
      return this.businessTypes.map(v => {
        return { label: v.name, value: v.id }
      })
    },
    vatTypeOptions () {
      return this.vatTypes.map(v => {
        return { label: v.name, value: v.id }
      })
    },
    countryOptions () {
      return this.countries.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    regionOptions () {
      return this.regions.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    provinceOptions () {
      return this.provinces.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    cityOptions () {
      return this.cities.map(v => {
        return { label: v.description, value: v.id }
      })
    },
    brgyOptions () {
      return this.brgys.map(v => {
        return { label: v.description, value: v.id }
      })
    }
  },
  mounted () {
    console.log('countryList', this.countryList) // this.$store.getters['globals/countryList'])
  }
}
</script>

<style>
</style>
