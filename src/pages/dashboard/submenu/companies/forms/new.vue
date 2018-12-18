<template>
  <div style="padding: 30px">
    <div class="q-display-1 q-mb-md">Edit {{ company.name }}</div>

    <div class="row">
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="company.holding_id"
          :options="holdings"
          float-label="Holdings"
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="company.name"
          float-label="Company name"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="company.business_info.business_type_id"
          :options="businessTypes"
          float-label="Business Type"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="company.business_info.vat_type_id"
          :options="vatTypes"
          float-label="Vat Type"
          clearable
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="company.business_info.telephone"
          float-label="Telephone"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="company.business_info.email"
          float-label="Email"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="company.business_info.tin"
          float-label="TIN"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="company.business_info.website"
          float-label="Website"
          clearable
        />
      </div>
    </div>

    <div class="col-xs-12 col-sm-12">
      <q-input
        v-model="company.desc"
        type="textarea"
        float-label="Description"
        :max-height="100"
        rows="2"
      />
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="company.address.country_id"
          :options="countries"
          float-label="Country"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="company.address.region_id"
          :options="regions"
          float-label="Region"
          clearable
        />
      </div>

    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="company.address.province_id"
          :options="provinces"
          float-label="Province"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="company.address.city_id"
          :options="cities"
          float-label="City"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-select
          v-model="company.address.brgy_id"
          :options="brgys"
          float-label="Barangay"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-12">
        <q-input
          v-model="company.address.street_lot_blk"
          type="textarea"
          float-label="Block, Lot &amp; Street"
          :max-height="100"
          rows="2"
        />
      </div>
    </div>
    <br />
    <q-btn
      color="red"
      v-close-overlay
      label="Close"
      @click="hideModal()"
    />
    <q-btn
      color="primary"
      @click="update()"
      label="Submit"
      class="q-ml-sm"
    />

  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
