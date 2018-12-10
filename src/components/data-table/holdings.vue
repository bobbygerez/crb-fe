<template>
  <div>
    <!-- <q-table
      class="q-mb-xl q-pb-lg"
      :data="holdings"
      :columns="columns"
      row-key="__index"
      :visible-columns="visibleColumns"
      :loading="loading"
      :rows-per-page-options="rowsOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filter"
      :filter-method="customFilter"
      color="primary"
      :selected.sync="selected"
    >
      <template
        slot="top-left"
        slot-scope="props"
      >
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
          clearable
          placeholder="Search holding name..."
        />
      </template>
      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr
          class="cursor-pointer"
          :props="props"
          @click.native="selected = [{ __index: props.row.__index }];"
        >
          <q-td key="name">{{props.row.name}}</q-td>
          <q-td
            key="address"
            :props="props"
          >
            {{props.row.address.street_lot_blk}},
            {{props.row.address.brgy.description}}
            <br>
            {{props.row.address.city.description }},
            {{props.row.address.region.description }}
          </q-td>
          <q-td
            key="created_at"
            :props="props"
          >
            {{props.row.created_at}}
          </q-td>

          <q-popover touch-position>
            <q-list
              link
              style="min-width: 100px"
            >
              <q-item
                @click.native="edit(props.row.id)"
                v-close-overlay
              >
                <q-item-main label="Edit" />
              </q-item>
              <q-item
                @click.native="deleteRow(props.row.id)"
                v-close-overlay
              >
                <q-item-main label="Delete" />
              </q-item>
            </q-list>
          </q-popover>
          <q-tooltip
            v-if="!$q.platform.is.cordova"
            :delay="500"
            anchor="bottom middle"
            self="bottom middle"
            :offset="[10, 10]"
          >Click to see options.</q-tooltip>
        </q-tr>
      </template>
      <template
        slot="top-right"
        slot-scope="props"
      >
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
        <q-select
          color="secondary"
          v-model="separator"
          :options="[
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
      { label: 'Cell', value: 'cell' },
      { label: 'None', value: 'none' }
      ]"
          hide-underline
        />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
    </q-table> -->
    <!-- <q-modal
      v-model="minimizedModal"
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">New Holding</div>

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
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="holding.business_info.vat_type_id"
              :options="vatTypes"
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
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="holding.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.brgy_id"
              :options="brgys"
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
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="create()"
          label="Submit"
          class="q-ml-sm"
        />
      </div>
    </q-modal> -->

    <q-modal
      v-model="minimizedModal"
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ holding.name }}</div>

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
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-select
              v-model="holding.business_info.vat_type_id"
              :options="vatTypes"
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
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="holding.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="holding.address.brgy_id"
              :options="brgys"
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
          color="red"
          v-close-overlay
          label="Close"
        />
        <q-btn
          color="primary"
          @click="update(holding.id)"
          label="Update"
          class="q-ml-sm"
        />
      </div>
    </q-modal>
    <generic-list-data-table
      :data="holdings"
      :columns="columns"
      color="primary"
      :actions="['edit', 'delete']"
      @edit="edit"
      @delete="deleteRow"
      theme="secondary"
    />
  </div>
</template>

<script>
import { values } from 'lodash'
import { mapHoldingFields } from '../../store/pattys'
import GenericListDataTable from 'components/data-table/generic-list-data-table'

