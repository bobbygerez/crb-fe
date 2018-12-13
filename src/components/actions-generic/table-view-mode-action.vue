<template>
  <div>
    <q-btn flat round dense :icon="tableViewModeIcon" name="Change View" @click="changeViewMode(); $emit('view-change', viewMode)"
      v-bind="$attrs"
    >
      <q-tooltip :disable="$q.platform.is.mobile" :delay="500">
        {{ viewModeLabel }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
/**
 * This action changes the view type of generic datatable components
 */
// import { mapActions, mapState } from 'vuex'
// import { mapGlobalFields } from '../../store/globals'

export default {
  name: 'table-view-mode-action',
  inheritAttrs: false,
  data () {
    return {
      gridIcon: 'mdi-view-grid',
      listIcon: 'mdi-view-list',
      // tableViewModeIcon: this.listIcon,
      // viewModeLabel: 'Grid view',
      viewMode: 'list'
    }
  },
  methods: {
    changeViewMode () {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
      // this.viewModeLabel = this.viewMode === 'grid' ? 'List view' : 'Grid view'
    }
    // ...mapActions('commons', ['setTableViewMode'])
  },
  computed: {
    // ...mapGlobalFields(['tableViewSettings']),
    tableViewModeIcon () {
      return this.viewMode === 'grid' ? this.listIcon : this.gridIcon
    },
    viewModeLabel () {
      return this.viewMode === 'grid' ? 'List view' : 'Grid view'
    }
  },
  mounted () {
    // this.tableViewModeIcon = this.tableViewMode === 'list' ? this.gridIcon : this.listIcon
    // this.changeViewMode()
  }
}
</script>

<style>
</style>
