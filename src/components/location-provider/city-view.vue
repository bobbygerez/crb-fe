<template>
  <div>
    <q-modal
      ref="modalCity"
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
      @hide="onHideCityModal"
    >
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            @click="$refs.modalCity.hide()"
          >
            <q-icon name="mdi-arrow-left" />
          </q-btn>
          <!-- <q-toolbar-title> -->
          <div class="col-6 col-md-4">
            <q-input
              :before="[{icon:'mdi-magnify'}]"
              color="none"
              hide-underline
              placeholder="Search Cities"
              clearable
              v-model="filter"
              @input="searchCities"
              @focus="showMaxResult = true"
              @blur="checkFilterStatus"
            />
          </div>
          <div
            class="col-2 col-md-2"
            v-if="showMaxResult === true"
          >
            <q-select
              placeholder="Results"
              :prefix="!$q.screen.xs ? 'Result: ' : ''"
              color="none"
              v-model="maxResult"
              @focus="showMaxResult = true"
              @input="searchCities"
              :options="[
                    { label: '5', value: 5 },
                    { label: '10', value: 10 },
                    { label: '20', value: 20, selected: true },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 }
                  ]"
              hide-underline
            />
          </div>
          <!-- </q-toolbar-title> -->
          <q-toolbar-title>
          </q-toolbar-title>
          <table-view-mode-action />
        </q-toolbar>
        <!-- conditional rendering, shows table on list or grid view depending on the selected view mode -->
        <!-- <template v-if="tableViewSettings.mode === 'grid'"> -->
        <div
          v-if="tableViewSettings.mode === 'grid'"
          class="q-mx-sm q-my-sm"
        >
          <q-inner-loading :visible="loading">
            <q-spinner
              color="secondary"
              :size="30"
            />
          </q-inner-loading>
          <q-table
            grid
            selection="single"
            :pagination.sync="pagination"
            :rows-per-page-options="[5, 10, 20, 50, 100, 0]"
            hide-header
            :data="data"
            :columns="columns"
            :filter="filter"
            :selected.sync="selected"
            :visible-columns="visibleColumns"
            row-key="__index"
            color="secondary"
          >
            <!-- <template slot="top-left" slot-scope="props">
                <q-search hide-underline color="primary" clearable v-model="filter" @input="searchCities" @focus="showMaxResult = true" @blur="checkFilterStatus" />
                <template v-if="showMaxResult === true">
                  <div class="caption">Results: </div>
                  <q-select color="secondary" v-model="maxResult" @focus="showMaxResult = true" @input="searchCities" :options="[
                    { label: '5', value: 5 },
                    { label: '10', value: 10 },
                    { label: '20', value: 20, selected: true },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 }
                  ]" hide-underline />
                </template>
              </template> -->
            <div
              slot="item"
              slot-scope="props"
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 transition-generic"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card
                class="transition-generic cursor-pointer"
                :class="props.selected ? 'bg-grey-2' : ''"
                @click.native="setSelected(props.row.__index, props), props.selected = true"
              >
                <q-card-title class="relative-position">
                  {{ props.cols[0].value }}
                </q-card-title>
                <q-card-separator />
                <q-card-main class="q-pa-none">
                  <q-list no-border>
                    <q-item
                      v-for="col in props.cols.filter(col => col.name !== 'desc')"
                      :key="col.name"
                    >
                      <q-item-main>
                        <q-item-tile
                          label
                          class="text-truncate"
                        >{{ col.label }}</q-item-tile>
                      </q-item-main>
                      <q-item-side right>
                        <q-item-tile class="text-truncate">{{ col.value }}</q-item-tile>
                      </q-item-side>
                    </q-item>
                  </q-list>
                </q-card-main>
                <q-tooltip
                  :delay="1000"
                  anchor="bottom middle"
                  v-close-overlay
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  Click to Select.
                </q-tooltip>
              </q-card>
            </div>
          </q-table>
          <q-page-sticky
            position="bottom-right"
            :offset="[16, 60]"
          >
            <q-btn
              color="primary"
              fab
              v-back-to-top.animate="{offset: 500, duration: 200}"
              class="animate-pop"
            >
              <q-icon name="keyboard_arrow_up" />
            </q-btn>
          </q-page-sticky>
        </div>
        <!-- </template> -->
        <!-- <template > -->
        <div
          v-if="tableViewSettings.mode === 'list'"
          class="q-mx-sm q-my-sm"
        >
          <q-table
            binary-state-sort
            :rows-per-page-options="[5, 10, 20, 50, 100, 0]"
            :pagination.sync="pagination"
            :selected.sync="selected"
            :loading="loading"
            :data="data"
            :columns="columns"
            :filter="filter"
            :visible-columns="visibleColumns"
            :separator="separator"
            row-key="__index"
            color="secondary"
          >
            <!-- <template
              slot="top-left"
              slot-scope="props"
            >
              <q-search
                hide-underline
                color="primary"
                clearable
                v-model="filter"
                class="col-8"
                @input="searchCities"
                @focus="showMaxResult = true"
                @blur="checkFilterStatus"
              />
              <template v-if="showMaxResult === true">
                <div class="caption">Results: </div>
                <q-select
                  color="secondary"
                  v-model="maxResult"
                  @focus="showMaxResult = true"
                  @input="searchCities"
                  :options="[
                    { label: '5', value: 5 },
                    { label: '10', value: 10 },
                    { label: '20', value: 20, selected: true },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 }
                  ]"
                  hide-underline
                />
              </template>
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
                v-model="maxResult"
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
            </template> -->
            <q-tr
              slot="body"
              slot-scope="props"
              :props="props"
              @click.native="props.selected = !props.selected, setSelected(props.row.__index, props)"
              :class="'cursor-pointer '"
            >
              <q-td
                v-for="(v) in props.cols"
                :key="v.name"
                :props="props"
                class="text-left"
              >
                <template>
                  {{ v.value }}
                </template>
              </q-td>
              <q-tooltip
                :ref="'tptable' + props.row.__index"
                :delay="1000"
                anchor="bottom middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Click to Select
              </q-tooltip>
            </q-tr>
          </q-table>
          <q-page-sticky
            position="bottom-right"
            :offset="[18, 60]"
          >
            <q-btn
              color="secondary"
              fab
              v-back-to-top.animate="{offset: 500, duration: 200}"
              class="animate-pop"
            >
              <q-icon name="keyboard_arrow_up" />
            </q-btn>
          </q-page-sticky>
        </div>
        <!-- </template> -->
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 60]"
        >
          <q-btn
            color="primary"
            fab
            v-back-to-top.animate="{offset: 500, duration: 200}"
            class="animate-pop"
          >
            <q-icon name="keyboard_arrow_up" />
          </q-btn>
        </q-page-sticky>
      </q-modal-layout>
    </q-modal>
    <q-modal
      v-model="opened"
      ref="cityBrgyModal"
      minimized
      :content-css="{top: '-150px'}"
    >
      <q-inner-loading :visible="visible">
        <q-spinner-gears
          size="50px"
          color="primary"
        ></q-spinner-gears>
      </q-inner-loading>
      <div class="">
        <q-select
          v-model="selectedBarangay"
          filter-placeholder="Select Barangay"
          placeholder="  Barangays"
          filter
          radio
          :options="barangayOptions"
          @input="barangaySelect"
        />
      </div>
    </q-modal>
  </div>
