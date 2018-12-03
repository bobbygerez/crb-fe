<template>
  <q-modal
    ref="genericModal"
    :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    @hide="$emit('generic-modal-hidden')"
    v-bind="$attrs"
    v-model="madel"
  >
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          @click="$refs.genericModal.hide()"
        >
          <q-icon name="mdi-arrow-left" />
        </q-btn>
        <q-toolbar-title>
          {{ moduleTitle }}
        </q-toolbar-title>
      </q-toolbar>
      <!-- Body will be appended here thru slot -->
      <slot />
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { debounce } from 'quasar'
// import { mapGlobalFields } from '../../store/globals'

export default {
  data () {
    return {
      madel1: this.modalModel
    }
  },
  computed: {
    madel: {
      get () {
        // get current props value
        console.log('getModel', this.modalModel)
        return this.modalModel
      },
      set () {
        console.log('setModel', this.modalModel)
        // do nuffin
      }
    }
  },
  name: 'generic-modal',
  props: {
    params: [String, Object],
    show1: {
      type: Boolean,
      default: false
      // required: true
    },
    moduleTitle: String,
    modalModel: [String, Boolean, Object]
  },
  methods: {
    show () {
      this.$refs.genericModal.show()
    },
    hide () {
      this.$refs.genericModal.hide()
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
      this.loading = true
      debounce(this.getBarangays(), 500)
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
    console.log('props params', this.params)
    console.log('model ', this.modalModel)
  },
  watch: {
    'pagination' () {
      let table = this.$refs.listQTable
      console.log('listQtable', table)
      console.log('pag', this.pagination)
      // if (this.pagination.rowsPerPage === 0 || (this.pagination.rowsPerPage > 20 && this.pagination.rowsPerPage < 100)) {
      //   console.log('pag', this.pagination.rowsPerPage)
      //   this.rowsOptions = []
      // } else {
      //   console.log('pag', this.pagination.rowsPerPage)
      //   this.rowsOptions = this.rowOptionsDefault
      // }
    }
  }
}

</script>

<style>
</style>
