<template>
  <div class="q-ma-lg">
    <div class="row gutter-sm">
      <div class="col-xs-12 col-sm-6">
        <q-input
          v-model="newHolding.name"
          float-label="Holding name"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="newHolding.business_info.business_type_id"
          :options="bizTypeOptions"
          float-label="Business Type"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-select
          v-model="newHolding.business_info.vat_type_id"
          :options="vatTypeOptions"
          float-label="Vat Type"
          clearable
        />
      </div>
    </div>

    <div class="row gutter-sm">
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="newHolding.business_info.telephone"
          float-label="Telephone"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="newHolding.business_info.email"
          float-label="Email"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="newHolding.business_info.tin"
          float-label="TIN"
          clearable
        />
      </div>
      <div class="col-xs-12 col-sm-3">
        <q-input
          v-model="newHolding.business_info.website"
          float-label="Website"
          clearable
        />
      </div>
    </div>

    <div class="col-xs-12 col-sm-12">
      <q-input
        v-model="newHolding.desc"
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
            v-model="newHolding.address.country_id"
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
            v-model="newHolding.address.region_id"
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
            v-model="newHolding.address.province_id"
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
            v-model="newHolding.address.city_id"
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
            v-model="newHolding.address.brgy_id"
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
        v-model="newHolding.address.street_lot_blk"
        type="textarea"
        float-label="Block, Lot &amp; Street"
        :max-height="100"
        rows="2"
      />
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

import { mapHoldingFields } from '../../../../../store/pattys'
import { mapActions } from 'vuex'
import BarangayTable from 'components/location-provider/barangay-view'
import CityTable from 'components/location-provider/city-view'
import LocationMixin from 'components/mixins/location-mixin'
import CommonsMixin from 'components/mixins/commons-mixin'
import { Holding } from 'assets/models/Holding'

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
    ...mapHoldingFields(['newHolding', 'newHoldingModal'])
  },
  methods: {
    ...mapActions('pattys', ['setHoldings']),
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
      this.$axios
        .post(`/holdings`, {
          id: this.newHolding.id,
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
          this.setHoldings()
          this.$q.notify({
            type: 'positive',
            message: `${this.newHolding.name} Successfully added.`
          })
          this.newHoldingModal = false
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
    this.newHolding = Holding()
  },
  watch: {
    'newHolding.address.country_id' (val) {
      if (val === null || val === undefined) return
      this.getRegions(val)
    },
    'newHolding.address.region_id' (val) {
      this.getProvinces(val)
    },
    'newHolding.address.province_id' (val) {
      this.getCities(val)
    },
    'newHolding.address.city_id' (val) {
      this.getBrgys(val)
    }
  }
}
</script>

<style>
</style>
