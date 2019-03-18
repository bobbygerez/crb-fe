<template>
    <form @submit.prevent="add">
        <div class="row">
            <div class="col-12">
                <p class="text-h5 q-ma-sm">
                    <q-icon name="add_circle" color="grey" /> {{ chartAccount.name }}
                </p>
            </div>
            <div class="col-12" v-if="show">
                <q-input outlined v-model="parentAccount.name" label="Parent Account" class="q-ma-sm" disable />
            </div>
            <div class="col-12">
                <q-select outlined v-model="$v.chartAccount.taccount_id.$model" :options="tAccounts" :error="$v.chartAccount.taccount_id.$dirty && !$v.chartAccount.taccount_id.required" label="Normal Balance" class="q-ma-sm" bottom-slots error-message="Normal balance is required." />
            </div>
            <div class="col-4">
                <q-input outlined v-model="$v.chartAccount.name.$model" label="Chart Account Name" class="q-ma-sm" :error="$v.chartAccount.name.$dirty && !$v.chartAccount.name.required" bottom-slots error-message="Name is required." />
            </div>
            <div class="col-4">
                <q-input outlined type="number" v-model="$v.chartAccount.account_code.$model" label="Account Code" class="q-ma-sm" :error="($v.chartAccount.account_code.$dirty && !$v.chartAccount.account_code.required) || !$v.chartAccount.account_code.numeric" bottom-slots error-message="Account Code must be a number and required." />
            </div>
            <div class="col-4">
                <q-input outlined v-model="$v.chartAccount.account_display.$model" label="Display Code" class="q-ma-sm" :error="$v.chartAccount.account_display.$dirty && !$v.chartAccount.account_display.required" bottom-slots error-message="Display code required." />
            </div>
            <div class="col-12">
                <q-input outlined v-model="chartAccount.remarks" label="Remarks" type="textarea" />
            </div>
            <slot></slot>
        </div>
    </form>
</template>

<script>
import {
  required,
  numeric
} from 'vuelidate/lib/validators'

export default {
  props: ['show', 'parentAccount', 'chartAccount', 'selectedChartAccount'],
  validations: {
    chartAccount: {
      name: {
        required

      },
      account_code: {
        required,
        numeric
      },
      account_display: {
        required

      },
      taccount_id: {
        required
      }
    }
  },
  computed: {
    tAccounts () {
      return this.$store.getters['tAccounts/tAccounts'].map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }

  }
}
</script>
