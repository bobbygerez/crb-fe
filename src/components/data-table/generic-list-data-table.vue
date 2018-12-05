<template>
  <div>
    <q-table
      class="q-mb-xl q-pb-lg"
      :data="data"
      :columns="columns"
      row-key="__index"
      :visible-columns="visibleColumns"
      :loading="loading"
      :rows-per-page-options="rowsOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filter"
      color="primary"
      :selected.sync="selected"
      v-bind="$attrs"
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
          placeholder="Search..."
        />
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
      <!-- <template
        slot="body"
        slot-scope="props"
      >
        <q-tr
          :props="props"
          @click.native="props.selected = !props.selected; selected = [{ __index: props.row.__index }]"
          :class="'cursor-pointer '"
        >
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template>{{ col.value }}</template>
          </q-td>
          <q-popover touch-position>
            <q-list
              link
              style="min-width: 100px"
            >
              <q-item>
                <q-item-main label="View" />
              </q-item>
              <q-item>
                <q-item-main label="Edit" />
              </q-item>
              <q-item @click.native="notify('delete')">
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
          >
            Click to see options.
          </q-tooltip>
        </q-tr>
      </template> -->
      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr
          class="cursor-pointer"
          :props="props"
          @click.native="selected = [{ __index: props.row.__index }]; test12(props)"
        >
          <template v-for="col in props.cols" :props="props">
            <q-td :key="col.name" >{{ col.value }}</q-td>
          </template>

          <!-- <q-td
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
          </q-td> -->

          <q-popover touch-position>
            <q-list
              link
              style="min-width: 100px"
            >
              <!-- <q-item :to="currentRoute + '/' + props.row.id + '/view'">
                <q-item-main label="View" />
              </q-item>-->
              <q-item
                v-close-overlay
              >
                <q-item-main label="Edit" />
              </q-item>
              <q-item
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
    </q-table>
    <q-page-sticky
      position="bottom-right"
      :offset="[16, 16]"
      z-index="9999"
    >
      <q-btn
        color="primary"
        fab
        v-back-to-top.animate="{offset: 400, duration: 200}"
        class="animate-pop"
      >
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  name: 'generic-list-data-table',
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
    columns: {
      type: [Array, Object],
      default: null
    }
  },
  inheritAttrs: false,
  data () {
    return {
      rowsOptions: [3, 5, 7, 10, 15, 25, 50, 0],
      loading: false,
      filter: '',
      visibleColumns: ['name', 'address', 'created_at'],
      separator: 'horizontal',
      selected: [],
      paginationControl: { rowsPerPage: 7, page: 1 },
      dark: true
    }
  },
  methods: {
    notify (notif) {
      this.$q.notify({
        type: 'negative',
        message: 'Not allowed to delete.'
      })
    }
  },
  mounted () {
    console.log('mounted', this.data, this.columns)
  }
}
</script>

<style>
</style>
