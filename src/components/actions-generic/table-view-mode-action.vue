<template>
  <div>
    <q-btn flat round dense :icon="tableViewSettings.icon" name="Change View" @click="changeViewMode()">
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
import { mapGlobalFields } from '../../store/globals'

export default {
  name: 'table-view-mode-action',
  data () {
    return {
      gridIcon: 'mdi-view-grid',
      listIcon: 'mdi-view-list',
      tableViewModeIcon: this.listIcon,
      viewModeLabel: 'Grid view'
    }
  },
  methods: {
    changeViewMode () {
      let viewMode = this.tableViewSettings.mode === 'grid' ? 'list' : 'grid'
      this.tableViewSettings.mode = viewMode
      this.viewModeLabel = this.tableViewSettings.mode === 'grid' ? 'List view' : 'Grid view'
      this.tableViewSettings.icon = this.tableViewSettings.mode === 'grid' ? this.listIcon : this.gridIcon
    }
    // ...mapActions('commons', ['setTableViewMode'])
  },
  computed: {
    ...mapGlobalFields(['tableViewSettings'])
  },
  mounted () {
    this.tableViewModeIcon = this.tableViewMode === 'list' ? this.gridIcon : this.listIcon
  }
}
</script>

<style>
</style>
