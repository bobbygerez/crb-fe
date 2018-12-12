<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Trademarks"
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
          <q-td key="name">{{props.row.name }}</q-td>
          <q-td key="company">{{props.row.company.name }}</q-td>
          <q-td key="desc">{{props.row.desc }}</q-td>
          <q-td key="created">{{ props.row.created_at }}</q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              round
              outline
              color="positive"
              icon="edit"
              class="q-ma-sm"
              @click="edit(props.row.id)"
            />
            <q-btn
              round
              outline
              color="negative"
              icon="delete"
              class="q-ma-sm"
              @click="deleteRow(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-modal
      v-model="editTrademarkModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">Edit {{ trademark.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 ">
            <q-input
                v-model="trademark.company.name"
                float-label="Company"
                clearable
                disable
              />
          </div>
          <div class="col-xs-12 ">
            <q-input
                v-model="trademark.name"
                float-label="Name"
                clearable
              />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="trademark.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
              clearable
            />
          </div>

        </div>
        <br>
        <q-btn
          color="red"
          v-close-overlay
          label="Close"
          @click="hideModal()"
        />
        <q-btn
          color="primary"
          @click="update()"
          label="Submit"
          class="q-ml-sm"
        />
      </div>
    </q-modal>
    <q-modal
      v-model="newTrademarkModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Trademark</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <q-select
              v-model="trademark.company_id"
              :options="userCompanies"
              float-label="Company"
            />
          </div>
          <div class="col-xs-12 ">
            <q-input
                v-model="trademark.name"
                float-label="Name"
                clearable
              />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="trademark.desc"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
              clearable
            />
          </div>

        </div>

        <br>
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
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      model: '2016-10-24T10:40:14.674Z',
      superior: '',
      selectedRoles: [],
      editTrademarkModal: false,
      options: [5, 10, 15, 20],
      lastPage: '',
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'company', label: 'Company', field: 'company', align: 'left' },
        { name: 'desc', label: 'Desc', align: 'left', field: 'desc' },
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('trademarks', ['trademark']),
    newTrademarkModal: {
      get () {
        return this.$store.getters['trademarks/newTrademarkModal']
      },
      set (val) {

      }
    },
    userCompanies () {
      return this.$store.getters['trademarks/userCompanies'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    store () {
      this.$axios
        .post(`/trademarks`, this.trademark)
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.trademark.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (TrademarkId) {
      this.$axios.get(`/trademarks/${TrademarkId}?id=${TrademarkId}`).then(res => {
        this.$store.dispatch('trademarks/trademark', res.data.trademark)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.trademark.name} ?`,
          actions: [
            {
              label: 'Ok',
              handler: () => {
                this.$axios
                  .delete(`/trademarks/${this.trademark.id}?id=${this.trademark.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.trademark.name} deleted successfully`
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
            }
          ]
        })
      })
      // .catch()
    },
    update () {
      this.$axios.put(`/trademarks/${this.trademark.id}`, {
        id: this.trademark.id,
        company_id: this.trademark.company_id,
        name: this.trademark.name,
        desc: this.trademark.desc
      })
        .then((res) => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.trademark.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    hideModal () {
      this.$store.dispatch('trademarks/newTrademarkModal', false)
      this.editTrademarkModal = false
    },
    showModal () {
      this.editTrademarkModal = true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/trademarks?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.trademarks.data)
          this.serverPagination.rowsNumber = res.data.trademarks.total
          this.lastPage = res.data.trademarks.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (trademarkId) {
      this.$axios.get(`trademarks/${trademarkId}/edit?id=${trademarkId}`).then(res => {
        this.showModal()
        this.$store.dispatch('trademarks/trademark', res.data.trademark)
      })
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'trademark.name' (val) {
      this.$store.dispatch('trademarks/trademarkName', val)
    },
    'trademark.desc' (val) {
      this.$store.dispatch('trademarks/trademarkDesc', val)
    },
    'trademark.company_id' (val) {
      this.$store.dispatch('trademarks/trademarkCompanyId', val)
    }
  }
}
</script>
