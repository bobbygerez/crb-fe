<template>
  <div >
    <p class="caption">Filter, Column selection, Separators, Toggle fullscreen</p>
     <q-table
      :data="holdings"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
      :loading="loading"
      :rows-per-page-options="rowsOptions"
      :pagination.sync="paginationControl"
      :separator="separator"
      :filter="filter"
    >
    <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
          clearable
          placeholder="Search holding name..."
        />
      </template>
    <template slot="body" slot-scope="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{props.row.name}}
           <q-popup-edit v-model="props.row.name">
            <q-field count>
              <q-input v-model="props.row.name" />
            </q-field>
          </q-popup-edit>
         </q-td>
        <q-td key="address" :props="props">
          {{props.row.address.street_lot_blk}},
          {{props.row.address.brgy.description}}
          <br />
          {{props.row.address.city.description }},
          {{props.row.address.region.description }}

          </q-td>
          <q-td key="created_at" :props="props">{{props.row.created_at}}</q-td>
          <q-td key="actions" :props="props">
              <q-btn round color="positive" icon="edit" class="q-ma-sm" @click="edit(props.row.id)"/>
              <q-btn round color="negative"  icon="delete" class="q-ma-sm"/>
          </q-td>
      </q-tr>
      
    </template>
    <template slot="top-right" slot-scope="props">
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
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
    </q-table>
    <br />
     <q-modal v-model="minimizedModal" minimized no-esc-dismiss no-backdrop-dismiss :content-css="{minWidth: '80vw', minHeight: '80vh'}" >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ holding.name }}</div>
        <q-input v-model="holding.name" float-label="Holding name" />
        
        <div class="row">
          <div  class="col-xs-12 col-sm-6">
          <q-select
          v-model="holding.address.country_id"
          :options="countries"
          float-label="Country"
          clearable
        /></div>
          <div class="col-xs-12 col-sm-6"><q-select
          v-model="holding.address.region_id"
          :options="regions"
          float-label="Region"
          clearable
        /></div>
         
        </div>
        <div class="row">
          <div  class="col-xs-12 col-sm-4"><q-select
          v-model="selectedCountry"
          :options="options"
          float-label="Province"
          clearable
        /></div>
          <div class="col-xs-12 col-sm-4"><q-select
          v-model="selectedCountry"
          :options="options"
          float-label="City"
          clearable
        /></div>
        <div class="col-xs-12 col-sm-4"><q-select
          v-model="selectedCountry"
          :options="options"
          float-label="Barangay"
          clearable
        /></div>

         
        </div>
        <br />
        <q-btn color="red" v-close-overlay label="Close" />
        <q-btn color="primary" v-close-overlay label="Update" class="q-ml-sm"/>
      </div>
    </q-modal>
    </div>
</template>

<script>
import tableData from 'assets/table-data'
import _ from 'lodash'
export default {
  data () {
    return {
       selectedCountry: '',
       listOptions: [
        {
          label: 'Google',
          icon: 'email',
          value: 'goog'
        },
        {
          label: 'Facebook',
          icon: 'chat',
          description: 'Enables communication',
          value: 'fb'
        },
        {
          label: 'Twitter',
          inset: true,
          rightIcon: 'live_help',
          value: 'twtr'
        },
        {
          label: 'Apple Inc.',
          inset: true,
          stamp: '10 min',
          value: 'appl'
        },
        {
          label: 'Oracle',
          description: 'Some Java for today?',
          icon: 'unarchive',
          rightIcon: 'widgets',
          value: 'ora'
        }
      ],
       options: [
        {
          label: 'Googlee',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twtr'
        },
        {
          label: 'Apple Inc.',
          value: 'appl'
        },
        {
          label: 'Oracle',
          value: 'ora'
        }
      ],
      terms: '',
      holdingName: '',
      minimizedModal: false,
      rowsOptions: [3, 5, 7, 10, 15, 25, 50, 0],
      loading: false,
      columns:['name', 'address'],
      markers: [{
            position: {lat: 12.879721, lng: 121.774017}
          }],
        markersPosition: {lat: 12.879721, lng: 121.774017},
       columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'address', 
          label: 'Address',
          align: 'left',
          
        },
        { name: 'created_at', 
          label: 'Created At',
          align: 'left',
          sortable: true
          
        },
        { name: 'actions', 
          label: 'Actions',
          align: 'left',
          
        }
      ],
      filter: '',
      visibleColumns: ['name', 'address', 'created_at', 'actions'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [
        // initial selection
        { name: 'Ice cream sandwich' }
      ],
      pagination: {
        page: 2
      },
      paginationControl: { rowsPerPage: 15, page: 1 },
      loading: false,
      dark: true,
      selectedSecond: [
        { name: 'Eclair' }
      ]
    }
  },
  computed: {
    regions(){
      return this.$store.getters.regions
    },
    countries(){
      return this.$store.getters.countries
    },
    holding(){
      return this.$store.getters.holding
    },
    holdings(){
      return _.values(this.$store.getters.holdings)
    },
    tableClass () {
      if (this.dark) {
        return 'bg-black'
      }
    }
  },
  methods: {
    deleteRow () {
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
    },
    edit(id){
      this.$store.dispatch('HOLDING_EDIT', id)
      this.minimizedModal = true
    }
  },
  watch: {
    'paginationControl.page' (page) {
      this.$q.notify({
        color: 'secondary',
        message: `Navigated to page ${page}`,
        actions: page < 4
          ? [{
            label: 'Go to last page',
            handler: () => {
              this.paginationControl.page = 4
            }
          }]
          : null
      })
    },
    'props.row.name' (sample){
      console.log('asdf')
    },
    'holding.name'(val){
      this.$store.dispatch('holdingName', val)
    },
    'holding.address.country_id'(val){
      this.$store.dispatch('GET_REGIONS', val)
    },
    'holding.address.region_id'(val){
      this.$store.dispatch('GET_PROVINCES', val)
    }
  }
}
</script>