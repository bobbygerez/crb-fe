<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Packages"
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
      v-model="editPackageModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">Edit {{ packagee.name }}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 ">
            <q-input
              v-model="packagee.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 ">
            <q-input
              v-model="packagee.desc"
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
      v-model="newPackageModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 ">
            <div class="q-display-1 q-mb-md">New Package</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 ">
            <q-input
              v-model="packagee.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 ">
            <q-input
              v-model="packagee.desc"
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
      editPackageModal: false,
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
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('accessRights', ['accessRight']),
    ...mapState('packages', ['packagee', 'newPackageModal']),
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
        .post(`/packages`, this.packagee)
        .then(res => {
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.packagee.name}created successfully`
          })
        })
    },
    deleteRow (packageId) {
      this.$axios.get(`/packages/${packageId}?id=${packageId}`).then(res => {
        this.$store.dispatch('packages/packagee', res.data.package)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.package.name} ?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/packages/${this.packagee.id}?id=${this.packagee.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.packagee.name} deleted successfully`
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
        .put(`/packages/${this.packagee.id}`, {
          id: this.packagee.id,
          name: this.packagee.name,
          desc: this.packagee.desc
        })
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.packagee.name} updated successfully`
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
      this.$store.dispatch('packages/newPackageModal', false)
      this.editPackageModal = false
    },
    showModal () {
      this.editPackageModal = true
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
          `/packages?filter=${this.filter}&page=${props.pagination.page}&perPage=${
          props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = _.values(res.data.packages.data)
          this.serverPagination.rowsNumber = res.data.packages.total
          this.lastPage = res.data.packages.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (packageId) {
      this.$axios.get(`packages/${packageId}/edit?id=${packageId}`).then(res => {
        this.showModal()
        this.$store.dispatch('packages/packagee', res.data.package)
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
    'packagee.name' (val) {
      this.$store.dispatch('packages/packageeName', val)
    },
    'packagee.desc' (val) {
      this.$store.dispatch('packages/packageeDesc', val)
    }
  }
}
</script>
