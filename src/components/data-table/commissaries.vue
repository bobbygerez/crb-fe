<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Commissaries"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template
        slot="top-right"
        slot-scope="props"
      >
        <q-search
          hide-underline
          v-model="filter"
        />
      </template>

      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr :props="props">
          <q-td key="name">
            {{props.row.name}}
          </q-td>
          <q-td
            key="address"
            :props="props"
          >
            {{props.row.address.street_lot_blk}}
            <br />
            {{props.row.address.brgy.description}}
            <br />
            {{props.row.address.city.description }},
            <br />
            {{props.row.address.region.description }}

          </q-td>
          <q-td
            key="created"
            :props="props"
          >
            {{props.row.created_at}}
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              round
              outline
              color="positive"
              icon="edit"
              class="q-ma-sm"
              @click="edit(props.row.id)"
            />
            <q-btn
              round
              outline
              color="negative"
              icon="delete"
              class="q-ma-sm"
              @click="deleteRow(props.row.id)"
            />
          </q-td>
        </q-tr>

      </template>

      <div
        slot="pagination"
        slot-scope="props"
        class="row flex-center q-py-sm"
      >
        <q-btn
          round
          dense
          size="sm"
          icon="undo"
          color="secondary"
          class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div
          class="q-mr-sm"
          style="font-size: small"
        >
          Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </div>
        <q-btn
          round
          dense
          size="sm"
          icon="redo"
          color="secondary"
          :disable="paginationLast(props.pagination.page)"
          @click="props.nextPage"
        />
      </div>

    </q-table>

    <q-modal
      v-model="editCommissaryModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ commissary.name }}</div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="commissary.name"
              float-label="Commissary name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="commissary.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="commissary.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="commissary.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="commissary.address.street_lot_blk"
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
    </q-modal>
    <q-modal
      v-model="newCommissaryModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ commissary.name }}</div>

        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-input
              v-model="commissary.name"
              float-label="Commissary name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.business_info.business_type_id"
              :options="businessTypes"
              float-label="Business Type"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.business_info.vat_type_id"
              :options="vatTypes"
              float-label="Vat Type"
              clearable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.telephone"
              float-label="Telephone"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.email"
              float-label="Email"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.tin"
              float-label="TIN"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              v-model="commissary.business_info.website"
              float-label="Website"
              clearable
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="commissary.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="commissary.address.country_id"
              :options="countries"
              float-label="Country"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="commissary.address.region_id"
              :options="regions"
              float-label="Region"
              clearable
            />
          </div>

        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.province_id"
              :options="provinces"
              float-label="Province"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.city_id"
              :options="cities"
              float-label="City"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-select
              v-model="commissary.address.brgy_id"
              :options="brgys"
              float-label="Barangay"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="commissary.address.street_lot_blk"
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
          @click="store()"
          label="Submit"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      editCommissaryModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'address', label: 'Address', field: 'address', align: 'left' },
        { name: 'created', label: 'Created', field: 'created', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'left' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('commissaries', ['commissary', 'newCommissaryModal']),
    countries () {
      return this.$store.getters['globals/getCountries'].map(e => {
        return {
          label: e.description,
          value: e.id
        }
      })
    },
    regions () {
      let regions = this.$store.getters['globals/getRegions']
      if (regions === null) return []
      return regions.map(e => {
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
    }
  },
  methods: {
    store () {
      this.$axios
        .post(`/commissaries`, this.commissary)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.branch.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (commissaryId) {
      this.$axios.get(`/commissaries/${commissaryId}?id=${commissaryId}`)
        .then((res) => {
          this.$store.dispatch('commissaries/commissary', res.data.commissary)
          this.$q.notify({
            color: 'negative',
            icon: 'delete',
            message: `Delete ${res.data.commissary.name}?`,
            actions: [

              {
                label: 'OK',
                handler: () => {
                  this.$axios.delete(`/commissaries/${this.commissary.id}?id=${this.commissary.id}`)
                    .then((res) => {
                      this.$q.notify({
                        color: 'positive',
                        icon: 'check',
                        message: `${this.commissary.name} deleted successfully`
                      })
                      this.request({
                        pagination: this.serverPagination,
                        filter: this.filter
                      })
                      this.loading = false
                    })
                    .catch((err) => {
                      this.$q.notify({
                        color: 'negative',
                        icon: 'warning',
                        message: `${err.response.data.message}`
                      })
                    })
                }
              }
            ]
          })
         
        })
      // .catch()
    },
    update () {
      this.$axios.put(`/commissaries/${this.commissary.id}`, this.commissary )
        .then((res) => {
          this.editCommissaryModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.commissary.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    
    paginationLast (currentPage) {
      if (this.lastPage > currentPage) {
        return false
      }
      return true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/commissaries?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.commissaries.data)
          this.serverPagination.rowsNumber = res.data.commissaries.total
          this.lastPage = res.data.commissaries.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (commissaryId) {

      this.$axios.get(`commissaries/${commissaryId}/edit?id=${commissaryId}`)
        .then(res => {
          this.editCommissaryModal = true
          this.$store.dispatch('commissaries/commissary', res.data.commissary)
        })
    },
    hideModal(){
      this.$store.dispatch('commissaries/newCommissaryModal', false);
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'commissary.name' (val) {
      this.$store.dispatch('commissaries/commissaryName', val)
    },
    'commissary.desc' (val) {
      this.$store.dispatch('commissaries/commissaryDesc', val)
    },
    'commissary.address.country_id' (val) {
      if (val === '') { return }
      this.$store.dispatch('globals/getRegions', val)
      this.$store.dispatch('commissaries/commissaryCountry', val)
    },
    'commissary.address.region_id' (val) {
      if (val === '') { return }
      this.$store.dispatch('globals/getProvinces', val)
      this.$store.dispatch('commissaries/commissaryRegion', val)
    },
    'commissary.address.province_id' (val) {
      if (val === '') { return }
      this.$store.dispatch('commissaries/commissaryProvince', val)
      this.$store.dispatch('globals/getCities', val)
    },
    'commissary.address.city_id' (val) {
      if (val === '') { return }
      this.$store.dispatch('commissaries/commissaryCity', val)
      this.$store.dispatch('globals/getBrgys', val)
    },
    'commissary.address.brgy_id' (val) {
      if (val === '') { return }
      this.$store.dispatch('commissaries/commissaryBrgy', val)
    },
    'commissary.business_info.business_type_id' (val) {
      this.$store.dispatch('commissaries/commissaryBusinessType', val)
    },
    'commissary.business_info.vat_type_id' (val) {
      this.$store.dispatch('commissaries/commissaryVatType', val)
    },
    'commissary.address.street_lot_blk' (val) {
      this.$store.dispatch('commissaries/commissaryStreetLotBlk', val)
    },
    'commissary.business_info.telephone' (val) {
      this.$store.dispatch('commissaries/commissaryTelephone', val)
    },
    'commissary.business_info.email' (val) {
      this.$store.dispatch('commissaries/commissaryEmail', val)
    },
    'commissary.business_info.tin' (val) {
      this.$store.dispatch('commissaries/commissaryTin', val)
    },
    'commissary.business_info.website' (val) {
      this.$store.dispatch('commissaries/commissaryWebsite', val)
    }
  }

}
</script>
