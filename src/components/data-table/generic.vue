<template>
<div>
    <q-table
    :data="data"
    :columns="columns"
    selection="single"
    :selected.sync="selected"
     row-key="id"
     :pagination.sync="paginationControl"
     :filter="filterOpts"
     @request="$emit('serverside-request', $event)"
     :title="title"
     :loading="loading">
        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filterOpts" placeholder="Search user..." outlined class="q-ma-sm">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>

    </q-table>

</div>
</template>

<script>
export default {
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
    search: {
      Boolean,
      default: true
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
    rowOptions: {
      type: Array,
      default: () => [3, 5, 7, 10, 15, 25, 50, 0]
    },

    // the filter model of your table
    searchField: {
      type: String,
      default: () => ''
    },

    title: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
  watch: {
    'selected' (val) {
      this.$emit('selected', val)
    }
  }

}
</script>
