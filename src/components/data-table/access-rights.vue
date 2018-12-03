<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Access-Rights"
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
          <q-td key="superior">
            <div
              v-for="(child, i) in props.row.all_children"
              :key="i"
            >{{ child.name }}</div>
          </q-td>
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

      <!-- <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn
          round
          dense
          size="sm"
          icon="undo"
          color="secondary"
          class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div
          class="q-mr-sm"
          style="font-size: small"
        >Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}</div>
        <q-btn
          round
          dense
          size="sm"
          icon="redo"
          color="secondary"
          :disable="paginationLast(props.pagination.page)"
          @click="props.nextPage"
        />
      </div>-->
    </q-table>

    <q-modal
      v-model="editAccessRightModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">Edit {{ accessRight.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 ">
            <q-input
              v-model="accessRight.name"
              float-label="Name"
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
      v-model="newAccessRightModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Access Right</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 ">
            <q-input
              v-model="accessRight.name"
              float-label="Name"
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
      editAccessRightModal: false,
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
        {
          name: 'submenu',
          align: 'left',
          field: 'submenu'
        },
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('accessRights', ['accessRight']),
    newAccessRightModal: {
      get () {
        return this.$store.getters['accessRights/newAccessRightModal']
      },
      set () {

      }
    }
  },
  methods: {
    store () {
      this.$axios
        .post(`/access_rights`, {
          name: this.accessRight.name
        })
        .then(res => {
          this.hideModal()
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.accessRight.name}created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    deleteRow (accessRightId) {
      this.$axios.get(`/access_rights/${accessRightId}?id=${accessRightId}`).then(res => {
        this.$store.dispatch('accessRights/accessRight', res.data.accessRight)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.accessRight.name} ?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/access_rights/${this.accessRight.id}?id=${this.accessRight.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.accessRight.name} deleted successfully`
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
      this.$axios
        .put(`/access_rights/${this.accessRight.id}`, {
          id: this.accessRight.id,
          name: this.accessRight.name
        })
        .then(res => {
          this.editRoleModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.accessRight.name} updated successfully`
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
      this.$store.dispatch('accessRights/newAccessRightModal', false)
      this.editAccessRightModal = false
    },
    showModal () {
      this.editAccessRightModal = true
    },
    paginationLast (currentPage) {
      if (this.lastPage > currentPage) {
        return false
      }
      return true
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(
          `/access_rights?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.accessRights.data)
          this.serverPagination.rowsNumber = res.data.accessRights.total
          this.lastPage = res.data.accessRights.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (accessRightId) {
      this.$axios.get(`access_rights/${accessRightId}/edit?id=${accessRightId}`).then(res => {
        this.showModal()
        this.$store.dispatch('accessRights/accessRight', res.data.accessRight)
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
    'accessRight.name' (val) {
      this.$store.dispatch('accessRights/accessRightName', val)
    }
  }
}
</script>
