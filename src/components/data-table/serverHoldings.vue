<template>
  <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="name"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request"
  >
    <template slot="top-right" slot-scope="props">
      <q-search hide-underline v-model="filter" />
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
          <q-btn round color="negative"  icon="delete" class="q-ma-sm" @click="deleteRow(props.row.id)"/>
        </q-td>
      </q-tr>
      
    </template>

    <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
      <q-btn
        round dense size="sm" icon="undo" color="secondary" class="q-mr-sm"
        :disable="props.isFirstPage"
        @click="props.prevPage"
      />
      <div class="q-mr-sm" style="font-size: small">
        Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
      </div>
      <q-btn
        round dense size="sm" icon="redo" color="secondary"
        :disable="props.isLastPage"
        @click="props.nextPage"
      />
    </div>

  </q-table>
</template>

<script>
import tableData from 'assets/table-data'
import _ from 'lodash'
import axios from 'axios'
export default {
  data () {
    return {
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        pagesNumber: 5,
        rowsNumber: 15 // specifying this determines pagination is server-side
      },
      serverData: [],
      serverPage: {},
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
    }
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
      .get(process.env.API + `/holdings?page=${pagination.page}&perPage=${pagination.rowsNumber}&sortBy=${pagination.sortBy}&descending=${pagination.descending}&filter=${filter}`)
      .then(({ data }) => {

        // updating pagination to reflect in the UI
        this.serverPagination = pagination

        // we also set (or update) rowsNumber
        this.serverPagination.page = data.holdings.current_page
        this.serverPagination.pagesNumber = data.holdings.last_page

        // then we update the rows with the fetched ones
        this.serverData = _.values(data.holdings.data)


        // finally we tell QTable to exit the "loading" state
        this.loading = false
      })
      .catch(error => {
        // there's an error... do SOMETHING

        // we tell QTable to exit the "loading" state
        this.loading = false
      })
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>