</template>

<script>
// import Location from 'assets/services/location'
import TableViewModeAction from 'components/actions-generic/table-view-mode-action'
// import { mapState, mapActions, mapGetters } from 'vuex'
import { setTimeout } from 'timers'
import { debounce } from 'quasar'

import { mapGlobalFields } from '../../store/globals'

export default {
  computed: {
    // ...mapState('commons', ['tableViewMode', 'locationData']),
    // ...mapGetters('commons', ['getTableViewMode', 'getLocationData'])
    ...mapGlobalFields(['tableViewSettings', 'locationData'])
  },
  components: {
    TableViewModeAction
  },
  name: 'city-table',
  props: {
    params: [String, Object]
  },
  data () {
    return {
      visible: false,
      opened: false,
      showMaxResult: false,
      maxResult: 20,
      pagination: {
        sortBy: 'brgy', // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 0 // current rows per page being displayed
      },
      separator: 'horizontal',
      selected: [],
      selectedBarangay: null,
      filter: '',
      loading: false,
      modalCityCopy: {},
      data: [],
      barangayOptions: [],
      barangayData: [],
      columns: [
        {
          label: 'City',
          field: 'description',
          // filter: false
          name: 'city',
          sortable: true,
          required: true,
          align: 'left'
        },
        {
          label: 'Province',
          field: row => row.province.description,
          sortable: true,
          name: 'prv',
          align: 'left'
        },
        {
          label: 'Region',
          field: row => row.region.description,
          sortable: true,
          name: 'reg',
          required: true,
          align: 'left'
        }
      ],
      visibleColumns: ['city', 'prv', 'reg']
    }
  },
  methods: {
    show () {
      this.$refs.modalCity.show()
    },
    barangaySelect () {
      // set store data
      let loc
      this.barangayData.some(v => {
        if (v.id === this.selectedBarangay) {
          console.log('location b = > ', v)
          // this.setLocationData({ location: v })
          this.locationData.location = v
          loc = v
          return true
        }
      })

      this.$refs.cityBrgyModal.hide()
      this.$refs.modalCity.hide()

      if (this.params) {
        this.$emit('city-location-selected', loc, this.params)
        return
      }
      this.$emit('city-location-selected', loc)
    },
    checkFilterStatus () {
      if (this.filter.trim() === '') {
        this.showMaxResult = false
      }
    },
    onHideCityModal () {
      // set barangayView to false
      // this.setLocationData({ cityView: false })
      this.locationData.cityView = false
      // some hack to hide the lingering tooltip
      setTimeout(() => {
        let tp = document.getElementsByClassName('q-tooltip')
        let parent = document.getElementsByTagName('BODY')[0]
        if (tp[0] !== undefined) {
          parent.removeChild(tp[0])
        }
      }, 1000)
    },
    setSelected (name, props) {
      console.log('props', props)
      this.selected = [{ __index: name }]
      this.opened = true
      this.visible = true
      this.$axios.get(`/barangay-by-city/${props.row.id}`)
        .then(res => {
          this.barangayData = res.data
          console.log('barangay', this.barangayData)
          this.barangayOptions = []
          this.barangayData.forEach(v => {
            this.barangayOptions.push({ label: v.description, value: v.id })
          })
          this.visible = false
        })
    },
    // ...mapActions('commons', ['setTableViewMode', 'setGenericQTableLoading', 'setLocationData']),
    searchCities () {
      if (this.filter.trim() === '') {
        return
      }
      this.loading = true
      // debounce(this.getCities(), 1000)
      this.debouncedFunction()
    },
    getCities () {
      this.$axios.get(`/cities-by-name/${this.filter}/${this.maxResult}`)
        .then(res => {
          this.loading = false
          this.data = res.data
        })
        .catch(err => {
          console.log(err.data)
          this.loading = false
        })
    }
  },
  created () {
    console.log('city-view opened')
    console.log('quasawr =>', this.$q)
    this.loading = true
    this.$axios.get(`/cities-by-name/random-cities/5`)
      .then(res => {
        console.log('cities', res)
        this.loading = false
        this.data = res.data
      })
      .catch(err => {
        this.loading = false
        console.log(err.data)
      })

    this.debouncedFunction = debounce(() => {
      this.getCities()
    }, 500)
  }
}

</script>

<style>
</style>
