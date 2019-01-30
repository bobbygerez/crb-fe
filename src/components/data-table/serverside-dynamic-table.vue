<template>
  <div class="q-mb-xl">
    <!-- inner loading animation for grid table view -->
    <q-inner-loading :visible="innerLoading && tableViewSettingsGlobal.mode === 'grid'">
      <q-spinner
        color="secondary"
        :size="30"
      />
    </q-inner-loading>
    <q-table
      :grid="tableViewSettingsGlobal.mode === 'grid'"
      :hide-header="tableViewSettingsGlobal.mode === 'grid'"
      :data="data"
      :columns="columns"
      row-key="__index"
      :visible-columns="visibleColumns"
      :loading="innerLoading"
      :rows-per-page-options="rowOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filterOpts"
      :selection="tableViewSettingsGlobal.mode === 'grid' ? 'single' : 'none'"
      :selected.sync="selected"
      v-bind="$attrs"
      :color="theme"
      @request="$emit('serverside-request', $event)"
    >
      <template
        slot="top-left"
        slot-scope="props"
        v-if="search"
      >
        <q-search
          hide-underline
          :color="theme"
          v-model="filterOpts"
          class="col-6"
          clearable
          placeholder="Search..."
        />
      </template>
      <template
        slot="top-right"
        slot-scope="props"
        v-if="topRightOptions"
      >
        <q-table-columns
          label="Fields"
          :color="theme"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
          v-if="topRightOptions.visibleCols"
        />
        <q-select
          :color="theme"
          v-model="separator"
          v-show="topRightOptions.cellLines && tableViewSettingsGlobal.mode === 'list'"
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
          :color="theme"
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-show="topRightOptions.fullscreenToggle"
        />
        <!-- toggle table view mode to grid or list -->
        <global-change-table-view :color="theme" />
      </template>

      <!-- For Grid View -->
      <div
        v-show="tableViewSettingsGlobal.mode === 'grid'"
        slot="item"
        slot-scope="props"
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-xl-3 transition-generic"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card
          class="transition-generic cursor-pointer"
          :class="props.selected ? 'bg-grey-2' : ''"
          @click.native="selected = [{ __index: props.row.__index }]; props.selected = true"
        >
          <q-card-title class="relative-position">
            <div class="ellipsis">{{ props.cols[0].value }}</div>
          </q-card-title>
          <q-card-separator />
          <q-card-main class="q-pa-none">
            <q-list
              no-border
              multiline
            >
              <template v-for="(col,i) in props.cols">
                <q-item
                  v-if="i !== 0"
                  :key="col.name"
                >
                  <q-item-side>
                    <q-item-tile class="text-truncate">{{ col.label }}</q-item-tile>
                  </q-item-side>
                  <q-item-main>
                    <q-item-tile
                      label
                      style="text-align:right;"
                      class="ellipsis"
                    >{{ col.value }}</q-item-tile>
                  </q-item-main>
                </q-item>
              </template>
            </q-list>
          </q-card-main>
          <!-- Shows a menu of actions passed in the table -->
          <q-popover
            touch-position
            v-show="actions"
          >
            <q-list
              link
              style="min-width: 100px"
            >
              <template v-for="(action, idx) in actions">
                <!-- included props.row beside the id to be emitted data -->
                <q-item
                  :key="idx"
                  @click.native="$emit(`${action}`, props.row.id, props.row)"
                  v-close-overlay
                >
                  <q-item-main :label="capitalize(`${action}`)" />
                </q-item>
              </template>
            </q-list>
          </q-popover>
          <q-tooltip
            :disable="$q.platform.is.mobile && actions"
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

      <!-- For List Table View -->
      <q-tr
        slot="body"
        slot-scope="props"
        v-show="tableViewSettingsGlobal.mode === 'list'"
        :props="props"
        @click.native="selected = [{ __index: props.row.__index }]"
        :class="'cursor-pointer'"
      >
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <template>{{ col.value }}</template>
          <q-popover
            touch-position
            v-show="actions"
          >
            <q-list
              link
              style="min-width: 100px"
            >
              <template v-for="(action, idx) in actions">
                <q-item
                  :key="idx"
                  @click.native="$emit(`${action}`, props.row.id, props.row)"
                  v-close-overlay
                >
                  <q-item-main :label="capitalize(`${action}`)" />
                </q-item>
              </template>
            </q-list>
          </q-popover>
          <q-tooltip
            v-show="!$q.platform.is.cordova && actions"
            :delay="1000"
            anchor="bottom middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            Click to see options.
          </q-tooltip>
        </q-td>
      </q-tr>
      <!-- </template> -->
    </q-table>
    <q-page-sticky
      position="bottom-right"
      :offset="[16, 16]"
      z-index="9999"
    >
      <q-btn
        :color="theme"
        fab
        v-back-to-top.animate="{offset: 400, duration: 100}"
        class="animate-pop"
        icon="mdi-chevron-up"
      />
    </q-page-sticky>
  </div>
