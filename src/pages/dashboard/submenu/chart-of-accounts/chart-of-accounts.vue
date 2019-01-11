<template>
<div class="q-pa-sm">
    <chart-of-account ref="chartAcct"></chart-of-account>
    <q-page-sticky position="bottom" :offset="[16, 16]">
        <q-btn-group>
            <q-btn color="primary" glossy icon="add" size="lg" @click="newChartAccount" />
            <q-btn color="primary" glossy icon="edit" size="lg" @click="editChartAccount" />
            <q-btn color="primary" glossy icon="delete" size="lg" @click="deleteChartAccount" />
        </q-btn-group>

    </q-page-sticky>

</div>
</template>

<script>
import chartOfAccount from 'components/data-table/chart-of-accounts.vue'
import {
    mapState
} from 'vuex'

export default {

    methods: {

        newChartAccount() {

           
            this.$store.dispatch('chartAccounts/chartAccount', {
                name: '',
                account_display: '',
                remarks: '',
                taccount_id: ''
            });
            this.$store.dispatch('chartAccounts/newChartAccount', true)

        },
        editChartAccount() {
            if (this.parentAccount.id === undefined) {
                this.$q.notify({
                    color: 'negative',
                    icon: 'warning',
                    message: `Select a chart of account to edit.`
                })
            } else {
                this.$axios
                .get(`chart_account/${this.parentAccount.id}?id=${this.parentAccount.id}`)
                .then(res => {
                    if (res.data.chartAccount != null) {
                        this.$store.dispatch('chartAccounts/parentAccount', res.data.chartAccount)
                    } else {
                        this.$store.dispatch('chartAccounts/parentAccount', {
                            name: '',
                            account_display: '',
                            remarks: '',
                            taccount_id
                        })
                    }
                })
                this.$store.dispatch('chartAccounts/editChartAccount', true)
            }

        },
        deleteChartAccount() {
            if (this.parentAccount.id === undefined) {
                this.$q.notify({
                    color: 'negative',
                    icon: 'warning',
                    message: `Select a chart of account to delete.`
                })
            } else {
                let warningMsg = `Delete ${this.parentAccount.name}`
                if (this.parentAccount.parent_id != 0) {
                    warningMsg = warningMsg + ' and sub-chart of account?'
                }
                this.$q.notify({
                    color: 'negative',
                    icon: 'delete',
                    message: warningMsg,
                    actions: [{
                        label: 'OK',
                        handler: () => {
                            this.$axios
                                .delete(
                                    `/chart_account/${this.parentAccount.id}?id=${
                              this.parentAccount.id
                            }`
                                )
                                .then(res => {
                                    this.$q.notify({
                                        color: 'positive',
                                        icon: 'check',
                                        message: `${
                                this.parentAccount.name
                              } deleted successfully`
                                    })
                                    this.$refs.chartAcct.index()
                                    this.$store.dispatch('chartAccounts/parentAccount', {
                                        name: '',
                                        account_display: '',
                                        remarks: ''
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
                    }]
                })
            }
        }
    },
    components: {
        chartOfAccount
    },
    computed: {
        ...mapState('chartAccounts', ['parentAccount'])
    }
}
</script>
