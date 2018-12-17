<template>
  <div>
    <!-- <div v-show="tableViewSettings.mode === 'grid'" class="q-mx-sm q-my-sm"> -->
    <q-inner-loading :visible="loading">
      <q-spinner
        color="secondary"
        :size="30"
      />
    </q-inner-loading>
    <q-table
      grid
      selection="single"
      :pagination.sync="paginationControl"
      hide-header
      :data="data"
      :columns="columns"
      :filter="filter"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
      row-key="__index"
      v-bind="$attrs"
      :color="theme"
    >
      <template
        slot="top-left"
        slot-scope="props"
        v-if="search"
      >
        <q-search
          hide-underline
          :color="theme"
          v-model="filter"
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
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="topRightOptions.fullscreenToggle"
        />
        <!-- <table-view-mode-action /> -->
        <global-change-table-view />
      </template>

      <div
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
            v-if="actions"
          >
            <q-list
              link
              style="min-width: 100px"
            >
              <template v-for="(action, idx) in actions">
                <q-item
                  :key="idx"
                  @click.native="$emit(`${action}`, props.row.id)"
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
  name: 'generic-list-data-table',
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
    }
  },
  directives: {
  },
  inheritAttrs: false,
  data () {
    return {
      rowsOptions: [3, 5, 7, 10, 15, 25, 50, 0],
      loading: false,
      filter: '',
      visibleColumns: [],
      separator: 'horizontal',
      selected: [],
      paginationControl: { rowsPerPage: 7, page: 1 },
      dark: true
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
