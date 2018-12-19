<template>
  <div class="q-mb-xl">
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
        <!-- <table-view-mode-action /> -->
        <global-change-table-view :color="theme" />
      </template>

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
      <!-- <template

      > -->
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
        v-back-to-top.animate="{offset: 400, duration: 200}"
        class="animate-pop"
      >
        <q-icon name="mdi-chevron-up" />
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapGlobalFields } from '../../store/globals'
import GlobalChangeTableView from 'components/actions-generic/table-view-mode-global-action'

const capitalize = (str) => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

export default {
  components: {
    GlobalChangeTableView
  },
  name: 'serverside-dynamic-table',
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
    columns: {
      type: [Array, Object],
      default: null
    },
    actions: {
      type: [Array, Object],
      default: null
    },
    theme: {
      type: String,
      default: 'primary'
    },
    search: {
      Boolean,
      default: true
    },
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
    innerLoading: {
      type: Boolean,
      default: () => false
    },
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
      // filter: '',
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
    console.log('mounted', this.data, this.columns)
  }
}
</script>

<style>
</style>
