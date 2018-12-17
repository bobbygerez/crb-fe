<template>
  <div>
    <q-btn flat round dense :icon="tableViewSettingsGlobal.icon" name="Change View" @click="changeViewMode"
      v-bind="$attrs"
    >
      <q-tooltip :disable="$q.platform.is.mobile" :delay="500">
        {{ this.tableViewSettingsGlobal.tooltipMsg }}
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
  name: 'global-change-table-view',
  inheritAttrs: false,
  methods: {
    changeViewMode () {
      this.tableViewSettingsGlobal.mode = this.tableViewSettingsGlobal.mode === 'grid' ? 'list' : 'grid'
      this.tableViewSettingsGlobal.tooltipMsg = this.tableViewSettingsGlobal.mode === 'grid' ? 'List view' : 'Grid view'
      this.tableViewSettingsGlobal.icon = this.tableViewSettingsGlobal.mode === 'grid' ? this.tableViewSettingsGlobal.iconList : this.tableViewSettingsGlobal.iconGrid
    }
    // ...mapActions('commons', ['setTableViewMode'])
  },
  computed: {
    ...mapGlobalFields(['tableViewSettingsGlobal'])
  },
  mounted () {
    // this.tableViewModeIcon = this.tableViewMode === 'list' ? this.gridIcon : this.listIcon
    this.changeViewMode()
  }
}
</script>

<style>
</style>
