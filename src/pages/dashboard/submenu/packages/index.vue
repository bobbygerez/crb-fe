<template>
  <div class="q-pa-sm">
    <packages></packages>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewPackageModal()"
      >
        <q-icon name="add"></q-icon>New Package
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import packages from 'components/data-table/packages.vue'
export default {
  methods: {
    showNewPackageModal () {
      this.$store.dispatch('packages/packagee', {
        name: '',
        desc: ''
      })
      this.$store.dispatch('packages/newPackageModal', true)
    }
  },
  components: {
    packages
  }
}
</script>
