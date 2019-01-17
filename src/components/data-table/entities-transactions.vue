<template>
<div>
    <q-table ref="table" color="primary" :title="`${company.companyName}'s Entities`" :data="serverData" :columns="columns" :filter="filter" row-key="name" :pagination.sync="serverPagination" :rows-per-page-options="options" @request="request" :loading="loading">
        <template slot="top-right" slot-scope="props">
            <q-search hide-underline v-model="filter" />
        </template>

        <template slot="body" slot-scope="props">
            <q-tr :props="props">
                <q-td key="name">{{props.row.name }}
                    <q-popover touch-position v-if="actions">
                        <q-list link style="min-width: 100px">
                            <template v-for="(action, idx) in actions">
                                <q-item :key="idx" @click.native="$emit(action, props.row)" v-close-overlay>
                                    <q-item-main :label="action" />
                                </q-item>
                            </template>
                        </q-list>
                    </q-popover>

                </q-td>
                <q-td key="desc">{{props.row.entity.substring(10) }}</q-td>
                <q-td key="desc">{{props.row.desc }}</q-td>
                <q-td key="created_at">{{props.row.created_at }}</q-td>
            </q-tr>
        </template>

    </q-table>

</div>
</template>

<script>
// import tableData from 'assets/table-data'
import slug from 'components/mixins/slug'
import _ from 'lodash';
import {
    mapState
} from 'vuex'

export default {
    mixins: [slug],
    data() {
        return {

            actions: ['Transactions'],
            selectedChartAccount: 0,
            columns: [{
                    name: 'name',
                    label: 'Name',
                    field: 'name',
                    align: 'left'
                },
                {
                    name: 'entity',
                    label: 'Entity',
                    align: 'left',
                    field: 'entity'
                },
                {
                    name: 'desc',
                    label: 'Description',
                    align: 'left',
                    field: 'desc'
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
        ...mapState('transactions', ['company'])
    },
    methods: {

        request(props) {
            this.loading = true
            this.$axios
                .get(
                    `/transactions-branches?companyId=${this.company.id}&filter=${this.filter}&page=${props.pagination.page}&perPage=${props.pagination.rowsPerPage}`
                )
                .then(res => {
                    this.serverPagination = props.pagination
                    this.serverData = _.values(res.data.branches.data)
                    this.serverPagination.rowsNumber = res.data.branches.total
                    this.lastPage = res.data.branches.last_page
                    this.loading = false
                })
                .catch(error => {
                    // there's an error... do SOMETHING
                    // we tell QTable to exit the "loading" state
                    this.loading = false
                })

        }
    },

    mounted() {
        this.request({
            pagination: this.serverPagination,
            filter: this.filter
        })

            this.$on('Transactions', (obj) => {
                this.$router.push({
                    path: `/dashboard/transactions/${this.slug(this.company.companyName)}/${this.slug(obj.name)}`
                })
                this.$store.dispatch('transactions/entity', obj)
            })

    }
}
</script>