export default {
  components: {
    GenericListDataTable
  },
  data () {
    return {
      selectedCountry: '',
      terms: '',
      holdingName: '',
      minimizedModal: false,
      rowsOptions: [3, 5, 7, 10, 15, 25, 50, 0],
      loading: false,
      markers: [
        {
          position: { lat: 12.879721, lng: 121.774017 }
        }
      ],
      markersPosition: { lat: 12.879721, lng: 121.774017 },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'address',
          label: 'Address',
          field: row => row.address.street_lot_blk,
          align: 'left',
          sortable: true
        },
        {
          name: 'brgy',
          label: 'Barangay',
          field: row => row.address.brgy.description,
          align: 'left',
          sortable: true,
          hideonload: true
        },
        {
          name: 'city',
          label: 'City',
          field: row => row.address.city.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'province',
          label: 'Province',
          field: row => row.address.province.description,
          align: 'left',
          sortable: true
        },
        {
          name: 'region',
          label: 'Region',
          field: row => row.address.region.description,
          align: 'left',
          sortable: true,
          hideonload: true
        },
        {
          name: 'created_at',
          label: 'Created At',
          field: 'created_at',
          align: 'left',
          sortable: true,
          hideonload: true
        }
      ],
      filter: '',
      visibleColumns: ['name', 'address', 'created_at'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [],
      pagination: {
        page: 2
      },
      paginationControl: { rowsPerPage: 7, page: 1 }
    }
  },
  computed: {
    ...mapHoldingFields(['newHoldingModal', 'holding']),
    vatTypes () {
      return this.$store.getters['globals/getVatTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    businessTypes () {
      return this.$store.getters['globals/getBusinessTypes'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    regions () {
      if (this.$store.getters['globals/getRegions'] === undefined) return []
      return this.$store.getters['globals/getRegions'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    countries () {
      return this.$store.getters['globals/getCountries'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    provinces () {
      return this.$store.getters['globals/getProvinces'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    cities () {
      return this.$store.getters['globals/getCities'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    brgys () {
      return this.$store.getters['globals/getBrgys'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    holdings () {
      return values(this.$store.getters['pattys/getHoldings'])
    }
  },
  methods: {
    // testActions (data) {
    //   console.log('testActions', data)
    // },
    // customFilter (rows, terms, cols, cellValue) {
    //   // push columns you want to include in filtering
    //   cols.push(
    //     { field: row => row.address.country.description },
    //     { field: row => row.address.region.description },
    //     { field: row => row.address.city.description },
    //     { field: row => row.address.province.description }
    //   )
    //   const lowerTerms = terms ? terms.toLowerCase() : ''
    //   return rows.filter(row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1))
    // },
    hideModal () {
      this.$store.dispatch('pattys/setNewHoldingModal', false)
    },
    index () {
      this.$axios
        .get(`/holdings`)
        .then(res => {
          this.$store.dispatch('pattys/setHoldings', res.data.holdings)
        })
        .catch()
    },
    create () {
      this.$axios
        .post(`/holdings`, {
          id: this.holding.id,
          name: this.holding.name,
          desc: this.holding.desc,
          country_id: this.holding.address.country_id,
          region_id: this.holding.address.region_id,
          province_id: this.holding.address.province_id,
          city_id: this.holding.address.city_id,
          brgy_id: this.holding.address.brgy_id,
          street_lot_blk: this.holding.address.street_lot_blk,
          business_type_id: this.holding.business_info.business_type_id,
          vat_type_id: this.holding.business_info.vat_type_id,
          telephone: this.holding.business_info.telephone,
          tin: this.holding.business_info.tin,
          email: this.holding.business_info.email,
          website: this.holding.business_info.website
        })
        .then(res => {
          this.index()
          this.hideModal()
        })
    },
    deleteRow (id) {
      this.$axios
        .get(`/holdings/${id}?id=${id}`)
        .then(res => {
          this.$store.dispatch('pattys/setHolding', res.data.holding)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${this.holding.name}?`,
            actions: [
              {
                label: 'OK',
                handler: () => {
                  this.$axios
                    .delete(
                      `/holdings/${this.holding.id}?id=${this.holding.id}`
                    )
                    .then(res => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.holding.name} deleted successfully`
                      })
                      this.index()
                    })
                    .catch(err => {
                      this.$q.notify({
                        color: 'negative',
                        icon: 'delete',
                        message: `${err.response}`
                      })
                    })
                }
              }
            ]
          })
        })
        .catch()
    },
    edit (id) {
      this.$axios
        .get(`/holdings/${id}/edit?id=${id}`)
        .then(res => {
          this.$store.dispatch('pattys/setHolding', res.data.holding)
          this.minimizedModal = true
        })
        .catch()
    },
    update (id) {
      this.$axios
        .put(`/holdings/${this.holding.id}`, {
          id: this.holding.id,
          name: this.holding.name,
          desc: this.holding.desc,
          country_id: this.holding.address.country_id,
          region_id: this.holding.address.region_id,
          province_id: this.holding.address.province_id,
          city_id: this.holding.address.city_id,
          brgy_id: this.holding.address.brgy_id,
          street_lot_blk: this.holding.address.street_lot_blk,
          business_type_id: this.holding.business_info.business_type_id,
          vat_type_id: this.holding.business_info.vat_type_id,
          telephone: this.holding.business_info.telephone,
          tin: this.holding.business_info.tin,
          email: this.holding.business_info.email,
          website: this.holding.business_info.website
        })
        .then(res => {
          this.minimizedModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.holding.name} update successfully`
          })
          this.index()
        })
        .catch()
    }
  },
  watch: {
    'paginationControl.page' (page) {
      this.$q.notify({
        color: 'secondary',
        message: `Navigated to page ${page}`,
        actions:
          page < 4
            ? [
              {
                label: 'Go to last page',
                handler: () => {
                  this.paginationControl.page = 4
                }
              }
            ]
            : null
      })
    },
    'holding.name' (val) {
      this.$store.dispatch('pattys/setHoldingName', val)
    },
    // 'holding.address.country_id' (val) {
    //   if (val === null || val === undefined) return
    //   this.$store.dispatch('globals/getRegions', val)
    // },
    // 'holding.address.region_id' (val) {
    //   this.$store.dispatch('globals/getProvinces', val)
    //   this.$store.dispatch('pattys/setHoldingRegion', val)
    // },
    // 'holding.address.province_id' (val) {
    //   this.$store.dispatch('pattys/setHoldingProvince', val)
    //   this.$store.dispatch('globals/getCities', val)
    // },
    // 'holding.address.city_id' (val) {
    //   this.$store.dispatch('pattys/setHoldingCity', val)
    //   this.$store.dispatch('globals/getBrgys', val)
    // },
    // 'holding.address.brgy_id' (val) {
    //   this.$store.dispatch('pattys/setHoldingBrgy', val)
    // },
    'holding.desc' (val) {
      this.$store.dispatch('pattys/setHoldingDesc', val)
    },
    // 'holding.address.street_lot_blk' (val) {
    //   this.$store.dispatch('pattys/setHoldingAddress', val)
    // },
    'holding.business_info.business_type_id' (val) {
      this.$store.dispatch('pattys/setHoldingBusinessType', val)
    },
    'holding.business_info.vat_type_id' (val) {
      this.$store.dispatch('pattys/setHoldingVatType', val)
    },
    'holding.business_info.telephone' (val) {
      this.$store.dispatch('pattys/setHoldingTelephone', val)
    },
    'holding.business_info.email' (val) {
      this.$store.dispatch('pattys/setHoldingEmail', val)
    },
    'holding.business_info.tin' (val) {
      this.$store.dispatch('pattys/setHoldingTin', val)
    },
    'holding.business_info.website' (val) {
      this.$store.dispatch('pattys/setHoldingWebsite', val)
    }
  }
}
</script>
