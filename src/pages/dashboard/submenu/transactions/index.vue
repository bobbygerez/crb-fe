<template>
  <div class="q-pa-sm">

    <div class="row">
      <div class="col-xs-6">
        <div class="q-display-1 q-mb-md">
          <q-select
            v-model="transaction.transactable_type"
            :options="entities"
            float-label="Entity Type"
            clearable
          />
        </div>
      </div>
      <div class="col-xs-6">
        <div class="q-display-1 q-mb-md">
          <q-select
            filter
            v-model="transaction.transactable_id"
            :options="userEntities"
            float-label="Entity Name"
            clearable
          />
        </div>
      </div>

    </div>
    <q-table
      ref="table"
      color="primary"
      :title="`${titleTransaction.name} Transactions`"
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
          <q-td key="transactionType">{{props.row.transaction_type.name }}
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
                    @click.native="$emit(action, props.row)"
                    v-close-overlay
                  >
                    <q-item-main :label="action" />
                  </q-item>
                </template>
              </q-list>
            </q-popover>
          </q-td>

          <q-td key="chartAccount">{{props.row.chart_account.name }}</q-td>
          <q-td key="total_amount">{{props.row.total_amount |currency('₱ ') }}</q-td>
          <q-td key="remarks">{{props.row.remarks }}</q-td>
          <q-td key="created_at">{{props.row.created_at }}</q-td>
        </q-tr>
      </template>

    </q-table>
    <q-modal
      v-model="newTransactionType"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12">
            <div class="q-display-1 q-mb-md">New Transaction Type</div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="transactionType.name"
              float-label="Transaction Type"
              clearable
            />
          </div>

          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="transactionType.desc"
              float-label="Description"
              type="textarea"
              :max-height="100"
              rows="2"
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
          label="Submit"
          class="q-ml-sm"
        />
      </div>
    </q-modal>
    <q-modal
      v-model="editTransactionType"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12">
            <div class="q-display-1 q-mb-md">Edit {{ transactionType.name }}</div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="transactionType.name"
              float-label="Transaction Type"
              clearable
            />
          </div>

          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="transactionType.desc"
              float-label="Description"
              type="textarea"
              :max-height="100"
              rows="2"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="transactionType.desc"
              float-label="Description"
              type="textarea"
              :max-height="100"
              rows="2"
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
     <q-page-sticky
    position="bottom"
    :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]"
    v-bind="$attrs"
  >
    <transition
      appear
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <q-btn-group rounded >
        <q-btn rounded icon="payment" color="primary"  @click="addTransaction">
          <q-tooltip :delay="1000" :offset="[0, 10]">Disbursement Journal</q-tooltip>
        </q-btn>
        <q-btn rounded icon="receipt" color="primary">
          <q-tooltip :delay="1000" :offset="[0, 10]">Receipt Journal</q-tooltip>
        </q-btn>
        <q-btn rounded icon="account_balance_wallet" color="primary">
          <q-tooltip :delay="1000" :offset="[0, 10]"> General Journal</q-tooltip>
        </q-btn>
      </q-btn-group>
    </transition>
  </q-page-sticky>

   
  </div>
</template>

<script>
import slug from 'components/mixins/slug'
import _ from 'lodash'
import {
  mapState, mapActions
} from 'vuex'
export default {
  mixins: [slug],
  data () {
    return {
      companyId: '',
      name: '',
      actions: ['edit', 'delete'],
      selectedChartAccount: 0,
      columns: [
        {
          name: 'transactionType',
          label: 'Transaction Type',
          field: 'transactionType',
          align: 'left'
        },
        {
          name: 'chartAccount',
          label: 'Chart of Account',
          align: 'left',
          field: 'chartAccount'
        },
        {
          name: 'total_amount',
          label: 'Total Amount',
          align: 'left',
          field: 'total_amount'
        },
        {
          name: 'remarks',
          label: 'Remarks',
          align: 'left',
          field: 'remarks'
        },
        {
          name: 'created_at',
          label: 'Created At',
          align: 'left',
          field: 'created_at'
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
    ...mapState('transactionTypes', ['editTransactionType', 'transactionType', 'newTransactionType']),
    ...mapState('transactions', ['entity', 'company', 'transaction', 'titleTransaction', 'entities']),
    userEntities () {
      return this.$store.getters['transactions/userEntities'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    ...mapActions('transactions', ['setEditTransaction']),
    addTransaction () {
      if (this.transaction.transactable_id !== '' && this.transaction.transactable_type !== '') {
        this.$router.push(`/dashboard/transactions/disbursement`)
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please select entity type and entity name.`
        })
      }
    },
    store () {
      this.$axios
        .post(`/transaction_types`, this.transactionType)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.transactionType.name} created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    hideModal () {
      this.$store.dispatch('transactionTypes/newTransactionType', false)
      this.$store.dispatch('transactionTypes/editTransactionType', false)
    },
    showModal () {
      this.$store.dispatch('transactionTypes/editTransactionType', true)
    },
    update () {
      this.$axios
        .put(`/transaction_types/${this.transactionType.id}?id=${this.transactionType.id}`, this.transactionType)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.transactionType.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    request (props) {
      this.loading = true
      this.$axios.get(`transactions?modelType=${this.transaction.transactable_type}&id=${this.transaction.transactable_id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}`)
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.transactions.data)
          this.serverPagination.rowsNumber = res.data.transactions.total
          this.lastPage = res.data.transactions.last_page
          this.loading = false
          this.$store.dispatch('transactions/titleTransaction', res.data.entity)
        })
        .catch(() => {
          this.serverData = []
          this.loading = false
        })
    }

  },
  mounted () {
    if (this.transaction.transactable_id !== '' && this.transaction.transactable_type !== '') {
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    }

    this.$on('edit', function (obj) {
      this.setEditTransaction(obj)
      if(obj.transaction_type_id === 1){
        this.$router.push(`/dashboard/transactions/disbursement/edit`)
      }
      
    })
  },
  watch: {
    'transaction.transactable_id' (val) {
      if (val !== '') {
        this.request({
          pagination: this.serverPagination,
          filter: this.filter
        })
        this.$store.dispatch("transactions/transactionTransactableId", val);
      }
    },
    'transaction.transactable_type' (val) {
      if (val !== '') {
        this.$axios
          .get(
            `/transactions-entities?modelType=${val}`
          )
          .then(res => {
            this.$store.dispatch('transactions/userEntities', res.data.userEntities)
            this.$store.dispatch("transactions/transactionTransactableType", val);
          })
      }
    }
  }
}
</script>
