<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Accounting Standards"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template slot="top-right">
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
          <q-td key="name">{{props.row.name }}
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
                    @click.native="$emit(action, props.row.id)"
                    v-close-overlay
                  >
                    <q-item-main :label="action" />
                  </q-item>
                </template>
              </q-list>
            </q-popover>

          </q-td>
          <q-td key="company">{{props.row.mask }}</q-td>
          <q-td key="created_at">{{props.row.created_at }}</q-td>
        </q-tr>
      </template>

    </q-table>
    <q-modal
      v-model="editAccountingStandardModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">Edit {{ accountingStandard.name }}</div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="accountingStandard.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="accountingStandard.mask"
              float-label="Mask"
              clearable
            />
          </div>
        </div>
        <br />
        <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="update()"
          label="Update"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
    <q-modal
      v-model="newAccountingStandard"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="q-display-1 q-mb-md">New Accounting Standard</div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="accountingStandard.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="accountingStandard.mask"
              float-label="Mask"
              clearable
            />
          </div>
        </div>
        <br />
        <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="store()"
          label="Create"
          class="q-ml-sm"
        />

      </div>
    </q-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      editAccountingStandardModal: false,
      actions: ['edit', 'delete'],
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [{
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'mask',
        label: 'Mask',
        field: 'mask',
        align: 'left'
      },
      {
        name: 'created_at',
        label: 'Created At',
        field: 'created_at',
        align: 'left'
      }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('accountingStandards', ['accountingStandard', 'newAccountingStandard'])

  },
  methods: {
    store () {
      this.$axios
        .post(`/accounting_standards`, this.accountingStandard)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.accountingStandard.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },

    update () {
      this.$axios.put(`/accounting_standards/${this.accountingStandard.id}`, this.accountingStandard)
        .then((res) => {
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.accountingStandard.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
          this.hideModal()
        })
        .catch()
    },
    hideModal () {
      this.$store.dispatch('accountingStandards/newAccountingStandard', false)
      this.editAccountingStandardModal = false
    },
    showModal () {
      this.editAccountingStandardModal = true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/accounting_standards?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.accountingStandards.data)
          this.serverPagination.rowsNumber = res.data.accountingStandards.total
          this.lastPage = res.data.accountingStandards.last_page
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

    this.$on('edit', function (accStaId) {
      this.$axios.get(`/accounting_standards/${accStaId}/edit?id=${accStaId}`)
        .then(res => {
          this.showModal()
          this.$store.dispatch('accountingStandards/accountingStandard', res.data.accountingStandard)
        })
    })

    this.$on('delete', function (accStaId) {
      this.$axios.get(`/accounting_standards/${accStaId}?id=${accStaId}`).then(res => {
        this.$store.dispatch('accountingStandards/accountingStandard', res.data.accountingStandard)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.accountingStandard.name} ?`,
          actions: [{
            label: 'OK',
            handler: () => {
              this.$axios
                .delete(`/accounting_standards/${this.accountingStandard.id}?id=${this.accountingStandard.id}`)
                .then(res => {
                  this.$q.notify({
                    color: 'positive',
                    icon: 'check',
                    message: `${this.accountingStandard.name} deleted successfully`
                  })
                  this.request({
                    pagination: this.serverPagination,
                    filter: this.filter
                  })
                  this.hideModal()
                })
                .catch(err => {
                  this.$q.notify({
                    color: 'negative',
                    icon: 'warning',
                    message: `${err.response.data.message}`
                  })
                })
            }
          }]
        })
      })
    })
  },
  watch: {
    'accountingStandard.name' (val) {
      this.$store.dispatch('accountingStandards/accountingStandardName', val)
    },
    'accountingStandard.mask' (val) {
      this.$store.dispatch('accountingStandards/accountingStandardMask', val)
    }
  }
}
</script>
