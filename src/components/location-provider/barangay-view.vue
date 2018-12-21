<template>
  <q-modal
    ref="modalBarangay"
    @hide="onHideBarangayModal"
  >
    <!-- :content-css="{minWidth: '80vw', minHeight: '80vh'}" -->
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          @click="$refs.modalBarangay.hide()"
        >
          <q-icon name="mdi-arrow-left" />
        </q-btn>
        <div class="col-6 col-md-7">
          <q-input
            :before="[{icon:'mdi-magnify'}]"
            :dark="showMaxResult"
            color="default"
            hide-underline
            placeholder="Search Barangays"
            clearable
            v-model="filter"
            @input="searchBarangays"
            @focus="showMaxResult = true"
            @blur="checkFilterStatus"
          />
        </div>
        <div
          class="col-3 col-md-3"
          v-show="showMaxResult"
        >
          <q-select
            placeholder="Results"
            :prefix="!($q.screen.sm || $q.screen.xs) ? 'Result: ' : ''"
            color="default"
            inverted
            v-model="maxResult"
            @focus="showMaxResult = true"
            @input="searchBarangays"
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
        <q-toolbar-title>
        </q-toolbar-title>
        <table-view-mode-action @view-change="viewMode = $event" />
      </q-toolbar>
      <!-- conditional rendering, shows table on list or grid view depending on the selected view mode -->
      <!-- <template v-if="tableViewSettings.mode === 'grid'"> -->
      <div
        v-show="viewMode === 'grid'"
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
          hide-header
          :data="data"
          :columns="columns"
          :filter="filter"
          :selected.sync="selected"
          :visible-columns="visibleColumns"
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
                @input="searchBarangays"
                @focus="showMaxResult = true"
                @blur="checkFilterStatus"
              />
              <template v-if="showMaxResult === true">
                <div class="caption">Results: </div>
                <q-select
                  color="secondary"
                  v-model="maxResult"
                  @focus="showMaxResult = true"
                  @input="searchBarangays"
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
            </template> -->
          <div
            slot="item"
            slot-scope="props"
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-xl-3 transition-generic"
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
                <q-list
                  no-border
                  multiline
                >
                  <q-item
                    v-for="col in props.cols"
                    :key="col.name"
                  >
                    <q-item-side>
                      <q-item-tile class="text-truncate">{{ col.label }}</q-item-tile>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile
                        label
                        style="text-align:right;"
                      >{{ col.value }}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-card-main>
              <q-tooltip
                :disable="$q.platform.is.mobile"
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
      <!-- <template v-else-if="tableViewSettings.mode === 'list'"> -->
      <div
        v-show="viewMode === 'list'"
        class="q-mx-sm q-my-sm"
      >
        <q-table
          binary-state-sort
          ref="listQTable"
          @request="testRequest"
          :rows-per-page-options="rowsOptions"
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
                @input="searchBarangays"
                @focus="showMaxResult = true"
                @blur="checkFilterStatus"
              />
              <template v-if="showMaxResult === true">
                <div class="caption">Results: </div>
                <q-select
                  color="secondary"
                  v-model="maxResult"
                  @focus="showMaxResult = true"
                  @input="searchBarangays"
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
              :disable="$q.platform.is.mobile"
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
</template>

<script>
import TableViewModeAction from 'components/actions-generic/table-view-mode-action'
import { setTimeout } from 'timers'
import { debounce } from 'quasar'
import { mapGlobalFields } from '../../store/globals'

export default {
  computed: {
    ...mapGlobalFields(['tableViewSettings', 'locationData'])
  },
  components: {
    TableViewModeAction
  },
  name: 'barangay-table',
  props: {
    params: [String, Object],
    show1: {
      type: Boolean,
      default: false
      // required: true
    }
  },
  data () {
    return {
      viewMode: 'list',
      showMaxResult: false,
      maxResult: 20,
      rowOptionsDefault: [5, 10, 20, 50, 100, 0],
      rowsOptions: [5, 10, 20, 50, 100, 0],
      pagination: {
        sortBy: 'brgy', // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 0 // current rows per page being displayed
      },
      separator: 'horizontal',
      selected: [],
      filter: '',
      loading: false,
      modalBarangayCopy: {},
      data: [],
      columns: [
        {
          label: 'Barangay',
          field: 'description',
          // filter: false
          name: 'brgy',
          sortable: true,
          required: true,
          align: 'left'
        },
        {
          label: 'City Name',
          field: row => row.city.description,
          // filter: false
          name: 'cname',
          sortable: true,
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
      visibleColumns: ['brgy', 'cname', 'prv', 'reg']
    }
  },
  methods: {
    show () {
      this.$refs.modalBarangay.show()
    },
    testRequest (props) {
      console.log('testRequest', props)
      console.log('testRequest', this.pagination)
    },
    checkFilterStatus () {
      if (this.filter.trim() === '') {
        this.showMaxResult = false
      }
    },
    onHideBarangayModal () {
      // set barangayView to false
      // this.setLocationData({ barangayView: false })
      this.locationData.barangayView = false
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
      // set store data
      // this.setLocationData({ location: props.row })
      this.locationData.location = props.row
      this.selected = [{ __index: name }]
      this.$refs.modalBarangay.hide()
      if (this.params) {
        this.$emit('barangay-location-selected', props.row, this.params)
        return
      }
      this.$emit('barangay-location-selected', props.row)
      // this.selected = []
    },
    cardClick (props) {
      console.log('clicked', props)
      // this.setLocationData({ location: props.row })
      this.locationData.location = props.row
      this.$refs.modalBarangay.hide()
    },
    // ...mapActions('commons', ['setTableViewMode', 'setGenericQTableLoading', 'setLocationData']),
    searchBarangays () {
      if (this.filter.trim() === '') {
        return
      }
      this.debouncedFunction()
    },
    getBarangays () {
      console.log('hey', 'ho')
      this.$axios.get(`/barangays/${this.filter}/${this.maxResult}`)
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
    console.log('platform', this.$q.platform.is.mobile)
    // console.log('unparsed', phloc)
    console.log('mapglobals', this.tableViewSettings)
    console.log('props params', this.params)
    this.loading = true
    this.$axios.get(`/barangays`)
      .then(res => {
        console.log('barangay', res)
        this.loading = false
        this.data = res.data
      })
      .catch(err => {
        this.loading = false
        console.log(err.data)
      })

    this.debouncedFunction = debounce(() => {
      this.loading = true
      this.getBarangays()
    }, 500)
  },
  watch: {
    'pagination' () {
      let table = this.$refs.listQTable
      console.log('listQtable', table)
      console.log('pag', this.pagination)
    }
  }
}

</script>

<style>
</style>
