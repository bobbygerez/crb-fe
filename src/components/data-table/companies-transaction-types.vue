<template>
  <div>

    <q-table
      ref="table"
      color="primary"
      title="Company's Transaction Types"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template
        slot="top-right"
        slot-scope="props"
      >
        <q-search
          hide-underline
          v-model="filter"
        />
      </template>

      <template
        slot="body"
        slot-scope="props"
      >
        <q-tr :props="props">
          <q-td key="name">
            {{props.row.name}}
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
                    @click.native="$emit(action, { id: props.row.id, companyName: props.row.name })"
                    v-close-overlay
                  >
                    <q-item-main :label="action" />
                  </q-item>
                </template>
              </q-list>
            </q-popover>
          </q-td>
          <q-td key="desc">
            {{props.row.desc}}
          </q-td>
          <q-td
            key="created"
            :props="props"
          >
            {{props.row.created_at}}
          </q-td>

        </q-tr>

      </template>

    </q-table>

  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from 'lodash'

export default {
  data () {
    return {
      actions: ['Transaction Types'],
      selectedChartAccount: '',
      columns: [{
        name: 'name',
        label: 'Company Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'desc',
        label: 'Description',
        align: 'left',
        field: 'desc'
      }
      ],
      filter: '',
      loading: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      }
    }
  },
  computed: {
    companies () {
      return this.$store.getters['chartAccounts/companies']
    }
  },
  methods: {
    request (props) {
      this.loading = true
      this.$axios
        .get(`/transaction-type-companies?filter=${this.filter}&page=${props.pagination.page}&perPage=${
          props.pagination.rowsPerPage
        }`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.companies.data)
          this.serverPagination.rowsNumber = res.data.companies.total
          this.lastPage = res.data.companies.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    }

  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })

    this.$on('Transaction Types', (obj) => {
      this.$router.push({ path: `/dashboard/transaction-types/company/${obj.id}` })
      //   this.$store.dispatch('chartAccounts/company', obj);
    })
  }
}
</script>
