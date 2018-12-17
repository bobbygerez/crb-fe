<template>
  <div>
    <q-btn
      round
      outline
      color="positive"
      icon="add"
      class="q-ma-sm"
      @click="showCreateModal()"
    />
    <q-btn
      round
      outline
      color="light"
      icon="edit"
      class="q-ma-sm"
      @click="edit()"
    />
    <q-btn
      round
      outline
      color="negative"
      icon="delete"
      class="q-ma-sm"
      @click="deleteSelected()"
    />
    <div class="q-mb-sm row no-wrap items-center">
      <q-select
        v-model="tickStrategy"
        color="secondary"
        stack-label="Tick Stragety"
        :options="[
            {label: 'None', value: 'none'},
            {label: 'Leaf', value: 'leaf'},
            {label: 'Leaf Filtered', value: 'leaf-filtered'},
            {label: 'Strict', value: 'strict'}
          ]"
        class="q-ma-none q-mr-sm"
        style="width: 150px"
      />
      <q-input
        v-if="tickStrategy === 'leaf-filtered'"
        color="secondary"
        stack-label="Filter"
        v-model="tickFilter"
        class="q-ma-none"
        clearable
      />
    </div>
    <q-tree
      :nodes="categories"
      color="secondary"
      default-expand-all
      :ticked.sync="ticked"
      :tick-strategy="tickStrategy"
      :filter="tickFilter"
      node-key="id"
      label-key="label"
    />
    <q-modal
      v-model="newCategoryModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12">
            <div class="q-display-1 q-mb-md">New Category</div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12"
            v-if="ticked.length > 0"
          >
            <q-input
              v-model="parent.label"
              float-label="Parent Category"
              clearable
              disable
              v-if="parent.id != 0"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="desc"
              float-label="Desc"
              type="textarea"
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
          @click="closeModal()"
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
      v-model="editCategoryModal"
      minimized
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{minWidth: '80vw', minHeight: '80vh'}"
    >
      <div style="padding: 30px">
        <div class="row">
          <div class="col-xs-12">
            <div class="q-display-1 q-mb-md">New Category</div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12"
            v-if="ticked.length > 0"
          >
            <q-input
              v-model="categoryParent"
              float-label="Parent Category"
              clearable
              disable
              v-if="category.parent != null || category.parent != undefined"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="category.name"
              float-label="Name"
              clearable
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="category.desc"
              float-label="Desc"
              type="textarea"
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
          @click="closeModal()"
        />
        <q-btn
          color="primary"
          @click="update()"
          label="Submit"
          class="q-ml-sm"
        />
      </div>
    </q-modal>
  </div>
</template>

