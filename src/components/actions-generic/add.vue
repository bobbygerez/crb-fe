<template>
  <div>
    <q-btn flat round dense icon="mdi-account-plus" name="add" @click="addNew">
      <q-tooltip :delay="200">
        Add New
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
/**
 * This components is used to put an action in the toolbar for adding / creating new data
 * depending on what module you are currently browsing.
 * Include this component along with your other generic actions.
 */
export default {
  name: 'add-generic',
  methods: {
    addNew () {
      // push route to add
      this.$router.push('./add')
    }
  }
}
</script>

<style>
</style>
