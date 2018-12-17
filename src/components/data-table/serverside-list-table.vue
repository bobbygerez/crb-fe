<template>
  <div>
    <q-table
      ref="table"
      color="primary"
      title="All Companies"
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
          <q-td key="company">
            {{props.row.name}}
          </q-td>
          <q-td key="holding">
            {{props.row.holding.name}}
          </q-td>
          <q-td
            key="address"
            :props="props"
          >
            {{props.row.address.street_lot_blk}}
            <br />
            {{props.row.address.brgy.description}}
            <br />
            {{props.row.address.city.description }},
            <br />
            {{props.row.address.region.description }}

          </q-td>
          <q-td
            key="created"
            :props="props"
          >
            {{props.row.created_at}}
          </q-td>
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
        >
          Page {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </div>
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
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
    columns: {
      type: [Array, Object],
      default: null
    },
    actions: {
      type: [Array, Object],
      default: null
    },
    theme: {
      type: String,
      default: 'primary'
    },
    search: {
      Boolean,
      default: true
    },
    topRightOptions: {
      type: Object,
      default: () => {
        return {
          visibleCols: true,
          cellLines: true,
          fullscreenToggle: true
        }
      }
    }
  }
}
</script>

<style>
</style>
