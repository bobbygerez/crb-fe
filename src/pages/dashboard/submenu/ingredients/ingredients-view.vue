<template>
  <div class="q-pa-sm">
    <ingredients-view></ingredients-view>

    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewPurchasRequestModal()"
      >
        <q-icon name="add"></q-icon>New Ingredient
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import ingredientsView from 'components/data-table/ingredients-view.vue'
export default {
  created () {
    this.getIngredients()
  },
  methods: {
    getIngredients () {
      this.$axios.get(`modelable-user-models?modelType=App\\Model\\Company`)
        .then(res => {
          this.$store.dispatch('ingredients/userEntities', res.data.userModels)
        })
    },
    showNewPurchasRequestModal () {
      this.$store.dispatch('purchaseRequests/purchaseRequest', {
        name: '',
        purchasable_id: '',
        purchasable_type: '',
        created_at: '',
        purchasable: {
          name: ''
        },
        prepared_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        noted_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        noted_date: '',
        approved_by: {
          firstname: '',
          middlename: '',
          lastname: ''
        },
        approved_date: ''

      })
      this.$store.dispatch('purchaseRequests/newPurchaseRequestModal', true)
    }
  },
  components: {
    ingredientsView
  }
}
</script>
