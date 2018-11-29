<template>
  <div class="q-pa-sm">
    <access-rights></access-rights>
     <q-page-sticky position="bottom-left" :offset="[16, 16]">
        <q-btn color="primary" @click="showNewAccessRightModal()">
          <q-icon name="add"></q-icon>
          New Access-Right
        </q-btn>
      </q-page-sticky>
  </div>
</template>

<script type="text/javascript">
import accessRights from "components/data-table/access-rights.vue";
export default {
  methods: {
     showNewAccessRightModal(){
       this.$store.dispatch("accessRights/accessRight", {
          name: '',
      });
      this.$store.dispatch('accessRights/newAccessRightModal', true)
    }
  },
  components: {
    accessRights
  }
};
</script>
