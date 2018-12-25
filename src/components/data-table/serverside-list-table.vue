<template>
  <div>
    <q-table
      class="q-mb-xl"
      :data="data"
      :columns="columns"
      row-key="__index"
      :visible-columns="visibleColumns"
      :loading="innerLoading"
      :rows-per-page-options="rowOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filterOpts"
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
          v-if="topRightOptions.cellLines"
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
          v-if="topRightOptions.fullscreenToggle"
        />
        <!-- <table-view-mode-action /> -->
        <global-change-table-view v-show="!props.inFullscreen" />
      </template>
      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr
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
              v-if="actions"
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
              v-if="!$q.platform.is.cordova && actions"
              :delay="1000"
              anchor="bottom middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              Click to see options.
            </q-tooltip>
          </q-td>
        </q-tr>
      </template>
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
import TableViewModeAction from 'components/actions-generic/table-view-mode-action'
import GlobalChangeTableView from 'components/actions-generic/table-view-mode-global-action'

const capitalize = (str) => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

export default {
  components: {
    TableViewModeAction,
    GlobalChangeTableView
  },
  name: 'serverside-list-table',
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