</template>

<script>
/**
 * @description A Custom DataTable implementation for the purpose of uniform table look and feel.
 * This is has a server side functionality which calls the index function of your API
 * for Filtering results
 * @author Aldrin Marquez
 */
import { mapGlobalFields } from '../../store/globals'
import GlobalChangeTableView from 'components/actions-generic/table-view-mode-global-action'

const capitalize = (str) => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

export default {
  components: {
    GlobalChangeTableView
  },
  name: 'serverside-dynamic-table',
  props: {
    // the table data
    data: {
      type: [Array, Object],
      default: null
    },
    // column definition
    columns: {
      type: [Array, Object],
      default: null
    },
    // actions shown when user right clicks on row or onto a table item
    // pass an array of strings pertaining to the actions that are available
    // for the current table, action name will be emitted
    // ie. if you pass :actions="['edit']" edit event will be emitted when you click on the Edit action
    actions: {
      type: [Array, Object],
      default: null
    },
    // color theme
    theme: {
      type: String,
      default: 'primary'
    },
    // pass a false if search is disabled
    search: {
      Boolean,
      default: true
    },
    // pass this prop if you want to limit the options
    // on the table. props are shown in the default
    topRightOptions: {
      type: Object,
      default: () => {
        return {
          visibleCols: true,
          cellLines: true,
          fullscreenToggle: true
        }
      }
    },
    // current pagination settings of the table
    pagination: {
      type: Object,
      default: () => {
        return {
          rowsPerPage: 7,
          page: 1
        }
      }
    },
    dark: {
      type: Boolean,
      default: () => false
    },
    rowOptions: {
      type: Array,
      default: () => [3, 5, 7, 10, 15, 25, 50, 0]
    },
    // pass a boolean model if you want to show a loading animation
    innerLoading: {
      type: Boolean,
      default: () => false
    },
    // the filter model of your table
    searchField: {
      type: String,
      default: () => ''
    }
  },
  directives: {
  },
  inheritAttrs: false,
  data () {
    return {
      visibleColumns: [],
      separator: 'horizontal',
      selected: []
    }
  },
  computed: {
    ...mapGlobalFields(['tableViewSettingsGlobal']),
    paginationControl: {
      set () {

      },
      get () {
        return this.pagination
      }
    },
    filterOpts: {
      set (val) {
        this.$emit('search-change', val)
      },
      get () {
        return this.searchField
      }
    }
  },
  methods: {
    capitalize,
    notify (notif) {
      this.$q.notify({
        type: 'negative',
        message: 'Not allowed to delete.'
      })
    }
  },
  mounted () {
    this.visibleColumns = this.columns.map(v => {
      if (v.hideonload) {
        return
      }
      return v.name
    })
  }
}
</script>

<style>
</style>
