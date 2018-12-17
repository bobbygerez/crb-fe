<template>
  <div class="q-pa-sm">
    <categories></categories>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import categories from 'components/data-table/categories.vue'
export default {
  components: {
    categories
  }
}
</script>
