<template>
  <div class="q-pa-sm">
    <menus></menus>
    <q-page-sticky
      position="bottom-left"
      :offset="[16, 16]"
    >
      <q-btn
        color="primary"
        @click="showNewmenu()"
      >
        <q-icon name="add"></q-icon>
        new menu
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import menus from 'components/data-table/menus.vue'
export default {
  methods: {
<<<<<<< HEAD
     showNewmenu(){
       this.$store.dispatch("menus/menu", {
          name: '',
          parent_id: 0,
          description: ''
      });


=======
    showNewmenu () {
      this.$store.dispatch('menus/menu', {
        name: '',
        parent_id: '',
        description: ''
      })
>>>>>>> 97f29fcb1edc688c081856722d16b796444c6545
      this.$store.dispatch('menus/newMenuModal', true)
    }
  },
  components: {
    menus
  }
}
</script>
