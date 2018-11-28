<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Menus"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :pagination.sync="serverPagination"
      :rows-per-page-options="options"
      @request="request"
      :loading="loading"
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter"/>
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="name">{{props.row.name }}</q-td>
          <q-td key="superior">
            <div v-for="(child, i) in props.row.all_children" :key="i">{{ child.name }}</div>
          </q-td>
          <q-td key="created">{{ props.row.created_at }}</q-td>
          <q-td key="actions" :props="props">
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
      v-model="editMenuModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="q-display-1 q-mb-md">Edit {{ menu.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input v-model="menu.name" float-label="Name" clearable/>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="menu.parent_id"
              :options="superiorMenus"
              float-label="Parent"
              clearable
              chips
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-select
              multiple
              v-model="submenuIds"
              :options="submenus"
              float-label="Submenu"
              chips
              readonly
              hide-underline
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="menu.description"
              type="textarea"
              float-label="Description"
              :max-height="100"
              rows="2"
            />
          </div>
        </div>

        <br>
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()"/>
        <q-btn color="primary" @click="update()" label="Submit" class="q-ml-sm"/>
      </div>
    </q-modal>
    <q-modal
      v-model="newMenuModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <q-input v-model="menu.name" float-label="Name" clearable/>
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="menu.parent_id"
              :options="superiorMenus"
              float-label="Parent"
              clearable
              chips
            />
          </div>
        </div>
        <br>
        <q-btn color="red" v-close-overlay label="Close" @click="hideModal()"/>
        <q-btn color="primary" @click="store()" label="Submit" class="q-ml-sm"/>
      </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
import _ from "lodash";
import { mapState } from "vuex";
export default {
  data() {
    return {
      model: "2016-10-24T10:40:14.674Z",
      superior: "",
      selectedRoles: [],
      editMenuModal: false,
      options: [5, 10, 15, 20],
      lastPage: "",
      serverData: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10 // specifying this determines pagination is server-side
      },
      columns: [
        { name: "name", label: "Name", field: "name", align: "left" },
        {
          name: "submenu",
          label: "Sub-menu",
          align: "left",
          field: "submenu"
        },
        { name: "created", label: "Created", align: "left", field: "created" },
        { name: "actions", label: "Actions", align: "left", field: "actions" }
      ],
      filter: "",
      loading: false
    };
  },
  computed: {
    ...mapState("menus", ["menus", "menu"]),
    superiorMenus: {
      get() {
        return this.$store.getters["menus/superiorMenus"].map(e => {
          return {
            label: e.name,
            value: e.id
          };
        });
      },
      set(val) {}
    },
    submenus: {
      get() {
        return this.$store.getters["menus/submenus"].map(e => {
          return {
            label: e.name,
            value: e.id
          };
        });
      },
      set(val) {}
    },
    submenuIds: {
      get() {
        return this.$store.getters["menus/submenus"].map(e => {
          return e.id;
        });
      },
      set(val) {
        this.selectedRoles = val;
      }
    },
    newMenuModal: {
      get() {
        return this.$store.getters["menus/newMenuModal"];
      },
      set(val) {
        return this.$store.dispatch("menus/newMenuModal", val);
      }
    }
  },
  methods: {
    store() {
      this.$axios
        .post(`/roles`, {
          id: this.role.id,
          name: this.role.name,
          description: this.role.description,
          parent_id: this.role.parent_id
        })
        .then(res => {
          this.hideModal();
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          });
          this.$q.notify({
            color: "positive",
            icon: "check",
            message: `${this.role.name}created successfully`
          });
        });
    },
    deleteRow(roleId) {
      this.$axios.get(`/roles/${roleId}?id=${roleId}`).then(res => {
        this.$store.dispatch("roles/role", res.data.role);
        this.$q.notify({
          color: "negative",
          icon: "delete",
          message: `Delete ${res.data.role.name} ?`,
          actions: [
            {
              label: "OK",
              handler: () => {
                this.$axios
                  .delete(`/roles/${this.role.id}?id=${this.role.id}`)
                  .then(res => {
                    this.$q.notify({
                      color: "positive",
                      icon: "check",
                      message: `${this.role.name} deleted successfully`
                    });
                    this.request({
                      pagination: this.serverPagination,
                      filter: this.filter
                    });
                  })
                  .catch(err => {
                    this.$q.notify({
                      color: "negative",
                      icon: "warning",
                      message: `${err.response.data.message}`
                    });
                  });
              }
            }
          ]
        });
      });
      // .catch()
    },
    update() {
      this.$axios
        .put(`/menus/${this.menu.id}`, {
          id: this.menu.id,
          name: this.menu.name,
          description: this.menu.description,
          parent_id: this.menu.parent_id
        })
        .then(res => {
          this.editRoleModal = false;
          this.$q.notify({
            color: "positive",
            icon: "check",
            message: `${this.menu.name} updated successfully`
          });
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          });
          this.hideModal();
        })
        .catch();
    },
    hideModal() {
      this.newRoleModal = false;
      this.editRoleModal = false;
    },
    showModal() {
      this.editRoleModal = true;
    },
    paginationLast(currentPage) {
      if (this.lastPage > currentPage) {
        return false;
      }
      return true;
    },
    request(props) {
      this.loading = true;
      this.$axios
        .get(
          `/menus?filter=${this.filter}&page=${props.pagination.page}&perPage=${
            props.pagination.rowsPerPage
          }`
        )
        .then(res => {
          this.serverPagination = props.pagination;
          this.serverData = _.values(res.data.menus.data);
          this.serverPagination.rowsNumber = res.data.menus.total;
          this.lastPage = res.data.menus.last_page;
          this.loading = false;
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error);
          // we tell QTable to exit the "loading" state
          this.loading = false;
        });
    },
    edit(menuId) {
      this.$axios.get(`menus/${menuId}/edit?id=${menuId}`).then(res => {
        this.editMenuModal = true;
        this.$store.dispatch("menus/menu", res.data.menu);
        this.$store.dispatch("menus/superiorMenus", res.data.superiorMenus);
        this.$store.dispatch("menus/submenus", res.data.submenus);
      });
    },
    subordinateRoles() {
      this.$axios.get(`/user-subordinate-roles`).then(res => {
        this.$store.dispatch(
          "roles/subordinateRoles",
          res.data.subordinateRoles
        );
      });
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  },
  watch: {
    "menu.name"(val) {
      this.$store.dispatch("menus/menuName", val);
    },
    "menu.description"(val) {
      this.$store.dispatch("menus/menuDescription", val);
    },
    "menu.parent_id"(val) {
      this.$store.dispatch("menus/menuParentId", val);
    }
  }
};
</script>
