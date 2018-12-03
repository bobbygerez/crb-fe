<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Roles"
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
            <span
              v-for="(superior, i) in props.row.parents"
              :key="i"
            >{{ superior.name }}</span>
          </q-td>
          <q-td key="subordinates">
            <span
              v-for="(subordinate, i) in props.row.children"
              :key="i"
            >
              <q-chip
                small
                color="teal"
              >{{ subordinate.name }}</q-chip>
            </span>
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

      <div
        slot="pagination"
        slot-scope="props"
        class="row flex-center q-py-sm"
      >
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
      </div>
    </q-table>

    <q-modal
      v-model="editRoleModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ role.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="role.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="role.parent_id"
              :options="superiorRoleOptions"
              float-label="Superior"
              clearable
              chips
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-select
              multiple
              v-model="subordinatesIds"
              :options="subordinateRoleOptions"
              float-label="Subordinates"
              chips
              readonly
              hide-underline
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="role.description"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
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
      v-model="newRoleModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">New {{ role.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input
              v-model="role.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="role.parent_id"
              :options="superiorRoleOptions"
              float-label="Superior"
              clearable
              chips
            />
          </div>
        </div>
        <div class="col-xs-12 col-sm-12">
          <q-input
            v-model="role.description"
            type="textarea"
            float-label="Description"
            :max-height="100"
            rows="2"
          />
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
import { values } from 'lodash'
// import { mapState } from 'vuex'
import { mapRoleFields } from '../../store/roles'

export default {
  data () {
    return {
      model: '2016-10-24T10:40:14.674Z',
      superior: '',
      selectedRoles: [],
      editRoleModal: false,
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
          name: 'superior',
          label: 'Superior',
          align: 'left',
          field: 'superior'
        },
        {
          name: 'subordinates',
          label: 'Subordinates',
          align: 'left',
          field: 'subordinates'
        },
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
        // { name: "address", label: "Address", field: "address", align: "left" },
        // { name: "created", label: "Created", field: "created", align: "left" },
        // { name: "actions", label: "Actions", field: "actions", align: "left" }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapRoleFields(['roles', 'role', 'newRoleModal', 'superiorRoles', 'subordinateRoles']),
    superiorRoleOptions () {
      return this.superiorRoles.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    subordinateRoleOptions () {
      return this.subordinateRoles.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    subordinatesIds () {
      return this.subordinateRoles.map(e => {
        return e.id
      })
    }
  },
  methods: {
    store () {
      this.$axios
        .post(`/roles`, {
          id: this.role.id,
          name: this.role.name,
          description: this.role.description,
          parent_id: this.role.parent_id
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
            message: `${this.role.name}created successfully`
          })
        })
    },
    deleteRow (roleId) {
      this.$axios.get(`/roles/${roleId}?id=${roleId}`).then(res => {
        this.$store.dispatch('roles/role', res.data.role)
        this.$q.notify({
          color: 'negative',
          icon: 'delete',
          message: `Delete ${res.data.role.name} ?`,
          actions: [
            {
              label: 'OK',
              handler: () => {
                this.$axios
                  .delete(`/roles/${this.role.id}?id=${this.role.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: 'positive',
                      icon: 'check',
                      message: `${this.role.name} deleted successfully`
                    })
                    this.request({
                      pagination: this.serverPagination,
                      filter: this.filter
                    })
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
        .put(`/roles/${this.role.id}`, {
          id: this.role.id,
          name: this.role.name,
          description: this.role.description,
          parent_id: this.role.parent_id
        })
        .then(res => {
          this.editRoleModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.role.name} updated successfully`
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
      this.newRoleModal = false
      this.editRoleModal = false
    },
    showModal () {
      this.editRoleModal = true
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
          `/roles?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination
          this.serverData = values(res.data.roles.data)
          this.serverPagination.rowsNumber = res.data.roles.total
          this.lastPage = res.data.roles.last_page
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit (roleId) {
      this.$axios.get(`roles/${roleId}/edit?id=${roleId}`).then(res => {
        this.editRoleModal = true
        this.$store.dispatch('roles/role', res.data.role)
        this.$store.dispatch(
          'roles/subordinateRoles',
          res.data.subordinateRoles
        )
        this.$store.dispatch('roles/superiorRoles', res.data.superiorRoles)
      })
    },
    getSubordinateRoles () {
      this.$axios.get(`/user-subordinate-roles`).then(res => {
        this.$store.dispatch(
          'roles/subordinateRoles',
          res.data.subordinateRoles
        )
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
    // 'role.name' (val) {
    //   this.$store.dispatch('roles/roleName', val)
    // },
    // 'role.description' (val) {
    //   this.$store.dispatch('roles/roleDescription', val)
    // }
  }
}
</script>
