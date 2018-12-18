<template>
  <q-page-sticky
    position="bottom"
    :offset="$q.theme === 'mat' ? [16, 16] : [16, 16]"
    v-bind="$attrs"
  >
    <transition
      appear
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <q-btn
        v-show="show"
        fab
        color="primary"
        icon="mdi-plus"
        @click="$emit('fab-click')"
      />
    </transition>
  </q-page-sticky>
</template>

<script>
export default {
  name: 'add-action-fab',
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: () => true
    }
  }
}
</script>

<style>
</style>