<script>
// import tableData from 'assets/table-data'
// import _ from 'lodash';
import { mapState } from 'vuex'
function getObject (array, key, value) {
  var o
  array.some(function iter (a) {
    if (a[key] === value) {
      o = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  })
  return o
}
export default {
  data () {
    return {
      newCategoryModal: false,
      editCategoryModal: false,
      parent: {
        id: '',
        label: ''
      },
      name: '',
      desc: '',
      ticked: [],
      tickFilter: null,
      tickStrategy: 'strict',
      columns: [
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'desc', label: 'Description', align: 'left', field: 'desc' },
        { name: 'created', label: 'Created', align: 'left', field: 'created' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'actions' }
      ],
      filter: '',
      loading: false
    }
  },
  computed: {
    ...mapState('categories', ['category']),
    categories () {
      let categories = this.$store.getters['categories/categories']
      const map = e => ({
          id: e.id,
          label: e.name,
          children: e.all_children.map(map) // recursive call
        }),
        tree = categories.map(map)
      return tree
    },
    categoryParent () {
      console.log(this.category.parent)
      if (this.category.parent === undefined || this.category.parent === null) {
        return ''
      } else {
        return this.category.parent.name
      }
    }
  },
  methods: {
    showCreateModal () {
      if (this.tickStrategy === 'strict') {
        if (this.ticked.length <= 1) {
          this.name = ''
          this.desc = ''
          this.parent = getObject(this.categories, 'id', this.ticked[0])
          if (this.parent === undefined) {
            this.parent = {
              id: 0
            }
          }
          this.newCategoryModal = true
        } else {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Selected must be less than 2. (${
              this.ticked.length
            } selected)`
          })
        }
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please select 'strict' in tick strategy`
        })
      }
    },
    store () {
      this.$axios
        .post(`/categories`, {
          parent_id: this.parent.id,
          name: this.name,
          desc: this.desc
        })
        .then(res => {
          this.hideModal()
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.name} created successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
    },
    hideModal () {
      this.newCategoryModal = false
      this.editCategoryModal = false
    },
    deleteSelected () {
      if (this.tickStrategy === 'strict') {
        if (this.ticked.length === 1) {
          this.parent = getObject(this.categories, 'id', this.ticked[0])

          this.$axios
            .get(`categories/${this.parent.id}?id=${this.parent.id}`)
            .then(res => {
              this.$store.dispatch('categories/category', res.data.category)
              console.log(res.data.category.all_children.length)

              if (res.data.category.all_children.length > 0) {
                this.$q.notify({
                  color: 'negative',
                  icon: 'delete',
                  message: `Delete ${
                    res.data.category.name
                  } and subcategories?`,
                  actions: [
                    {
                      label: 'OK',
                      handler: () => {
                        this.$axios
                          .delete(
                            `/categories/${this.category.id}?id=${
                              this.category.id
                            }`
                          )
                          .then(res => {
                            this.$q.notify({
                              color: 'positive',
                              icon: 'check',
                              message: `${
                                this.category.name
                              } deleted successfully`
                            })
                            this.ticked = []
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
              } else {
                this.$q.notify({
                  color: 'negative',
                  icon: 'delete',
                  message: `Delete ${res.data.category.name}?`,
                  actions: [
                    {
                      label: 'OK',
                      handler: () => {
                        this.$axios
                          .delete(
                            `/categories/${this.category.id}?id=${
                              this.category.id
                            }`
                          )
                          .then(res => {
                            this.$q.notify({
                              color: 'positive',
                              icon: 'check',
                              message: `${
                                this.category.name
                              } deleted successfully`
                            })
                            this.ticked = []
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
              }
            })
        } else {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Please select 1 category to delete.`
          })
        }
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please select 'strict' in tick strategy`
        })
      }
    },
    update () {
      this.$axios
        .put(`/categories/${this.category.id}`, {
          id: this.category.id,
          parent_id: this.category.parent_id,
          name: this.category.name,
          desc: this.category.desc
        })
        .then(res => {
          this.editCategoryModal = false
          this.$q.notify({
            color: 'positive',
            icon: 'check',
            message: `${this.category.name} update successfully`
          })
          this.request({
            pagination: this.serverPagination,
            filter: this.filter
          })
        })
        .catch()
    },
    closeModal () {
      this.newCategoryModal = false
    },
    request (props) {
      this.loading = true
      this.$axios
        .get(`/categories?filter=${this.filter}`)
        .then(res => {
          this.$store.dispatch('categories/categories', res.data.categories)
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    edit () {
      if (this.tickStrategy === 'strict') {
        if (this.ticked.length === 1) {
          this.parent = getObject(this.categories, 'id', this.ticked[0])

          this.$axios
            .get(`categories/${this.parent.id}/edit?id=${this.parent.id}`)
            .then(res => {
              this.editCategoryModal = true
              this.$store.dispatch('categories/category', res.data.category)
            })
        } else {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: `Please select 1 category to edit.`
          })
        }
      } else {
        this.$q.notify({
          color: 'negative',
          icon: 'warning',
          message: `Please select 'strict' in tick strategy`
        })
      }
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  watch: {
    'category.name' (val) {
      this.$store.dispatch('categories/categoryName', val)
    },
    'category.desc' (val) {
      this.$store.dispatch('categories/categoryDesc', val)
    }
  }
}
</script>
